import type { ReactNode } from "react";

export type TextElementType = {
  h1: HTMLHeadingElement;
  h2: HTMLHeadingElement;
  h3: HTMLHeadingElement;
  h4: HTMLHeadingElement;
  h5: HTMLHeadingElement;
  h6: HTMLHeadingElement;
  p: HTMLParagraphElement;
  span: HTMLSpanElement;
  strong: HTMLElement;
  b: HTMLElement;
  em: HTMLElement;
  i: HTMLElement;
};

export interface TextProps {
  children: ReactNode;
  className?: string;
  element?: keyof TextElementType;
  size?: "sm" | "md" | "lg" | "xl" | "2xl" | "3xl" | "4xl" | "5xl" | "6xl";
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
  align?: "left" | "center" | "right" | "justify";
  /** Truncate text with an ellipsis after a single line */
  truncate?: boolean;
  /** Clamp text to N lines with an ellipsis */
  lineClamp?: number;
}
