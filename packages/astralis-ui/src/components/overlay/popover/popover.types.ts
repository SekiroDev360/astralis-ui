import type { ReactNode, ReactElement } from "react";

/* ------------------------------------------------------------------ */
/* Root */
/* ------------------------------------------------------------------ */

export interface PopoverProps {
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  children: ReactNode;
}

/* ------------------------------------------------------------------ */
/* Sub-components */
/* ------------------------------------------------------------------ */

export interface PopoverTriggerProps {
  children: ReactElement;
}

export interface PopoverContentProps {
  children: ReactNode;
  side?: "top" | "right" | "bottom" | "left";
  offset?: number;
}
