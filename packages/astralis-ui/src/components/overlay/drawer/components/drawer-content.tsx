import { useEffect } from "react";
import { createPortal } from "react-dom";
import { useDrawer } from "../drawer.context";
import type { DrawerContentProps } from "../drawer.types";

export function DrawerContent({ children }: DrawerContentProps) {
  const { open, setOpen, side } = useDrawer();

  useEffect(() => {
    if (!open) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
      }
    };

    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open, setOpen]);

  if (!open) return null;

  const base =
    "astralis-fixed astralis-z-50 astralis-bg-white astralis-shadow-lg astralis-transition-transform astralis-duration-300";

  const sideStyles = {
    right: `${base} astralis-right-0 astralis-top-0 astralis-h-full astralis-w-80`,
    left: `${base} astralis-left-0 astralis-top-0 astralis-h-full astralis-w-80`,
    bottom: `${base} astralis-bottom-0 astralis-left-0 astralis-w-full astralis-h-80`,
    top: `${base} astralis-top-0 astralis-left-0 astralis-w-full astralis-h-80`,
  };

  return createPortal(
    <div className={sideStyles[side]}>{children}</div>,
    document.body,
  );
}
