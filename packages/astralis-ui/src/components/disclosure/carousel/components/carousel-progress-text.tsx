import { useCarousel } from "../carousel.context";
import type { CarouselProgressTextProps } from "../carousel.types";

export function CarouselProgressText({
  className = "",
  format,
}: CarouselProgressTextProps) {
  const { index, slideCount } = useCarousel();
  return (
    <div
      aria-live="polite"
      aria-atomic="true"
      aria-label={`Slide ${index + 1} of ${slideCount}`}
      className={[
        "astralis-text-sm astralis-font-medium astralis-tabular-nums astralis-text-label-muted",
        className,
      ].join(" ")}
    >
      {format ? format(index, slideCount) : `${index + 1} / ${slideCount}`}
    </div>
  );
}
