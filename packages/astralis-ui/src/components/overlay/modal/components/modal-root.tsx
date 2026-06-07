import { useCallback, useState } from "react";
import { ModalContext } from "../modal.context";
import type { ModalProps } from "../modal.types";

export function ModalRoot({
  open: controlledOpen,
  defaultOpen = false,
  onOpenChange,
  children,
}: ModalProps) {
  const [uncontrolledOpen, setUncontrolledOpen] = useState(defaultOpen);

  const open = controlledOpen ?? uncontrolledOpen;

  const setOpen = useCallback(
    (value: boolean) => {
      if (controlledOpen === undefined) {
        setUncontrolledOpen(value);
      }
      onOpenChange?.(value);
    },
    [controlledOpen, onOpenChange]
  );

  return (
    <ModalContext.Provider value={{ open, setOpen }}>
      {children}
    </ModalContext.Provider>
  );
}
