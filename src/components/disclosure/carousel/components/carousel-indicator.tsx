import { useCallback } from "react";
import type { CarouselIndicatorProps } from "../carousel.types";
import { useCarousel } from "../carousel.context";

export function CarouselIndicator({
  index,
  className = "",
}: CarouselIndicatorProps) {
  const { index: activeIndex, setIndex } = useCarousel();
  const active = index === activeIndex;

  const handleClick = useCallback(() => {
    setIndex(index);
  }, [index, setIndex]);

  return (
    <button
      type="button"
      aria-label={`Go to slide ${index + 1}`}
      aria-current={active ? "true" : undefined}
      onClick={handleClick}
      className={[
        "astralis-h-2 astralis-rounded-full astralis-transition-all astralis-duration-300 astralis-outline-none focus-visible:astralis-ring-2 focus-visible:astralis-ring-primary-500 focus-visible:astralis-ring-offset-2",
        active
          ? "astralis-w-6 astralis-bg-primary-500"
          : "astralis-w-2 astralis-bg-content-tertiary/40 hover:astralis-bg-content-tertiary/70",
        className,
      ].join(" ")}
    />
  );
}
