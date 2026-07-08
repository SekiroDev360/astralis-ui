import { useEffect, useMemo } from "react";
import { Portal } from "../../overlay/portal";
import { useMenu } from "../menu.context";
import type { MenuContentProps } from "../menu.types";
import { astralisMerge } from "../../../utils/astralis-merge";
import { usePresence } from "../../../hooks/use-presence";
import { useAnchorPosition } from "../../../hooks/use-anchor-position";
import { useDismiss } from "../../../hooks/use-dismiss";
import { useRovingFocus } from "../../../hooks/use-roving-focus";
import { menuContentClasses, menuMotionClasses } from "../menu.styles";

const DURATION = 160;

export function MenuContent({ className = "", children, onKeyDown, ...rest }: MenuContentProps) {
  const { open, close, triggerRef, contentRef, contentId, side, align, sideOffset } = useMenu();
  const { mounted, state } = usePresence(open, DURATION);

  const { x, y, side: resolvedSide } = useAnchorPosition({
    open: mounted,
    anchorRef: triggerRef,
    floatingRef: contentRef,
    side,
    align,
    sideOffset,
  });

  // Escape + outside pointer, coordinated with the shared overlay stack.
  const dismissRefs = useMemo(() => [triggerRef, contentRef], [triggerRef, contentRef]);
  useDismiss(open, close, { refs: dismissRefs });

  const roving = useRovingFocus<HTMLDivElement>({
    itemSelector: "[data-astralis-menu-item]",
    orientation: "vertical",
    typeahead: true,
  });

  // Focus the first item on open; hand focus back to the trigger on close.
  useEffect(() => {
    if (!open) return;
    const timer = setTimeout(() => roving.focusFirst(), 0);
    return () => {
      clearTimeout(timer);
      triggerRef.current?.focus();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  if (!mounted) return null;

  return (
    <Portal>
      <div
        ref={(node) => {
          contentRef.current = node;
          roving.containerRef.current = node;
        }}
        id={contentId}
        role="menu"
        aria-orientation="vertical"
        tabIndex={-1}
        data-side={resolvedSide}
        style={{ left: x, top: y, transitionDuration: `${DURATION}ms` }}
        onKeyDown={(e) => {
          onKeyDown?.(e);
          // Tab leaves a menu by closing it (APG); arrows/Home/End/typeahead rove.
          if (e.key === "Tab") {
            close();
            return;
          }
          roving.onKeyDown(e);
        }}
        className={astralisMerge(menuContentClasses, menuMotionClasses(state), className)}
        {...rest}
      >
        {children}
      </div>
    </Portal>
  );
}
MenuContent.displayName = "Menu.Content";
