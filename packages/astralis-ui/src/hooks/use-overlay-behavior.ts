import { useEffect, useRef } from "react";
import {
  isTopOverlay,
  lockBodyScroll,
  popOverlay,
  pushOverlay,
  unlockBodyScroll,
} from "../utils/overlay-stack";

const FOCUSABLE =
  'button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';

export interface UseOverlayBehaviorOptions {
  /** Whether pressing Escape closes the overlay. @default true */
  closeOnEsc?: boolean;
}

/**
 * Shared behavior hook for overlay components (Modal, Drawer).
 * Handles:
 * - Body scroll lock
 * - Initial focus placement
 * - Return focus to trigger element on close
 * - Focus trap (Tab / Shift+Tab cycling)
 * - Escape key to close
 *
 * @returns containerRef — attach to the dialog/drawer panel element
 */
export function useOverlayBehavior(
  open: boolean,
  setOpen: (open: boolean) => void,
  options: UseOverlayBehaviorOptions = {}
) {
  const { closeOnEsc = true } = options;
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;

    // ── Stack registration + refcounted scroll lock ────────────────
    // Coordinates with other open overlays: only the topmost handles
    // Esc/Tab, and page scroll stays locked until the LAST overlay closes.
    const overlayId = pushOverlay();
    lockBodyScroll();

    // ── Return focus target ────────────────────────────────────────
    const previousFocus = document.activeElement as HTMLElement | null;

    // ── Initial focus (deferred so the portal has rendered) ────────
    const focusTimer = setTimeout(() => {
      const container = containerRef.current;
      if (!container) return;
      const focusables = Array.from(
        container.querySelectorAll<HTMLElement>(FOCUSABLE)
      );
      (focusables[0] ?? container).focus();
    }, 0);

    // ── Keyboard: Escape + focus trap (topmost overlay only) ─────
    const onKeyDown = (e: KeyboardEvent) => {
      if (!isTopOverlay(overlayId)) return;

      if (e.key === "Escape") {
        if (closeOnEsc) setOpen(false);
        return;
      }

      if (e.key === "Tab") {
        const container = containerRef.current;
        if (!container) return;
        const focusables = Array.from(
          container.querySelectorAll<HTMLElement>(FOCUSABLE)
        );
        if (focusables.length === 0) return;

        const first = focusables[0];
        const last = focusables[focusables.length - 1];

        if (e.shiftKey) {
          if (document.activeElement === first) {
            e.preventDefault();
            last.focus();
          }
        } else {
          if (document.activeElement === last) {
            e.preventDefault();
            first.focus();
          }
        }
      }
    };

    document.addEventListener("keydown", onKeyDown);

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      popOverlay(overlayId);
      unlockBodyScroll();
      clearTimeout(focusTimer);
      previousFocus?.focus();
    };
  }, [open, setOpen, closeOnEsc]);

  return { containerRef };
}
