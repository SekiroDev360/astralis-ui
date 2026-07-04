import { useCarousel } from "../carousel.context";
import type { CarouselAutoPlayTriggerProps } from "../carousel.types";
import { carouselControlVariants, controlIconSize } from "../carousel.styles";
import { astralisMerge } from "../../../../utils/astralis-merge";
import Icon from "../../../icon/icon";
import { PlayIcon, PauseIcon } from "../../../icon/internal-icons";

export function CarouselAutoPlayTrigger({ className = "", children }: CarouselAutoPlayTriggerProps) {
  const { isPlaying, toggleAutoPlay, disabled, size } = useCarousel();
  return (
    <button
      type="button"
      aria-label={isPlaying ? "Pause autoplay" : "Start autoplay"}
      aria-pressed={isPlaying}
      disabled={disabled}
      onClick={toggleAutoPlay}
      className={astralisMerge(carouselControlVariants({ size }), className)}
    >
      {children ? (
        children(isPlaying)
      ) : (
        <Icon size={controlIconSize[size]}>{isPlaying ? <PauseIcon /> : <PlayIcon />}</Icon>
      )}
    </button>
  );
}
