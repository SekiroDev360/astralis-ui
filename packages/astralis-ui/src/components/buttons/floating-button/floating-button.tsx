"use client";

import { useCallback, useEffect, useRef, useState, type PointerEvent as ReactPointerEvent, type KeyboardEvent as ReactKeyboardEvent, type MouseEvent as ReactMouseEvent, type Ref } from "react";
import { Button } from "../button/button";
import { floatingButtonVariants, floatingButtonWrapper } from "./floating-button.styles";
import type { FloatingButtonPosition, FloatingButtonProps } from "./floating-button.types";

/** Arrow-key step, and the finer step when Shift is held. */
const KEY_STEP = 8;
const KEY_STEP_FINE = 1;

/** Keeps a position inside the viewport, allowing for the button's own size. */
function clampToViewport(
  { x, y }: FloatingButtonPosition,
  size: { width: number; height: number },
  padding: number,
): FloatingButtonPosition {
  const maxX = Math.max(padding, window.innerWidth - size.width - padding);
  const maxY = Math.max(padding, window.innerHeight - size.height - padding);
  return {
    x: Math.min(Math.max(x, padding), maxX),
    y: Math.min(Math.max(y, padding), maxY),
  };
}

/**
 * FloatingButton — a button pinned above the page, in a corner by default and
 * draggable anywhere.
 *
 * Built on Button, so it inherits every variant, size and `colorScheme`. It is
 * circular unless you say otherwise: `rounded` and `size` pass straight
 * through, and an icon-only button gets a square frame from Button itself.
 *
 * Dragging is pointer-based, so mouse, touch and pen all work from one path.
 * A press only becomes a drag past `dragThreshold` — below that it stays a
 * click, so a slightly shaky tap still fires the action rather than nudging the
 * button and doing nothing. Arrow keys reposition it too, which keeps the
 * feature reachable without a pointer.
 */
