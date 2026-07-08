import { createContext, useContext, type RefObject } from "react";
import type { Side, Align } from "../../hooks/use-anchor-position";

export interface MenuContextValue {
  open: boolean;
  setOpen: (open: boolean) => void;
  toggle: () => void;
  close: () => void;
  triggerRef: RefObject<HTMLElement | null>;
  contentRef: RefObject<HTMLDivElement | null>;
  contentId: string;
  side: Side;
  align: Align;
  sideOffset: number;
  closeOnSelect: boolean;
}

export const MenuContext = createContext<MenuContextValue | null>(null);

export function useMenu(): MenuContextValue {
  const ctx = useContext(MenuContext);
  if (!ctx) throw new Error("Menu sub-components must be used within <Menu>");
  return ctx;
}
