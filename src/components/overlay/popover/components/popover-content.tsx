import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { usePopover } from "../popover.context";
import type { PopoverContentProps } from "../popover.types";

export function PopoverContent({
  children,
  side = "bottom",
  offset = 8,
  className,
}: PopoverContentProps) {
  const { open, setOpen, triggerRef, trigger, handleOpen, handleClose } =
    usePopover();
  const contentRef = useRef<HTMLDivElement>(null);

  // Start with hidden content to calculate position correctly without flicker
  const [style, setStyle] = useState<React.CSSProperties>({
    position: "fixed",
    opacity: 0,
    pointerEvents: "none",
  });

  /* Positioning */
  useLayoutEffect(() => {
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

  /* Hover handlers for content to keep it open */
  const hoverProps =
    trigger === "hover"
      ? {
          onMouseEnter: handleOpen,
          onMouseLeave: handleClose,
        }
      : {};

  if (!open) return null;

  return createPortal(
    <div
      ref={contentRef}
      style={style}
      className={`astralis-rounded-md astralis-max-w-80 astralis-w-full astralis-bg-surface-popover astralis-shadow-lg astralis-p-3 ${
        className || ""
      }`}
      {...hoverProps}
    >
      {children}
    </div>,
    document.body,
  );
}
