import { useCallback, useState, useId, useMemo } from "react";
import { DrawerContext } from "../drawer.context";
import type { DrawerProps } from "../drawer.types";

export function DrawerRoot({
  open: controlledOpen,
  defaultOpen = false,
  onOpenChange,
  side = "right",
  size = "md",
  children,
}: DrawerProps) {
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
      side,
      size,
      titleId,
      descriptionId,
    }),
    [open, setOpen, side, size, titleId, descriptionId]
  );

  return (
    <DrawerContext.Provider value={contextValue}>
      {children}
    </DrawerContext.Provider>
  );
}
