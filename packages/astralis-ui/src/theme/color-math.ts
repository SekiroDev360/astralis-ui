/**
 * The brand-color math, dependency- and React-free so it can run anywhere:
 * the AstralisProvider consumes it at runtime, and astralis-cli's `theme`
 * command imports it in Node (via the "astralis-ui/color-math" subpath
 * export) to generate static theme CSS — one source of truth for the ramps.
 */

/** Converts shorthand or full hex color entries into raw RGB components. */
export function hexToRgb(hex: string) {
  const cleanHex = hex.replace("#", "");
  const shorthandRegex = /^([a-f\d])([a-f\d])([a-f\d])$/i;
  const fullHex = cleanHex.replace(shorthandRegex, (_, r, g, b) => r + r + g + g + b + b);
  const result = /^([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(fullHex);

  return result ? { r: parseInt(result[1], 16), g: parseInt(result[2], 16), b: parseInt(result[3], 16) } : null;
}

type BrandStep = 50 | 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900;

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
 * Computes all 10 brand shade hexes from one input color. The input IS the
 * 500 step; tints raise lightness toward paper-white and shades lower it,
 * with chroma tapered so the extremes stay clean rather than muddy.
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
  };
}

/** Readable text color on a solid fill — OKLCH lightness threshold. */
function contrastOn(hex: string): string {
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
