import type { ComponentPropsWithoutRef, ElementType, ReactNode } from "react";
import type { ResponsiveProp } from "../../../utils/responsive";

export type GridCols = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;
export type GridGap = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 8 | 10 | 12 | 16;
export type GridAlign = "start" | "end" | "center" | "stretch";
export type GridJustify = "start" | "end" | "center" | "stretch";

export type GridProps<T extends ElementType = "div"> = {
  as?: T;
  children?: ReactNode;
  className?: string;
  /** Number of template columns (1–12) */
  cols?: ResponsiveProp<GridCols>;
  /** Number of template rows (1–12). Omit to let grid auto-size. */
  rows?: ResponsiveProp<GridCols>;
  /** Shorthand gap for both row and column gap */
  gap?: ResponsiveProp<GridGap>;
  /** Column-only gap */
  colGap?: ResponsiveProp<GridGap>;
  /** Row-only gap */
  rowGap?: ResponsiveProp<GridGap>;
  /** align-items */
  align?: ResponsiveProp<GridAlign>;
  /** justify-items */
  justify?: ResponsiveProp<GridJustify>;
} & Omit<ComponentPropsWithoutRef<T>, "as" | "children" | "className">;

export type GridItemProps<T extends ElementType = "div"> = {
  as?: T;
  children?: ReactNode;
  className?: string;
  /** Number of columns to span */
  colSpan?: ResponsiveProp<GridCols>;
  /** Number of rows to span */
  rowSpan?: ResponsiveProp<GridCols>;
  /** Column start line */
  colStart?: ResponsiveProp<GridCols>;
  /** Row start line */
  rowStart?: ResponsiveProp<GridCols>;
} & Omit<ComponentPropsWithoutRef<T>, "as" | "children" | "className">;
