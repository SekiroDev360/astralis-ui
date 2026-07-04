import type { ReactNode, ReactElement } from "react";
import type { ModalSize } from "./modal.context";

export interface ModalProps {
  children: ReactNode;
  /** Controlled open state. */
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  size?: ModalSize;
  /** Vertically centre the panel (otherwise it sits toward the top). @default true */
  centered?: boolean;
  closeOnOverlayClick?: boolean;
  closeOnEsc?: boolean;
}

/** Trigger/Close wrap a single element and augment it (asChild-style). */
export interface ModalSlotProps {
  children: ReactElement<any>;
}

export interface ModalContentProps {
  children: ReactNode;
  className?: string;
}

export interface ModalSectionProps {
  children: ReactNode;
  className?: string;
}
