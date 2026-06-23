import { cva } from "class-variance-authority";

/** Shared by CVA (typing + scalar) and the responsive engine (per-breakpoint). */
export const separatorVariantMap = {
  orientation: {
    horizontal: "astralis:w-full astralis:border-t",
    vertical: "astralis:h-full astralis:self-stretch astralis:border-l",
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
