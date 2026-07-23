/* ==========================================================================
   ASTRALIS — SEMANTIC TOKEN GENERATOR
   --------------------------------------------------------------------------
   Emits src/theme/tokens/semantic.css from the spec in src/theme/token-spec.ts.

   Why generated: the light/dark role formulas used to exist twice — once as
   hand-written CSS here, once as a ternary in theme-math.ts that the provider
   uses for runtime overrides. Nothing kept them in sync, and the CSS copy was
   only correct because the default brand happens to be yellow. Now there is
   one spec, and both consumers derive from it.

   Run via `pnpm run gen:semantic` (wired into the css build scripts).
   Verify with `node scripts/check-semantic-css.mjs`.
   ========================================================================== */

import { mkdtempSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { fileURLToPath, pathToFileURL } from "node:url";
import { dirname, join } from "node:path";
import { tmpdir } from "node:os";
import { build } from "esbuild";

const __dirname = dirname(fileURLToPath(import.meta.url));
const SRC = join(__dirname, "..", "src", "theme");
const OUT = join(SRC, "tokens", "semantic.css");

/**
 * token-spec.ts / theme-math.ts are TypeScript; bundle them to ESM so plain
 * Node can import them. Both are dependency-free by design, so this is a
 * transform, not a real build.
 */
export async function loadSpec() {
  const dir = mkdtempSync(join(tmpdir(), "astralis-spec-"));
  try {
    const load = async (name) => {
      const outfile = join(dir, `${name}.mjs`);
      await build({
        entryPoints: [join(SRC, `${name}.ts`)],
        bundle: true, format: "esm", outfile, logLevel: "error",
      });
      return import(pathToFileURL(outfile).href);
    };
    const [spec, math] = await Promise.all([load("token-spec"), load("theme-math")]);
    return { ...spec, contrastOn: math.contrastOn };
  } finally {
    rmSync(dir, { recursive: true, force: true });
  }
}

/**
 * The shipped primitive palette, parsed out of tokens/color.css so the
 * generator resolves "auto" against the colors that actually ship. Follows one
 * level of var() indirection — brand-500 aliases yellow-500 by default.
 */
export function loadPalette() {
  const css = readFileSync(join(SRC, "tokens", "color.css"), "utf8");
  const raw = {};
  for (const m of css.matchAll(/--astralis-color-([a-z0-9-]+):\s*([^;]+);/g)) {
    raw[m[1]] = m[2].trim();
  }
  const resolve = (v, depth = 0) => {
    const alias = /^var\(--astralis-color-([a-z0-9-]+)\)$/.exec(v);
    if (!alias || depth > 4) return v;
    return resolve(raw[alias[1]] ?? v, depth + 1);
  };
  return Object.fromEntries(Object.entries(raw).map(([k, v]) => [k, resolve(v)]));
}

const PAD = 36; // aligns the value column, matching the previous hand-authored file

const decl = (name, ref) =>
  `  ${`--astralis-color-${name}:`.padEnd(PAD)} var(--astralis-color-${ref});`;

function block(spec, palette, mode) {
  const { HUES, ROLES, GLOBAL_SEMANTICS, roleTargets, roleRef, contrastOn } = spec;
  const i = mode === "light" ? 0 : 1;

  /**
   * Bake an "auto" contrast down to a flat white/black reference, using the
   * hue's solid as it ships. At runtime the provider recomputes this against
   * the user's brand color — same rule, different input.
   */
  const bake = (hue, targets, role) => {
    const target = targets[role];
    if (target !== "auto") return target;
    // targets is already this mode's recipe, so targets.solid is the right step
    // (warning's solid is 600 in light but 500 in dark).
    const solid = palette[roleRef(hue, targets.solid)] ?? "#000000";
    return contrastOn(solid) === "#000000" ? "black" : "white";
  };
  const lines = [];

  const group = (label, prefix) => {
    lines.push(`  /* ---- GLOBAL: ${label} ---- */`);
    for (const [name, refs] of Object.entries(GLOBAL_SEMANTICS)) {
      if (name.startsWith(prefix)) lines.push(decl(name, refs[i]));
    }
    lines.push("");
  };

  group("Surfaces (Backgrounds)", "surface-");
  group("Labels (Text / Foreground)", "label-");
  group("Strokes (Borders)", "stroke-");

  lines.push(`  /* ---- PER-PALETTE ROLES (${mode}) ---- */`);
  for (const hue of HUES) {
    const targets = roleTargets(hue, mode);
    for (const role of ROLES) lines.push(decl(`${hue}-${role}`, roleRef(hue, bake(hue, targets, role))));
    lines.push("");
  }
  while (lines.at(-1) === "") lines.pop();
  return lines.join("\n");
}

export function semanticCss(spec, palette) {
  return [
    "/* ==========================================================================",
    "   AUTO-GENERATED — DO NOT EDIT BY HAND",
    "   Source: scripts/gen-semantic-css.mjs  <-  src/theme/token-spec.ts",
    "",
    "   ASTRALIS SEMANTIC DESIGN TOKENS",
    "   Two tiers:",
    "   1. GLOBAL semantics — neutral roles (surface / label / stroke), no hue.",
    "   2. PER-PALETTE roles — every hue gets the same role vocabulary",
    "      (solid, contrast, label, subtle, muted, emphasized, stroke, ring),",
    "      each with a light + dark value.",
    "",
    "   To change a formula, edit token-spec.ts and regenerate — editing this",
    "   file directly desyncs it from the provider's runtime overrides.",
    "   ========================================================================== */",
    "",
    ":root {",
    block(spec, palette, "light"),
    "}",
    "",
    "/* ============================================",
    "   DARK MODE",
    "   ============================================ */",
    ".astralis-dark {",
    block(spec, palette, "dark"),
    "}",
    "",
  ].join("\n");
}

if (import.meta.url === pathToFileURL(process.argv[1]).href) {
  writeFileSync(OUT, semanticCss(await loadSpec(), loadPalette()));
  console.log(`✓ generated ${OUT}`);
}
