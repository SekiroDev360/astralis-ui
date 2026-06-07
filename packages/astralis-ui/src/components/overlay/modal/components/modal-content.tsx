import { useEffect } from "react";
import { createPortal } from "react-dom";
import { useModal } from "../modal.context";
import type { ModalContentProps } from "../modal.types";

export function ModalContent({ children }: ModalContentProps) {
  const { open, setOpen } = useModal();

  useEffect(() => {
    if (!open) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
      }
    };

    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open, setOpen]);

  if (!open) return null;

  return createPortal(
    <div className="astralis-fixed astralis-inset-0 astralis-z-50 astralis-flex astralis-items-center astralis-justify-center">
      {children}
    </div>,
    document.body
  );
}
