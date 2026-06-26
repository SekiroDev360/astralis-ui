import { cva } from "class-variance-authority";

/** Shared by CVA (typing + scalar) and the responsive engine (per-breakpoint). */
export const blockquoteVariantMap = {
  variant: {
    // Just an accent rule on the leading edge.
    plain: "astralis:ps-4",
    // Accent rule plus a tinted panel.
    subtle: "astralis:ps-4 astralis:pe-4 astralis:py-3 astralis:rounded-e-md astralis:bg-surface-muted",
  },
} as const;

export const blockquoteVariants = cva(
  // Leading accent border; colour overridable via `borderColor`.
  "astralis:border-s-4 astralis:border-stroke-emphasized",
  {
    variants: blockquoteVariantMap,
    defaultVariants: { variant: "plain" },
  },
);
