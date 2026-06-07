import { createContext, useContext } from "react";

export interface PopoverContextValue {
  open: boolean;
  setOpen: (open: boolean) => void;
  triggerRef: React.RefObject<HTMLElement>;
}

export const PopoverContext = createContext<PopoverContextValue | null>(null);

export function usePopover() {
  const ctx = useContext(PopoverContext);
  if (!ctx) {
    throw new Error("Popover components must be used within <Popover>");
  }
  return ctx;
}
