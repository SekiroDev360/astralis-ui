import type { VariantProps } from "class-variance-authority";
import type { ComponentPropsWithoutRef, ElementType, ReactNode } from "react";
import type { boxVariants } from "./box.styles";
import type { Responsive } from "../../../utils/responsive";

interface BoxCustomProps<T extends ElementType = "div"> {
  as?: T;
  children?: ReactNode;
  className?: string;
}

/** Every Box style prop accepts a scalar token or a responsive map. */
export type BoxStyleProps = Responsive<VariantProps<typeof boxVariants>>;

type BoxBaseProps<T extends ElementType = "div"> = BoxCustomProps<T> & BoxStyleProps;

export type BoxProps<T extends ElementType = "div"> = BoxBaseProps<T> &
  Omit<ComponentPropsWithoutRef<T>, keyof BoxBaseProps<T>>;
