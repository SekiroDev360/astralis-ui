import type { ReactNode, ButtonHTMLAttributes } from "react";
import type { VariantProps } from "class-variance-authority";
import { buttonVariants } from "./button.styles";

export type ButtonLoaderPlacement = "start" | "end";

export interface ButtonProps 
  // 1. Extend standard HTML button properties but strip out things we are customizing
  extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, "disabled">,
    // 2. Extend CVA variants but strip out internal calculation flags 
    Omit<VariantProps<typeof buttonVariants>, "isDisabledOrLoading" | "isIconOnly"> {
  
  children?: ReactNode;
  disabled?: boolean;
  loading?: boolean;
  loaderPlacement?: ButtonLoaderPlacement;
  loader?: ReactNode;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
}