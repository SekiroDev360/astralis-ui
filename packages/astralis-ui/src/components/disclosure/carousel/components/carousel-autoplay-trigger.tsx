import { useCarousel } from "../carousel.context";
import type { CarouselAutoPlayTriggerProps } from "../carousel.types";
import Icon from "../../../icon/icon";

export function CarouselAutoPlayTrigger({
  className = "",
  children,
}: CarouselAutoPlayTriggerProps) {
  const { isPlaying, toggleAutoPlay, disabled } = useCarousel();
  return (
    <button
      type="button"
      aria-label={isPlaying ? "Pause autoplay" : "Start autoplay"}
      aria-pressed={isPlaying}
      disabled={disabled}
      onClick={toggleAutoPlay}
      className={[
        "astralis-flex astralis-items-center astralis-justify-center astralis-w-8 astralis-h-8 astralis-rounded-full",
        "astralis-bg-surface-base astralis-border astralis-border-subtle astralis-text-label-base",
        "astralis-transition-all astralis-duration-200 hover:astralis-bg-surface-muted",
        "astralis-outline-none focus-visible:astralis-ring-2 focus-visible:astralis-ring-brand-600 focus-visible:astralis-ring-offset-2",
        "disabled:astralis-opacity-moderate disabled:astralis-cursor-not-allowed",
        "astralis-cursor-pointer",
        className,
      ].join(" ")}
    >
      {children ? (
        children(isPlaying)
      ) : isPlaying ? (
        <Icon name="Pause" size="xs" />
      ) : (
        <Icon name="Play" size="xs" />
      )}
    </button>
  );
}
