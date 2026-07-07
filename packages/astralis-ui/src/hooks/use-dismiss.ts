import { useEffect, type RefObject } from "react";
import { isTopOverlay, popOverlay, pushOverlay } from "../utils/overlay-stack";

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

    // Join the shared overlay stack so Escape peels one layer at a time —
    // a Popover opened inside a Modal closes first, the Modal stays open.
    const overlayId = pushOverlay();

    const onKeyDown = (e: KeyboardEvent) => {
      if (closeOnEscape && e.key === "Escape" && isTopOverlay(overlayId)) onClose();
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
      popOverlay(overlayId);
    };
  }, [open, enabled, refs, closeOnEscape, closeOnOutsidePointer, onClose]);
}
