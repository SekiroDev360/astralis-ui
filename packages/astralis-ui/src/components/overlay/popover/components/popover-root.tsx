import { useCallback, useId, useMemo, useRef, useState, cloneElement, type MouseEvent } from "react";
import { PopoverContext, usePopover } from "../popover.context";
import type { PopoverProps, PopoverSlotProps } from "../popover.types";
import { useControllableState } from "../../../../hooks/use-controllable-state";

export function PopoverRoot({
  children,
  open: openProp,
  defaultOpen = false,
  onOpenChange,
  side = "bottom",
  align = "center",
  sideOffset = 8,
  alignOffset = 0,
  avoidCollisions = true,
  closeOnEsc = true,
  closeOnOutsidePointer = true,
}: PopoverProps) {
  const [open, setOpen] = useControllableState({ value: openProp, defaultValue: defaultOpen, onChange: onOpenChange });
  const id = useId();
  const triggerRef = useRef<HTMLElement | null>(null);
  const contentRef = useRef<HTMLDivElement | null>(null);
  const arrowRef = useRef<HTMLDivElement | null>(null);
  const [hasTitle, setHasTitle] = useState(false);
  const [hasDescription, setHasDescription] = useState(false);

  const close = useCallback(() => setOpen(false), [setOpen]);
  const toggle = useCallback(() => setOpen(!open), [setOpen, open]);

  const ctx = useMemo(
    () => ({
      open, setOpen, toggle, close,
      triggerRef, contentRef, arrowRef,
      contentId: `${id}-content`, titleId: `${id}-title`, descriptionId: `${id}-desc`,
      hasTitle, setHasTitle, hasDescription, setHasDescription,
      side, align, sideOffset, alignOffset, avoidCollisions, closeOnEsc, closeOnOutsidePointer,
    }),
    [open, setOpen, toggle, close, id, hasTitle, hasDescription, side, align, sideOffset, alignOffset, avoidCollisions, closeOnEsc, closeOnOutsidePointer],
  );

  return <PopoverContext.Provider value={ctx}>{children}</PopoverContext.Provider>;
}

export function PopoverTrigger({ children }: PopoverSlotProps) {
  const { toggle, open, triggerRef, contentId } = usePopover();
  return cloneElement(children, {
    ref: triggerRef,
    onClick: (e: MouseEvent) => { children.props.onClick?.(e); toggle(); },
    "aria-haspopup": "dialog",
    "aria-expanded": open,
    "aria-controls": open ? contentId : undefined,
  } as Record<string, unknown>);
}

export function PopoverClose({ children }: PopoverSlotProps) {
  const { close } = usePopover();
  return cloneElement(children, {
    onClick: (e: MouseEvent) => { children.props.onClick?.(e); close(); },
  } as Record<string, unknown>);
}
