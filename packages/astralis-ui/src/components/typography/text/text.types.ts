import type { ElementType, ComponentPropsWithoutRef, ReactNode } from "react";

export interface TextBaseProps<C extends ElementType = "p"> {
  children?: ReactNode;
  /**
   * Override the underlying HTML tag or React component.
   * @default "p"
   */
  as?: C;
  /**
   * Legacy prop for rendering element. Will fall back to 'as'.
   * @deprecated Use 'as' instead
   */
  element?: C;
  /**
   * Additional custom styling classes.
   */
  className?: string;
  /**
   * Font size scale corresponding to theme size tokens.
   */
  size?: "xs" | "sm" | "md" | "lg" | "xl" | "2xl" | "3xl" | "4xl" | "5xl" | "6xl" | "7xl" | "8xl" | "9xl";
  /**
   * Font weights.
   */
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
  /**
   * Horizontal text alignment.
   */
  align?: "left" | "center" | "right" | "justify";
  /**
   * Theme-defined semantic text color.
   * @default "base"
   */
  color?: "base" | "muted" | "subtle" | "inverted" | "warning" | "error" | "success" | "info";
  /**
   * Casing/text-transform styling.
   */
  casing?: "uppercase" | "lowercase" | "capitalize" | "normal-case";
  /**
   * Adds a bottom margin of 0.5rem (mb-2) to the text block.
   */
  gutterBottom?: boolean;
  /**
   * Renders the text as a paragraph with a bottom margin of 1rem (mb-4).
   */
  paragraph?: boolean;
  /** Truncate text with an ellipsis after a single line */
  truncate?: boolean;
  /** Clamp text to N lines with an ellipsis */
  lineClamp?: number;
}

export type TextProps<C extends ElementType = "p"> = TextBaseProps<C> &
  Omit<ComponentPropsWithoutRef<C>, keyof TextBaseProps<C>>;

