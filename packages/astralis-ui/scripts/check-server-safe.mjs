/* ==========================================================================
   ASTRALIS — SERVER-SAFE MODULE GATE
   --------------------------------------------------------------------------
   The theme core (theme-math / token-spec / serialize) is dependency- and
   React-free so it can run anywhere: Node for astralis-cli, build scripts for
   the token generator, and React Server Components for anyone decoding a theme
   during server render.

   A "use client" banner turns those modules into client references. A Server
   Component importing one then gets nothing back — and because the callers
   guard with try/catch, it fails SILENTLY. That is exactly how decoding a
   shared theme link broke: the server returned an empty seed and the UI
   quietly fell back to localStorage.

   This asserts the built output: the core ships bannerless, everything with a
   component or hook in it keeps the directive.
   ========================================================================== */

import { readFileSync, existsSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const DIST = join(__dirname, "..", "dist");

const SERVER_SAFE = ["theme/theme-math.js", "theme/token-spec.js", "theme/serialize.js"];
/** A representative client module — proves the banner is still applied at all. */
const CLIENT = ["theme/provider.js"];

const failures = [];

for (const rel of SERVER_SAFE) {
  const file = join(DIST, rel);
  if (!existsSync(file)) {
    failures.push(`${rel} is missing from dist — did the build run?`);
    continue;
  }
  const first = readFileSync(file, "utf8").split("\n", 1)[0].trim();
  if (/^["']use client["']/.test(first)) {
    failures.push(
      `${rel} ships with "use client" — it must not. A Server Component importing ` +
        `it would get a client reference and silently receive nothing.`,
    );
  }
}

for (const rel of CLIENT) {
  const file = join(DIST, rel);
  if (!existsSync(file)) continue;
  const first = readFileSync(file, "utf8").split("\n", 1)[0].trim();
  if (!/^["']use client["']/.test(first)) {
    failures.push(`${rel} is MISSING "use client" — the banner rule is too broad.`);
  }
}

if (failures.length) {
  console.error("\n✗ server-safe check failed:\n");
  for (const f of failures) console.error(`  - ${f}`);
  console.error("");
  process.exit(1);
}

console.log(
  `✓ server-safe: ${SERVER_SAFE.length} core modules ship without "use client"; client modules keep it`,
);
