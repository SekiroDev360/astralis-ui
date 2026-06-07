import type { ReactNode, ReactElement } from "react";

/* ------------------------------------------------------------------ */
/* Root */
/* ------------------------------------------------------------------ */

export type DrawerSide = "left" | "right" | "top" | "bottom";
export type DrawerSize = "xs" | "sm" | "md" | "lg" | "xl" | "full";

export interface DrawerProps {
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  side?: DrawerSide;
  size?: DrawerSize;
  children: ReactNode;
}

/* ------------------------------------------------------------------ */
/* Sub-components */
/* ------------------------------------------------------------------ */

export interface DrawerTriggerProps {
  children: ReactElement;
}

export interface DrawerContentProps {
  children: ReactNode;
}

export interface DrawerOverlayProps {
  closeOnClick?: boolean;
}

export interface DrawerHeaderProps {
  children: ReactNode;
}

export interface DrawerFooterProps {
  children: ReactNode;
}
