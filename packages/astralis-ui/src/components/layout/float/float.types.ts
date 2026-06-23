import type { VariantProps } from "class-variance-authority";
import type { ElementType } from "react";
import type { BoxProps } from "../box";
import type { Responsive } from "../../../utils/responsive";
import type { floatVariants } from "./float.styles";

/** `placement` accepts a scalar token or a responsive map. */
type FloatCustomProps = Responsive<VariantProps<typeof floatVariants>>;

export type FloatProps<T extends ElementType = "div"> = BoxProps<T> &
  FloatCustomProps;
