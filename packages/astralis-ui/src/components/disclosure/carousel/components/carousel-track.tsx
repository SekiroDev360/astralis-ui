import type { CarouselTrackProps } from "../carousel.types";
import { useCarousel } from "../carousel.context";

export function CarouselTrack({
  children,
}: CarouselTrackProps) {
  const { index } = useCarousel();

  return (
    <div
      className="astralis-flex astralis-transition-transform astralis-duration-300 astralis-ease-out"
      style={{
        transform: `translateX(-${index * 100}%)`,
      }}
    >
      {children}
    </div>
  );
}
