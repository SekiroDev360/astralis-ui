// modal-footer.tsx
import type { ModalFooterProps } from "../modal.types";

export function ModalFooter({ children }: ModalFooterProps) {
  return (
    <div className="astralis-mt-6 astralis-flex astralis-justify-end astralis-gap-2">
      {children}
    </div>
  );
}
