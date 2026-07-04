import type { CarouselControlProps } from "../carousel.types";
import { useCarousel } from "../carousel.context";
import { carouselControlVariants, controlIconSize } from "../carousel.styles";
import { astralisMerge } from "../../../../utils/astralis-merge";
import Icon from "../../../icon/icon";
import { ChevronRightIcon, ChevronDownIcon } from "../../../icon/internal-icons";

export function CarouselNext({ icon, className = "" }: CarouselControlProps) {
  const { index, setIndex, slidesToScroll, lastIndex, orientation, disabled, loop, size } = useCarousel();
  const isVertical = orientation === "vertical";
  const isDisabled = !loop && (disabled || index >= lastIndex);

  return (
    <button
      type="button"
      aria-label="Next slide"
      disabled={isDisabled}
      onClick={() => setIndex(index + slidesToScroll)}
      className={astralisMerge(carouselControlVariants({ size }), className)}
    >
      {icon ?? (
        <Icon size={controlIconSize[size]}>
          {isVertical ? <ChevronDownIcon /> : <ChevronRightIcon />}
        </Icon>
      )}
    </button>
  );
}
