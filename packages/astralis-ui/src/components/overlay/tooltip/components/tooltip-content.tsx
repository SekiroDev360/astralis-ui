import { useEffect, type CSSProperties } from "react";
import { useTooltip } from "../tooltip.context";
import type { TooltipContentProps } from "../tooltip.types";
import { tooltipContentClasses, tooltipArrowClasses } from "../tooltip.styles";
import { Portal } from "../../portal";
import { usePresence } from "../../../../hooks/use-presence";
import { useAnchorPosition } from "../../../../hooks/use-anchor-position";
import { astralisMerge } from "../../../../utils/astralis-merge";

const DURATION = 140;

export function TooltipContent({ children, className = "", withArrow = false }: TooltipContentProps) {
  const { open, hide, triggerRef, contentRef, tooltipId, side, align, sideOffset, avoidCollisions } = useTooltip();
  const { mounted, state } = usePresence(open, DURATION);
  const { x, y, side: resolvedSide, arrow } = useAnchorPosition({
    open, anchorRef: triggerRef, floatingRef: contentRef, side, align, sideOffset, avoidCollisions,
  });

  // Escape dismisses the tooltip.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") hide(); };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, hide]);

  if (!mounted) return null;
  const isOpen = state === "open";

  const arrowStyle: CSSProperties = {};
  if (resolvedSide === "bottom") { arrowStyle.top = -3; arrowStyle.left = arrow.left; }
  else if (resolvedSide === "top") { arrowStyle.bottom = -3; arrowStyle.left = arrow.left; }
  else if (resolvedSide === "right") { arrowStyle.left = -3; arrowStyle.top = arrow.top; }
  else { arrowStyle.right = -3; arrowStyle.top = arrow.top; }

  return (
    <Portal>
      <div
        ref={contentRef}
        id={tooltipId}
        role="tooltip"
        data-side={resolvedSide}
        style={{ left: x, top: y, transitionDuration: `${DURATION}ms` }}
        className={astralisMerge(
          tooltipContentClasses,
          "astralis:transition-opacity",
          isOpen ? "astralis:opacity-100" : "astralis:opacity-0",
          className,
        )}
      >
        {children}
        {withArrow && <div className={tooltipArrowClasses} style={arrowStyle} />}
      </div>
    </Portal>
  );
}
