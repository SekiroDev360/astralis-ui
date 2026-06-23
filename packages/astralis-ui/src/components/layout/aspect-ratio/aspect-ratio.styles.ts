import { cva } from "class-variance-authority";
import { aspectRatioTypes } from "../../../const/common-mappings";

/** Shared by CVA (typing + scalar) and the responsive engine (per-breakpoint). */
export const aspectRatioVariantMap = {
  ratio: aspectRatioTypes,
} as const;

export const aspectRatioVariants = cva(
  // Lock the ratio + clip overflow, then stretch the single child to fill the box.
  // Direct children are absolutely positioned to the frame; media defaults to cover.
  "astralis:relative astralis:overflow-hidden " +
    "astralis:[&>*:not(style)]:absolute astralis:[&>*:not(style)]:inset-0 astralis:[&>*:not(style)]:size-full " +
    "astralis:[&>img]:object-cover astralis:[&>video]:object-cover",
  {
    variants: aspectRatioVariantMap,
    defaultVariants: { ratio: "wide" },
  },
);
