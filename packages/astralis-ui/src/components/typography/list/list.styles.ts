import { cva } from "class-variance-authority";

/** Shared by CVA (typing + scalar) and the responsive engine (per-breakpoint). */
export const listVariantMap = {
  // Marker glyph. Indented variants reserve room for the marker in the leading gutter;
  // `none` removes both marker and indent (use it for icon lists).
  styleType: {
    disc: "astralis:list-disc astralis:ps-6",
    circle: "astralis:list-[circle] astralis:ps-6",
    square: "astralis:list-[square] astralis:ps-6",
    decimal: "astralis:list-decimal astralis:ps-6",
    "lower-alpha": "astralis:list-[lower-alpha] astralis:ps-6",
    "upper-roman": "astralis:list-[upper-roman] astralis:ps-6",
    none: "astralis:list-none astralis:ps-0",
  },
  // Vertical rhythm between items (margin-top on all but the first).
  spacing: {
    "0": "astralis:space-y-0",
    "1": "astralis:space-y-1",
    "1.5": "astralis:space-y-1.5",
    "2": "astralis:space-y-2",
    "2.5": "astralis:space-y-2.5",
    "3": "astralis:space-y-3",
    "4": "astralis:space-y-4",
    "5": "astralis:space-y-5",
    "6": "astralis:space-y-6",
    "8": "astralis:space-y-8",
  },
} as const;

export const listVariants = cva("astralis:m-0", {
  variants: listVariantMap,
  defaultVariants: { styleType: "disc", spacing: "2" },
});
