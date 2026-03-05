import type { CSSProperties, ReactNode } from "react";

export type DataListSize = "sm" | "md" | "lg";
export type DataListVariant = "plain" | "subtle" | "outline";
export type DataListOrientation = "horizontal" | "vertical";

/* ------------------------------------------------------------------ */
/* Root                                                                 */
/* ------------------------------------------------------------------ */

export interface DataListProps {
  children: ReactNode;
  /** Visual size — controls padding and font size. Default "md" */
  size?: DataListSize;
  /** Visual variant. Default "plain" */
  variant?: DataListVariant;
  /** Stack direction inside each item. Default "horizontal" */
  orientation?: DataListOrientation;
  /** Show horizontal dividers between items */
  divided?: boolean;
  className?: string;
  style?: CSSProperties;
}

/* ------------------------------------------------------------------ */
/* Item                                                                 */
/* ------------------------------------------------------------------ */

export interface DataListItemProps {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
}

/* ------------------------------------------------------------------ */
/* Label                                                                */
/* ------------------------------------------------------------------ */

export interface DataListLabelProps {
  children: ReactNode;
  /** Tooltip / info icon shown after the label */
  info?: ReactNode;
  /** Flex-grow so label fills available space */
  grow?: boolean;
  className?: string;
  style?: CSSProperties;
}

/* ------------------------------------------------------------------ */
/* Value                                                                */
/* ------------------------------------------------------------------ */

export interface DataListValueProps {
  children: ReactNode;
  /** Flex-grow so value fills available space */
  grow?: boolean;
  className?: string;
  style?: CSSProperties;
}
