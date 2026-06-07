import { cloneElement, isValidElement } from "react";
import type { HTMLAttributes } from "react";
import { useDrawer } from "../drawer.context";
import type { DrawerTriggerProps } from "../drawer.types";

export function DrawerTrigger({ children }: DrawerTriggerProps) {
  const { setOpen } = useDrawer();

  if (!isValidElement(children)) return null;

  return cloneElement(children as React.ReactElement<HTMLAttributes<HTMLElement>>, {
    onClick: () => setOpen(true),
  });
}
