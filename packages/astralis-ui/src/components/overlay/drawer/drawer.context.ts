import { createContext, useContext } from "react";

export type DrawerPlacement = "left" | "right" | "top" | "bottom";
export type DrawerSize = "sm" | "md" | "lg" | "xl" | "full";

export interface DrawerContextValue {
  open: boolean;
  setOpen: (open: boolean) => void;
  close: () => void;
  titleId: string;
  descriptionId: string;
  hasTitle: boolean;
  setHasTitle: (v: boolean) => void;
  hasDescription: boolean;
  setHasDescription: (v: boolean) => void;
  placement: DrawerPlacement;
  size: DrawerSize;
  closeOnOverlayClick: boolean;
  closeOnEsc: boolean;
}

export const DrawerContext = createContext<DrawerContextValue | null>(null);

export function useDrawer(): DrawerContextValue {
  const ctx = useContext(DrawerContext);
  if (!ctx) throw new Error("Drawer sub-components must be used within <Drawer>");
  return ctx;
}
