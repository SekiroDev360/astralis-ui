import { cva } from "class-variance-authority";

/** Styles applied to each matched `<mark>` segment. */
export const highlightMarkVariantMap = {
  variant: {
    subtle: "astralis:bg-yellow-subtle astralis:text-yellow-label",
    solid: "astralis:bg-yellow-solid astralis:text-yellow-contrast",
  },
} as const;

export const highlightMarkVariants = cva(
  "astralis:rounded-xs astralis:px-1 astralis:font-medium",
  {
    variants: highlightMarkVariantMap,
    defaultVariants: { variant: "subtle" },
  },
);
