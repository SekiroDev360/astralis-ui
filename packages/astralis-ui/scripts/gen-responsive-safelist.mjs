/* ==========================================================================
   ASTRALIS — RESPONSIVE SAFELIST GENERATOR
   --------------------------------------------------------------------------
   The library ships a precompiled styles.css (consumers don't run Tailwind),
   so every class a component can emit at runtime must exist at build time.

   The responsive engine builds breakpoint-prefixed classes dynamically
   (e.g. "astralis:md:p-4"), which Tailwind's source scanner can't see. This
   script reads every token map (the single source of truth) and emits a
   "@source inline(...)" partial that force-generates the sm/md/lg/xl variant
   of each utility. Run it before the Tailwind build — zero manual drift.
   ========================================================================== */

import { readFileSync, writeFileSync, readdirSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const SRC = join(__dirname, "..", "src");

const SOURCES = [
  join(SRC, "const"),
  join(SRC, "components"),
];

const BREAKPOINTS = ["sm", "md", "lg", "xl"];
const PREFIX = "astralis:";

/** Recursively collect *.ts files under a directory. */
function collectFiles(dir, acc = []) {
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) collectFiles(full, acc);
    else if (entry.name.endsWith(".ts") || entry.name.endsWith(".tsx")) acc.push(full);
  }
  return acc;
}

// Extract every unique "astralis:<util>" string literal across the token maps.
const tokens = new Set();
for (const root of SOURCES) {
  for (const file of collectFiles(root)) {
    const text = readFileSync(file, "utf8");
    // Capture whole string literals, then split: a multi-class value like
    // "astralis:h-full astralis:self-stretch astralis:border-l" must yield
    // EVERY class, not just the one touching the opening quote — anchoring
    // the regex on the quote silently dropped classes after the first space
    // and broke their responsive variants.
    const matches = text.matchAll(/["'`]([^"'`]*astralis:[^"'`]+)["'`]/g);
    for (const m of matches) {
      for (const cls of m[1].split(/\s+/)) {
        if (cls.startsWith("astralis:")) tokens.add(cls.slice("astralis:".length));
      }
    }
  }
}

const utils = [...tokens].sort();
const bpGroup = `{${BREAKPOINTS.join(",")}}`;

const lines = [
  "/* ==========================================================================",
  "   AUTO-GENERATED — DO NOT EDIT BY HAND",
  "   Source: scripts/gen-responsive-safelist.mjs",
  "   Force-generates sm/md/lg/xl variants for every design-token utility so the",
  "   runtime responsive engine always has matching CSS.",
  "   ========================================================================== */",
  "",
  ...utils.map((util) => `@source inline("${PREFIX}${bpGroup}:${util}");`),
  "",
];

const outFile = join(SRC, "_responsive-safelist.css");
writeFileSync(outFile, lines.join("\n"));

console.log(
  `[astralis] responsive safelist: ${utils.length} utilities x ${BREAKPOINTS.length} breakpoints -> ${outFile}`,
);
