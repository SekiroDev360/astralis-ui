import { useCarousel } from "../carousel.context";
import { CarouselIndicator } from "./carousel-indicator";
import type { CarouselIndicatorsProps } from "../carousel.types";

export function CarouselIndicators({ className = "" }: CarouselIndicatorsProps) {
  const { slideCount } = useCarousel();

  if (slideCount <= 1) return null;

  return (
    <div
      role="tablist"
      aria-label="Slides"
      className={[
        "astralis-flex astralis-justify-center astralis-items-center astralis-gap-2 astralis-mt-4",
        className,
      ].join(" ")}
    >
      {Array.from({ length: slideCount }).map((_, i) => (
        <CarouselIndicator key={i} index={i} />
      ))}
    </div>
  );
}
