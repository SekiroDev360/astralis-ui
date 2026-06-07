import { useModal } from "../modal.context";
import Icon from "../../../icon/icon";
import type { ModalCloseTriggerProps } from "../modal.types";

/**
 * Modal.CloseTrigger — a pre-styled ✕ icon button that closes the modal.
 *
 * Typically placed as the last child inside Modal.Header to appear in the
 * top-right corner, but can be placed anywhere inside Modal.Content.
 *
 * @example
 * <Modal.Header>
 *   Settings
 *   <Modal.CloseTrigger />
 * </Modal.Header>
 */
export function ModalCloseTrigger({ className = "" }: ModalCloseTriggerProps) {
  const { setOpen } = useModal();

  return (
    <button
      type="button"
      aria-label="Close dialog"
      onClick={() => setOpen(false)}
      className={[
        "astralis-flex astralis-items-center astralis-justify-center",
        "astralis-w-7 astralis-h-7 astralis-rounded-md astralis-shrink-0",
        "astralis-text-label-muted hover:astralis-text-label-base hover:astralis-bg-surface-muted",
        "astralis-transition-all astralis-duration-150 astralis-cursor-pointer",
        "astralis-outline-none focus-visible:astralis-ring-2 focus-visible:astralis-ring-brand-600 focus-visible:astralis-ring-offset-2",
        className,
      ].join(" ")}
    >
      <Icon name="X" size="xs" />
    </button>
  );
}
