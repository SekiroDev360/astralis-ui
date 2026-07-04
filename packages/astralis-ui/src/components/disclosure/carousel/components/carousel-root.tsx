import { useCallback, useEffect, useMemo, useRef, useState, type KeyboardEvent } from "react";
import { CarouselContext } from "../carousel.context";
import type { CarouselProps } from "../carousel.types";
import { astralisMerge } from "../../../../utils/astralis-merge";
import { accentClass } from "../../../../const/color-schemes";

export function CarouselRoot({
  index: controlledIndex,
  defaultIndex = 0,
  onIndexChange,
  beforeChange,
  afterChange,
  slidesPerView = 1,
  slidesToScroll = 1,
  slideGap = 0,
  loop = false,
  autoPlay = false,
  autoPlayInterval = 3000,
  pauseOnHover = true,
  animation = "slide",
  orientation = "horizontal",
  speed = 300,
  easing = "ease-out",
  disabled = false,
  swipeable = true,
  draggable = false,
  size = "md",
  colorScheme = "brand",
  className = "",
  style,
  children,
}: CarouselProps) {
  const [uncontrolledIndex, setUncontrolledIndex] = useState(defaultIndex);
  const [slideCount, setSlideCount] = useState(0);
  const [isPlaying, setIsPlaying] = useState(autoPlay);
  useEffect(() => { setIsPlaying(autoPlay); }, [autoPlay]);

  const index = controlledIndex ?? uncontrolledIndex;
  const isPausedRef = useRef(false);

  // `fade` only ever shows one slide; otherwise the last page starts here.
  const perView = animation === "fade" ? 1 : slidesPerView;
  const lastIndex = Math.max(0, Math.ceil(slideCount - perView));

  const goTo = useCallback(
    (next: number) => {
      if (disabled) return;
      const target = loop
        ? next > lastIndex ? 0 : next < 0 ? lastIndex : next
        : Math.min(Math.max(0, next), lastIndex);
      if (target === index) return;
      beforeChange?.(index, target);
      if (controlledIndex === undefined) setUncontrolledIndex(target);
      onIndexChange?.(target);
      if (afterChange) setTimeout(() => afterChange(target), speed);
    },
    [disabled, loop, lastIndex, index, controlledIndex, onIndexChange, beforeChange, afterChange, speed],
  );

  // Autoplay — a self-resetting timeout chain (re-armed whenever index changes).
  useEffect(() => {
    if (!isPlaying || disabled || slideCount <= 1) return;
    const timer = setTimeout(() => {
      if (isPausedRef.current) return;
      if (!loop && index >= lastIndex) { setIsPlaying(false); return; }
      const next = index >= lastIndex ? 0 : index + slidesToScroll;
      if (controlledIndex === undefined) setUncontrolledIndex(next);
      onIndexChange?.(next);
    }, autoPlayInterval);
    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isPlaying, disabled, index, slideCount, lastIndex, loop, slidesToScroll, autoPlayInterval]);

  const toggleAutoPlay = useCallback(() => setIsPlaying((p) => !p), []);

  const handleMouseEnter = useCallback(() => { if (pauseOnHover) isPausedRef.current = true; }, [pauseOnHover]);
  const handleMouseLeave = useCallback(() => { isPausedRef.current = false; }, []);

  // Arrow keys move by a page; the orientation picks the axis.
  const handleKeyDown = useCallback(
    (e: KeyboardEvent<HTMLDivElement>) => {
      const prevKey = orientation === "vertical" ? "ArrowUp" : "ArrowLeft";
      const nextKey = orientation === "vertical" ? "ArrowDown" : "ArrowRight";
      if (e.key === prevKey) { e.preventDefault(); goTo(index - slidesToScroll); }
      else if (e.key === nextKey) { e.preventDefault(); goTo(index + slidesToScroll); }
    },
    [orientation, goTo, index, slidesToScroll],
  );

  const ctx = useMemo(
    () => ({
      index, setIndex: goTo, slideCount, setSlideCount, lastIndex,
      slidesPerView: perView, slidesToScroll, slideGap,
      orientation, animation, speed, easing, size,
      loop, disabled, swipeable, draggable,
      isPlaying, toggleAutoPlay,
    }),
    [index, goTo, slideCount, lastIndex, perView, slidesToScroll, slideGap,
     orientation, animation, speed, easing, size, loop, disabled, swipeable, draggable, isPlaying, toggleAutoPlay],
  );

  // Vertical lays the viewport and controls side by side; horizontal stacks them.
  const layout = orientation === "vertical"
    ? "astralis:relative astralis:flex astralis:w-full astralis:gap-3 astralis:items-stretch"
    : "astralis:relative astralis:w-full";

  return (
    <CarouselContext.Provider value={ctx}>
      <div
        role="region"
        aria-roledescription="carousel"
        tabIndex={0}
        onKeyDown={handleKeyDown}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className={astralisMerge(layout, "astralis:outline-none", accentClass(colorScheme), className)}
        style={style}
      >
        {children}
      </div>
    </CarouselContext.Provider>
  );
}
