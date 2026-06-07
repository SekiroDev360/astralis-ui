import type { ReactNode } from "react";

/* ------------------------------------------------------------------ */
/* Root */
/* ------------------------------------------------------------------ */

export interface TabsProps {
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  children: ReactNode;
}

/* ------------------------------------------------------------------ */
/* Sub-components */
/* ------------------------------------------------------------------ */

export interface TabsListProps {
  children: ReactNode;
}

export interface TabsTriggerProps {
  value: string;
  children: ReactNode;
}

export interface TabsContentProps {
  value: string;
  children: ReactNode;
}
