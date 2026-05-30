import { cloneElement } from "react";
import { useDrawer } from "../drawer.context";

export function DrawerClose({ children }: { children: React.ReactNode }) {
  const { setOpen } = useDrawer();

  return cloneElement(
    children as React.ReactElement<{ onClick?: React.MouseEventHandler }>,
    {
      onClick: (e: React.MouseEvent) => {
        // Call original onClick if it exists
        const child = children as React.ReactElement<{
          onClick?: React.MouseEventHandler;
        }>;
        child.props.onClick?.(e);
        setOpen(false);
      },
    },
  );
}
