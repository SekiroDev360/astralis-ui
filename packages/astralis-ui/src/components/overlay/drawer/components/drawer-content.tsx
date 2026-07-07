import { useDrawer } from "../drawer.context";
import type { DrawerContentProps } from "../drawer.types";
import { drawerBackdropClasses, drawerPanelVariants, drawerSizeStyle, drawerClosedTransform, SCRIM_COLOR } from "../drawer.styles";
import { Portal } from "../../portal";
import { usePresence } from "../../../../hooks/use-presence";
import { useOverlayBehavior } from "../../../../hooks/use-overlay-behavior";
import { astralisMerge } from "../../../../utils/astralis-merge";

const DURATION = 250;

export function DrawerContent({ children, className = "", ...rest }: DrawerContentProps) {
  const { open, setOpen, close, titleId, descriptionId, hasTitle, hasDescription, placement, size, closeOnOverlayClick, closeOnEsc } = useDrawer();
  const { mounted, state } = usePresence(open, DURATION);
  const { containerRef } = useOverlayBehavior(open, setOpen, { closeOnEsc });

  if (!mounted) return null;
  const isOpen = state === "open";

  return (
    <Portal>
      <div
        aria-hidden
        onClick={closeOnOverlayClick ? close : undefined}
        className={`${drawerBackdropClasses} astralis:transition-opacity ${isOpen ? "astralis:opacity-100" : "astralis:opacity-0"}`}
        style={{ backgroundColor: SCRIM_COLOR, transitionDuration: `${DURATION}ms` }}
      />
      <div
        ref={containerRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={hasTitle ? titleId : undefined}
        aria-describedby={hasDescription ? descriptionId : undefined}
        tabIndex={-1}
        className={astralisMerge(
          drawerPanelVariants({ placement }),
          "astralis:transition-transform astralis:ease-out",
          isOpen ? "astralis:translate-x-0 astralis:translate-y-0" : drawerClosedTransform[placement],
          className,
        )}
        style={{ ...drawerSizeStyle(placement, size), transitionDuration: `${DURATION}ms` }}
        {...rest}
      >
        {children}
      </div>
    </Portal>
  );
}
