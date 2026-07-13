import { useEffect, useMemo, type CSSProperties } from "react";
import { usePopover } from "../popover.context";
import type { PopoverContentProps } from "../popover.types";
import { popoverContentClasses, popoverArrowClasses } from "../popover.styles";
import { Portal } from "../../portal";
import { usePresence } from "../../../../hooks/use-presence";
import { useDismiss } from "../../../../hooks/use-dismiss";
import { useAnchorPosition } from "../../../../hooks/use-anchor-position";
import { astralisMerge } from "../../../../utils/astralis-merge";

const DURATION = 160;

export function PopoverContent({ children, className = "", withArrow = false, ...rest }: PopoverContentProps) {
  const {
    open, close, triggerRef, contentRef, arrowRef, contentId, titleId, descriptionId,
    hasTitle, hasDescription, side, align, sideOffset, alignOffset, avoidCollisions,
    closeOnEsc, closeOnOutsidePointer,
  } = usePopover();

  const { mounted, state } = usePresence(open, DURATION);
  const { x, y, side: resolvedSide, arrow } = useAnchorPosition({
    open, anchorRef: triggerRef, floatingRef: contentRef, side, align, sideOffset, alignOffset, avoidCollisions,
  });

  const dismissRefs = useMemo(() => [triggerRef, contentRef], [triggerRef, contentRef]);
  useDismiss(open, close, { refs: dismissRefs, closeOnEscape: closeOnEsc, closeOnOutsidePointer });

  // Focus the panel on open; return focus to the trigger on close.
  useEffect(() => {
    if (!open) return;
    const t = setTimeout(() => contentRef.current?.focus(), 0);
    return () => {
      clearTimeout(t);
      triggerRef.current?.focus();
    };
  }, [open, contentRef, triggerRef]);

  if (!mounted) return null;
  const isOpen = state === "open";

  const arrowStyle: CSSProperties = {};
  if (resolvedSide === "bottom") { arrowStyle.top = -4; arrowStyle.left = arrow.left; }
  else if (resolvedSide === "top") { arrowStyle.bottom = -4; arrowStyle.left = arrow.left; }
  else if (resolvedSide === "right") { arrowStyle.left = -4; arrowStyle.top = arrow.top; }
  else { arrowStyle.right = -4; arrowStyle.top = arrow.top; }

  return (
    <Portal>
      <div
        ref={contentRef}
        id={contentId}
        role="dialog"
        aria-labelledby={hasTitle ? titleId : undefined}
        aria-describedby={hasDescription ? descriptionId : undefined}
        tabIndex={-1}
        data-side={resolvedSide}
        style={{ left: x, top: y, transitionDuration: `${DURATION}ms` }}
        className={astralisMerge(
          popoverContentClasses,
          // `transition` (not -all): left/top must snap, never animate.
          "astralis:p-4 astralis:transition",
          isOpen ? "astralis:opacity-100 astralis:scale-100" : "astralis:opacity-0 astralis:scale-95",
          className,
        )}
        {...rest}
      >
        {children}
        {withArrow && <div ref={arrowRef} className={popoverArrowClasses} style={arrowStyle} />}
      </div>
    </Portal>
  );
}
