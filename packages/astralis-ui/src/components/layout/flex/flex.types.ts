import type { ElementType } from "react";
import type { BoxProps } from "../box";
import type { VariantProps } from "class-variance-authority";
import type { Responsive } from "../../../utils/responsive";
import type { flexVariants, flexItemVariants } from "./flex.style";

/** Flex container layout props — each accepts a scalar token or a responsive map. */
type FlexCustomProps = Responsive<VariantProps<typeof flexVariants>>;

/** Flex item self-alignment/sizing props — each responsive. */
type FlexItemCustomProps = Responsive<VariantProps<typeof flexItemVariants>>;

export type FlexItemProps<T extends ElementType = "div"> = BoxProps<T> &
  FlexItemCustomProps;

export type FlexProps<T extends ElementType = "div"> = BoxProps<T> &
  FlexCustomProps;