import { generateThemeTokens } from "astralis-ui/theme-math";
import { themeCss, isEmptySeed, parseThemeSeed, type ThemeSeed } from "astralis-ui/serialize";

/**
 * The theme builder's pure logic.
 *
 * All derivation — colour ramps, semantic re-declaration, numeric scales, the
 * Tailwind-alias handling — lives in astralis-ui. This file holds only what is
 * genuinely the docs' business: the preset lists the UI offers, and the one
 * place the builder legitimately differs from a consumer (preview fonts).
 *
 * It used to carry its own copies of the ramp tables, the rem helper, and a
 * hand-rolled alias workaround. Those are gone: the library owns them now, so
 * the canvas and the exported file cannot drift from <AstralisProvider>.
 */

/* ------------------------------------------------------------------ */
/* State                                                               */
/* ------------------------------------------------------------------ */

/** A font the canvas and the export disagree about — see BuilderState. */
export interface FontSetting {
  /** What the canvas renders with (may lean on fonts the docs site loads). */
  preview: string;
  /** The honest stack written into the exported file. */
  export: string;
}

export type SeedFontField = "fontHeading" | "fontBody" | "fontMono";

export interface BuilderState {
  /** The real theme. This is exactly what a consumer would pass or export. */
  seed: ThemeSeed;
  /**
   * Docs-only overlay. The docs site already loads Inter and Space Grotesk as
   * CSS vars, so the canvas can preview them without a network request — but
   * the exported file must name a stack the consumer's app can actually load.
   * Keeping this beside the seed rather than inside it means the seed stays a
   * truthful consumer artifact.
   */
  previewFonts: Partial<Record<SeedFontField, string>>;
}

export const DEFAULT_STATE: BuilderState = { seed: {}, previewFonts: {} };

/** True while everything is at the library defaults — the landing state. */
export const isDefaultState = (state: BuilderState): boolean => isEmptySeed(state.seed);

/* ------------------------------------------------------------------ */
/* Swatches                                                            */
/* ------------------------------------------------------------------ */

export type ColorField = "brandColor" | "grayColor" | "errorColor" | "warningColor" | "successColor" | "infoColor";

export interface ColorControl {
  field: ColorField;
  label: string;
  /** Explains what the token actually drives — shown in the info popover. */
  info: string;
  /** The library's own value for this palette's 500 step, resolved from color.css. */
  defaultHex: string;
  /** Exactly four presets: with "Default" first they make five options, then the picker. */
  presets: ReadonlyArray<{ name: string; hex: string }>;
}

/**
 * Every seedable colour, in one table.
 *
 * Each seeds its OWN palette — the status colours never touch the red / orange
 * / green / blue hues they alias, so `colorScheme="orange"` stays orange
 * whatever a consumer picks for warnings.
 *
 * `defaultHex` mirrors tokens/color.css. It is shown, not applied: leaving a
 * field untouched emits nothing, which is what keeps the export minimal.
 */
