import type { VariantProps } from "class-variance-authority";
import type { ElementType } from "react";
import type { BoxProps } from "../box";
import type { Responsive } from "../../../utils/responsive";
import type { separatorVariants } from "./separator.styles";

/** `orientation` and `variant` each accept a scalar token or a responsive map. */
type SeparatorCustomProps = Responsive<VariantProps<typeof separatorVariants>>;

export type SeparatorProps<T extends ElementType = "div"> = BoxProps<T> &
  SeparatorCustomProps;
