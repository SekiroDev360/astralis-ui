import type { ComponentPropsWithoutRef, ReactNode } from "react";

export type TableSize = "sm" | "md" | "lg";
export type TableVariant = "simple" | "striped" | "unstyled";

/* ------------------------------------------------------------------ */
/* Root                                                                 */
/* ------------------------------------------------------------------ */

export interface TableProps extends ComponentPropsWithoutRef<"table"> {
  /** Visual size of the table cells */
  size?: TableSize;
  /** Visual appearance variant */
  variant?: TableVariant;
  /** Outer border around the table */
  bordered?: boolean;
  /** Show column-dividing borders */
  columnBorder?: boolean;
  /** Highlight rows on hover (default: true) */
  hoverable?: boolean;
  /** Make the thead sticky and cap the body height for vertical scroll */
  stickyHeader?: boolean;
  /** Max height for the scroll container when stickyHeader is true (e.g. "320px") */
  maxHeight?: string | number;
  children?: ReactNode;
}

/* ------------------------------------------------------------------ */
/* Sections                                                             */
/* ------------------------------------------------------------------ */

export interface TableSectionProps extends ComponentPropsWithoutRef<"thead"> {}

export interface TableCaptionProps extends ComponentPropsWithoutRef<"caption"> {
  /** Position of the caption */
  placement?: "top" | "bottom";
}

/* ------------------------------------------------------------------ */
/* Rows & Cells                                                         */
/* ------------------------------------------------------------------ */

export interface TableRowProps extends ComponentPropsWithoutRef<"tr"> {
  /** Highlight this row as selected */
  selected?: boolean;
}

export interface TableHeadProps extends ComponentPropsWithoutRef<"th"> {
  /** Right-align cell content */
  isNumeric?: boolean;
  /** Pin this column left or right */
  sticky?: "left" | "right";
  /** Pixel offset for stacked sticky columns */
  stickyOffset?: number;
}

export interface TableCellProps extends ComponentPropsWithoutRef<"td"> {
  /** Right-align cell content */
  isNumeric?: boolean;
  /** Pin this column left or right */
  sticky?: "left" | "right";
  /** Pixel offset for stacked sticky columns */
  stickyOffset?: number;
}

/* ------------------------------------------------------------------ */
/* Expanded Row (compound expandable pattern)                           */
/* ------------------------------------------------------------------ */

export interface TableExpandedRowProps extends ComponentPropsWithoutRef<"tr"> {
  /** Number of columns to span */
  colSpan: number;
}
