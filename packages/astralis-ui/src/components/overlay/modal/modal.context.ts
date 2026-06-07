import { createContext, useContext } from "react";

export interface ModalContextValue {
  open: boolean;
  setOpen: (open: boolean) => void;
}

export const ModalContext = createContext<ModalContextValue | null>(null);

export function useModal() {
  const ctx = useContext(ModalContext);
  if (!ctx) {
    throw new Error("Modal components must be used within <Modal>");
  }
  return ctx;
}
