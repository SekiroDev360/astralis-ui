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

export const gridVariants = cva("astralis:grid", {
  variants: {
    columns: gridTemplateColumns,
    rows: gridTemplateRows,
    flow: gridAutoFlow,
    autoColumns: gridAutoColumnsTypes,
    autoRows: gridAutoRowsTypes,
    justifyItems: gridJustifyItemsTypes,
    alignContent: alignContentTypes,
    placeContent: placeContentTypes,
    placeItems: placeItemsTypes,
    gap: gapTypes,
    rowGap: rowGapTypes,
    columnGap: columnGapTypes
  },
  defaultVariants: {
    flow: "row"
  }
});

export const gridItemVariants = cva("", {
  variants: {
    colSpan: gridColSpanTypes,
    colStart: gridColStartTypes,
    colEnd: gridColEndTypes,
    rowSpan: gridRowSpanTypes,
    rowStart: gridRowStartTypes,
    rowEnd: gridRowEndTypes,
    order: orderTypes,
    alignSelf: alignSelfTypes,
    justifySelf: justifySelfTypes,
    placeSelf: placeSelfTypes
  }
});