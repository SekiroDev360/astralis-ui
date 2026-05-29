import { useEffect, useLayoutEffect, useRef, useState, useCallback } from "react";
import { createPortal } from "react-dom";
import { usePopover } from "../popover.context";
import { useTheme, getPrimaryShades } from "../../../../theme";
import type { PopoverContentProps } from "../popover.types";

export function PopoverContent({
  children,
  side = "bottom",
  offset = 8,
  className,
}: PopoverContentProps) {
  const {
    open,
    setOpen,
    triggerRef,
    trigger,
    handleOpen,
    handleClose,
    triggerId,
    contentId,
  } = usePopover();
  const contentRef = useRef<HTMLDivElement>(null);
  const { resolvedTheme, tokens } = useTheme();

  // Coordinates and arrow positions
  const [style, setStyle] = useState<React.CSSProperties>({
    position: "fixed",
    opacity: 0,
    pointerEvents: "none",
  });
  const [arrowStyle, setArrowStyle] = useState<React.CSSProperties>({});

  const updatePosition = useCallback(() => {
    if (!open || !triggerRef.current || !contentRef.current) return;

    const triggerRect = triggerRef.current.getBoundingClientRect();
    const contentRect = contentRef.current.getBoundingClientRect();

    let top = 0;
    let left = 0;

    const horizontalCenter =
      triggerRect.left + triggerRect.width / 2 - contentRect.width / 2;
    const verticalCenter =
      triggerRect.top + triggerRect.height / 2 - contentRect.height / 2;

    switch (side) {
      case "top":
        top = triggerRect.top - contentRect.height - offset;
        left = horizontalCenter;
        break;
      case "topLeft":
        top = triggerRect.top - contentRect.height - offset;
        left = triggerRect.left;
        break;
      case "topRight":
        top = triggerRect.top - contentRect.height - offset;
        left = triggerRect.right - contentRect.width;
        break;

      case "bottom":
        top = triggerRect.bottom + offset;
        left = horizontalCenter;
        break;
      case "bottomLeft":
        top = triggerRect.bottom + offset;
        left = triggerRect.left;
        break;
      case "bottomRight":
        top = triggerRect.bottom + offset;
        left = triggerRect.right - contentRect.width;
        break;

      case "left":
        top = verticalCenter;
        left = triggerRect.left - contentRect.width - offset;
        break;
      case "leftTop":
        top = triggerRect.top;
        left = triggerRect.left - contentRect.width - offset;
        break;
      case "leftBottom":
        top = triggerRect.bottom - contentRect.height;
        left = triggerRect.left - contentRect.width - offset;
        break;

      case "right":
        top = verticalCenter;
        left = triggerRect.right + offset;
        break;
      case "rightTop":
        top = triggerRect.top;
        left = triggerRect.right + offset;
        break;
      case "rightBottom":
        top = triggerRect.bottom - contentRect.height;
        left = triggerRect.right + offset;
        break;
    }

    setStyle({
      position: "fixed",
      zIndex: 50,
      top,
      left,
      opacity: 1,
      pointerEvents: "auto",
    });

    // Arrow positioning calculations
    let arrowLeft = triggerRect.left + triggerRect.width / 2 - left;
    let arrowTop = triggerRect.top + triggerRect.height / 2 - top;

    if (side.startsWith("top") || side.startsWith("bottom")) {
      // Clamp arrow inside the card, leaving some margin for rounded corners (16px)
      arrowLeft = Math.max(16, Math.min(contentRect.width - 16, arrowLeft));
      setArrowStyle({ left: `${arrowLeft}px` });
    } else if (side.startsWith("left") || side.startsWith("right")) {
      // Clamp arrow inside the card, leaving some margin for rounded corners (16px)
      arrowTop = Math.max(16, Math.min(contentRect.height - 16, arrowTop));
      setArrowStyle({ top: `${arrowTop}px` });
    }
  }, [open, side, offset, triggerRef]);

  /* Repositioning on scroll or window resize */
  useLayoutEffect(() => {
    if (!open) return;

    updatePosition();

    window.addEventListener("resize", updatePosition);
    window.addEventListener("scroll", updatePosition, { capture: true });

    return () => {
      window.removeEventListener("resize", updatePosition);
      window.removeEventListener("scroll", updatePosition, { capture: true });
    };
  }, [open, updatePosition]);

  /* Escape + outside click */
  useEffect(() => {
    if (!open) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };

    const onPointerDown = (e: MouseEvent) => {
      if (
        contentRef.current &&
        !contentRef.current.contains(e.target as Node) &&
        triggerRef.current &&
        !triggerRef.current.contains(e.target as Node)
      ) {
        setOpen(false);
      }
    };

    document.addEventListener("keydown", onKeyDown);
    document.addEventListener("mousedown", onPointerDown);

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("mousedown", onPointerDown);
    };
  }, [open, setOpen, triggerRef]);

  /* Hover handlers for content to keep it open */
  const hoverProps =
    trigger === "hover"
      ? {
          onMouseEnter: handleOpen,
          onMouseLeave: handleClose,
        }
      : {};

  if (!open) return null;

  const tokenStyles = tokens?.primaryColor
    ? getPrimaryShades(tokens.primaryColor)
    : undefined;

  const themeClass = `astralis ${resolvedTheme === "dark" ? "astralis-dark" : ""}`;

  // Decide arrow styling and placement
  let arrowClass = "";
  if (side.startsWith("bottom")) {
    // Arrow is on the top edge, pointing UP (top & left borders)
    arrowClass = "astralis-absolute astralis-top-0 astralis--translate-y-1/2 astralis--translate-x-1/2 astralis-w-2.5 astralis-h-2.5 astralis-rotate-45 astralis-border-t astralis-border-l astralis-bg-surface-popover astralis-border-border-subtle";
  } else if (side.startsWith("top")) {
    // Arrow is on the bottom edge, pointing DOWN (bottom & right borders)
    arrowClass = "astralis-absolute astralis-bottom-0 astralis-translate-y-1/2 astralis--translate-x-1/2 astralis-w-2.5 astralis-h-2.5 astralis-rotate-45 astralis-border-b astralis-border-r astralis-bg-surface-popover astralis-border-border-subtle";
  } else if (side.startsWith("right")) {
    // Arrow is on the left edge, pointing LEFT (bottom & left borders)
    arrowClass = "astralis-absolute astralis-left-0 astralis--translate-x-1/2 astralis--translate-y-1/2 astralis-w-2.5 astralis-h-2.5 astralis-rotate-45 astralis-border-b astralis-border-l astralis-bg-surface-popover astralis-border-border-subtle";
  } else if (side.startsWith("left")) {
    // Arrow is on the right edge, pointing RIGHT (top & right borders)
    arrowClass = "astralis-absolute astralis-right-0 astralis-translate-x-1/2 astralis--translate-y-1/2 astralis-w-2.5 astralis-h-2.5 astralis-rotate-45 astralis-border-t astralis-border-r astralis-bg-surface-popover astralis-border-border-subtle";
  }

  return createPortal(
    <>
      <style>{`
        @keyframes astralis-popover-in {
          from { transform: scale(0.96); opacity: 0; }
          to { transform: scale(1); opacity: 1; }
        }
        .astralis-animate-popover-in {
          animation: astralis-popover-in 120ms cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
      `}</style>
      <div
        ref={contentRef}
        style={{ ...style, ...tokenStyles }}
        id={contentId}
        role="dialog"
        aria-labelledby={triggerId}
        className={[
          "astralis-animate-popover-in",
          "astralis-rounded-lg astralis-max-w-80 astralis-w-full astralis-bg-surface-popover astralis-text-content-primary astralis-shadow-lg",
          "astralis-p-3 astralis-border astralis-border-border-subtle astralis-relative",
          themeClass,
          className || "",
        ].join(" ")}
        {...hoverProps}
      >
        {/* Pointer Arrow */}
        {arrowClass && <div className={arrowClass} style={arrowStyle} />}
        
        {children}
      </div>
    </>,
    document.body,
  );
}
