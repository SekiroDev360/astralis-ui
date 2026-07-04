import type { CarouselIndicatorProps } from "../carousel.types";
import { useCarousel } from "../carousel.context";
import { carouselDotVariants } from "../carousel.styles";
import { astralisMerge } from "../../../../utils/astralis-merge";

/** A single dot bound to one slide index — for hand-composed indicator rows. */
export function CarouselIndicator({ index, className = "" }: CarouselIndicatorProps) {
  const { index: activeIndex, setIndex, slideCount, size } = useCarousel();
  const active = index === activeIndex;
  return (
    <button
      type="button"
      role="tab"
      aria-label={`Go to slide ${index + 1} of ${slideCount}`}
      aria-selected={active}
      onClick={() => setIndex(index)}
      className={astralisMerge(carouselDotVariants({ size, active }), className)}
    />
  );
}
