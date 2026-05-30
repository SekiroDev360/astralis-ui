import { useCallback, useRef, useState, useId, useMemo } from "react";
import { PopoverContext } from "../popover.context";
import type { PopoverProps } from "../popover.types";

export function PopoverRoot({
  open: controlledOpen,
  defaultOpen = false,
  onOpenChange,
  trigger = "click",
  children,
}: PopoverProps) {
  const triggerId = useId();
  const contentId = useId();
  const [uncontrolledOpen, setUncontrolledOpen] = useState(defaultOpen);
  const triggerRef = useRef<HTMLElement>(null);
  const openTimeout = useRef<number | null>(null);
  const closeTimeout = useRef<number | null>(null);

  const open = controlledOpen ?? uncontrolledOpen;

  const setOpen = useCallback(
    (value: boolean) => {
      // Clear timeouts when state changes
      if (!value) window.clearTimeout(openTimeout.current ?? undefined);
      if (value) window.clearTimeout(closeTimeout.current ?? undefined);

      if (controlledOpen === undefined) {
        setUncontrolledOpen(value);
      }
      onOpenChange?.(value);
    },
    [controlledOpen, onOpenChange],
  );

  const handleOpen = useCallback(() => {
    window.clearTimeout(closeTimeout.current ?? undefined);
    if (trigger === "hover") {
      openTimeout.current = window.setTimeout(() => setOpen(true), 200);
    } else {
      setOpen(true);
    }
  }, [setOpen, trigger]);

  const handleClose = useCallback(() => {
    window.clearTimeout(openTimeout.current ?? undefined);
    if (trigger === "hover") {
      closeTimeout.current = window.setTimeout(() => setOpen(false), 200);
    } else {
      setOpen(false);
    }
  }, [setOpen, trigger]);

  const contextValue = useMemo(
    () => ({
      open,
      setOpen,
      triggerRef: triggerRef as React.RefObject<HTMLElement>,
      trigger,
      handleOpen,
      handleClose,
      triggerId,
      contentId,
    }),
    [open, setOpen, trigger, handleOpen, handleClose, triggerId, contentId]
  );

  return (
    <PopoverContext.Provider value={contextValue}>
      {children}
    </PopoverContext.Provider>
  );
}
