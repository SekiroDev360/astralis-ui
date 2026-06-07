import { cloneElement, isValidElement } from "react";
import type { HTMLAttributes } from "react";
import { useModal } from "../modal.context";
import type { ModalTriggerProps } from "../modal.types";

export function ModalTrigger({ children }: ModalTriggerProps) {
  const { setOpen } = useModal();

  if (!isValidElement(children)) return null;

  return cloneElement(children as React.ReactElement<HTMLAttributes<HTMLElement>>, {
    onClick: () => setOpen(true),
  });
}
