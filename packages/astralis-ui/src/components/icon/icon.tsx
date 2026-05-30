import { forwardRef } from "react";
import {
  Check,
  X,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Home,
  Search,
  User,
  CreditCard,
  Smile,
  Phone,
  Tablet,
  Laptop,
} from "lucide-react";
import type { BaseIconProps, IconProps } from "./icon.types";

export const iconRegistry = {
  Check,
  X,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Home,
  Search,
  User,
  CreditCard,
  Smile,
  Phone,
  Tablet,
  Laptop,
} as const;

const sizeMap: Record<
  NonNullable<BaseIconProps["size"]> extends number
    ? never
    : "xs" | "sm" | "md" | "lg" | "xl",
  number
> = {
  xs: 16,
  sm: 20,
  md: 24,
  lg: 32,
  xl: 40,
};

const Icon = forwardRef<SVGSVGElement, IconProps>(
  (
    { name, size = "md", strokeWidth = 2, className = "", color, as: CustomIcon, ...props },
    ref
  ) => {
    const IconComponent = CustomIcon || (name ? iconRegistry[name] : null);

    if (!IconComponent) {
      console.warn(
        `[Astralis Icon] Icon "${name}" not found or no custom icon component passed`
      );
      return null;
    }

    const pixelSize = typeof size === "number" ? size : sizeMap[size];

    return (
      <IconComponent
        ref={ref}
        size={pixelSize}
        strokeWidth={strokeWidth}
        stroke={color ?? "currentColor"}
        className={`astralis-flex-shrink-0 ${className}`}
        {...props}
      />
    );
  }
);

Icon.displayName = "Icon";

export default Icon;
