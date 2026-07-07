import { cva } from "class-variance-authority";
import type { TagSize } from "./tag.types";

/** Chip container. Colour comes from the accent channel via `colorScheme`. */
export const tagVariants = cva(
  "astralis:inline-flex astralis:items-center astralis:justify-center astralis:gap-1 astralis:font-medium astralis:rounded-md astralis:whitespace-nowrap astralis:transition-colors",
  {
    variants: {
      size: {
        // xs aligns the chip scale with Badge (both are xs–lg).
        xs: "astralis:h-4 astralis:px-1.5 astralis:text-2xs",
        sm: "astralis:h-5 astralis:px-2 astralis:text-xs",
        md: "astralis:h-6 astralis:px-2.5 astralis:text-xs",
        lg: "astralis:h-7 astralis:px-3 astralis:text-sm",
      },
      variant: {
        solid: "astralis:bg-accent-solid astralis:text-accent-contrast",
        subtle: "astralis:bg-accent-subtle astralis:text-accent-label",
        surface: "astralis:bg-accent-subtle astralis:text-accent-label astralis:border-normal astralis:border-accent-stroke",
        outline: "astralis:bg-transparent astralis:border-normal astralis:border-accent-stroke astralis:text-accent-label",
      },
    },
    defaultVariants: { size: "md", variant: "subtle" },
  },
);

/** Remove-button icon size per tag size. */
export const closeIconSize: Record<TagSize, "xs" | "sm"> = { xs: "xs", sm: "xs", md: "xs", lg: "sm" };
