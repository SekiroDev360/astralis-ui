/**
 * CSSProperties-typed wrappers around the theme math.
 *
 * The OKLCH ramp/role math lives in ./theme-math (React-free — shared with
 * astralis-cli's `theme` command via the "astralis-ui/color-math" subpath).
 * These wrappers keep the library's public API returning CSSProperties, so a
 * caller can spread the result straight into a `style` prop.
 *
 * They sit here rather than in provider.tsx so that file exports only the
 * AstralisProvider component (see the note in ./theme-context).
 */

import type { CSSProperties } from "react";
import {
  generateBrandShades as brandShadeVars,
  generateBrandTokens as brandTokenVars,
  generateThemeTokens as themeTokenVars,
} from "./theme-math";
import type { ThemeSeed } from "./token-spec";

/**
 * Runtime CSS variables for the 10 brand shades, injected as inline styles on
 * the provider div, overriding the CSS defaults in semantic.css.
 */
export function generateBrandShades(brandColor: string | undefined): CSSProperties {
  return brandShadeVars(brandColor) as CSSProperties;
}

/** Shades PLUS the brand/accent ROLE tokens, per theme (see theme-math.ts). */
export function generateBrandTokens(
  brandColor: string | undefined,
  mode: "light" | "dark",
): CSSProperties {
  return brandTokenVars(brandColor, mode) as CSSProperties;
}

/**
 * Every variable a full seed implies — colors, typefaces and numeric scales.
 * Superset of generateBrandTokens, which stays exported for callers that only
 * ever needed the brand ramp.
 */
export function generateThemeTokens(
  seed: ThemeSeed | undefined,
  mode: "light" | "dark",
): CSSProperties {
  return themeTokenVars(seed, mode) as CSSProperties;
}
