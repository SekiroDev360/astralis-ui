import { generateBrandTokens } from "astralis-ui/color-math";

/**
 * The theme builder's pure logic. Every control edits real token values;
 * the output is one copy-ready stylesheet. Color derivation comes from
 * astralis-ui/color-math — the same function the runtime provider and the
 * CLI `theme` command use, so the canvas and the exported file always agree.
 *
 * Two variable layers matter here (see the radius/text/duration aliases):
 * consumers override the SOURCE tokens at :root (--astralis-border-radius-*,
 * --astralis-font-size-*, --astralis-duration-*) and Tailwind's emitted theme
 * vars re-resolve there — but the canvas applies vars to a SUBTREE, where the
 * emitted names (--astralis-radius-*, --astralis-text-*,
 * --astralis-transition-duration-*) are already baked and must be set too.
 * Spacing, fonts and colors reference source tokens directly — no aliases.
 */

export interface FontSetting {
  /** What the canvas renders with (may lean on fonts the docs site loads). */
  preview: string;
  /** The honest stack written into the exported file. */
  export: string;
}

export interface ThemeState {
  /** null = the library's own brand palette (no override). */
  brandColor: string | null;
  /** Multipliers on the library ramps; 1 = library default (no override). */
  radiusScale: number;
  spacingScale: number;
  fontScale: number;
  motionScale: number;
  headingFont: FontSetting | null;
  bodyFont: FontSetting | null;
}

/** Everything at the library defaults — the state a visitor lands on. */
export const DEFAULT_STATE: ThemeState = {
  brandColor: null,
  radiusScale: 1,
  spacingScale: 1,
  fontScale: 1,
  motionScale: 1,
  headingFont: null,
  bodyFont: null,
};

export function isDefaultState(state: ThemeState): boolean {
  return (
    state.brandColor === null &&
    state.radiusScale === 1 &&
    state.spacingScale === 1 &&
    state.fontScale === 1 &&
    state.motionScale === 1 &&
    state.headingFont === null &&
    state.bodyFont === null
  );
}

export const BRAND_SWATCHES = [
  { name: "Violet", hex: "#8b5cf6" },
  { name: "Blue", hex: "#3b82f6" },
  { name: "Emerald", hex: "#10b981" },
  { name: "Rose", hex: "#f43f5e" },
  { name: "Amber", hex: "#f59e0b" },
  { name: "Cyan", hex: "#06b6d4" },
] as const;

/* ------------------------------------------------------------------ */
/* Library default ramps (mirrors the token CSS)                       */
/* ------------------------------------------------------------------ */

const RADIUS_RAMP: Record<string, number> = {
  "2xs": 0.0625, xs: 0.125, sm: 0.25, md: 0.375, lg: 0.5,
  xl: 0.75, "2xl": 1, "3xl": 1.5, "4xl": 2,
};

// Spacing step N = N × 0.25rem (spacing.css). Half steps use dotted names.
const SPACING_STEPS = [
  0.5, 1, 1.5, 2, 2.5, 3, 3.5, 4, 5, 6, 7, 8, 9, 10, 11, 12,
  14, 16, 20, 24, 28, 32, 36, 40, 44, 48, 52, 56, 60, 64, 72, 80, 96,
];

const FONT_SIZE_RAMP: Record<string, number> = {
  "3xs": 0.5, "2xs": 0.625, xs: 0.75, sm: 0.875, md: 1, lg: 1.125,
  xl: 1.25, "2xl": 1.5, "3xl": 1.875, "4xl": 2.25, "5xl": 3,
  "6xl": 3.75, "7xl": 4.5, "8xl": 6, "9xl": 8,
};

const DURATION_RAMP: Record<string, number> = {
  fastest: 50, faster: 100, fast: 150, moderate: 200,
  slow: 300, slower: 400, slowest: 500,
};

/* ------------------------------------------------------------------ */
/* Presets (each is just a value the custom controls can also reach)   */
/* ------------------------------------------------------------------ */

// Default always comes first (and is the landing selection).
export const RADIUS_PRESETS = [
  { label: "Default", value: 1 },
  { label: "Sharp", value: 0 },
  { label: "Compact", value: 0.5 },
  { label: "Round", value: 1.75 },
  { label: "Pill", value: 3 },
] as const;

export const SPACING_PRESETS = [
  { label: "Default", value: 1 },
  { label: "Compact", value: 0.875 },
  { label: "Relaxed", value: 1.125 },
] as const;

export const FONT_SCALE_PRESETS = [
  { label: "Default", value: 1 },
  { label: "Small", value: 0.9375 },
  { label: "Large", value: 1.0625 },
] as const;

export const MOTION_PRESETS = [
  { label: "Default", value: 1 },
  { label: "Instant", value: 0 },
  { label: "Snappy", value: 0.6 },
  { label: "Calm", value: 1.6 },
] as const;

