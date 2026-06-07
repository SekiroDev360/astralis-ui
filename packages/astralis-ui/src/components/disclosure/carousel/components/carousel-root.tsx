import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { CarouselContext } from "../carousel.context";
import type { CarouselProps } from "../carousel.types";
export function CarouselRoot({
  index: controlledIndex,
  defaultIndex = 0,
  onIndexChange,
  beforeChange,
  afterChange,
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
  children,
}: CarouselProps) {
  const [uncontrolledIndex, setUncontrolledIndex] = useState(defaultIndex);
  const [slideCount, setSlideCount] = useState(0);
  const [isPlaying, setIsPlaying] = useState(autoPlay);
  // Keep isPlaying in sync if the autoPlay prop changes after mount
  useEffect(() => { setIsPlaying(autoPlay); }, [autoPlay]);
  const index = controlledIndex ?? uncontrolledIndex;
  // Refs so autoplay timer always has the latest values without re-creating
  const isPausedRef = useRef(false);
  const slideCounter = useRef(0);
  /* ---------------------------------------------------------------- */
  /* Core navigation                                                    */
  /* ---------------------------------------------------------------- */
  const goTo = useCallback(
    (next: number) => {
      if (disabled) return;
      const target = loop
        ? ((next % slideCount) + slideCount) % slideCount
        : Math.min(Math.max(0, next), slideCount - 1);
      if (target === index && !loop) return;
      beforeChange?.(index, target);
      if (controlledIndex === undefined) {
        setUncontrolledIndex(target);
      }
      onIndexChange?.(target);
      if (afterChange) {
        setTimeout(() => afterChange(target), speed);
      }
    },
    [disabled, loop, slideCount, index, controlledIndex, onIndexChange, beforeChange, afterChange, speed]
  );
  /* ---------------------------------------------------------------- */
  /* AutoPlay — setTimeout chain: resets naturally when index changes  */
  /* ---------------------------------------------------------------- */
  useEffect(() => {
    if (!isPlaying || disabled || slideCount <= 1) return;
    const timer = setTimeout(() => {
      if (isPausedRef.current) return;
      if (!loop && index >= slideCount - 1) {
        // Reached the end with no loop — stop autoplay
        setIsPlaying(false);
        return;
      }
      const next = loop
        ? (index + 1) % slideCount
        : index + 1;
      if (controlledIndex === undefined) {
        setUncontrolledIndex(next);
      }
      onIndexChange?.(next);
    }, autoPlayInterval);
    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isPlaying, disabled, index, slideCount, loop, autoPlayInterval]);
  const toggleAutoPlay = useCallback(() => {
    setIsPlaying((p) => !p);
  }, []);
  /* ---------------------------------------------------------------- */
  /* Hover pause                                                        */
  /* ---------------------------------------------------------------- */
  const handleMouseEnter = useCallback(() => {
    if (pauseOnHover) isPausedRef.current = true;
  }, [pauseOnHover]);
  const handleMouseLeave = useCallback(() => {
    isPausedRef.current = false;
  }, []);
  /* ---------------------------------------------------------------- */
  /* registerSlide — returns the slide's own index + cleanup           */
  /* ---------------------------------------------------------------- */
  const registerSlide = useCallback(() => {
    const slideIndex = slideCounter.current++;
    setSlideCount((c) => c + 1);
    return {
      slideIndex,
      unregister: () => {
        setSlideCount((c) => Math.max(0, c - 1));
      },
    };
  }, []);
  /* ---------------------------------------------------------------- */
  /* Context value                                                      */
  /* ---------------------------------------------------------------- */
  const contextValue = useMemo(
    () => ({
      index,
      slideCount,
      setIndex: goTo,
      registerSlide,
      loop,
      orientation,
      animation,
      speed,
      easing,
      disabled,
      swipeable,
      draggable,
      isPlaying,
      toggleAutoPlay,
    }),
    [
      index, slideCount, goTo, registerSlide,
      loop, orientation, animation, speed, easing,
      disabled, swipeable, draggable,
      isPlaying, toggleAutoPlay,
    ]
  );
  return (
    <CarouselContext.Provider value={contextValue}>
      <div
        aria-roledescription="carousel"
        className="astralis-relative astralis-w-full"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {children}
      </div>
    </CarouselContext.Provider>
  );
}
