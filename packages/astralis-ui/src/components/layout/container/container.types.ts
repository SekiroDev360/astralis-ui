import type { ElementType } from "react";
import type { BoxProps } from "../box";

interface ContainerCustomProps {
  /** When true, lays children out in a centered column. */
  centerContent?: boolean;
}

export type ContainerProps<T extends ElementType = "div"> = BoxProps<T> &
  ContainerCustomProps;
