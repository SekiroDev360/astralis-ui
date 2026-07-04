import { useCallback, useLayoutEffect, useState, type RefObject } from "react";

export type Side = "top" | "right" | "bottom" | "left";
export type Align = "start" | "center" | "end";

interface UseAnchorPositionOptions {
  open: boolean;
  anchorRef: RefObject<HTMLElement | null>;
  floatingRef: RefObject<HTMLElement | null>;
  side?: Side;
  align?: Align;
  /** Gap between anchor and floating element, px. */
  sideOffset?: number;
  /** Shift along the alignment axis, px. */
  alignOffset?: number;
  /** Flip + shift to stay in the viewport. @default true */
  avoidCollisions?: boolean;
  /** Viewport inset kept clear, px. @default 8 */
  padding?: number;
}

interface Position {
  x: number;
  y: number;
  /** Resolved side after any collision flip — drives the enter transform + arrow. */
  side: Side;
  arrow: { left?: number; top?: number };
}

const OPPOSITE: Record<Side, Side> = { top: "bottom", bottom: "top", left: "right", right: "left" };

/**
 * A minimal, dependency-free floating positioner: places `floating` relative to
 * `anchor` by `side`/`align`, flips to the opposite side when space is tight,
 * shifts to stay within the viewport, and reports an arrow offset. Uses fixed
 * positioning (viewport coordinates) and recomputes on scroll/resize.
 */
export function useAnchorPosition({
  open,
  anchorRef,
  floatingRef,
  side = "bottom",
  align = "center",
  sideOffset = 8,
  alignOffset = 0,
  avoidCollisions = true,
  padding = 8,
}: UseAnchorPositionOptions): Position & { update: () => void } {
  const [pos, setPos] = useState<Position>({ x: 0, y: 0, side, arrow: {} });

  const update = useCallback(() => {
    const anchor = anchorRef.current;
    const floating = floatingRef.current;
    if (!anchor || !floating) return;

    const a = anchor.getBoundingClientRect();
    const f = floating.getBoundingClientRect();
    const vw = window.innerWidth;
    const vh = window.innerHeight;
    const vertical = side === "top" || side === "bottom";

    // --- flip if the preferred side lacks room ---
    let resolved = side;
    if (avoidCollisions) {
      const space = { top: a.top, bottom: vh - a.bottom, left: a.left, right: vw - a.right };
      const need = (vertical ? f.height : f.width) + sideOffset + padding;
      if (space[side] < need && space[OPPOSITE[side]] > space[side]) resolved = OPPOSITE[side];
    }
    const resolvedVertical = resolved === "top" || resolved === "bottom";

    // --- main-axis placement ---
    let x = 0;
    let y = 0;
    if (resolved === "bottom") y = a.bottom + sideOffset;
    else if (resolved === "top") y = a.top - f.height - sideOffset;
    else if (resolved === "right") x = a.right + sideOffset;
    else x = a.left - f.width - sideOffset;

    // --- cross-axis alignment ---
    if (resolvedVertical) {
      x = align === "center" ? a.left + a.width / 2 - f.width / 2 : align === "start" ? a.left : a.right - f.width;
      x += alignOffset;
    } else {
      y = align === "center" ? a.top + a.height / 2 - f.height / 2 : align === "start" ? a.top : a.bottom - f.height;
      y += alignOffset;
    }

    // --- shift into the viewport ---
    if (avoidCollisions) {
      x = Math.min(Math.max(padding, x), Math.max(padding, vw - f.width - padding));
      y = Math.min(Math.max(padding, y), Math.max(padding, vh - f.height - padding));
    }

    // --- arrow centred on the anchor, clamped to the floating box ---
    const arrow: Position["arrow"] = {};
    if (resolvedVertical) {
      arrow.left = Math.min(Math.max(10, a.left + a.width / 2 - x), f.width - 10);
    } else {
      arrow.top = Math.min(Math.max(10, a.top + a.height / 2 - y), f.height - 10);
    }

    setPos({ x, y, side: resolved, arrow });
  }, [anchorRef, floatingRef, side, align, sideOffset, alignOffset, avoidCollisions, padding]);

  useLayoutEffect(() => {
    if (!open) return;
    update();
    window.addEventListener("scroll", update, true);
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update, true);
      window.removeEventListener("resize", update);
    };
  }, [open, update]);

  return { ...pos, update };
}
