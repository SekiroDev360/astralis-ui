import { createContext, useContext } from "react";
import type { ModalSize, ModalPlacement } from "./modal.types";

export interface ModalContextValue {
  open: boolean;
  setOpen: (open: boolean) => void;
  size: ModalSize;
  placement: ModalPlacement;
  titleId: string;
  descriptionId: string;
}

export const ModalContext = createContext<ModalContextValue | null>(null);

export function useModal() {
  const ctx = useContext(ModalContext);
  if (!ctx) {
    throw new Error("Modal components must be used within <Modal>");
  }
  return ctx;
}
