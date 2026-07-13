import type { ReactNode } from "react";
import { createPortal } from "react-dom";

/**
 * Renders children into `document.body`. Guarded for SSR (no document on the
 * server) but NOT deferred behind an effect: overlay panels must exist in the
 * same commit that opens them, so anchor positioning can measure them in its
 * layout effect. (Portal children are never server-rendered or hydrated, so
 * rendering the portal during the client render is safe.)
 */
export function Portal({ children, container }: { children: ReactNode; container?: HTMLElement }) {
  if (typeof document === "undefined") return null;
  return createPortal(children, container ?? document.body);
}
