import type { VariantProps } from "class-variance-authority";
import type { gridVariants, gridItemVariants } from "./grid.styles";
import type { ElementType } from "react";
import type { BoxProps } from "../box";
import type { Responsive } from "../../../utils/responsive";

/** Grid container layout props — each accepts a scalar token or a responsive map. */
type GridCustomProps = Responsive<VariantProps<typeof gridVariants>> & {
  /** Raw `grid-template-columns` escape hatch for arbitrary tracks, e.g. "200px 1fr". */
  templateColumns?: string;
  /** Raw `grid-template-rows` escape hatch for arbitrary tracks. */
  templateRows?: string;
  /** Raw `grid-template-areas` string, e.g. `'"head head" "nav main"'`. */
  templateAreas?: string;
};

/** Grid item placement props — each responsive. */
type GridItemCustomProps = Responsive<VariantProps<typeof gridItemVariants>> & {
  /** Named grid area (`grid-area`) matching a Grid `templateAreas` cell. */
  area?: string;
};

export type GridItemProps<T extends ElementType = "div"> = BoxProps<T> & GridItemCustomProps;
export type GridProps<T extends ElementType = "div"> = BoxProps<T> & GridCustomProps;
