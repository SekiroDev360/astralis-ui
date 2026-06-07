import { useDrawer } from "../drawer.context";
import Icon from "../../../icon/icon";
import type { DrawerCloseTriggerProps } from "../drawer.types";

/**
 * Drawer.CloseTrigger — a pre-styled ✕ icon button that closes the drawer.
 *
 * @example
 * <Drawer.Header>
 *   Profile
 *   <Drawer.CloseTrigger />
 * </Drawer.Header>
 */
export function DrawerCloseTrigger({ className = "" }: DrawerCloseTriggerProps) {
  const { setOpen } = useDrawer();

  return (
    <button
      type="button"
      aria-label="Close drawer"
      onClick={() => setOpen(false)}
      className={[
        "astralis-flex astralis-items-center astralis-justify-center",
        "astralis-w-7 astralis-h-7 astralis-rounded-md astralis-shrink-0",
        "astralis-text-label-muted hover:astralis-text-label-base hover:astralis-bg-surface-muted",
        "astralis-transition-all astralis-duration-150 astralis-cursor-pointer",
        "astralis-outline-none focus-visible:astralis-ring-2 focus-visible:astralis-ring-brand-600 focus-visible:astralis-ring-offset-2",
        className,
      ].join(" ")}
    >
      <Icon name="X" size="xs" />
    </button>
  );
}
