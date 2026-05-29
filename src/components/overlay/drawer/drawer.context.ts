import { createContext, useContext } from "react";
import type { DrawerSide, DrawerSize } from "./drawer.types";

export interface DrawerContextValue {
  open: boolean;
  setOpen: (open: boolean) => void;
  side: DrawerSide;
  size: DrawerSize;
  titleId: string;
  descriptionId: string;
}

export const DrawerContext = createContext<DrawerContextValue | null>(null);

export function useDrawer() {
  const ctx = useContext(DrawerContext);
  if (!ctx) {
    throw new Error("Drawer components must be used within <Drawer>");
  }
  return ctx;
}
