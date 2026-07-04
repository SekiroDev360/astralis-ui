import { Children, useEffect, useRef, type CSSProperties, type ReactNode } from "react";
import type { CarouselTrackProps } from "../carousel.types";
import { useCarousel, CarouselItemContext } from "../carousel.context";
import { astralisMerge } from "../../../../utils/astralis-merge";

export function CarouselTrack({ children, className = "" }: CarouselTrackProps) {
  const {
    index, setIndex, setSlideCount, slideCount,
    slidesPerView, slidesToScroll, slideGap,
    orientation, animation, speed, easing, swipeable, draggable,
  } = useCarousel();

  const isVertical = orientation === "vertical";

  // Slides are counted from children (StrictMode-safe) and handed their ordinal
  // via context — no fragile self-registration.
  const slides = Children.toArray(children);
  const count = slides.length;
  useEffect(() => setSlideCount(count), [count, setSlideCount]);
  const items: ReactNode = slides.map((child, i) => (
    <CarouselItemContext.Provider key={i} value={i}>
      {child}
    </CarouselItemContext.Provider>
  ));

  /* --- pointer gestures: one swipe/drag = one page --- */
  const startRef = useRef<number | null>(null);
  const axis = (e: { clientX: number; clientY: number }) => (isVertical ? e.clientY : e.clientX);
  const begin = (pos: number) => { startRef.current = pos; };
  const end = (pos: number) => {
    if (startRef.current === null) return;
    const delta = startRef.current - pos;
    startRef.current = null;
    if (Math.abs(delta) > 50) setIndex(index + (delta > 0 ? slidesToScroll : -slidesToScroll));
  };

  const gestures = {
    ...(swipeable && {
      onTouchStart: (e: React.TouchEvent) => begin(axis(e.touches[0])),
      onTouchEnd: (e: React.TouchEvent) => end(axis(e.changedTouches[0])),
    }),
    ...(draggable && {
      onMouseDown: (e: React.MouseEvent) => begin(axis(e)),
      onMouseUp: (e: React.MouseEvent) => end(axis(e)),
      onMouseLeave: () => { startRef.current = null; },
    }),
  };
  const dragStyle: CSSProperties = draggable ? { cursor: "grab", userSelect: "none" } : {};

  /* --- fade: slides stacked in one grid cell, opacity-driven (single view).
     Grid stacking auto-sizes to the tallest slide — no explicit height needed. */
  if (animation === "fade") {
    return (
      <div
        aria-live="polite"
        className={astralisMerge("astralis:relative astralis:grid astralis:overflow-hidden", isVertical ? "astralis:flex-1" : "astralis:w-full", className)}
        style={dragStyle}
        {...gestures}
      >
        {items}
      </div>
    );
  }

  /* --- slide: flex track translated by whole pages ---
     Step per slide is (100% + gap) / slidesPerView; the scroll position is
     clamped to (slideCount - slidesPerView) so the final page sits flush. */
  const maxScroll = Math.max(0, slideCount - slidesPerView);
  const scroll = Math.min(index, maxScroll);
  const move = `calc(-1 * ${scroll} * (100% + ${slideGap}px) / ${slidesPerView})`;

  return (
    <div className={astralisMerge("astralis:overflow-hidden", isVertical ? "astralis:h-full astralis:flex-1" : "astralis:w-full", className)}>
      <div
        aria-live="polite"
        className={`astralis:flex ${isVertical ? "astralis:flex-col astralis:h-full" : "astralis:flex-row astralis:w-full"}`}
        style={{
          gap: slideGap ? `${slideGap}px` : undefined,
          transform: isVertical ? `translateY(${move})` : `translateX(${move})`,
          transitionProperty: "transform",
          transitionDuration: `${speed}ms`,
          transitionTimingFunction: easing,
          ...dragStyle,
        }}
        {...gestures}
      >
        {items}
      </div>
    </div>
  );
}
