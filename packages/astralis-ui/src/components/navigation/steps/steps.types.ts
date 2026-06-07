import type { ReactNode, ComponentPropsWithoutRef } from "react";

/* ------------------------------------------------------------------ */
/* Root */
/* ------------------------------------------------------------------ */

export interface StepsProps {
  value?: number;
  defaultValue?: number;
  onValueChange?: (value: number) => void;
  orientation?: "horizontal" | "vertical";
  variant?: "solid" | "subtle" | "dot";
  size?: "sm" | "md" | "lg";
  linear?: boolean;
  alternativeLabel?: boolean;
  count?: number;
  children: ReactNode;
}

/* ------------------------------------------------------------------ */
/* Sub-components */
/* ------------------------------------------------------------------ */

export interface StepsListProps extends ComponentPropsWithoutRef<"div"> {
  children: ReactNode;
}

export interface StepsItemProps extends ComponentPropsWithoutRef<"div"> {
  index?: number;
  count?: number;
  disabled?: boolean;
  isError?: boolean;
  children: ReactNode;
}

export interface StepsIndicatorProps extends ComponentPropsWithoutRef<"div"> {
  children?: ReactNode;
}

export interface StepsTriggerProps extends ComponentPropsWithoutRef<"button"> {
  children: ReactNode;
}

export interface StepsPanelProps extends ComponentPropsWithoutRef<"div"> {
  children: ReactNode;
}

export interface StepsContentProps extends ComponentPropsWithoutRef<"div"> {
  value: number;
  children: ReactNode;
}

export interface StepsSeparatorProps extends ComponentPropsWithoutRef<"div"> {}

export interface StepsPrevProps extends ComponentPropsWithoutRef<"button"> {
  asChild?: boolean;
  children: ReactNode;
}

export interface StepsNextProps extends ComponentPropsWithoutRef<"button"> {
  asChild?: boolean;
  children: ReactNode;
}

export interface StepsCompletedContentProps extends ComponentPropsWithoutRef<"div"> {
  children: ReactNode;
}
