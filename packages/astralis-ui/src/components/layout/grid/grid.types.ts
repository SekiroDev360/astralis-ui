import type { VariantProps } from "class-variance-authority";
import type { gridVariants, gridItemVariants } from "./grid.styles";
import type { ElementType } from "react";
import type { BoxProps } from "../box";

type GridVariantProps = VariantProps<typeof gridVariants>;
type GridItemVariantProps = VariantProps<typeof gridItemVariants>;

interface GridCustomProps {
  columns?: GridVariantProps["columns"];
  rows?: GridVariantProps["rows"];
  flow?: GridVariantProps["flow"];
  autoColumns?: GridVariantProps["autoColumns"];
  autoRows?: GridVariantProps["autoRows"];
  justifyItems?: GridVariantProps["justifyItems"];
  alignContent?: GridVariantProps["alignContent"];
  placeContent?: GridVariantProps["placeContent"];
  placeItems?: GridVariantProps["placeItems"];
  gap?: GridVariantProps["gap"];
  rowGap?: GridVariantProps["rowGap"];
  columnGap?: GridVariantProps["columnGap"];
}

interface GridItemCustomProps {
  colSpan?: GridItemVariantProps["colSpan"];
  colStart?: GridItemVariantProps["colStart"];
  colEnd?: GridItemVariantProps["colEnd"];
  rowSpan?: GridItemVariantProps["rowSpan"];
  rowStart?: GridItemVariantProps["rowStart"];
  rowEnd?: GridItemVariantProps["rowEnd"];
  order?: GridItemVariantProps["order"];
  alignSelf?: GridItemVariantProps["alignSelf"];
  justifySelf?: GridItemVariantProps["justifySelf"];
  placeSelf?: GridItemVariantProps["placeSelf"];
}

export type GridItemProps<T extends ElementType = "div"> = BoxProps<T> & GridItemCustomProps;
export type GridProps<T extends ElementType = "div"> = BoxProps<T> & GridCustomProps;
