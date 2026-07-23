/* ==========================================================================
   ASTRALIS — TOKEN SYNC GATE
   --------------------------------------------------------------------------
   Two drift checks, both of which used to be "remember to keep these in sync":

   1. tokens/semantic.css matches what token-spec.ts generates. Editing the
      generated file by hand desyncs it from the provider's runtime overrides,
      and nothing at runtime would tell you.

   2. The numeric scale tables in token-spec.ts (SPACING_SCALE, RADIUS_SCALE,
      FONT_SIZE_SCALE) match the hand-authored CSS they mirror. Those files stay
      authored because they carry non-scalable siblings (border styles, font
      weights), so this asserts the mirror instead of generating it.

   Run via `pnpm run check:tokens` (wired into build:css).
   ========================================================================== */

import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
import { loadSpec, loadPalette, semanticCss } from "./gen-semantic-css.mjs";

const __dirname = dirname(fileURLToPath(import.meta.url));
const TOKENS = join(__dirname, "..", "src", "theme", "tokens");

const spec = await loadSpec();
const failures = [];

/* --- 1. semantic.css is in sync ---------------------------------------- */
const onDisk = readFileSync(join(TOKENS, "semantic.css"), "utf8");
const expected = semanticCss(spec, loadPalette());
if (onDisk !== expected) {
  failures.push(
    "semantic.css is out of sync with token-spec.ts.\n" +
      "    Run `pnpm run gen:semantic` — and edit token-spec.ts, not the CSS.",
  );
}

/* --- 2. scale tables mirror the authored CSS --------------------------- */
const parseScale = (file, prefix) => {
  const css = readFileSync(join(TOKENS, file), "utf8");
  const out = {};
  const re = new RegExp(`--astralis-${prefix}-([a-z0-9\\\\.]+):\\s*([0-9.]+)rem;`, "g");
  for (const m of css.matchAll(re)) out[m[1].replace("\\", "")] = parseFloat(m[2]);
  return out;
};

const compare = (label, table, actual) => {
  for (const [step, value] of Object.entries(table)) {
    if (!(step in actual)) {
      failures.push(`${label}: token-spec has "${step}" but the CSS does not.`);
    } else if (Math.abs(actual[step] - value) > 1e-9) {
      failures.push(`${label}: "${step}" is ${value} in token-spec but ${actual[step]} in CSS.`);
    }
  }
  for (const step of Object.keys(actual)) {
    if (!(step in table)) failures.push(`${label}: CSS has "${step}" but token-spec does not.`);
  }
};

const parseMs = (file, prefix) => {
  const css = readFileSync(join(TOKENS, file), "utf8");
  const out = {};
  const re = new RegExp(`--astralis-${prefix}-([a-z]+):\\s*([0-9.]+)ms;`, "g");
  for (const m of css.matchAll(re)) out[m[1]] = parseFloat(m[2]);
  return out;
};

compare("DURATION_SCALE", spec.DURATION_SCALE, parseMs("animation.css", "duration"));
compare("SPACING_SCALE", spec.SPACING_SCALE, parseScale("spacing.css", "spacing"));
compare("FONT_SIZE_SCALE", spec.FONT_SIZE_SCALE, parseScale("typography.css", "font-size"));
// Radius: "none" (0) and "full" (9999px) aren't rem values, so they're absent
// from the parsed set by construction and correctly absent from the table.
compare("RADIUS_SCALE", spec.RADIUS_SCALE, parseScale("border.css", "border-radius"));

/* --- 3. SCALE_GROUPS aliases match the @theme block --------------------- */
/*
 * The utilities read the prefixed Tailwind namespace, not the source token, and
 * that alias is baked at :root — so an alias this table gets wrong makes the
 * corresponding seed field a silent no-op. Assert every group against the real
 * @theme mapping in tailwind-entry.css.
 */
const entry = readFileSync(join(__dirname, "..", "src", "tailwind-entry.css"), "utf8");
const themeMap = new Map(); // tailwind name -> astralis source name
for (const m of entry.matchAll(/^\s*--([a-z0-9-]+):\s*var\(--astralis-([a-z0-9\\./-]+)\);/gim)) {
  themeMap.set(m[1], m[2].replace(/\\/g, ""));
}

for (const [key, group] of Object.entries(spec.SCALE_GROUPS)) {
  const table = {
    spacing: spec.SPACING_SCALE,
    radius: spec.RADIUS_SCALE,
    fontSize: spec.FONT_SIZE_SCALE,
    duration: spec.DURATION_SCALE,
  }[key];
  const step = Object.keys(table)[0];
  // Tailwind writes fractional steps with a dash: --spacing-0-5.
  const twName = `${group.alias ?? group.source}-${step.replace(".", "-")}`;
  const expected = `${group.source}-${step}`;
  const actual = themeMap.get(twName);
  if (actual === undefined) {
    failures.push(
      `SCALE_GROUPS.${key}: @theme has no "--${twName}" — the alias is wrong, ` +
        `so scaling this group would silently do nothing.`,
    );
  } else if (actual !== expected) {
    failures.push(
      `SCALE_GROUPS.${key}: @theme maps --${twName} to --astralis-${actual}, expected --astralis-${expected}.`,
    );
  }
}

if (failures.length) {
  console.error("\n✗ token sync check failed:\n");
  for (const f of failures) console.error(`  - ${f}`);
  console.error("");
  process.exit(1);
}
console.log("✓ tokens in sync (semantic.css + scale tables)");
