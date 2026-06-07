import type { ReactNode } from "react";

/* ------------------------------------------------------------------ */
/* Root */
/* ------------------------------------------------------------------ */

export interface StatProps {
  children: ReactNode;
}

/* ------------------------------------------------------------------ */
/* Sub-components */
/* ------------------------------------------------------------------ */

export interface StatLabelProps {
  children: ReactNode;
}

export interface StatValueProps {
  children: ReactNode;
}

export interface StatHelpTextProps {
  children: ReactNode;
}

export interface StatIndicatorProps {
  type?: "increase" | "decrease";
  children?: ReactNode;
}
