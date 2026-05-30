import type { ReactNode } from "react";

/* ------------------------------------------------------------------ */
/* Root */
/* ------------------------------------------------------------------ */

export interface TabsProps {
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  orientation?: "horizontal" | "vertical";
  loop?: boolean;
  className?: string;
  children: ReactNode;
}

/* ------------------------------------------------------------------ */
/* Sub-components */
/* ------------------------------------------------------------------ */

export interface TabsListProps {
  loop?: boolean;
  centered?: boolean;
  className?: string;
  children: ReactNode;
}

export interface TabsTriggerProps {
  value: string;
  disabled?: boolean;
  className?: string;
  children: ReactNode;
}

export interface TabsContentProps {
  value: string;
  className?: string;
  children: ReactNode;
}