export const COLOR_CONTROLS = [
  {
    field: "brandColor",
    label: "Brand",
    info: "Your accent — buttons, links, focus rings, and anything painted with colorScheme=\"brand\". Also the default accent channel, so most components follow it.",
    defaultHex: "#eab308",
    presets: [
      { name: "Violet", hex: "#8b5cf6" },
      { name: "Blue", hex: "#3b82f6" },
      { name: "Emerald", hex: "#10b981" },
      { name: "Rose", hex: "#f43f5e" },
    ],
  },
  {
    field: "grayColor",
    label: "Neutral",
    info: "The largest surface in your UI: every card background, border and line of body text resolves through it. White and black are the same ramp's endpoints, so they take the same tint and the page follows the neutral instead of staying cool.",
    defaultHex: "#71717a",
    presets: [
      { name: "Slate", hex: "#64748b" },
      { name: "Cool", hex: "#6b7280" },
      { name: "Warm", hex: "#7a7168" },
      { name: "Stone", hex: "#78716c" },
    ],
  },
  {
    field: "errorColor",
    label: "Error",
    info: "Destructive and failure states — error alerts, invalid fields, danger buttons. Seeds its own palette; the red hue is untouched.",
    defaultHex: "#ef4444",
    presets: [
      { name: "Crimson", hex: "#dc2626" },
      { name: "Brick", hex: "#b91c1c" },
      { name: "Rose", hex: "#e11d48" },
      { name: "Ruby", hex: "#9f1239" },
    ],
  },
  {
    field: "warningColor",
    label: "Warning",
    info: "Caution states — warning alerts and confirmations that need a second look. Seeds its own palette; the orange hue is untouched.",
    defaultHex: "#f97316",
    presets: [
      { name: "Amber", hex: "#f59e0b" },
      { name: "Gold", hex: "#eab308" },
      { name: "Tangerine", hex: "#ea580c" },
      { name: "Clay", hex: "#c2410c" },
    ],
  },
  {
    field: "successColor",
    label: "Success",
    info: "Confirmation states — success alerts, completed steps, positive badges. Seeds its own palette; the green hue is untouched.",
    defaultHex: "#22c55e",
    presets: [
      { name: "Emerald", hex: "#10b981" },
      { name: "Forest", hex: "#16a34a" },
      { name: "Teal", hex: "#14b8a6" },
      { name: "Moss", hex: "#4d7c0f" },
    ],
  },
  {
    field: "infoColor",
    label: "Info",
    info: "Informational states — neutral notices and hints that carry no urgency. Seeds its own palette; the blue hue is untouched.",
    defaultHex: "#3b82f6",
    presets: [
      { name: "Azure", hex: "#2563eb" },
      { name: "Sky", hex: "#0ea5e9" },
      { name: "Indigo", hex: "#4f46e5" },
      { name: "Cyan", hex: "#06b6d4" },
    ],
  },
] as const satisfies ReadonlyArray<ColorControl>;

/* ------------------------------------------------------------------ */
/* Presets                                                             */
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
/* Derivation — both sides go through the library                      */
/* ------------------------------------------------------------------ */

/** Applies a FontSetting to both halves of the state, or clears the field. */
export function withFont(
  state: BuilderState,
  field: SeedFontField,
  setting: FontSetting | null,
): BuilderState {
  const seed = { ...state.seed };
  const previewFonts = { ...state.previewFonts };
  if (setting) {
    seed[field] = setting.export;
    previewFonts[field] = setting.preview;
  } else {
    delete seed[field];
    delete previewFonts[field];
  }
  return { seed, previewFonts };
}

/**
 * Everything the canvas needs as inline style vars.
 *
 * `forCss` stays false: these go on a DOM node via React's style prop, where
 * fractional token names must NOT carry the stylesheet's backslash escape.
 */
export function previewVars(state: BuilderState, resolvedTheme: "light" | "dark"): Record<string, string> {
  return generateThemeTokens({ ...state.seed, ...state.previewFonts }, resolvedTheme);
}

/**
 * The one artifact the builder produces: a stylesheet overriding only what the
 * user changed, with the honest font stacks. Empty while at the defaults.
 */
export function cssExport(state: BuilderState): string {
  const usesCustomFont = Boolean(state.seed.fontHeading ?? state.seed.fontBody ?? state.seed.fontMono);
  return themeCss(state.seed, {
    banner: [
      "/* astralis-theme.css — generated by the Astralis theme builder.",
      ' * Import AFTER "astralis-ui/styles.css" so these overrides win.',
      usesCustomFont ? " * Custom fonts must be loaded by your app (next/font or a <link>)." : null,
      " * Runtime equivalent: <AstralisProvider tokens={…}> — same math.",
      " */",
    ]
      .filter((line): line is string => line !== null)
      .join("\n"),
  });
}

/** The seed as JSON, for pasting straight into <AstralisProvider tokens={…}>. */
export const jsonExport = (state: BuilderState): string =>
  isEmptySeed(state.seed) ? "" : JSON.stringify(state.seed, null, 2);

/* ------------------------------------------------------------------ */
/* Persistence + sharing                                               */
/* ------------------------------------------------------------------ */

export const STORAGE_KEY = "astralis-theme-builder";
export const URL_PARAM = "t";

/**
 * A seed as a URL-safe string. base64 keeps the link short; encodeURIComponent
 * runs first so a non-Latin1 character in a font stack cannot break btoa.
 */
export function encodeSeed(seed: ThemeSeed): string {
  return btoa(encodeURIComponent(JSON.stringify(seed)));
}

/** Inverse of encodeSeed. Returns {} for anything malformed. */
export function decodeSeed(encoded: string): ThemeSeed {
  try {
    return parseThemeSeed(decodeURIComponent(atob(encoded)));
  } catch {
    return {};
  }
}

