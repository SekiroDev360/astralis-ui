import type { ComponentPropsWithoutRef, ElementType, ReactNode } from "react";

export type StackGap = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 8 | 10 | 12 | 16;
export type StackAlign = "start" | "end" | "center" | "stretch" | "baseline";
export type StackJustify =
  | "start"
  | "end"
  | "center"
  | "between"
  | "around"
  | "evenly";
export type StackDirection = "row" | "col" | "row-reverse" | "col-reverse";
export type StackWrap = "wrap" | "nowrap" | "wrap-reverse";

export type StackProps<T extends ElementType = "div"> = {
  as?: T;
  children?: ReactNode;
  className?: string;
  /** Flex direction. Default: `"col"` */
  direction?: StackDirection;
  /** Gap between children using Tailwind gap scale */
  gap?: StackGap;
  /** align-items */
  align?: StackAlign;
  /** justify-content */
  justify?: StackJustify;
  /** flex-wrap behaviour */
  wrap?: StackWrap;
} & Omit<ComponentPropsWithoutRef<T>, "as" | "children" | "className">;

/** HStack — horizontal Stack (direction "row") */
export type HStackProps<T extends ElementType = "div"> = Omit<
  StackProps<T>,
  "direction"
>;

/** VStack — vertical Stack (direction "col") */
export type VStackProps<T extends ElementType = "div"> = Omit<
  StackProps<T>,
  "direction"
>;
