import { useCallback, useState } from "react";
import { DrawerContext } from "../drawer.context";
import type { DrawerProps } from "../drawer.types";

export function DrawerRoot({
  open: controlledOpen,
  defaultOpen = false,
  onOpenChange,
  side = "right",
  children,
}: DrawerProps) {
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
    <DrawerContext.Provider value={{ open, setOpen, side }}>
      {children}
    </DrawerContext.Provider>
  );
}
