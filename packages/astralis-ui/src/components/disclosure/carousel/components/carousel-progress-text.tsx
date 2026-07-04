import { useCarousel } from "../carousel.context";
import type { CarouselProgressTextProps } from "../carousel.types";
import { carouselProgressVariants } from "../carousel.styles";
import { astralisMerge } from "../../../../utils/astralis-merge";

export function CarouselProgressText({ className = "", format }: CarouselProgressTextProps) {
  const { index, slideCount } = useCarousel();
  return (
    <div
      aria-live="polite"
      aria-atomic="true"
      aria-label={`Slide ${index + 1} of ${slideCount}`}
      className={astralisMerge(carouselProgressVariants(), className)}
    >
      {format ? format(index, slideCount) : `${index + 1} / ${slideCount}`}
    </div>
  );
}
