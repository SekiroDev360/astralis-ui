import { createPortal } from "react-dom";
import { useDrawer } from "../drawer.context";
import type { DrawerOverlayProps } from "../drawer.types";

export function DrawerOverlay({ closeOnClick = true }: DrawerOverlayProps) {
  const { open, setOpen } = useDrawer();

  if (!open) return null;

  return createPortal(
    <>
      <style>{`
        @keyframes astralis-fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        .astralis-animate-fade-in {
          animation: astralis-fade-in 200ms cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
      `}</style>
      <div
        className="astralis-fixed astralis-inset-0 astralis-z-50 astralis-bg-black/50 astralis-animate-fade-in"
        onClick={() => closeOnClick && setOpen(false)}
      />
    </>,
    document.body,
  );
}
