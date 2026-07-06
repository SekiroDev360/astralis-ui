import { cva } from "class-variance-authority";

/**
 * CodeBlock is a two-part surface: a rounded, coloured container (root) wrapping
 * a scrollable `<pre>` (body). `variant` colours the root; `size` drives the body's
 * font-size + padding. Both maps are shared by CVA and the responsive engine.
 */
export const codeBlockVariantMap = {
  variant: {
    subtle: "astralis:bg-surface-muted astralis:text-label-base",
    // Same-polarity surface — tracks the active theme (dark block in dark
    // mode) rather than inverting against it.
    solid: "astralis:bg-surface-subtle astralis:text-label-base",
    outline: "astralis:border-normal astralis:border-stroke-base astralis:text-label-base",
  },
} as const;

export const codeBlockBodyMap = {
  size: {
    sm: "astralis:text-xs astralis:p-3",
    md: "astralis:text-sm astralis:p-4",
    lg: "astralis:text-md astralis:p-5",
  },
} as const;

export const codeBlockVariants = cva(
  "astralis:block astralis:w-full astralis:rounded-md astralis:overflow-hidden",
  {
    variants: codeBlockVariantMap,
    defaultVariants: { variant: "subtle" },
  },
);

export const codeBlockBodyVariants = cva(
  // Whitespace preserved; long lines scroll horizontally rather than wrap.
  "astralis:font-mono astralis:block astralis:m-0 astralis:overflow-x-auto astralis:whitespace-pre",
  {
    variants: codeBlockBodyMap,
    defaultVariants: { size: "md" },
  },
);
