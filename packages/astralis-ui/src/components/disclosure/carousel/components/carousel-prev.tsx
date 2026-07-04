import type { CarouselControlProps } from "../carousel.types";
import { useCarousel } from "../carousel.context";
import { carouselControlVariants, controlIconSize } from "../carousel.styles";
import { astralisMerge } from "../../../../utils/astralis-merge";
import Icon from "../../../icon/icon";
import { ChevronLeftIcon, ChevronUpIcon } from "../../../icon/internal-icons";

export function CarouselPrev({ icon, className = "" }: CarouselControlProps) {
  const { index, setIndex, slidesToScroll, orientation, disabled, loop, size } = useCarousel();
  const isVertical = orientation === "vertical";
  const isDisabled = !loop && (disabled || index <= 0);

  return (
    <button
      type="button"
      aria-label="Previous slide"
      disabled={isDisabled}
      onClick={() => setIndex(index - slidesToScroll)}
      className={astralisMerge(carouselControlVariants({ size }), className)}
    >
      {icon ?? (
        <Icon size={controlIconSize[size]}>
          {isVertical ? <ChevronUpIcon /> : <ChevronLeftIcon />}
        </Icon>
      )}
    </button>
  );
}
