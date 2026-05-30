import {
  cloneElement,
  isValidElement,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  useId,
  useCallback,
} from "react";
import { createPortal } from "react-dom";
import { useTheme, getPrimaryShades } from "../../../theme";
import type { TooltipProps } from "./tooltip.types";

export function Tooltip({
  label,
  content,
  side = "top",
  offset = 6,
  delay = 300,
  children,
}: TooltipProps) {
  const tooltipContent = label ?? content;
  const tooltipId = useId();

  const triggerRef = useRef<HTMLElement>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<number | null>(null);

  const [open, setOpen] = useState(false);
  const [style, setStyle] = useState<React.CSSProperties>({
    position: "fixed",
    opacity: 0,
    pointerEvents: "none",
  });
  const [arrowStyle, setArrowStyle] = useState<React.CSSProperties>({});
  const { resolvedTheme, tokens } = useTheme();

  /* ----------------------------- */
  /* Hover / focus handlers        */
  /* ----------------------------- */

  const show = () => {
    timeoutRef.current = window.setTimeout(() => {
      setOpen(true);
    }, delay);
  };

  const hide = () => {
    if (timeoutRef.current) {
      window.clearTimeout(timeoutRef.current);
    }
    setOpen(false);
  };

  /* ----------------------------- */
  /* Escape handling               */
  /* ----------------------------- */

  useEffect(() => {
    if (!open) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") hide();
    };

    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open]);

  /* ----------------------------- */
  /* Positioning & Arrow           */
  /* ----------------------------- */

  const updatePosition = useCallback(() => {
    if (!open || !triggerRef.current || !tooltipRef.current) return;

    const t = triggerRef.current.getBoundingClientRect();
    const c = tooltipRef.current.getBoundingClientRect();

    let top = 0;
    let left = 0;

    const horizontalCenter = t.left + t.width / 2 - c.width / 2;
    const verticalCenter = t.top + t.height / 2 - c.height / 2;

    switch (side) {
      case "top":
        top = t.top - c.height - offset;
        left = horizontalCenter;
        break;
      case "bottom":
        top = t.bottom + offset;
        left = horizontalCenter;
        break;
      case "right":
        top = verticalCenter;
        left = t.right + offset;
        break;
      case "left":
        top = verticalCenter;
        left = t.left - c.width - offset;
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
    let arrowLeft = t.left + t.width / 2 - left;
    let arrowTop = t.top + t.height / 2 - top;

    if (side === "top" || side === "bottom") {
      // Clamp arrow inside the card, leaving some margin for rounded corners (12px)
      arrowLeft = Math.max(12, Math.min(c.width - 12, arrowLeft));
      setArrowStyle({ left: `${arrowLeft}px` });
    } else if (side === "left" || side === "right") {
      // Clamp arrow inside the card, leaving some margin for rounded corners (12px)
      arrowTop = Math.max(12, Math.min(c.height - 12, arrowTop));
      setArrowStyle({ top: `${arrowTop}px` });
    }
  }, [open, side, offset]);

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

  /* ----------------------------- */
  /* Render                        */
  /* ----------------------------- */

  if (!isValidElement(children) || !tooltipContent) {
    return children;
  }

  const childrenElement = children as React.ReactElement<any>;

  const trigger = cloneElement(
    childrenElement,
    {
      ref: triggerRef,
      id: childrenElement.props.id || undefined,
      "aria-describedby": tooltipId,
      onMouseEnter: show,
      onMouseLeave: hide,
      onFocus: show,
      onBlur: hide,
    }
  );

  const tokenStyles = tokens?.primaryColor
    ? getPrimaryShades(tokens.primaryColor)
    : undefined;

  const themeClass = `astralis ${resolvedTheme === "dark" ? "astralis-dark" : ""}`;

  // Decide arrow styling and placement
  let arrowClass = "";
  if (side === "bottom") {
    // Arrow is on the top edge, pointing UP (top & left borders)
    arrowClass = "astralis-absolute astralis-top-0 astralis--translate-y-1/2 astralis--translate-x-1/2 astralis-w-2 astralis-h-2 astralis-rotate-45 astralis-border-t astralis-border-l astralis-bg-zinc-900 dark:astralis-bg-zinc-800 astralis-border-black/5 dark:astralis-border-zinc-700/60";
  } else if (side === "top") {
    // Arrow is on the bottom edge, pointing DOWN (bottom & right borders)
    arrowClass = "astralis-absolute astralis-bottom-0 astralis-translate-y-1/2 astralis--translate-x-1/2 astralis-w-2 astralis-h-2 astralis-rotate-45 astralis-border-b astralis-border-r astralis-bg-zinc-900 dark:astralis-bg-zinc-800 astralis-border-black/5 dark:astralis-border-zinc-700/60";
  } else if (side === "right") {
    // Arrow is on the left edge, pointing LEFT (bottom & left borders)
    arrowClass = "astralis-absolute astralis-left-0 astralis--translate-x-1/2 astralis--translate-y-1/2 astralis-w-2 astralis-h-2 astralis-rotate-45 astralis-border-b astralis-border-l astralis-bg-zinc-900 dark:astralis-bg-zinc-800 astralis-border-black/5 dark:astralis-border-zinc-700/60";
  } else if (side === "left") {
    // Arrow is on the right edge, pointing RIGHT (top & right borders)
    arrowClass = "astralis-absolute astralis-right-0 astralis-translate-x-1/2 astralis--translate-y-1/2 astralis-w-2 astralis-h-2 astralis-rotate-45 astralis-border-t astralis-border-r astralis-bg-zinc-900 dark:astralis-bg-zinc-800 astralis-border-black/5 dark:astralis-border-zinc-700/60";
  }

  return (
    <>
      {trigger}

      {open &&
        createPortal(
          <>
            <style>{`
              @keyframes astralis-tooltip-in {
                from { opacity: 0; transform: scale(0.97); }
                to { opacity: 1; transform: scale(1); }
              }
              .astralis-animate-tooltip-in {
                animation: astralis-tooltip-in 100ms cubic-bezier(0.16, 1, 0.3, 1) forwards;
              }
            `}</style>
            <div
              ref={tooltipRef}
              style={{ ...style, ...tokenStyles }}
              id={tooltipId}
              role="tooltip"
              className={[
                "astralis-animate-tooltip-in",
                "astralis-rounded-md astralis-px-2.5 astralis-py-1.5 astralis-text-xs astralis-shadow-md astralis-relative",
                "astralis-bg-zinc-900 dark:astralis-bg-zinc-800 astralis-text-white dark:astralis-text-zinc-100",
                "astralis-border astralis-border-black/5 dark:astralis-border-zinc-700/60",
                themeClass,
              ].join(" ")}
            >
              {/* Pointer Arrow */}
              {arrowClass && <div className={arrowClass} style={arrowStyle} />}

              {tooltipContent}
            </div>
          </>,
          document.body
        )}
    </>
  );
}
