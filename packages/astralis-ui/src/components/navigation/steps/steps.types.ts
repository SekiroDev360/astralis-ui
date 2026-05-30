import type { ReactNode } from "react";

/* ------------------------------------------------------------------ */
/* Root */
/* ------------------------------------------------------------------ */

export interface StepsProps {
  value?: number;
  defaultValue?: number;
  onValueChange?: (value: number) => void;
  orientation?: "horizontal" | "vertical";
  size?: "default" | "small";
  clickable?: boolean;
  children: ReactNode;
  className?: string;
}

/* ------------------------------------------------------------------ */
/* Sub-components */
/* ------------------------------------------------------------------ */

export interface StepsListProps {
  children: ReactNode;
}

export interface StepsItemProps {
  children: ReactNode;
  status?: "wait" | "process" | "finish" | "error";
  title?: string;
  description?: string;
  disabled?: boolean;
  className?: string
}

export interface StepsIndicatorProps {
  children?: ReactNode;
}

export interface StepsContentProps {
  children: ReactNode;
}

export interface StepsTitleProps {
  children: ReactNode;
}

export interface StepsDescriptionProps {
  children: ReactNode;
}