export const FONT_PRESETS: Array<{
  label: string;
  heading: FontSetting | null;
  body: FontSetting | null;
}> = [
  { label: "System", heading: null, body: null },
  {
    label: "Inter",
    heading: { preview: "var(--font-inter)", export: '"Inter", ui-sans-serif, system-ui, sans-serif' },
    body: { preview: "var(--font-inter)", export: '"Inter", ui-sans-serif, system-ui, sans-serif' },
  },
  {
    label: "Grotesk headings",
    heading: { preview: "var(--font-grotesk)", export: '"Space Grotesk", ui-sans-serif, system-ui, sans-serif' },
    body: null,
  },
  {
    label: "Editorial",
    heading: { preview: 'Georgia, "Times New Roman", serif', export: 'Georgia, "Times New Roman", serif' },
    body: null,
  },
];

/* ------------------------------------------------------------------ */
/* Token math                                                          */
/* ------------------------------------------------------------------ */

const rem = (n: number) => `${+n.toFixed(4)}rem`;

/**
 * The SOURCE-token overrides for the current state — exactly what goes in
 * the exported :root block. `fontMode` picks preview vs export font stacks.
 */
export function sourceOverrides(state: ThemeState, fontMode: "preview" | "export"): Record<string, string> {
  const vars: Record<string, string> = {};

  if (state.radiusScale !== 1) {
    for (const [step, base] of Object.entries(RADIUS_RAMP)) {
      vars[`--astralis-border-radius-${step}`] = state.radiusScale === 0 ? "0" : rem(base * state.radiusScale);
    }
  }
  if (state.spacingScale !== 1) {
    vars["--astralis-spacing"] = rem(0.25 * state.spacingScale);
    for (const step of SPACING_STEPS) {
      vars[`--astralis-spacing-${step}`] = rem(step * 0.25 * state.spacingScale);
    }
  }
  if (state.fontScale !== 1) {
    for (const [step, base] of Object.entries(FONT_SIZE_RAMP)) {
      vars[`--astralis-font-size-${step}`] = rem(base * state.fontScale);
    }
  }
  if (state.motionScale !== 1) {
    for (const [step, base] of Object.entries(DURATION_RAMP)) {
      vars[`--astralis-duration-${step}`] = `${Math.round(base * state.motionScale)}ms`;
    }
  }
  const heading = state.headingFont?.[fontMode];
  const body = state.bodyFont?.[fontMode];
  if (heading) vars["--astralis-font-heading"] = heading;
  if (body) vars["--astralis-font-body"] = body;

  return vars;
}

/** Everything the canvas needs as inline vars — source names PLUS the emitted aliases. */
export function previewVars(state: ThemeState, resolvedTheme: "light" | "dark"): Record<string, string> {
  const brand = state.brandColor ? generateBrandTokens(state.brandColor, resolvedTheme) : {};
  const source = sourceOverrides(state, "preview");
  const aliases: Record<string, string> = {};
  for (const [name, value] of Object.entries(source)) {
    if (name.startsWith("--astralis-border-radius-")) {
      aliases[name.replace("--astralis-border-radius-", "--astralis-radius-")] = value;
    } else if (name.startsWith("--astralis-font-size-")) {
      aliases[name.replace("--astralis-font-size-", "--astralis-text-")] = value;
    } else if (name.startsWith("--astralis-duration-")) {
      aliases[name.replace("--astralis-duration-", "--astralis-transition-duration-")] = value;
    }
  }
  return { ...brand, ...source, ...aliases };
}

/* ------------------------------------------------------------------ */
/* The exported file                                                   */
/* ------------------------------------------------------------------ */

const serialize = (vars: Record<string, string>) =>
  Object.entries(vars)
    // Dots in half-step names must be escaped in stylesheet property names.
    .map(([name, value]) => `  ${name.replace(/\./g, "\\.")}: ${value};`)
    .join("\n");

/**
 * The one artifact the builder produces: a stylesheet overriding ONLY what
 * the user changed. Empty string while everything is at the library defaults.
 */
export function cssExport(state: ThemeState): string {
  if (isDefaultState(state)) return "";
  const overrides = sourceOverrides(state, "export");
  const usesCustomFont = Boolean(state.headingFont || state.bodyFont);

  const parts = [
    `/* astralis-theme.css — generated by the Astralis theme builder.`,
    ` * Import AFTER "astralis-ui/styles.css" so these overrides win.`,
    usesCustomFont ? ` * Custom fonts must be loaded by your app (next/font or a <link>).` : null,
    state.brandColor
      ? ` * Same color math as <AstralisProvider tokens={{ brandColor: "${state.brandColor}" }}>. */`
      : ` */`,
  ].filter((part): part is string => part !== null);

  const rootBody = [
    state.brandColor ? serialize(generateBrandTokens(state.brandColor, "light")) : null,
    Object.keys(overrides).length > 0 ? serialize(overrides) : null,
  ].filter((part): part is string => part !== null);
  parts.push("", ":root {", rootBody.join("\n\n"), "}");

  if (state.brandColor) {
    parts.push("", ".astralis-dark {", serialize(generateBrandTokens(state.brandColor, "dark")), "}");
  }
  parts.push("");
  return parts.join("\n");
}
