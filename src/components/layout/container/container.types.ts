import type { ComponentPropsWithoutRef, ElementType, ReactNode } from "react";

export type ContainerSize = "sm" | "md" | "lg" | "xl" | "full";

export type ContainerProps<T extends ElementType = "div"> = {
  as?: T;
  children?: ReactNode;
  className?: string;
  /**
   * Max-width breakpoint alias.
   * sm=640px | md=768px | lg=1024px | xl=1280px | full=100%
   * Default: `"lg"`
   */
  size?: ContainerSize;
  /** Whether to auto-center with `mx-auto`. Default: `true` */
  centered?: boolean;
} & Omit<ComponentPropsWithoutRef<T>, "as" | "children" | "className">;
