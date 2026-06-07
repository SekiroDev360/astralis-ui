import { cloneElement, isValidElement } from "react";
import { useModal } from "../modal.context";
import type { ModalTriggerProps } from "../modal.types";

export function ModalTrigger({ children }: ModalTriggerProps) {
  const { setOpen } = useModal();

  if (!isValidElement(children)) return null;

  return cloneElement(children, {
    onClick: () => setOpen(true),
  });
}
