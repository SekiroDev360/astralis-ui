import { useEffect, useRef } from "react";

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

    // ── Scroll lock ────────────────────────────────────────────────
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

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

    // ── Keyboard: Escape + focus trap ─────────────────────────────
    const onKeyDown = (e: KeyboardEvent) => {
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
      document.body.style.overflow = originalOverflow;
      clearTimeout(focusTimer);
      previousFocus?.focus();
    };
  }, [open, setOpen, closeOnEsc]);

  return { containerRef };
}
