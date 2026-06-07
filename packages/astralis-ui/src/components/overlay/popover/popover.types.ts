import type { ReactNode, ReactElement } from "react";

/* ------------------------------------------------------------------ */
/* Root */
/* ------------------------------------------------------------------ */

/* ------------------------------------------------------------------ */
/* Root */
/* ------------------------------------------------------------------ */

export type PopoverPlacement =
  | "top"
  | "topLeft"
  | "topRight"
  | "right"
  | "rightTop"
  | "rightBottom"
  | "bottom"
  | "bottomLeft"
  | "bottomRight"
  | "left"
  | "leftTop"
  | "leftBottom";

export type PopoverTriggerType = "click" | "hover";

export interface PopoverProps {
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  /**
   * Comparison trigger type
   * @default "click"
   */
  trigger?: PopoverTriggerType;
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
  side?: PopoverPlacement;
  offset?: number;
  className?: string; // Added for flexibility
}
