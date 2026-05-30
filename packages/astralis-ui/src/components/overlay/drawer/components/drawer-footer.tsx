import type { DrawerFooterProps } from "../drawer.types";

export function DrawerFooter({ children }: DrawerFooterProps) {
  return (
    <div className="astralis-absolute astralis-bottom-0 astralis-right-0 astralis-border-t astralis-border-border-subtle astralis-w-full astralis-p-4 astralis-flex astralis-justify-end astralis-gap-2">
      {children}
    </div>
  );
}
