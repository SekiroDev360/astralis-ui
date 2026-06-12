import type { VariantProps } from "class-variance-authority";
import type { ElementType, ComponentPropsWithoutRef, ReactNode } from "react";
import type { textVariants } from "./text.styles";

export type TextSize = NonNullable<VariantProps<typeof textVariants>["size"]>
export type TextWeight = NonNullable<VariantProps<typeof textVariants>["weight"]>

export interface TextCustomProps<C extends ElementType = "p"> {
  children?: ReactNode;
  as?: C;
  element?: C;
  className?: string;  
  lineClamp?: number;
}

export type TextBaseProps<C extends ElementType = "p"> = TextCustomProps<C> & VariantProps<typeof textVariants>

export type TextProps<C extends ElementType = "p"> = TextBaseProps<C> & 
  Omit<ComponentPropsWithoutRef<C>, keyof TextBaseProps<C>>
