import { cva } from "class-variance-authority";
import {
  flexDirectionTypes,
  flexWrapTypes,
  flexBasisTypes,
  flexTypes,
  flexGrowTypes,
  flexShrinkTypes,
  justifyContentTypes,
  alignItemsTypes,
  alignContentTypes,
  placeContentTypes,
  alignSelfTypes,
  orderTypes,
  gapTypes,
  rowGapTypes,
  columnGapTypes
} from "../../../const/layout-mappings";

/** Shared by CVA (typing + scalar) and the responsive engine (per-breakpoint). */
export const flexVariantMap = {
  direction: flexDirectionTypes,
  // Container alignment valid in flexbox: justify-content (main axis),
  // align-items (cross axis), align-content (wrapped lines), place-content
  // (shorthand of the two). justify-items / place-items are NO-OPs in flex.
  justifyContent: justifyContentTypes,
  alignItems: alignItemsTypes,
  alignContent: alignContentTypes,
  placeContent: placeContentTypes,
  wrap: flexWrapTypes,
  gap: gapTypes,
  rowGap: rowGapTypes,
  columnGap: columnGapTypes,
} as const;

export const flexVariants = cva("astralis:flex", {
  variants: flexVariantMap,
  defaultVariants: {
    direction: "row",
    alignItems: "start",
    justifyContent: "start",
    wrap: "nowrap"
  }
});

export const flexItemVariantMap = {
  basis: flexBasisTypes,
  flex: flexTypes,
  grow: flexGrowTypes,
  shrink: flexShrinkTypes,
  order: orderTypes,
  // Only align-self has effect on a flex item; justify-self / place-self are
  // NO-OPs in flex (main-axis positioning is done via margins / justify-content).
  alignSelf: alignSelfTypes,
} as const;

export const flexItemVariants = cva("", {
  variants: flexItemVariantMap,
});