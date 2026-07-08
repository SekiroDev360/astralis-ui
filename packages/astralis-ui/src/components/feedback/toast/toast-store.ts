import type { ToastData, ToastOptions, ToastStatus } from "./toast.types";

/**
 * A tiny module-level store driving the Toaster — the imperative `toast()`
 * API works from anywhere (event handlers, async flows), no context needed.
 * Components subscribe via useSyncExternalStore, so React versions/instances
 * never fight over state.
 */

let toasts: ToastData[] = [];
let counter = 0;
const listeners = new Set<() => void>();

function emit() {
  for (const listener of listeners) listener();
}

export function subscribeToasts(listener: () => void): () => void {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

export function getToasts(): ToastData[] {
  return toasts;
}

function createToast(options: ToastOptions): string {
  const id = `astralis-toast-${++counter}`;
  toasts = [...toasts, { duration: 5000, status: "info", closable: true, ...options, id, open: true }];
  emit();
  return id;
}

/** Flips `open` so the exit transition plays; the Toaster removes it after. */
function dismissToast(id?: string) {
  toasts = toasts.map((t) => (id === undefined || t.id === id ? { ...t, open: false } : t));
  emit();
}

/** Called by the Toaster once the exit transition has finished. */
export function removeToast(id: string) {
  toasts = toasts.filter((t) => t.id !== id);
  emit();
}

type StatusShorthand = (title: ToastOptions["title"], options?: Omit<ToastOptions, "title" | "status">) => string;

const shorthand = (status: ToastStatus): StatusShorthand => (title, options) =>
  createToast({ ...options, title, status });

/**
 * Fire a toast imperatively: `toast({ title })`, or via the status
 * shorthands `toast.success("Saved")`. Requires a `<Toaster />` mounted
 * once near the app root. Returns the toast id; `toast.dismiss(id)` closes
 * one, `toast.dismiss()` closes all.
 */
export const toast = Object.assign((options: ToastOptions) => createToast(options), {
  info: shorthand("info"),
  success: shorthand("success"),
  warning: shorthand("warning"),
  error: shorthand("error"),
  dismiss: dismissToast,
});
