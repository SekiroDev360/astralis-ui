import { useDrawer } from "../drawer.context";
import type { DrawerOverlayProps } from "../drawer.types";

export function DrawerOverlay({ closeOnClick = true }: DrawerOverlayProps) {
  const { open, setOpen } = useDrawer();

  if (!open) return null;

  return (
    <div
      className="astralis-fixed astralis-inset-0 astralis-z-50 astralis-bg-black/50"
      onClick={() => closeOnClick && setOpen(false)}
    />
  );
}
