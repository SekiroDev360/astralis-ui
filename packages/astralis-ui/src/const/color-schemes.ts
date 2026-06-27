/**
 * The library-wide `colorScheme` palette. Any component that paints with the
 * `accent-*` utilities can expose `colorScheme` by applying `accentClass(scheme)` —
 * the scope class that rebinds the accent channel to a real hue (see accent.css).
 *
 * Add a hue here AND a matching `.astralis-accent-{hue}` block in accent.css to
 * make it available everywhere at once.
 */
export const COLOR_SCHEMES = [
  "brand", "gray", "red", "orange", "yellow", "green", "teal", "blue", "cyan", "purple", "pink",
] as const;

export type ColorScheme = (typeof COLOR_SCHEMES)[number];

/** The accent-channel scope class for a hue, e.g. `accentClass("red") === "astralis-accent-red"`. */
export const accentClass = (scheme: ColorScheme): string => `astralis-accent-${scheme}`;
