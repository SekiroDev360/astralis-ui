import type { VariantProps } from "class-variance-authority";
import type { ElementType, ComponentPropsWithoutRef, ReactNode } from "react";
import type { ResponsiveProp, Responsive } from "../../../utils/responsive";
import type { textVariants } from "./text.styles";

export type TextSize = NonNullable<VariantProps<typeof textVariants>["size"]>;
export type TextWeight = NonNullable<VariantProps<typeof textVariants>["weight"]>;
export type TextLineClamp = "1" | "2" | "3" | "4" | "5" | "6";

interface TextCustomProps<C extends ElementType = "p"> {
  children?: ReactNode;
  as?: C;
  className?: string;
  lineClamp?: ResponsiveProp<TextLineClamp>;
}

type TextBaseProps<C extends ElementType = "p"> = TextCustomProps<C> &
  Responsive<Omit<VariantProps<typeof textVariants>, "lineClamp">>;

export type TextProps<C extends ElementType = "p"> = TextBaseProps<C> & 
  Omit<ComponentPropsWithoutRef<C>, keyof TextBaseProps<C>>;