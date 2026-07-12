/**
 * Module-level coordination for stacked overlays (Modal over Modal, Popover
 * inside a Drawer, ...). A lone overlay can't see its siblings, which caused
 * two stacking bugs:
 *
 * - body scroll-lock was set/restored per overlay, so closing a LOWER overlay
 *   while another was still open restored page scroll under the open one.
 *   The lock is now refcounted: first overlay locks, last one restores.
 *
 * - every open overlay listened for Escape/Tab on document, so one keypress
 *   was handled by every layer at once. Handling is now claimed by the
 *   TOPMOST overlay only — Escape peels one layer at a time.
 *
 * All functions are only called from effects, so they are SSR-safe.
 */

const stack: symbol[] = [];

let lockCount = 0;
let originalBodyOverflow = "";

/** Register an open overlay; returns the handle used for topmost checks. */
export function pushOverlay(): symbol {
  const id = Symbol("astralis-overlay");
  stack.push(id);
  return id;
}

export function popOverlay(id: symbol): void {
  const index = stack.indexOf(id);
  if (index !== -1) stack.splice(index, 1);
}

/** True when this overlay is the top of the stack (the one that owns Esc/Tab). */
export function isTopOverlay(id: symbol): boolean {
  return stack[stack.length - 1] === id;
}

/** Refcounted body scroll lock — the first lock saves, the last unlock restores. */
export function lockBodyScroll(): void {
  if (lockCount === 0) {
    originalBodyOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
  }
  lockCount++;
}

export function unlockBodyScroll(): void {
  if (lockCount === 0) return; // stray unlock — nothing to restore
  lockCount--;
  if (lockCount === 0) {
    document.body.style.overflow = originalBodyOverflow;
  }
}
