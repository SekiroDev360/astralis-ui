import type React from "react";
import type { iconRegistry } from "./icon";

export type IconSize = "xs" | "sm" | "md" | "lg" | "xl" | number;
export type IconName = keyof typeof iconRegistry;

export interface BaseIconProps extends React.SVGAttributes<SVGSVGElement> {
  size?: IconSize;
  strokeWidth?: number;
}

export interface IconProps extends BaseIconProps {
  name?: IconName;
  as?: React.ComponentType<any>;
}