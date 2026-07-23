/**
 * Hand-authored declarations for the "astralis-ui/serialize" subpath.
 * The build rolls all other types into dist/index.d.ts; this small surface is
 * kept by hand so Node consumers (astralis-cli) get types without pulling in
 * the React entry. Update it if serialize.ts's exports change.
 */

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

export interface SeedIssue {
  field: string;
  message: string;
}

export interface ThemeCssOptions {
  banner?: string;
}

export declare function validateSeed(seed: ThemeSeed): SeedIssue[];

export declare function isEmptySeed(seed: ThemeSeed | undefined): boolean;

export declare function themeCss(seed: ThemeSeed | undefined, options?: ThemeCssOptions): string;

export declare function parseThemeCss(css: string): ThemeSeed;

export declare function parseThemeSeed(input: string): ThemeSeed;
