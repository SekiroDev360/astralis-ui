import { useCallback, useId, useMemo, useState, cloneElement, type MouseEvent } from "react";
import { DrawerContext, useDrawer } from "../drawer.context";
import type { DrawerProps, DrawerSlotProps } from "../drawer.types";
import { useControllableState } from "../../../../hooks/use-controllable-state";

export function DrawerRoot({
  children,
  open: openProp,
  defaultOpen = false,
  onOpenChange,
  placement = "right",
  size = "md",
  closeOnOverlayClick = true,
  closeOnEsc = true,
}: DrawerProps) {
  const [open, setOpen] = useControllableState({ value: openProp, defaultValue: defaultOpen, onChange: onOpenChange });
  const id = useId();
  const [hasTitle, setHasTitle] = useState(false);
  const [hasDescription, setHasDescription] = useState(false);
  const close = useCallback(() => setOpen(false), [setOpen]);

  const ctx = useMemo(
    () => ({
      open, setOpen, close,
      titleId: `${id}-title`,
      descriptionId: `${id}-desc`,
      hasTitle, setHasTitle, hasDescription, setHasDescription,
      placement, size, closeOnOverlayClick, closeOnEsc,
    }),
    [open, setOpen, close, id, hasTitle, hasDescription, placement, size, closeOnOverlayClick, closeOnEsc],
  );

  return <DrawerContext.Provider value={ctx}>{children}</DrawerContext.Provider>;
}

export function DrawerTrigger({ children }: DrawerSlotProps) {
  const { setOpen, open } = useDrawer();
  return cloneElement(children, {
    onClick: (e: MouseEvent) => { children.props.onClick?.(e); setOpen(true); },
    "aria-haspopup": "dialog",
    "aria-expanded": open,
  } as Record<string, unknown>);
}

export function DrawerClose({ children }: DrawerSlotProps) {
  const { close } = useDrawer();
  return cloneElement(children, {
    onClick: (e: MouseEvent) => { children.props.onClick?.(e); close(); },
  } as Record<string, unknown>);
}
