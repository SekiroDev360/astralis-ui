import type { VariantProps } from "class-variance-authority";
import type { ElementType } from "react";
import type { BoxProps } from "../box";
import type { Responsive } from "../../../utils/responsive";
import type { aspectRatioVariants } from "./aspect-ratio.styles";

/** `ratio` accepts a scalar aspect token or a responsive map. */
type AspectRatioCustomProps = Responsive<VariantProps<typeof aspectRatioVariants>>;

export type AspectRatioProps<T extends ElementType = "div"> = BoxProps<T> &
  AspectRatioCustomProps;
