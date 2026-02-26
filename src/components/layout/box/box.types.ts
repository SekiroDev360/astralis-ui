import type { ComponentPropsWithoutRef, ElementType, ReactNode } from "react";

/**
 * Polymorphic props helper — merges element-specific HTML attrs with our own.
 */
export type BoxProps<T extends ElementType = "div"> = {
  /** Render as a different HTML element or custom component */
  as?: T;
  children?: ReactNode;
  className?: string;
} & Omit<ComponentPropsWithoutRef<T>, "as" | "children" | "className">;
