/* ==========================================================================
   ASTRALIS — CSS COVERAGE GATE
   --------------------------------------------------------------------------
   The library ships precompiled CSS, so a class the components can emit but
   Tailwind didn't generate fails SILENTLY in the browser. This script makes
   that failure loud at build time:

   - EVERY `astralis:*` class literal in src must exist at base.
   - Classes in the RESPONSIVE scope (const maps + *Map style blocks — the
     only ones the runtime engine can breakpoint-prefix) must also exist at
     every sm/md/lg/xl variant.

   Runs as part of `build:css`; exits non-zero (failing the build) on any miss.
   ========================================================================== */

import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
import { collectAllTokens, collectResponsiveTokens } from "./token-scope.mjs";

const __dirname = dirname(fileURLToPath(import.meta.url));
const PKG = join(__dirname, "..");
const BREAKPOINTS = ["sm", "md", "lg", "xl"];

const all = collectAllTokens();
const responsive = collectResponsiveTokens();

// Every class selector defined in the compiled CSS (unescape \x sequences).
const css = readFileSync(join(PKG, "dist", "styles.css"), "utf8");
const defined = new Set();
for (const m of css.matchAll(/\.((?:[^\s{},.:#()[\]>+~\\'"]|\\.)+)/g)) {
  defined.add(m[1].replace(/\\(.)/g, "$1"));
}

const missing = [];
for (const bare of all) {
  if (!defined.has(`astralis:${bare}`)) {
    missing.push(`astralis:${bare}  [base]`);
    continue;
  }
  if (responsive.has(bare)) {
    for (const bp of BREAKPOINTS) {
      if (!defined.has(`astralis:${bp}:${bare}`)) {
        missing.push(`astralis:${bare}  [${bp} variant missing]`);
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

console.log(
  `[astralis] css coverage: ${all.size} base classes + ${responsive.size} responsive x ${BREAKPOINTS.length} breakpoints all present in dist/styles.css`,
);
