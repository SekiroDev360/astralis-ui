import { cloneElement } from "react";
import { useModal } from "../modal.context";

export function ModalClose({ children }: { children: React.ReactNode }) {
  const { setOpen } = useModal();

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
