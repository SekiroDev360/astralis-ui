import type { DrawerFooterProps } from "../drawer.types";

export function DrawerFooter({ children }: DrawerFooterProps) {
  return (
    <div className="astralis-mt-6 astralis-flex astralis-justify-end astralis-gap-2">
      {children}
    </div>
  );
}
