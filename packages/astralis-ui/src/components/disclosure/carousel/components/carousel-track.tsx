import { useCallback, useRef } from "react";
import type { CarouselTrackProps } from "../carousel.types";
import { useCarousel } from "../carousel.context";
export function CarouselTrack({ children }: CarouselTrackProps) {
  const {
    index,
    orientation,
    animation,
    speed,
    easing,
    swipeable,
    draggable,
    setIndex,
  } = useCarousel();
  /* ---------------------------------------------------------------- */
  /* Swipe — touch                                                      */
  /* ---------------------------------------------------------------- */
  const touchStartRef = useRef<number>(0);
  const handleTouchStart = useCallback(
    (e: React.TouchEvent) => {
      touchStartRef.current =
        orientation === "vertical"
          ? e.touches[0].clientY
          : e.touches[0].clientX;
    },
    [orientation]
  );
  const handleTouchEnd = useCallback(
    (e: React.TouchEvent) => {
      const end =
        orientation === "vertical"
          ? e.changedTouches[0].clientY
          : e.changedTouches[0].clientX;
      const delta = touchStartRef.current - end;
      if (Math.abs(delta) > 50) {
        delta > 0 ? setIndex(index + 1) : setIndex(index - 1);
      }
    },
    [orientation, index, setIndex]
  );
  /* ---------------------------------------------------------------- */
  /* Drag — mouse                                                       */
  /* ---------------------------------------------------------------- */
  const mouseStartRef = useRef<number | null>(null);
  const handleMouseDown = useCallback(
    (e: React.MouseEvent) => {
      mouseStartRef.current =
        orientation === "vertical" ? e.clientY : e.clientX;
    },
    [orientation]
  );
  const handleMouseUp = useCallback(
    (e: React.MouseEvent) => {
      if (mouseStartRef.current === null) return;
      const end =
        orientation === "vertical" ? e.clientY : e.clientX;
      const delta = mouseStartRef.current - end;
      mouseStartRef.current = null;
      if (Math.abs(delta) > 50) {
        delta > 0 ? setIndex(index + 1) : setIndex(index - 1);
      }
    },
    [orientation, index, setIndex]
  );
  const handleMouseLeave = useCallback(() => {
    mouseStartRef.current = null;
  }, []);
  /* ---------------------------------------------------------------- */
  /* Interaction props                                                  */
  /* ---------------------------------------------------------------- */
  const interactionProps = {
    ...(swipeable && {
      onTouchStart: handleTouchStart,
      onTouchEnd: handleTouchEnd,
    }),
    ...(draggable && {
      onMouseDown: handleMouseDown,
      onMouseUp: handleMouseUp,
      onMouseLeave: handleMouseLeave,
    }),
  };
  const draggableStyle: React.CSSProperties = draggable
    ? { cursor: "grab", userSelect: "none" }
    : {};
  /* ---------------------------------------------------------------- */
  /* Fade animation                                                     */
  /* Slides are absolutely stacked. Track takes full height of its     */
  /* parent — the parent must define a height (e.g. h-56).            */
  /* ---------------------------------------------------------------- */
  if (animation === "fade") {
    return (
      <div
        aria-live="polite"
        aria-atomic="false"
        className="astralis-relative astralis-w-full astralis-h-full astralis-overflow-hidden"
        style={draggableStyle}
        {...interactionProps}
      >
        {children}
      </div>
    );
  }
  /* ---------------------------------------------------------------- */
  /* Slide animation                                                    */
  /* Outer div clips the overflow, inner div transforms.               */
  /* ---------------------------------------------------------------- */
  const transform =
    orientation === "vertical"
      ? `translateY(-${index * 100}%)`
      : `translateX(-${index * 100}%)`;
  return (
    /* Clip container — overflow hidden here, NOT on the carousel root */
    <div className="astralis-overflow-hidden astralis-w-full">
      <div
        aria-live="polite"
        aria-atomic="false"
        className={[
          "astralis-flex",
          orientation === "vertical"
            ? "astralis-flex-col"
            : "astralis-flex-row",
        ].join(" ")}
        style={{
          transform,
          transitionProperty: "transform",
          transitionDuration: `${speed}ms`,
          transitionTimingFunction: easing,
          ...draggableStyle,
        }}
        {...interactionProps}
      >
        {children}
      </div>
    </div>
  );
}
