/* ==========================================================================
   ASTRALIS RESPONSIVE ENGINE
   --------------------------------------------------------------------------
   A single, prefix-aware resolution layer shared by every component.

   Every style prop accepts either a scalar token value OR a responsive map:

     <Box p="4" />                         -> astralis:p-4
     <Box p={{ base: "2", md: "4" }} />    -> astralis:p-2 astralis:md:p-4

   Components keep using CVA for typing + scalar resolution + defaultVariants.
   This engine sits on top: it peels responsive objects apart, feeds the
   `base` value through CVA, and resolves every breakpoint override straight
   from the same token map CVA already uses (single source of truth).
   ========================================================================== */

/** Ordered breakpoints. `base` is the unprefixed/mobile-first value. */
export const BREAKPOINTS = ["sm", "md", "lg", "xl"] as const;

export type Breakpoint = (typeof BREAKPOINTS)[number];
export type ResponsiveKey = "base" | Breakpoint;

const BREAKPOINT_SET = new Set<string>(BREAKPOINTS);

/** A prop value: either a raw token, or a per-breakpoint map of tokens. */
export type ResponsiveProp<Value> =
  | Value
  | Partial<Record<ResponsiveKey, Value>>;

/** Wraps every key of a CVA variant-props object so each accepts responsive input. */
export type Responsive<T> = {
  [K in keyof T]: ResponsiveProp<NonNullable<T[K]>>;
};

/** A token -> className map, e.g. { "4": "astralis:p-4" }. */
type TokenMap = Record<string, string>;

/**
 * Injects a breakpoint variant *inside* the astralis prefix so the output is a
 * valid Tailwind-v4 prefixed class: "astralis:p-4" + "md" -> "astralis:md:p-4".
 * Handles space-separated multi-class values and unprefixed fallbacks.
 */
function withBreakpoint(className: string, bp: Breakpoint): string {
  return className
    .split(" ")
    .filter(Boolean)
    .map((token) => {
      const colon = token.indexOf(":");
      // Unprefixed (shouldn't happen with our maps, but stay safe)
      if (colon === -1) return `${bp}:${token}`;
      // Insert the breakpoint immediately after the "astralis:" prefix
      return `${token.slice(0, colon + 1)}${bp}:${token.slice(colon + 1)}`;
    })
    .join(" ");
}

/** True when a prop value is a responsive map rather than a scalar token. */
function isResponsiveObject(
  value: unknown,
): value is Partial<Record<ResponsiveKey, string>> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

export interface ResolveStylePropsConfig {
  /** Token maps keyed by prop name — typically the same object passed to CVA `variants`. */
  maps: Record<string, TokenMap>;
  /** The CVA function for this layer; resolves scalar base values + defaultVariants. */
  variants: (props: Record<string, unknown>) => string;
}

/**
 * Resolves a bag of (possibly responsive) style props into a single className string.
 *
 * - Scalar values are forwarded to CVA untouched (preserving defaultVariants).
 * - Responsive objects are split: `base` is resolved from the token map, and each
 *   breakpoint override is resolved + prefixed. CVA still supplies the default for
 *   any prop given without a `base`, so mobile-first defaults are never lost.
 */
export function resolveStyleProps(
  props: Record<string, unknown>,
  { maps, variants }: ResolveStylePropsConfig,
): string {
  const baseProps: Record<string, unknown> = {};
  const responsive: string[] = [];

  for (const key in props) {
    const value = props[key];
    if (value === undefined) continue;

    if (isResponsiveObject(value)) {
      const map = maps[key];
      if (!map) continue;
      for (const bp in value) {
        const token = (value as Record<string, string>)[bp];
        const cls = map[token];
        if (!cls) continue;
        if (bp === "base") responsive.push(cls);
        else if (BREAKPOINT_SET.has(bp)) responsive.push(withBreakpoint(cls, bp as Breakpoint));
      }
    } else {
      baseProps[key] = value;
    }
  }

  return [variants(baseProps), ...responsive].filter(Boolean).join(" ");
}
