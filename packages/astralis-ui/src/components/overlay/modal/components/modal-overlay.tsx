import { useModal } from "../modal.context";
import type { ModalOverlayProps } from "../modal.types";

export function ModalOverlay({ closeOnClick = true }: ModalOverlayProps) {
  const { open, setOpen } = useModal();

  if (!open) return null;

  return (
    <div
      className="astralis-fixed astralis-inset-0 astralis-z-50 astralis-bg-black/50"
      onClick={() => closeOnClick && setOpen(false)}
    />
  );
}
