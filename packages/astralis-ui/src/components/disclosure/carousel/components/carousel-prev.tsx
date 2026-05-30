import type { CarouselControlProps } from "../carousel.types";
import { useCarousel } from "../carousel.context";
import Icon from "../../../icon/icon";

export function CarouselPrev({
  children,
}: CarouselControlProps) {
  const { index, setIndex } = useCarousel();

  return (
    <button
      type="button"
      aria-label="Previous slide"
      disabled={index <= 0}
      onClick={() => setIndex(index - 1)}
      className={[
        "astralis-absolute astralis-left-4 astralis-top-1/2 -astralis-translate-y-1/2",
        "astralis-flex astralis-items-center astralis-justify-center astralis-w-10 astralis-h-10 astralis-rounded-full",
        "astralis-bg-surface-base astralis-shadow-md astralis-border astralis-border-border-subtle astralis-text-content-primary",
        "astralis-transition-all astralis-duration-200 hover:astralis-bg-surface-raised",
        "astralis-outline-none focus-visible:astralis-ring-2 focus-visible:astralis-ring-primary-500 focus-visible:astralis-ring-offset-2",
        "disabled:astralis-opacity-40 disabled:astralis-cursor-not-allowed",
      ].join(" ")}
    >
      {children ?? <Icon name="ChevronLeft" size="sm" />}
    </button>
  );
}
