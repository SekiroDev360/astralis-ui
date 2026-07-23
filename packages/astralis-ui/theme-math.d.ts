/**
 * Hand-authored declarations for the "astralis-ui/theme-math" subpath (and its
 * deprecated "astralis-ui/color-math" alias, kept because that name shipped in
 * 0.1.3 — both resolve to this same module).
 *
 * The build rolls all other types into dist/index.d.ts, so this tiny, stable
 * surface is kept by hand — update it if theme-math.ts's exports change.
 */

export declare function hexToRgb(hex: string): { r: number; g: number; b: number } | null;

export declare function rgbToOklch(
  r8: number,
  g8: number,
  b8: number,
): { l: number; c: number; h: number };

export declare function generateBrandShades(brandColor: string | undefined): Record<string, string>;

export declare function generateBrandTokens(
  brandColor: string | undefined,
  mode: "light" | "dark",
): Record<string, string>;

export declare function contrastOn(hex: string): string;

/** Keep in step with ThemeSeed in src/theme/token-spec.ts. */
export interface ThemeSeed {
  brandColor?: string;
  grayColor?: string;
  errorColor?: string;
  warningColor?: string;
  successColor?: string;
  infoColor?: string;
  fontHeading?: string;
  fontBody?: string;
  fontMono?: string;
  radiusScale?: number;
  spacingScale?: number;
  fontSizeScale?: number;
  motionScale?: number;
}

/**
 * Every variable a seed implies. `forCss` picks the escaping: a stylesheet
 * needs `--astralis-spacing-0\.5`, style.setProperty needs it unescaped.
 */
export declare function generateThemeTokens(
  seed: ThemeSeed | undefined,
  mode: "light" | "dark",
  options?: { forCss?: boolean },
): Record<string, string>;
