import type { ComponentPropsWithoutRef, ElementType, ReactNode } from "react";
import type { textColors } from "../../const/color-mappings";

export type IconSize = "xs" | "sm" | "md" | "lg" | "xl" | number;
/** Any semantic text-colour token (icons inherit colour via `currentColor`). */
export type IconColor = keyof typeof textColors;

export interface IconProps extends Omit<ComponentPropsWithoutRef<"svg">, "color"> {
  /** Render this icon component (e.g. a Lucide / Heroicons component, or your own). */
  as?: ElementType;
  /** …or pass a raw `<svg>` as children. */
  children?: ReactNode;
  /** Token (`xs`–`xl`) or an explicit pixel number. */
  size?: IconSize;
  /** A semantic text-colour token; omit to inherit the surrounding text colour. */
  color?: IconColor;
  strokeWidth?: number;
}
