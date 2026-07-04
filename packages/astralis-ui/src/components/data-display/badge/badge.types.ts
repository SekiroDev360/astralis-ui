import type { ReactNode } from "react";
import type { ColorScheme } from "../../../const/color-schemes";

export type BadgeVariant = "solid" | "subtle" | "surface" | "outline";
export type BadgeSize = "xs" | "sm" | "md" | "lg";

export interface BadgeProps {
  children?: ReactNode;
  variant?: BadgeVariant;
  /** Hue the badge paints with. @default "gray" */
  colorScheme?: ColorScheme;
  size?: BadgeSize;
  className?: string;
}
