import { useCallback, useState, useId, useMemo } from "react";
import { ModalContext } from "../modal.context";
import type { ModalProps } from "../modal.types";

export function ModalRoot({
  open: controlledOpen,
  defaultOpen = false,
  onOpenChange,
  size = "md",
  placement = "center",
  children,
}: ModalProps) {
  const titleId = useId();
  const descriptionId = useId();
  const [uncontrolledOpen, setUncontrolledOpen] = useState(defaultOpen);

  const open = controlledOpen ?? uncontrolledOpen;

  const setOpen = useCallback(
    (value: boolean) => {
      if (controlledOpen === undefined) {
        setUncontrolledOpen(value);
      }
      onOpenChange?.(value);
    },
    [controlledOpen, onOpenChange],
  );

  const contextValue = useMemo(
    () => ({
      open,
      setOpen,
      size,
      placement,
      titleId,
      descriptionId,
    }),
    [open, setOpen, size, placement, titleId, descriptionId]
  );

  return (
    <ModalContext.Provider value={contextValue}>
      {children}
    </ModalContext.Provider>
  );
}
