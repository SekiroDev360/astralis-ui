import { cva } from "class-variance-authority";
import {
  flexAlignTypes,
  flexDirectionTypes,
  flexJustifyTypes,
  flexWrapTypes,
  gapTypes,
  rowGapTypes,
  columnGapTypes
} from "../../../const/layout-mappings";

export const flexVariants = cva("astralis:flex", {
    variants: {
        direction: flexDirectionTypes,
        justify: flexJustifyTypes,
        align: flexAlignTypes,
        wrap: flexWrapTypes,
        gap: gapTypes,
        rowGap: rowGapTypes,
        columnGap: columnGapTypes
    }, 
    defaultVariants: {
        direction: 'row',
        align: 'start',
        justify: 'start',
        wrap: 'nowrap'
    }
})