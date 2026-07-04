import { useCallback, useId, useMemo, useState, cloneElement, type MouseEvent } from "react";
import { ModalContext, useModal } from "../modal.context";
import type { ModalProps, ModalSlotProps } from "../modal.types";
import { useControllableState } from "../../../../hooks/use-controllable-state";

export function ModalRoot({
  children,
  open: openProp,
  defaultOpen = false,
  onOpenChange,
  size = "md",
  centered = true,
  closeOnOverlayClick = true,
  closeOnEsc = true,
}: ModalProps) {
  const [open, setOpen] = useControllableState({ value: openProp, defaultValue: defaultOpen, onChange: onOpenChange });
  const id = useId();
  const [hasTitle, setHasTitle] = useState(false);
  const [hasDescription, setHasDescription] = useState(false);
  const close = useCallback(() => setOpen(false), [setOpen]);

  const ctx = useMemo(
    () => ({
      open, setOpen, close,
      titleId: `${id}-title`,
      descriptionId: `${id}-desc`,
      hasTitle, setHasTitle, hasDescription, setHasDescription,
      size, centered, closeOnOverlayClick, closeOnEsc,
    }),
    [open, setOpen, close, id, hasTitle, hasDescription, size, centered, closeOnOverlayClick, closeOnEsc],
  );

  return <ModalContext.Provider value={ctx}>{children}</ModalContext.Provider>;
}

/** Wraps a single element and opens the modal on click (asChild-style). */
export function ModalTrigger({ children }: ModalSlotProps) {
  const { setOpen, open } = useModal();
  return cloneElement(children, {
    onClick: (e: MouseEvent) => {
      children.props.onClick?.(e);
      setOpen(true);
    },
    "aria-haspopup": "dialog",
    "aria-expanded": open,
  } as Record<string, unknown>);
}

/** Wraps a single element and closes the modal on click. */
export function ModalClose({ children }: ModalSlotProps) {
  const { close } = useModal();
  return cloneElement(children, {
    onClick: (e: MouseEvent) => {
      children.props.onClick?.(e);
      close();
    },
  } as Record<string, unknown>);
}
