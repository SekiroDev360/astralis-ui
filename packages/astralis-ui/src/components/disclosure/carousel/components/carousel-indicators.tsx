import { useCarousel } from "../carousel.context";
import type { CarouselIndicatorsProps } from "../carousel.types";
import {
  carouselIndicatorsVariants,
  carouselDotVariants,
  carouselLineVariants,
  carouselProgressVariants,
} from "../carousel.styles";
import { astralisMerge } from "../../../../utils/astralis-merge";

export function CarouselIndicators({ className = "", variant = "dot" }: CarouselIndicatorsProps) {
  const { slideCount, index, setIndex, lastIndex, slidesToScroll, orientation, size } = useCarousel();
  if (slideCount <= 1) return null;

  // One indicator per page (a step of `slidesToScroll`).
  const pageCount = Math.floor(lastIndex / slidesToScroll) + 1;
  const activePage = Math.min(Math.round(index / slidesToScroll), pageCount - 1);
  const goToPage = (p: number) => setIndex(Math.min(p * slidesToScroll, lastIndex));

  if (variant === "number") {
    return (
      <div aria-label="Slide progress" className={astralisMerge(carouselProgressVariants(), className)}>
        {activePage + 1}
        <span className="astralis:mx-1">/</span>
        {pageCount}
      </div>
    );
  }

  return (
    <div role="tablist" aria-label="Slides" className={astralisMerge(carouselIndicatorsVariants({ orientation }), className)}>
      {Array.from({ length: pageCount }).map((_, p) => {
        const active = p === activePage;
        return (
          <button
            key={p}
            type="button"
            role="tab"
            aria-label={`Go to slide ${p + 1} of ${pageCount}`}
            aria-selected={active}
            onClick={() => goToPage(p)}
            className={
              variant === "line"
                ? carouselLineVariants({ orientation, active })
                : carouselDotVariants({ size, active })
            }
          />
        );
      })}
    </div>
  );
}
