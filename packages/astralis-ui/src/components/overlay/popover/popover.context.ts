import { createContext, useContext, type RefObject } from "react";
import type { Side, Align } from "../../../hooks/use-anchor-position";

export interface PopoverContextValue {
  open: boolean;
  setOpen: (open: boolean) => void;
  toggle: () => void;
  close: () => void;
  triggerRef: RefObject<HTMLElement | null>;
  contentRef: RefObject<HTMLDivElement | null>;
  arrowRef: RefObject<HTMLDivElement | null>;
  contentId: string;
  titleId: string;
  descriptionId: string;
  hasTitle: boolean;
  setHasTitle: (v: boolean) => void;
  hasDescription: boolean;
  setHasDescription: (v: boolean) => void;
  side: Side;
  align: Align;
  sideOffset: number;
  alignOffset: number;
  avoidCollisions: boolean;
  closeOnEsc: boolean;
  closeOnOutsidePointer: boolean;
}

export const PopoverContext = createContext<PopoverContextValue | null>(null);

export function usePopover(): PopoverContextValue {
  const ctx = useContext(PopoverContext);
  if (!ctx) throw new Error("Popover sub-components must be used within <Popover>");
  return ctx;
}
