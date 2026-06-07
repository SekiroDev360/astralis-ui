import { useModal } from "../modal.context";
import type { ModalBodyProps } from "../modal.types";

/**
 * Modal body — the primary scrollable content area between the header and footer.
 *
 * When `scrollBehavior="inside"` (set on the Modal root), this element grows
 * to fill available space and scrolls independently; the Header and Footer
 * remain sticky.
 *
 * When `scrollBehavior="outside"` (default), this element has no overflow
 * constraints and the entire panel scrolls.
 */
export function ModalBody({ children, className = "" }: ModalBodyProps) {
  const { scrollBehavior } = useModal();

  return (
    <div
      className={[
        "astralis-px-6 astralis-py-4",
        scrollBehavior === "inside"
          ? "astralis-flex-1 astralis-overflow-y-auto astralis-min-h-0"
          : "",
        className,
      ].join(" ")}
    >
      {children}
    </div>
  );
}
