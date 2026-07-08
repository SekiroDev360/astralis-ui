/* ==========================================================================
   ASTRALIS — RESPONSIVE SAFELIST GENERATOR
   --------------------------------------------------------------------------
   The library ships a precompiled styles.css (consumers don't run Tailwind),
   so every class a component can emit at runtime must exist at build time.

   The responsive engine builds breakpoint-prefixed classes dynamically
   (e.g. "astralis:md:p-4"), which Tailwind's source scanner can't see. This
   script reads the RESPONSIVE token scope (src/const maps + the *Map blocks
   in *.styles.ts — the only classes the engine can prefix; see
   token-scope.mjs) and emits a "@source inline(...)" partial that
   force-generates the sm/md/lg/xl variant of each. Run before the Tailwind
   build — zero manual drift; the coverage gate verifies the result.
   ========================================================================== */

import { writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
import { collectResponsiveTokens } from "./token-scope.mjs";

const __dirname = dirname(fileURLToPath(import.meta.url));
const BREAKPOINTS = ["sm", "md", "lg", "xl"];
const PREFIX = "astralis:";

const utils = [...collectResponsiveTokens()].sort();
const bpGroup = `{${BREAKPOINTS.join(",")}}`;

const lines = [
  "/* ==========================================================================",
  "   AUTO-GENERATED — DO NOT EDIT BY HAND",
  "   Source: scripts/gen-responsive-safelist.mjs",
  "   Force-generates sm/md/lg/xl variants for every RESPONSIVE design-token",
  "   utility (const maps + *Map style blocks) so the runtime responsive",
  "   engine always has matching CSS.",
  "   ========================================================================== */",
  "",
  ...utils.map((util) => `@source inline("${PREFIX}${bpGroup}:${util}");`),
  "",
];

const outFile = join(__dirname, "..", "src", "_responsive-safelist.css");
writeFileSync(outFile, lines.join("\n"));

console.log(
  `[astralis] responsive safelist: ${utils.length} utilities x ${BREAKPOINTS.length} breakpoints -> ${outFile}`,
);
