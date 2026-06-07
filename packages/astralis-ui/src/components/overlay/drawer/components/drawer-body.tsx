import type { DrawerBodyProps } from "../drawer.types";

/**
 * Drawer body — the primary scrollable content area between header and footer.
 * Grows to fill available height and scrolls independently.
 */
export function DrawerBody({ children, className = "" }: DrawerBodyProps) {
  return (
    <div
      className={[
        "astralis-flex-1 astralis-overflow-y-auto astralis-min-h-0",
        "astralis-px-6 astralis-py-4",
        className,
      ].join(" ")}
    >
      {children}
    </div>
  );
}
