import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { usePopover } from "../popover.context";
import type { PopoverContentProps } from "../popover.types";

export function PopoverContent({
  children,
  side = "bottom",
  offset = 8,
}: PopoverContentProps) {
  const { open, setOpen, triggerRef } = usePopover();
  const contentRef = useRef<HTMLDivElement>(null);
  const [style, setStyle] = useState<React.CSSProperties>({});

  /* Positioning */
  useLayoutEffect(() => {
    if (!open || !triggerRef.current || !contentRef.current) return;

    const triggerRect = triggerRef.current.getBoundingClientRect();
    const contentRect = contentRef.current.getBoundingClientRect();

    const positions = {
      bottom: {
        top: triggerRect.bottom + offset,
        left: triggerRect.left + triggerRect.width / 2 - contentRect.width / 2,
      },
      top: {
        top: triggerRect.top - contentRect.height - offset,
        left: triggerRect.left + triggerRect.width / 2 - contentRect.width / 2,
      },
      right: {
        top: triggerRect.top + triggerRect.height / 2 - contentRect.height / 2,
        left: triggerRect.right + offset,
      },
      left: {
        top: triggerRect.top + triggerRect.height / 2 - contentRect.height / 2,
        left: triggerRect.left - contentRect.width - offset,
      },
    };

    setStyle({
      position: "fixed",
      zIndex: 50,
      ...positions[side],
    });
  }, [open, side, offset, triggerRef]);

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

  if (!open) return null;

  return createPortal(
    <div
      ref={contentRef}
      style={style}
      className="astralis-rounded-md astralis-bg-white astralis-shadow-lg astralis-p-3"
    >
      {children}
    </div>,
    document.body
  );
}
