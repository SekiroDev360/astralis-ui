import type { DrawerHeaderProps } from "../drawer.types";

export function DrawerHeader({ children }: DrawerHeaderProps) {
  return (
    <div className="astralis-mb-4 astralis-text-lg astralis-font-semibold">
      {children}
    </div>
  );
}
