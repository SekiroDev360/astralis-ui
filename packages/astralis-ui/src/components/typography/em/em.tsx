import { forwardRef } from "react";
import type { EmProps } from "./em.types";

const SIZES = {
  xs: "astralis-text-xs",
  sm: "astralis-text-sm",
  md: "astralis-text-base",
  lg: "astralis-text-lg",
  xl: "astralis-text-xl",
  "2xl": "astralis-text-2xl",
  "3xl": "astralis-text-3xl",
  "4xl": "astralis-text-4xl",
  "5xl": "astralis-text-5xl",
  "6xl": "astralis-text-6xl",
  "7xl": "astralis-text-7xl",
  "8xl": "astralis-text-8xl",
  "9xl": "astralis-text-9xl",
};

const WEIGHTS = {
  thin: "astralis-font-thin",
  extralight: "astralis-font-extralight",
  light: "astralis-font-light",
  normal: "astralis-font-normal",
  medium: "astralis-font-medium",
  semibold: "astralis-font-semibold",
  bold: "astralis-font-bold",
  extrabold: "astralis-font-extrabold",
  black: "astralis-font-black",
};

const COLORS = {
  base: "astralis-text-label-base",
  muted: "astralis-text-label-muted",
  subtle: "astralis-text-label-subtle",
  inverted: "astralis-text-label-inverted",
  warning: "astralis-text-label-warning",
  error: "astralis-text-label-error",
  success: "astralis-text-label-success",
  info: "astralis-text-label-info",
};

export const Em = forwardRef<HTMLElement, EmProps>(function Em(
  { children, className = "", style, color, weight, size },
  ref,
) {
  const sizeClass = size ? SIZES[size] : "";
  const weightClass = weight ? WEIGHTS[weight] : "";
  const colorClass = color ? COLORS[color] : "";

  return (
    <em
      ref={ref}
      className={[
        "astralis-italic astralis-transition-colors",
        sizeClass,
        weightClass,
        colorClass,
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      style={style}
    >
      {children}
    </em>
  );
});

export default Em;
