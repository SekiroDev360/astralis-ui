import { cloneElement, isValidElement } from "react";
import { useDrawer } from "../drawer.context";
import type { DrawerTriggerProps } from "../drawer.types";

export function DrawerTrigger({ children }: DrawerTriggerProps) {
  const { setOpen } = useDrawer();

  if (!isValidElement(children)) return null;

  return cloneElement(children, {
    onClick: () => setOpen(true),
  });
}
