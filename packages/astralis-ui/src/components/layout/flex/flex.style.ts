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
  placeItemsTypes,
  alignSelfTypes,
  justifySelfTypes,
  placeSelfTypes,
  orderTypes,
  gapTypes,
  rowGapTypes,
  columnGapTypes
} from "../../../const/layout-mappings";

export const flexVariants = cva("astralis:flex", {
  variants: {
    direction: flexDirectionTypes,
    justifyContent: justifyContentTypes,
    alignItems: alignItemsTypes,
    alignContent: alignContentTypes,
    placeContent: placeContentTypes,
    placeItems: placeItemsTypes,
    wrap: flexWrapTypes,
    gap: gapTypes,
    rowGap: rowGapTypes,
    columnGap: columnGapTypes
  },
  defaultVariants: {
    direction: "row",
    alignItems: "start",
    justifyContent: "start",
    wrap: "nowrap"
  }
});

export const flexItemVariants = cva("", {
  variants: {
    basis: flexBasisTypes,
    flex: flexTypes,
    grow: flexGrowTypes,
    shrink: flexShrinkTypes,
    order: orderTypes,
    alignSelf: alignSelfTypes,
    justifySelf: justifySelfTypes,
    placeSelf: placeSelfTypes
  }
});