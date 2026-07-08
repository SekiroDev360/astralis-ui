/**
 * Shared token extraction for the safelist generator and the CSS coverage
 * gate. Two scopes:
 *
 * - ALL tokens: every `astralis:*` class any component can emit — these must
 *   exist at BASE in the compiled CSS (Tailwind's scanner handles that; the
 *   coverage gate asserts it).
 *
 * - RESPONSIVE tokens: only classes that the runtime responsive engine can
 *   breakpoint-prefix — i.e. values inside the token maps handed to
 *   `resolveStyleProps` (everything in src/const, plus `export const
 *   *Map = {...}` blocks in *.styles.ts). Only these need sm/md/lg/xl
 *   variants force-generated; safelisting everything quadrupled selectors
 *   for hover/focus/state classes that can never be responsive.
 */
import { readFileSync, readdirSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const SRC = join(__dirname, "..", "src");

export function collectFiles(dir, acc = []) {
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) collectFiles(full, acc);
    else if (/\.(ts|tsx)$/.test(entry.name) && !/\.stories\./.test(entry.name)) acc.push(full);
  }
  return acc;
}

function tokensInText(text, set) {
  for (const m of text.matchAll(/["'`]([^"'`]*astralis:[^"'`]+)["'`]/g)) {
    for (const cls of m[1].split(/\s+/)) {
      if (cls.startsWith("astralis:")) set.add(cls.slice("astralis:".length));
    }
  }
}

/** Every astralis-prefixed class in src/const + src/components. */
export function collectAllTokens() {
  const tokens = new Set();
  for (const root of [join(SRC, "const"), join(SRC, "components")]) {
    for (const file of collectFiles(root)) tokensInText(readFileSync(file, "utf8"), tokens);
  }
  return tokens;
}

/** Slice out `export const <name>Map = { ... }` blocks (brace-balanced). */
function mapBlocks(text) {
  const blocks = [];
  const re = /export const \w*Map(?:\s*:[^=]+)? = \{/g;
  let m;
  while ((m = re.exec(text))) {
    let depth = 0;
    let i = m.index + m[0].length - 1; // at the opening brace
    for (; i < text.length; i++) {
      if (text[i] === "{") depth++;
      else if (text[i] === "}") {
        depth--;
        if (depth === 0) break;
      }
    }
    blocks.push(text.slice(m.index, i + 1));
  }
  return blocks;
}

/** Only classes reachable by the runtime responsive engine. */
export function collectResponsiveTokens() {
  const tokens = new Set();
  for (const file of collectFiles(join(SRC, "const"))) {
    tokensInText(readFileSync(file, "utf8"), tokens);
  }
  for (const file of collectFiles(join(SRC, "components"))) {
    if (!/\.styles\.tsx?$/.test(file)) continue;
    for (const block of mapBlocks(readFileSync(file, "utf8"))) tokensInText(block, tokens);
  }
  return tokens;
}
