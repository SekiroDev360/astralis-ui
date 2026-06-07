import type { ReactNode } from "react";

/* ------------------------------------------------------------------ */
/* Root */
/* ------------------------------------------------------------------ */

export interface ModalProps {
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
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
