import { useCallback, useMemo, useState } from "react";
import { CarouselContext } from "../carousel.context";
import type { CarouselProps } from "../carousel.types";

export function CarouselRoot({
  index: controlledIndex,
  defaultIndex = 0,
  onIndexChange,
  children,
}: CarouselProps) {
  const [uncontrolledIndex, setUncontrolledIndex] =
    useState(defaultIndex);

  const [slideCount, setSlideCount] = useState(0);

  const index = controlledIndex ?? uncontrolledIndex;

  const setIndex = useCallback(
    (next: number) => {
      const max = slideCount - 1;
      const clamped = Math.min(Math.max(0, next), max);

      if (controlledIndex === undefined) {
        setUncontrolledIndex(clamped);
      }

      onIndexChange?.(clamped);
    },
    [controlledIndex, slideCount, onIndexChange]
  );

  const registerSlide = useCallback(() => {
    setSlideCount((count) => count + 1);
    return () => {
      setSlideCount((count) => Math.max(0, count - 1));
    };
  }, []);

  const contextValue = useMemo(
    () => ({
      index,
      slideCount,
      setIndex,
      registerSlide,
    }),
    [index, slideCount, setIndex, registerSlide]
  );

  return (
    <CarouselContext.Provider value={contextValue}>
      <div className="astralis-relative astralis-overflow-hidden">
        {children}
      </div>
    </CarouselContext.Provider>
  );
}
