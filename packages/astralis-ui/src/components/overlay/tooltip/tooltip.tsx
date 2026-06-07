import {
  cloneElement,
  isValidElement,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import { createPortal } from "react-dom";
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

  const triggerRef = useRef<HTMLElement>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<number | null>(null);

  const [open, setOpen] = useState(false);
  const [style, setStyle] = useState<React.CSSProperties>({});

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
  /* Positioning                   */
  /* ----------------------------- */

  useLayoutEffect(() => {
    if (!open || !triggerRef.current || !tooltipRef.current) return;

    const t = triggerRef.current.getBoundingClientRect();
    const c = tooltipRef.current.getBoundingClientRect();

    const positions = {
      top: {
        top: t.top - c.height - offset,
        left: t.left + t.width / 2 - c.width / 2,
      },
      bottom: {
        top: t.bottom + offset,
        left: t.left + t.width / 2 - c.width / 2,
      },
      right: {
        top: t.top + t.height / 2 - c.height / 2,
        left: t.right + offset,
      },
      left: {
        top: t.top + t.height / 2 - c.height / 2,
        left: t.left - c.width - offset,
      },
    };

    setStyle({
      position: "fixed",
      zIndex: 50,
      ...positions[side],
    });
  }, [open, side, offset]);

  /* ----------------------------- */
  /* Render                        */
  /* ----------------------------- */

  if (!isValidElement(children) || !tooltipContent) {
    return children;
  }

  const trigger = cloneElement(children, {
    ref: triggerRef,
    onMouseEnter: show,
    onMouseLeave: hide,
    onFocus: show,
    onBlur: hide,
  });

  return (
    <>
      {trigger}

      {open &&
        createPortal(
          <div
            ref={tooltipRef}
            style={style}
            className="astralis-rounded-md astralis-bg-black astralis-px-2 astralis-py-1 astralis-text-xs astralis-text-white astralis-shadow-md"
          >
            {tooltipContent}
          </div>,
          document.body
        )}
    </>
  );
}
