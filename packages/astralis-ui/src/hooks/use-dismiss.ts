import { useEffect, type RefObject } from "react";

interface UseDismissOptions {
  enabled?: boolean;
  /** Refs whose subtrees are considered "inside" (won't dismiss). */
  refs: RefObject<HTMLElement | null>[];
  closeOnEscape?: boolean;
  closeOnOutsidePointer?: boolean;
}

/**
 * Non-modal dismissal for Popover/Tooltip: closes on Escape and on pointer-down
 * outside every provided ref. Uses capture-phase pointerdown so it fires before
 * inner handlers.
 */
export function useDismiss(
  open: boolean,
  onClose: () => void,
  { enabled = true, refs, closeOnEscape = true, closeOnOutsidePointer = true }: UseDismissOptions,
) {
  useEffect(() => {
    if (!open || !enabled) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (closeOnEscape && e.key === "Escape") onClose();
    };
    const onPointerDown = (e: PointerEvent) => {
      if (!closeOnOutsidePointer) return;
      const target = e.target as Node;
      for (const ref of refs) {
        if (ref.current && ref.current.contains(target)) return;
      }
      onClose();
    };

    document.addEventListener("keydown", onKeyDown);
    document.addEventListener("pointerdown", onPointerDown, true);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("pointerdown", onPointerDown, true);
    };
  }, [open, enabled, refs, closeOnEscape, closeOnOutsidePointer, onClose]);
}
