/* ==========================================================================
   ASTRALIS — CSS COVERAGE GATE
   --------------------------------------------------------------------------
   The library ships precompiled CSS, so a class the components can emit but
   Tailwind didn't generate fails SILENTLY in the browser. This script makes
   that failure loud at build time instead: it extracts every `astralis:*`
   class literal from src/const and src/components, then asserts each one —
   and its sm/md/lg/xl variants — exists as a selector in dist/styles.css.

   Runs as part of `build:css`; exits non-zero (failing the build) on any miss.
   ========================================================================== */

import { readFileSync, readdirSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join, relative } from "node:path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const PKG = join(__dirname, "..");
const SOURCES = [join(PKG, "src", "const"), join(PKG, "src", "components")];
const BREAKPOINTS = ["sm", "md", "lg", "xl"];

// Marker classes (styling hooks with no declarations of their own) never need
// breakpoint variants and Tailwind won't generate them.
const VARIANT_EXEMPT = new Set(["astralis:peer", "astralis:group"]);

function collectFiles(dir, acc = []) {
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) collectFiles(full, acc);
    else if (/\.(ts|tsx)$/.test(entry.name) && !/\.stories\./.test(entry.name)) acc.push(full);
  }
  return acc;
}

// 1. Every astralis:-prefixed class the source can emit (splitting multi-class literals).
const used = new Map(); // class -> first file that uses it
for (const root of SOURCES) {
  for (const file of collectFiles(root)) {
    const text = readFileSync(file, "utf8");
    for (const m of text.matchAll(/["'`]([^"'`]*astralis:[^"'`]+)["'`]/g)) {
      for (const cls of m[1].split(/\s+/)) {
        if (cls.startsWith("astralis:") && !used.has(cls)) {
          used.set(cls, relative(PKG, file).replaceAll("\\", "/"));
        }
      }
    }
  }
}

// 2. Every class selector defined in the compiled CSS (unescape \x sequences).
const css = readFileSync(join(PKG, "dist", "styles.css"), "utf8");
const defined = new Set();
for (const m of css.matchAll(/\.((?:[^\s{},.:#()[\]>+~\\'"]|\\.)+)/g)) {
  defined.add(m[1].replace(/\\(.)/g, "$1"));
}

// 3. Compare.
const missing = [];
for (const [cls, file] of used) {
  if (!defined.has(cls)) missing.push(`${cls}  (${file})`);
  else if (!VARIANT_EXEMPT.has(cls)) {
    const bare = cls.slice("astralis:".length);
    for (const bp of BREAKPOINTS) {
      if (!defined.has(`astralis:${bp}:${bare}`)) {
        missing.push(`${cls}  [${bp} variant missing]  (${file})`);
        break;
      }
    }
  }
}

if (missing.length) {
  console.error(`[astralis] CSS COVERAGE FAILURE — ${missing.length} class(es) referenced in source but absent from dist/styles.css:`);
  for (const line of missing.sort()) console.error("  " + line);
  console.error("[astralis] Every emitted class must compile. Fix the token/map, add the missing @theme namespace key, or remove the entry.");
  process.exit(1);
}

console.log(`[astralis] css coverage: ${used.size} classes x (base + ${BREAKPOINTS.length} breakpoints) all present in dist/styles.css`);
