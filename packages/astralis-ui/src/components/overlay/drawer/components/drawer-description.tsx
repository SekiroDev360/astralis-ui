import { useDrawer } from "../drawer.context";
import type { DrawerDescriptionProps } from "../drawer.types";

/**
 * Drawer.Description — renders accessible description text and
 * auto-links it to the `aria-describedby` attribute on the drawer panel.
 *
 * @example
 * <Drawer.Content>
 *   <Drawer.Header>Edit Profile</Drawer.Header>
 *   <Drawer.Description>Update your account information below.</Drawer.Description>
 *   <Drawer.Body>...</Drawer.Body>
 * </Drawer.Content>
 */
export function DrawerDescription({ children, className = "" }: DrawerDescriptionProps) {
  const { descriptionId } = useDrawer();

  return (
    <p
      id={descriptionId}
      className={[
        "astralis-px-6 astralis-pt-1 astralis-pb-3",
        "astralis-text-sm astralis-text-label-muted",
        className,
      ].join(" ")}
    >
      {children}
    </p>
  );
}
