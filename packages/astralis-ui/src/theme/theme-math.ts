/**
 * The theme math, dependency- and React-free so it can run anywhere: the
 * AstralisProvider consumes it at runtime, astralis-cli's `theme` command
 * imports it in Node (via the "astralis-ui/theme-math" subpath) to generate
 * static theme CSS, and scripts/gen-semantic-css.mjs uses it at build time —
 * one source of truth for the ramps.
 *
 * The ROLE formulas this applies live in ./token-spec, which also generates
 * tokens/semantic.css. Nothing here restates them.
 *
 * NAME: this was color-math.ts until it grew past colour — generateThemeTokens
 * also emits typefaces and the spacing/radius/font-size/duration scales. The
 * "astralis-ui/color-math" subpath still resolves here, unchanged, because it
 * shipped in 0.1.3; it is deprecated and can be dropped at the next major.
 */

import {
  GLOBAL_SEMANTICS, ROLES, SPACING_SCALE, RADIUS_SCALE, FONT_SIZE_SCALE,
  DURATION_SCALE, SCALE_GROUPS, roleTargets, scaleVarName,
} from "./token-spec";
import type { Hue, Mode, RoleTarget, ScaleGroup, ThemeSeed } from "./token-spec";

/** Converts shorthand or full hex color entries into raw RGB components. */
export function hexToRgb(hex: string) {
  const cleanHex = hex.replace("#", "");
  const shorthandRegex = /^([a-f\d])([a-f\d])([a-f\d])$/i;
  const fullHex = cleanHex.replace(shorthandRegex, (_, r, g, b) => r + r + g + g + b + b);
  const result = /^([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(fullHex);

  return result ? { r: parseInt(result[1], 16), g: parseInt(result[2], 16), b: parseInt(result[3], 16) } : null;
}

type BrandStep = 50 | 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900 | 950;

/* --------------------------------------------------------------------------
   OKLCH color math (Björn Ottosson's OKLab, dependency-free)
   Perceptual ramps: vary Lightness, taper Chroma toward the extremes, hold
   Hue — the recipe Tailwind v4's own palette uses. Plain RGB blending washed
   out saturated hues at the 50/900 ends; this keeps a violet violet.
   -------------------------------------------------------------------------- */

type Oklch = { l: number; c: number; h: number };

const srgbToLinear = (u: number) => (u <= 0.04045 ? u / 12.92 : Math.pow((u + 0.055) / 1.055, 2.4));
const linearToSrgb = (u: number) => (u <= 0.0031308 ? 12.92 * u : 1.055 * Math.pow(u, 1 / 2.4) - 0.055);

export function rgbToOklch(r8: number, g8: number, b8: number): Oklch {
  const r = srgbToLinear(r8 / 255), g = srgbToLinear(g8 / 255), b = srgbToLinear(b8 / 255);
  const l = Math.cbrt(0.4122214708 * r + 0.5363325363 * g + 0.0514459929 * b);
  const m = Math.cbrt(0.2119034982 * r + 0.6806995451 * g + 0.1073969566 * b);
  const s = Math.cbrt(0.0883024619 * r + 0.2817188376 * g + 0.6299787005 * b);
  const L = 0.2104542553 * l + 0.793617785 * m - 0.0040720468 * s;
  const a = 1.9779984951 * l - 2.428592205 * m + 0.4505937099 * s;
  const bb = 0.0259040371 * l + 0.7827717662 * m - 0.808675766 * s;
  return { l: L, c: Math.hypot(a, bb), h: Math.atan2(bb, a) };
}

/** OKLCH → sRGB channels in [0,1]; may be out of gamut (caller clamps chroma). */
function oklchToRgb({ l: L, c, h }: Oklch): [number, number, number] {
  const a = c * Math.cos(h), bb = c * Math.sin(h);
  const l = (L + 0.3963377774 * a + 0.2158037573 * bb) ** 3;
  const m = (L - 0.1055613458 * a - 0.0638541728 * bb) ** 3;
  const s = (L - 0.0894841775 * a - 1.291485548 * bb) ** 3;
  return [
    linearToSrgb(4.0767416621 * l - 3.3077115913 * m + 0.2309699292 * s),
    linearToSrgb(-1.2684380046 * l + 2.6097574011 * m - 0.3413193965 * s),
    linearToSrgb(-0.0041960863 * l - 0.7034186147 * m + 1.707614701 * s),
  ];
}

/** Render an OKLCH color as hex, binary-searching chroma down into sRGB gamut. */
function oklchToHex(target: Oklch): string {
  const inGamut = (rgb: number[]) => rgb.every((v) => v >= -0.0001 && v <= 1.0001);
  let rgb = oklchToRgb(target);
  if (!inGamut(rgb)) {
    let lo = 0, hi = target.c;
    for (let i = 0; i < 8; i++) {
      const mid = (lo + hi) / 2;
      if (inGamut(oklchToRgb({ ...target, c: mid }))) lo = mid;
      else hi = mid;
    }
    rgb = oklchToRgb({ ...target, c: lo });
  }
  return (
    "#" +
    rgb
      .map((v) => Math.round(Math.min(1, Math.max(0, v)) * 255).toString(16).padStart(2, "0"))
      .join("")
  );
}

/**
 * Computes all 11 brand shade hexes from one input color. The input IS the
 * 500 step; tints raise lightness toward paper-white and shades lower it,
 * with chroma tapered so the extremes stay clean rather than muddy.
 *
 * The 950 coefficients are calibrated against the nine shipped chromatic
 * palettes, whose authored 950 sits at a mean 0.762x the lightness of their
 * 900 — applied to this recipe's 900 factor (0.46) that gives 0.35, with
 * chroma tapering in step.
 */
function computeShades(brandColor: string): Record<BrandStep, string> | null {
  const rgb = hexToRgb(brandColor);
  if (!rgb) return null;
  const base = rgbToOklch(rgb.r, rgb.g, rgb.b);

  // [toward-white progress for tints] / [multiplier on L for shades], chroma factor
  const tint = (t: number, cf: number) => oklchToHex({ l: base.l + (0.975 - base.l) * t, c: base.c * cf, h: base.h });
  const shade = (lf: number, cf: number) => oklchToHex({ l: base.l * lf, c: base.c * cf, h: base.h });

  return {
    50:  tint(0.92, 0.22),
    100: tint(0.84, 0.38),
    200: tint(0.68, 0.60),
    300: tint(0.50, 0.82),
    400: tint(0.28, 0.95),
    500: brandColor,
    600: shade(0.86, 0.98),
    700: shade(0.72, 0.90),
    800: shade(0.58, 0.78),
    900: shade(0.46, 0.62),
    950: shade(0.35, 0.50),
  };
}

/**
 * Anchored lightness targets for a NEUTRAL ramp, read off the shipped zinc
 * palette. Neutrals can't use computeShades: that walks outward from the
 * seed's own lightness, which suits a chromatic hue but leaves a gray ramp far
 * too compressed at the light end (step 300 landed 0.108 L short in testing).
 * A neutral's job is to span the full range predictably, with the seed
 * supplying only hue and chroma — the gray's "temperature".
 */
const NEUTRAL_L: Record<NeutralStep, number> = {
  50: 0.985, 100: 0.967, 200: 0.920, 300: 0.871, 400: 0.712, 500: 0.552,
  600: 0.442, 700: 0.370, 800: 0.274, 900: 0.210, 950: 0.178,
};

/** Chroma taper — a neutral holds only a whisper of the seed's chroma. */
const NEUTRAL_C: Record<NeutralStep, number> = {
  50: 0.30, 100: 0.40, 200: 0.55, 300: 0.70, 400: 0.90, 500: 1.0,
  600: 1.0, 700: 0.95, 800: 0.85, 900: 0.75, 950: 0.65,
};

type NeutralStep = 50 | 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900 | 950;

/**
 * The 11-step neutral ramp. Unlike the brand ramp this includes 950, which
 * backs surface-panel in dark mode.
 *
 * Seeded with the shipped gray-500 this reproduces the authored ramp to within
 * 3/255 per channel on 10 of 11 steps (exact through the mid-range) — close
 * enough that a default-equivalent seed is visually identical, while a warm or
 * cool seed shifts the whole ramp coherently.
 */
function computeNeutralRamp(grayColor: string): Record<NeutralStep, string> | null {
  const rgb = hexToRgb(grayColor);
  if (!rgb) return null;
  const base = rgbToOklch(rgb.r, rgb.g, rgb.b);

  const out = {} as Record<NeutralStep, string>;
  for (const key of Object.keys(NEUTRAL_L) as unknown as NeutralStep[]) {
    const step = Number(key) as NeutralStep;
    out[step] = oklchToHex({ l: NEUTRAL_L[step], c: base.c * NEUTRAL_C[step], h: base.h });
  }
  return out;
}

/**
 * The neutral ramp's endpoints, one step beyond 50 and 950.
 *
 * Lightness is anchored like the rest of the ramp; chroma tapers hard so the
 * tint stays a whisper — #FFFDFB reads as white, not cream. The default black
 * (#09090B) is itself a tinted near-black chosen to sit with the cool zinc
 * ramp, so this generalises an existing decision rather than inventing one.
 */
export function neutralEndpoints(grayColor: string): { white: string; black: string } {
  const rgb = hexToRgb(grayColor);
  if (!rgb) return { white: FLAT.white, black: FLAT.black };
  const base = rgbToOklch(rgb.r, rgb.g, rgb.b);
  return {
    // White sits just below L 1.0 on purpose: at the very top of the gamut all
    // chroma clamps away and the result is pure #ffffff, so the tint would be
    // silently lost. 0.995 keeps it unmistakably white (no channel below 251)
    // while still carrying the neutral's temperature.
    white: oklchToHex({ l: 0.995, c: base.c * 0.25, h: base.h }),
    black: oklchToHex({ l: 0.135, c: base.c * 0.5, h: base.h }),
  };
}

/** Readable text color on a solid fill — OKLCH lightness threshold. */
export function contrastOn(hex: string): string {
  const rgb = hexToRgb(hex);
  if (!rgb) return "#ffffff";
  return rgbToOklch(rgb.r, rgb.g, rgb.b).l >= 0.66 ? "#000000" : "#ffffff";
}

/**
 * CSS variables for the 10 brand shades.
 *
 * NOTE: keys must match the primitive layer the semantic tokens read from
 * (--astralis-color-brand-*), which @theme maps to --color-brand-*.
 */
export function generateBrandShades(brandColor: string | undefined): Record<string, string> {
  if (!brandColor) return {};
  const shades = computeShades(brandColor);
  if (!shades) return { "--astralis-color-brand-500": brandColor };

  const vars: Record<string, string> = {};
  for (const [step, hex] of Object.entries(shades)) {
    vars[`--astralis-color-brand-${step}`] = hex;
  }
  return vars;
}

/**
 * Shades PLUS the brand/accent ROLE tokens, per theme.
 *
 * Overriding only the primitive shades is not enough: role tokens like
 * --astralis-color-brand-solid are declared at :root, where their var()
 * references are substituted ONCE against the default palette — descendants
 * inherit that already-resolved value, so a subtree shade override never
 * reaches components that paint with roles (i.e. nearly all of them). The
 * roles must be re-declared alongside the shades, with the same per-theme
 * formulas as semantic.css. The accent channel defaults to brand at :root
 * and is baked the same way, so it gets re-declared too.
 */
export function generateBrandTokens(
  brandColor: string | undefined,
  mode: "light" | "dark",
): Record<string, string> {
  if (!brandColor) return {};
  const shades = computeShades(brandColor);
  if (!shades) return { "--astralis-color-brand-500": brandColor };

  // Mirrors the brand role formulas in semantic.css (light / .astralis-dark).
  const roles =
    mode === "dark"
      ? { label: shades[300], subtle: shades[900], muted: shades[800], emphasized: shades[700], stroke: shades[400] }
      : { label: shades[700], subtle: shades[100], muted: shades[200], emphasized: shades[300], stroke: shades[500] };

  const role = {
    solid: shades[500],
    contrast: contrastOn(shades[500]),
    ...roles,
    ring: shades[500],
  };

  const vars: Record<string, string> = { ...generateBrandShades(brandColor) };
  for (const [name, hex] of Object.entries(role)) {
    vars[`--astralis-color-brand-${name}`] = hex;
    vars[`--astralis-color-accent-${name}`] = hex;
  }
  return vars;
}

/* ==========================================================================
   FULL SEED DERIVATION
   ========================================================================== */

/** Flat colors a role can name. Black matches the --astralis-color-black token. */
const FLAT = { white: "#FFFFFF", black: "#09090B" } as const;
type Flat = { white: string; black: string };

/** Trim float noise: 1.6800000000000002 -> "1.68". */
const rem = (n: number) => `${parseFloat(n.toFixed(4))}rem`;

type Ramps = Partial<Record<Hue, Record<string, string>>>;

/**
 * Hex for a primitive reference ("gray-100", "white") — null if not overridden.
 * `flat` carries the seed's white/black when grayColor moved them.
 */
function resolveRef(ref: string, ramps: Ramps, flat: Flat): string | null {
  if (ref === "white" || ref === "black") {
    return flat[ref] === FLAT[ref] ? null : flat[ref];
  }
  const idx = ref.lastIndexOf("-");
  const hue = ref.slice(0, idx) as Hue;
  return ramps[hue]?.[ref.slice(idx + 1)] ?? null;
}

/**
 * Hex for a resolved role target within an overridden hue.
 *
 * "auto" must resolve against the solid for THIS mode, not a fixed one —
 * warning's solid is step 600 in light but 500 in dark, so computing dark
 * contrast from the light solid can pick the wrong side of the threshold.
 */
function resolveTarget(
  hue: Hue,
  target: RoleTarget,
  ramps: Ramps,
  flat: Flat,
  mode: Mode,
): string | null {
  if (target === "white" || target === "black") return flat[target];
  if (target === "auto") {
    const solid = resolveTarget(hue, roleTargets(hue, mode).solid, ramps, flat, mode);
    return solid ? contrastOn(solid) : null;
  }
  return ramps[hue]?.[String(target)] ?? null;
}

/**
 * Every CSS variable a seed implies, for one theme mode.
 *
 * Overriding a primitive shade alone is not enough — semantic tokens are
 * declared at :root, where their var() references resolve ONCE against the
 * default palette, so descendants inherit an already-resolved value. Any
 * semantic token pointing into an overridden hue must therefore be re-declared
 * alongside it. That is what steps 2 and 3 below do, driven by the same spec
 * that generates semantic.css.
 *
 * `forCss` controls fractional scale names: a stylesheet needs
 * `--astralis-spacing-0\.5`, but style.setProperty needs the unescaped name.
 */
export function generateThemeTokens(
  seed: ThemeSeed | undefined,
  mode: Mode,
  { forCss = false }: { forCss?: boolean } = {},
): Record<string, string> {
  if (!seed) return {};
  const vars: Record<string, string> = {};
  /** White/black as this seed sees them — moved only when grayColor is set. */
  const flat: Flat = { ...FLAT };

  /*
   * 1. Primitive ramps for whichever palettes the seed overrides.
   *
   * Every chromatic seed builds its OWN palette. The status colours seed the
   * role palettes (error/warning/success/info), never the hues they alias, so
   * a yellow warningColor leaves orange-* untouched.
   */
  const ramps: Ramps = {};
  const chromatic: [keyof ThemeSeed, Hue][] = [
    ["brandColor", "brand"],
    ["errorColor", "error"],
    ["warningColor", "warning"],
    ["successColor", "success"],
    ["infoColor", "info"],
  ];
  for (const [field, palette] of chromatic) {
    const value = seed[field] as string | undefined;
    if (!value) continue;
    const ramp = computeShades(value);
    if (ramp) ramps[palette] = Object.fromEntries(Object.entries(ramp));
    else vars[`--astralis-color-${palette}-500`] = value; // unparseable: pass through
  }

  if (seed.grayColor) {
    const ramp = computeNeutralRamp(seed.grayColor);
    if (ramp) {
      ramps.gray = Object.fromEntries(Object.entries(ramp));
      /*
       * White and black are the endpoints of the same neutral ramp — black
       * already ships as #09090B rather than #000000, tinted to sit with the
       * cool zinc default. Without this a warm grayColor warms every surface
       * EXCEPT surface-base, leaving warm cards on a cool page.
       */
      const ends = neutralEndpoints(seed.grayColor);
      vars["--astralis-color-white"] = ends.white;
      vars["--astralis-color-black"] = ends.black;
      flat.white = ends.white;
      flat.black = ends.black;
    }
  }

  for (const [hue, ramp] of Object.entries(ramps)) {
    for (const [step, hex] of Object.entries(ramp)) vars[`--astralis-color-${hue}-${step}`] = hex;
  }

  // 2. Global semantics (surface / label / stroke) that point into an overridden hue.
  const i = mode === "light" ? 0 : 1;
  for (const [name, refs] of Object.entries(GLOBAL_SEMANTICS)) {
    const hex = resolveRef(refs[i], ramps, flat);
    if (hex) vars[`--astralis-color-${name}`] = hex;
  }

  // 3. Per-palette roles for the overridden hues.
  for (const hue of Object.keys(ramps) as Hue[]) {
    const targets = roleTargets(hue, mode);
    for (const role of ROLES) {
      const hex = resolveTarget(hue, targets[role], ramps, flat, mode);
      if (hex) vars[`--astralis-color-${hue}-${role}`] = hex;
    }
  }

  // 4. The accent channel defaults to brand at :root, so it is baked too.
  if (ramps.brand) {
    for (const role of ROLES) {
      const hex = vars[`--astralis-color-brand-${role}`];
      if (hex) vars[`--astralis-color-accent-${role}`] = hex;
    }
  }

  // 5. Typefaces — straight pass-through to the existing theme hooks.
  if (seed.fontHeading) vars["--astralis-font-heading"] = seed.fontHeading;
  if (seed.fontBody) vars["--astralis-font-body"] = seed.fontBody;
  if (seed.fontMono) vars["--astralis-font-mono"] = seed.fontMono;

  /*
   * 6. Numeric scales.
   *
   * Each step is written twice when the utilities read a different name than
   * the source token (see SCALE_GROUPS): the alias is baked at :root, so
   * overriding the source alone is a silent no-op. `format` differs per group
   * because durations are ms and everything else is rem.
   */
  const scale = (
    { source, alias, baseVar }: ScaleGroup,
    table: Record<string, number>,
    factor: number | undefined,
    format: (n: number) => string,
  ) => {
    if (factor === undefined || factor === 1) return;
    for (const [step, base] of Object.entries(table)) {
      const value = format(base * factor);
      vars[scaleVarName(source, step, forCss)] = value;
      if (alias) vars[scaleVarName(alias, step, forCss)] = value;
    }
    // Tailwind's fractional spacing utilities compile to calc(base * n), so the
    // base has to move with the scale or half-steps keep their default size.
    if (baseVar) vars[baseVar.name] = format(baseVar.value * factor);
  };

  scale(SCALE_GROUPS.spacing, SPACING_SCALE, seed.spacingScale, rem);
  scale(SCALE_GROUPS.radius, RADIUS_SCALE, seed.radiusScale, rem);
  scale(SCALE_GROUPS.fontSize, FONT_SIZE_SCALE, seed.fontSizeScale, rem);
  // 0 is meaningful for motion (animations off), hence no `=== 0` guard here.
  scale(SCALE_GROUPS.duration, DURATION_SCALE, seed.motionScale, (n) => `${Math.round(n)}ms`);

  return vars;
}
