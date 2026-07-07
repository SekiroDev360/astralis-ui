import { cva } from "class-variance-authority";

/** Shared by CVA (typing + scalar) and the responsive engine (per-breakpoint). */
export const separatorVariantMap = {
  orientation: {
    // Each value RESETS the other orientation's properties. Responsive
    // overrides only ADD breakpoint classes — the base value's classes stay
    // applied — so without the explicit zero/auto counters, a
    // `{ base: "horizontal", md: "vertical" }` separator at md would keep the
    // base's top border and full width on top of the vertical styles.
    horizontal: "astralis:w-full astralis:h-auto astralis:border-t astralis:border-l-0",
    vertical: "astralis:w-auto astralis:h-full astralis:self-stretch astralis:border-l astralis:border-t-0",
  },
  variant: {
    solid: "astralis:border-solid",
    dashed: "astralis:border-dashed",
    dotted: "astralis:border-dotted",
  },
} as const;

export const separatorVariants = cva(
  // Default colour comes from the muted stroke token; overridable via `borderColor`.
  "astralis:border-stroke-muted astralis:shrink-0",
  {
    variants: separatorVariantMap,
    defaultVariants: { orientation: "horizontal", variant: "solid" },
  },
);
