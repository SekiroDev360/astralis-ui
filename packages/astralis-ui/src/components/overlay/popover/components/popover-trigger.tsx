import { cloneElement, isValidElement } from "react";
import { usePopover } from "../popover.context";
import type { PopoverTriggerProps } from "../popover.types";

export function PopoverTrigger({ children }: PopoverTriggerProps) {
  const { setOpen, triggerRef } = usePopover();

  if (!isValidElement(children)) return null;

  return cloneElement(children, {
    ref: triggerRef,
    onClick: () => setOpen(true),
  });
}
