import type { ReactNode, ButtonHTMLAttributes } from "react";
export type ButtonRounded = "none" | "sm" | "md" | "lg" | "xl" | "2xl" | "full";
export type ButtonLoaderPlacement = "start" | "end";
export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children?: ReactNode;
  variant?: "solid" | "subtle" | "outline" | "text" | "link";
  size?: "xs" | "sm" | "md" | "lg" | "xl";
  disabled?: boolean;
  loading?: boolean;
  loaderPlacement?: ButtonLoaderPlacement;
  loader?: ReactNode;
  rounded?: ButtonRounded;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  fullWidth?: boolean;
  className?: string;
}
