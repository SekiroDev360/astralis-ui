import type { VariantProps } from "class-variance-authority";
import type { ElementType } from "react";
import type { BoxProps } from "../../layout/box";
import type { Responsive } from "../../../utils/responsive";
import type { codeVariants } from "./code.styles";

/** `variant` and `size` each accept a scalar token or a responsive map. */
type CodeCustomProps = Responsive<VariantProps<typeof codeVariants>>;

export type CodeProps<T extends ElementType = "code"> = BoxProps<T> & CodeCustomProps;
