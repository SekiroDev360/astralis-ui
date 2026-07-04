import { useEffect, useState, type ReactNode } from "react";
import { createPortal } from "react-dom";

/** Renders children into `document.body` (after mount, so it's SSR-safe). */
export function Portal({ children, container }: { children: ReactNode; container?: HTMLElement }) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!mounted) return null;
  return createPortal(children, container ?? document.body);
}
