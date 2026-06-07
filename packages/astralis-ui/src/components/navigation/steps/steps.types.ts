import type { ReactNode } from "react";

/* ------------------------------------------------------------------ */
/* Root */
/* ------------------------------------------------------------------ */

export interface StepsProps {
  value?: number;
  defaultValue?: number;
  onValueChange?: (value: number) => void;
  orientation?: "horizontal" | "vertical";
  children: ReactNode;
}

/* ------------------------------------------------------------------ */
/* Sub-components */
/* ------------------------------------------------------------------ */

export interface StepsListProps {
  children: ReactNode;
}

export interface StepsItemProps {
  children: ReactNode;
}

export interface StepsIndicatorProps {
  children?: ReactNode;
}

export interface StepsContentProps {
  children: ReactNode;
}
