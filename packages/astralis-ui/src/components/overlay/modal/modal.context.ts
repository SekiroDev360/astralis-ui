import { createContext, useContext } from "react";

export type ModalSize = "sm" | "md" | "lg" | "xl" | "full";

export interface ModalContextValue {
  open: boolean;
  setOpen: (open: boolean) => void;
  close: () => void;
  titleId: string;
  descriptionId: string;
  hasTitle: boolean;
  setHasTitle: (v: boolean) => void;
  hasDescription: boolean;
  setHasDescription: (v: boolean) => void;
  size: ModalSize;
  centered: boolean;
  closeOnOverlayClick: boolean;
  closeOnEsc: boolean;
}

export const ModalContext = createContext<ModalContextValue | null>(null);

export function useModal(): ModalContextValue {
  const ctx = useContext(ModalContext);
  if (!ctx) throw new Error("Modal sub-components must be used within <Modal>");
  return ctx;
}
