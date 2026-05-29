import type { ElementType } from "react";
import { resolveResponsive } from "../../../utils/responsive";
import type {
  GridProps,
  GridItemProps,
  GridCols,
  GridGap,
  GridAlign,
  GridJustify,
} from "./grid.types";

// ─── Mapping Tables ──────────────────────────────────────────────────────────

const COLS_MAP: Record<GridCols, string> = {
  1: "astralis-grid-cols-1",
  2: "astralis-grid-cols-2",
  3: "astralis-grid-cols-3",
  4: "astralis-grid-cols-4",
  5: "astralis-grid-cols-5",
  6: "astralis-grid-cols-6",
  7: "astralis-grid-cols-7",
  8: "astralis-grid-cols-8",
  9: "astralis-grid-cols-9",
  10: "astralis-grid-cols-10",
  11: "astralis-grid-cols-11",
  12: "astralis-grid-cols-12",
};

const ROWS_MAP: Record<GridCols, string> = {
  1: "astralis-grid-rows-1",
  2: "astralis-grid-rows-2",
  3: "astralis-grid-rows-3",
  4: "astralis-grid-rows-4",
  5: "astralis-grid-rows-5",
  6: "astralis-grid-rows-6",
  7: "astralis-grid-rows-7",
  8: "astralis-grid-rows-8",
  9: "astralis-grid-rows-9",
  10: "astralis-grid-rows-10",
  11: "astralis-grid-rows-11",
  12: "astralis-grid-rows-12",
};

const GAP_MAP: Record<GridGap, string> = {
  0: "astralis-gap-0",
  1: "astralis-gap-1",
  2: "astralis-gap-2",
  3: "astralis-gap-3",
  4: "astralis-gap-4",
  5: "astralis-gap-5",
  6: "astralis-gap-6",
  8: "astralis-gap-8",
  10: "astralis-gap-10",
  12: "astralis-gap-12",
  16: "astralis-gap-16",
};

const COL_GAP_MAP: Record<GridGap, string> = {
  0: "astralis-gap-x-0",
  1: "astralis-gap-x-1",
  2: "astralis-gap-x-2",
  3: "astralis-gap-x-3",
  4: "astralis-gap-x-4",
  5: "astralis-gap-x-5",
  6: "astralis-gap-x-6",
  8: "astralis-gap-x-8",
  10: "astralis-gap-x-10",
  12: "astralis-gap-x-12",
  16: "astralis-gap-x-16",
};

const ROW_GAP_MAP: Record<GridGap, string> = {
  0: "astralis-gap-y-0",
  1: "astralis-gap-y-1",
  2: "astralis-gap-y-2",
  3: "astralis-gap-y-3",
  4: "astralis-gap-y-4",
  5: "astralis-gap-y-5",
  6: "astralis-gap-y-6",
  8: "astralis-gap-y-8",
  10: "astralis-gap-y-10",
  12: "astralis-gap-y-12",
  16: "astralis-gap-y-16",
};

const ALIGN_MAP: Record<GridAlign, string> = {
  start: "astralis-items-start",
  end: "astralis-items-end",
  center: "astralis-items-center",
  stretch: "astralis-items-stretch",
};

const JUSTIFY_MAP: Record<GridJustify, string> = {
  start: "astralis-justify-items-start",
  end: "astralis-justify-items-end",
  center: "astralis-justify-items-center",
  stretch: "astralis-justify-items-stretch",
};

const COL_SPAN_MAP: Record<GridCols, string> = {
  1: "astralis-col-span-1",
  2: "astralis-col-span-2",
  3: "astralis-col-span-3",
  4: "astralis-col-span-4",
  5: "astralis-col-span-5",
  6: "astralis-col-span-6",
  7: "astralis-col-span-7",
  8: "astralis-col-span-8",
  9: "astralis-col-span-9",
  10: "astralis-col-span-10",
  11: "astralis-col-span-11",
  12: "astralis-col-span-12",
};

const ROW_SPAN_MAP: Record<GridCols, string> = {
  1: "astralis-row-span-1",
  2: "astralis-row-span-2",
  3: "astralis-row-span-3",
  4: "astralis-row-span-4",
  5: "astralis-row-span-5",
  6: "astralis-row-span-6",
  7: "astralis-row-span-7",
  8: "astralis-row-span-8",
  9: "astralis-row-span-9",
  10: "astralis-row-span-10",
  11: "astralis-row-span-11",
  12: "astralis-row-span-12",
};

const COL_START_MAP: Record<GridCols, string> = {
  1: "astralis-col-start-1",
  2: "astralis-col-start-2",
  3: "astralis-col-start-3",
  4: "astralis-col-start-4",
  5: "astralis-col-start-5",
  6: "astralis-col-start-6",
  7: "astralis-col-start-7",
  8: "astralis-col-start-8",
  9: "astralis-col-start-9",
  10: "astralis-col-start-10",
  11: "astralis-col-start-11",
  12: "astralis-col-start-12",
};

const ROW_START_MAP: Record<GridCols, string> = {
  1: "astralis-row-start-1",
  2: "astralis-row-start-2",
  3: "astralis-row-start-3",
  4: "astralis-row-start-4",
  5: "astralis-row-start-5",
  6: "astralis-row-start-6",
  7: "astralis-row-start-7",
  8: "astralis-row-start-8",
  9: "astralis-row-start-9",
  10: "astralis-row-start-10",
  11: "astralis-row-start-11",
  12: "astralis-row-start-12",
};

// ─── Grid ────────────────────────────────────────────────────────────────────

function GridRoot<T extends ElementType = "div">({
  as,
  children,
  className = "",
  cols,
  rows,
  gap,
  colGap,
  rowGap,
  align,
  justify,
  ...props
}: GridProps<T>) {
  const Tag = (as ?? "div") as ElementType;

  const classes = [
    "astralis-grid",
    cols ? resolveResponsive(cols, COLS_MAP) : "",
    rows ? resolveResponsive(rows, ROWS_MAP) : "",
    gap != null ? resolveResponsive(gap, GAP_MAP) : "",
    colGap != null ? resolveResponsive(colGap, COL_GAP_MAP) : "",
    rowGap != null ? resolveResponsive(rowGap, ROW_GAP_MAP) : "",
    align ? resolveResponsive(align, ALIGN_MAP) : "",
    justify ? resolveResponsive(justify, JUSTIFY_MAP) : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <Tag className={classes} {...props}>
      {children}
    </Tag>
  );
}

// ─── GridItem ─────────────────────────────────────────────────────────────────

function GridItem<T extends ElementType = "div">({
  as,
  children,
  className = "",
  colSpan,
  rowSpan,
  colStart,
  rowStart,
  ...props
}: GridItemProps<T>) {
  const Tag = (as ?? "div") as ElementType;

  const classes = [
    colSpan ? resolveResponsive(colSpan, COL_SPAN_MAP) : "",
    rowSpan ? resolveResponsive(rowSpan, ROW_SPAN_MAP) : "",
    colStart ? resolveResponsive(colStart, COL_START_MAP) : "",
    rowStart ? resolveResponsive(rowStart, ROW_START_MAP) : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <Tag className={classes || undefined} {...props}>
      {children}
    </Tag>
  );
}

// ─── Compound export ──────────────────────────────────────────────────────────

export const Grid = Object.assign(GridRoot, { Item: GridItem });
export { GridItem };
