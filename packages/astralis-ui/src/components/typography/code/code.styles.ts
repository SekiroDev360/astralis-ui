import { cva } from "class-variance-authority";

/** Shared by CVA (typing + scalar) and the responsive engine (per-breakpoint). */
export const codeVariantMap = {
  variant: {
    subtle: "astralis:bg-surface-muted astralis:text-label-base",
    solid: "astralis:bg-surface-inverted astralis:text-label-inverted",
    outline: "astralis:border-normal astralis:border-stroke-base astralis:text-label-base",
  },
  size: {
    sm: "astralis:text-xs",
    md: "astralis:text-sm",
    lg: "astralis:text-md",
  },
} as const;

export const codeVariants = cva(
  // Inline, monospace, never wraps mid-token; padding/rounding keep it legible in prose.
  "astralis:font-mono astralis:inline-flex astralis:items-center astralis:rounded-sm astralis:px-1.5 astralis:py-0.5 astralis:whitespace-nowrap",
  {
    variants: codeVariantMap,
    defaultVariants: { variant: "subtle", size: "sm" },
  },
);
