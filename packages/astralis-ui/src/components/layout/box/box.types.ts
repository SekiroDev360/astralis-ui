import type { VariantProps } from "class-variance-authority";
import type { ComponentPropsWithoutRef, ElementType, ReactNode } from "react";
import type { boxVariants } from "./box.styles";

interface BoxCustomProps<T extends ElementType = "div"> {
  as?: T;
  children?: ReactNode;
  className?: string;
}

type BoxBaseProps<T extends ElementType = "div"> = BoxCustomProps<T> &
  VariantProps<typeof boxVariants>;

export type BoxProps<T extends ElementType = "div"> = BoxBaseProps<T> &
  Omit<ComponentPropsWithoutRef<T>, keyof BoxBaseProps<T>>;