export function FloatingButton({
  placement = "bottom-right",
  offset = "md",
  draggable = true,
  position,
  onPositionChange,
  onPositionCommit,
  edgePadding = 8,
  dragThreshold = 4,
  wrapperClassName = "",
  className = "",
  rounded = "full",
  onClick,
  onKeyDown,
  ref,
  ...props
}: FloatingButtonProps & { ref?: Ref<HTMLButtonElement> }) {
  const wrapperRef = useRef<HTMLDivElement>(null);

  // Uncontrolled position. null = still resting in its corner.
  const [internal, setInternal] = useState<FloatingButtonPosition | null>(null);
  const controlled = position !== undefined;
  const current = controlled ? position : internal;

  const [dragging, setDragging] = useState(false);

  /*
   * Drag bookkeeping lives in a ref, not state: it changes on every pointer
   * frame and nothing renders from it, so state here would only cost renders.
   *
   * `pointerId` is the drag flag. Deliberately NOT hasPointerCapture(): capture
   * is a routing convenience the browser can decline (it silently no-ops for a
   * synthetic pointer, and can throw for a stale id), and hanging the gesture
   * off it means the drag dies with no way to tell why. Owning the state keeps
   * dragging working whether or not capture took.
   */
  const drag = useRef<{
    pointerId: number | null;
    startX: number;
    startY: number;
    offsetX: number;
    offsetY: number;
    moved: boolean;
  }>({ pointerId: null, startX: 0, startY: 0, offsetX: 0, offsetY: 0, moved: false });
  /* Set when a drag actually happened, and read by the click handler to
     swallow the click the browser fires afterwards. */
  const suppressClick = useRef(false);

  const commit = useCallback(
    (next: FloatingButtonPosition) => {
      if (!controlled) setInternal(next);
      onPositionChange?.(next);
    },
    [controlled, onPositionChange],
  );

  const measure = () => {
    const rect = wrapperRef.current?.getBoundingClientRect();
    return { width: rect?.width ?? 0, height: rect?.height ?? 0 };
  };

  const handlePointerDown = (event: ReactPointerEvent<HTMLButtonElement>) => {
    // Primary button only; let right-click open a context menu as usual.
    if (!draggable || event.button !== 0) return;
    const rect = wrapperRef.current?.getBoundingClientRect();
    if (!rect) return;
    /*
     * Disarm before every gesture. The flag is set when a drag ends, expecting
     * the browser's trailing click to consume it — but that click never comes
     * if the pointer was released outside the button or the gesture was
     * cancelled, and a flag left armed swallows the NEXT genuine press.
     */
    suppressClick.current = false;
    drag.current = {
      pointerId: event.pointerId,
      startX: event.clientX,
      startY: event.clientY,
      // Grab-point offset, so the button does not jump to centre under the cursor.
      offsetX: event.clientX - rect.left,
      offsetY: event.clientY - rect.top,
      moved: false,
    };
    /* Capture routes moves that leave the button back to it. Best-effort:
       the gesture is driven by drag.current, so a refusal costs nothing. */
    try {
      event.currentTarget.setPointerCapture(event.pointerId);
    } catch {
      // Some pointers cannot be captured; dragging still works.
    }
  };

  const handlePointerMove = (event: ReactPointerEvent<HTMLButtonElement>) => {
    if (!draggable || drag.current.pointerId !== event.pointerId) return;
    const { startX, startY, offsetX, offsetY, moved } = drag.current;

    if (!moved) {
      const travelled = Math.hypot(event.clientX - startX, event.clientY - startY);
      if (travelled < dragThreshold) return;
      drag.current.moved = true;
      setDragging(true);
    }

    commit(
      clampToViewport(
        { x: event.clientX - offsetX, y: event.clientY - offsetY },
        measure(),
        edgePadding,
      ),
    );
  };

  const endDrag = (event: ReactPointerEvent<HTMLButtonElement>) => {
    if (drag.current.pointerId !== event.pointerId) return;
    try {
      event.currentTarget.releasePointerCapture(event.pointerId);
    } catch {
      // Never captured, or already released.
    }
    const moved = drag.current.moved;
    drag.current = { ...drag.current, pointerId: null, moved: false };
    if (!moved) return;
    // The browser fires a click after the release; the handler swallows it.
    suppressClick.current = true;
    setDragging(false);
    if (current) onPositionCommit?.(current);
  };

  const handleClick = (event: ReactMouseEvent<HTMLButtonElement>) => {
    /* The browser fires a click after a drag ends. Swallow that one so
       repositioning never triggers the action. */
    if (suppressClick.current) {
      suppressClick.current = false;
      event.preventDefault();
      event.stopPropagation();
      return;
    }
    onClick?.(event);
  };

  const handleKeyDown = (event: ReactKeyboardEvent<HTMLButtonElement>) => {
    onKeyDown?.(event);
    if (!draggable || event.defaultPrevented) return;

    const step = event.shiftKey ? KEY_STEP_FINE : KEY_STEP;
    const delta = { ArrowUp: [0, -step], ArrowDown: [0, step], ArrowLeft: [-step, 0], ArrowRight: [step, 0] }[
      event.key
    ];
    if (!delta) return;

    // Arrow keys scroll by default; repositioning takes precedence here.
    event.preventDefault();
    const rect = wrapperRef.current?.getBoundingClientRect();
    if (!rect) return;
    const from = current ?? { x: rect.left, y: rect.top };
    const next = clampToViewport(
      { x: from.x + delta[0], y: from.y + delta[1] },
      { width: rect.width, height: rect.height },
      edgePadding,
    );
    commit(next);
    onPositionCommit?.(next);
  };

  /*
   * A dragged position is absolute, so a shrinking viewport can strand the
   * button off-screen. Re-clamp on resize; untouched buttons are anchored by
   * class and need no help.
   */
  useEffect(() => {
    if (!current) return;
    const onResize = () => {
      const rect = wrapperRef.current?.getBoundingClientRect();
      if (!rect) return;
      const next = clampToViewport(current, { width: rect.width, height: rect.height }, edgePadding);
      if (next.x !== current.x || next.y !== current.y) commit(next);
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [current, edgePadding, commit]);

  return (
    <div
      ref={wrapperRef}
      className={`${floatingButtonWrapper({
        placement,
        offset,
        floating: Boolean(current),
        dragging,
      })} ${wrapperClassName}`}
      // Inline because pixel positions cannot be precompiled utilities.
      style={current ? { left: current.x, top: current.y } : undefined}
    >
      <Button
        ref={ref}
        rounded={rounded}
        className={`${floatingButtonVariants({ draggable })} ${className}`}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={endDrag}
        onPointerCancel={endDrag}
        onClick={handleClick}
        onKeyDown={handleKeyDown}
        {...props}
      />
    </div>
  );
}

FloatingButton.displayName = "FloatingButton";
