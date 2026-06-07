import type { CSSProperties, ReactNode } from "react";

export interface EmProps {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
  color?: "base" | "muted" | "subtle" | "inverted" | "warning" | "error" | "success" | "info";
  weight?:
    | "thin"
    | "extralight"
    | "light"
    | "normal"
    | "medium"
    | "semibold"
    | "bold"
    | "extrabold"
    | "black";
  size?: "xs" | "sm" | "md" | "lg" | "xl" | "2xl" | "3xl" | "4xl" | "5xl" | "6xl" | "7xl" | "8xl" | "9xl";
}
