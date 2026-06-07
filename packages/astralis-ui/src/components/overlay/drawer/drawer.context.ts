import { createContext, useContext } from "react";
import type { DrawerSide } from "./drawer.types";

export interface DrawerContextValue {
  open: boolean;
  setOpen: (open: boolean) => void;
  side: DrawerSide;
}

export const DrawerContext = createContext<DrawerContextValue | null>(null);

export function useDrawer() {
  const ctx = useContext(DrawerContext);
  if (!ctx) {
    throw new Error("Drawer components must be used within <Drawer>");
  }
  return ctx;
}
