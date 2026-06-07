// modal-header.tsx
import type { ModalHeaderProps } from "../modal.types";

export function ModalHeader({ children }: ModalHeaderProps) {
  return (
    <div className="astralis-mb-4 astralis-text-lg astralis-font-semibold">
      {children}
    </div>
  );
}
