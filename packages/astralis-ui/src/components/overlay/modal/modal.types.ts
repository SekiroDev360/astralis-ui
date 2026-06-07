import type { ReactNode } from "react";

/* ------------------------------------------------------------------ */
/* Root */
/* ------------------------------------------------------------------ */

export type ModalSize = "xs" | "sm" | "md" | "lg" | "xl" | "full";
export type ModalPlacement = "top" | "center" | "bottom";

export interface ModalProps {
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  size?: ModalSize;
  placement?: ModalPlacement;
  children: ReactNode;
}

/* ------------------------------------------------------------------ */
/* Sub-components */
/* ------------------------------------------------------------------ */

export interface ModalTriggerProps {
  children: React.ReactElement;
}

export interface ModalContentProps {
  children: ReactNode;
}

export interface ModalOverlayProps {
  /** Disable closing when clicking the overlay */
  closeOnClick?: boolean;
}

export interface ModalHeaderProps {
  children: ReactNode;
}

export interface ModalFooterProps {
  children: ReactNode;
}
