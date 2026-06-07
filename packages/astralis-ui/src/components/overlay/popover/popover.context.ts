import { createContext, useContext } from "react";
import type { PopoverTriggerType } from "./popover.types";

export interface PopoverContextValue {
  open: boolean;
  setOpen: (open: boolean) => void;
  triggerRef: React.RefObject<HTMLElement>;
  trigger: PopoverTriggerType;
  handleOpen: () => void;
  handleClose: () => void;
  triggerId: string;
  contentId: string;
}

export const PopoverContext = createContext<PopoverContextValue | null>(null);

export function usePopover() {
  const ctx = useContext(PopoverContext);
  if (!ctx) {
    throw new Error("Popover components must be used within <Popover>");
  }
  return ctx;
}
