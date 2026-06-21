import { cva } from "class-variance-authority";
import {
  gridTemplateColumns,
  gridTemplateRows,
  gridAutoFlow,
  gridAutoColumnsTypes,
  gridAutoRowsTypes,
  gridJustifyItemsTypes,
  gapTypes,
  rowGapTypes,
  columnGapTypes,
  alignItemsTypes,
  justifyContentTypes,
  alignContentTypes,
  placeContentTypes,
  placeItemsTypes,
  gridColSpanTypes,
  gridColStartTypes,
  gridColEndTypes,
  gridRowSpanTypes,
  gridRowStartTypes,
  gridRowEndTypes,
  orderTypes,
  alignSelfTypes,
  justifySelfTypes,
  placeSelfTypes
} from "../../../const/layout-mappings";

/** Shared by CVA (typing + scalar) and the responsive engine (per-breakpoint). */
export const gridVariantMap = {
  columns: gridTemplateColumns,
  rows: gridTemplateRows,
  flow: gridAutoFlow,
  autoColumns: gridAutoColumnsTypes,
  autoRows: gridAutoRowsTypes,
  justifyItems: gridJustifyItemsTypes,
  alignItems: alignItemsTypes,
  justifyContent: justifyContentTypes,
  alignContent: alignContentTypes,
  placeContent: placeContentTypes,
  placeItems: placeItemsTypes,
  gap: gapTypes,
  rowGap: rowGapTypes,
  columnGap: columnGapTypes,
} as const;

export const gridVariants = cva("astralis:grid", {
  variants: gridVariantMap,
  defaultVariants: {
    flow: "row"
  }
});

export const gridItemVariantMap = {
  colSpan: gridColSpanTypes,
  colStart: gridColStartTypes,
  colEnd: gridColEndTypes,
  rowSpan: gridRowSpanTypes,
  rowStart: gridRowStartTypes,
  rowEnd: gridRowEndTypes,
  order: orderTypes,
  alignSelf: alignSelfTypes,
  justifySelf: justifySelfTypes,
  placeSelf: placeSelfTypes,
} as const;

export const gridItemVariants = cva("", {
  variants: gridItemVariantMap,
});