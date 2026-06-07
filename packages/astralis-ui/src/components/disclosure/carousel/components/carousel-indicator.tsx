import { useCallback } from "react";
import type { CarouselIndicatorProps } from "../carousel.types";
import { useCarousel } from "../carousel.context";

export function CarouselIndicator({
  index,
  className = "",
}: CarouselIndicatorProps) {
  const { index: activeIndex, setIndex, slideCount } = useCarousel();
  const active = index === activeIndex;
  const handleClick = useCallback(() => {
    setIndex(index);
  }, [index, setIndex]);
  return (
    <button
      type="button"
      role="tab"
      aria-label={`Go to slide ${index + 1} of ${slideCount}`}
      aria-selected={active}
      onClick={handleClick}
      className={[
        "astralis-h-2 astralis-rounded-full astralis-transition-all astralis-duration-300",
        "astralis-outline-none focus-visible:astralis-ring-2 focus-visible:astralis-ring-brand-600 focus-visible:astralis-ring-offset-2",
        "astralis-cursor-pointer",
        active
          ? "astralis-w-6 astralis-bg-brand-600"
          : "astralis-w-2 astralis-bg-surface-muted hover:astralis-bg-surface-raised",
        className,
      ].join(" ")}
    />
  );
}
