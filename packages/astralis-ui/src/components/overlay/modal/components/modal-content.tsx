import { useModal } from "../modal.context";
import type { ModalContentProps } from "../modal.types";
import { modalViewportVariants, modalBackdropClasses, modalPanelVariants, SCRIM_COLOR } from "../modal.styles";
import { Portal } from "../../portal";
import { usePresence } from "../../../../hooks/use-presence";
import { useOverlayBehavior } from "../../../../hooks/use-overlay-behavior";
import { astralisMerge } from "../../../../utils/astralis-merge";

const DURATION = 200;

export function ModalContent({ children, className = "", ...rest }: ModalContentProps) {
  const { open, setOpen, close, titleId, descriptionId, hasTitle, hasDescription, size, centered, closeOnOverlayClick, closeOnEsc } = useModal();
  const { mounted, state } = usePresence(open, DURATION);
  const { containerRef } = useOverlayBehavior(open, setOpen, { closeOnEsc });

  if (!mounted) return null;
  const isOpen = state === "open";

  return (
    <Portal>
      <div className={modalViewportVariants({ centered })}>
        <div
          aria-hidden
          onClick={closeOnOverlayClick ? close : undefined}
          className={`${modalBackdropClasses} astralis:transition-opacity ${isOpen ? "astralis:opacity-100" : "astralis:opacity-0"}`}
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
            modalPanelVariants({ size }),
            "astralis:outline-none astralis:transition-all",
            isOpen ? "astralis:opacity-100 astralis:scale-100 astralis:translate-y-0" : "astralis:opacity-0 astralis:scale-95 astralis:translate-y-2",
            className,
          )}
          style={{ transitionDuration: `${DURATION}ms` }}
          {...rest}
        >
          {children}
        </div>
      </div>
    </Portal>
  );
}
