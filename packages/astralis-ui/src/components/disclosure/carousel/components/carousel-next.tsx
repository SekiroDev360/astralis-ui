import type { CarouselControlProps } from "../carousel.types";
import { useCarousel } from "../carousel.context";
import Icon from "../../../icon/icon";

export function CarouselNext({ icon, overlay = true }: CarouselControlProps) {
  const { index, slideCount, setIndex, orientation, disabled, loop } =
    useCarousel();
  const isDisabled = !loop && (disabled || index >= slideCount - 1);
  /* ---------------------------------------------------------------- */
  /* Position classes                                                   */
  /* overlay=true  → absolute, pinned to carousel edge, vertically     */
  /*                 centered (horizontal) or bottom (vertical)        */
  /* overlay=false → in-flow, used in control bars / side panels       */
  /* ---------------------------------------------------------------- */
  const positionClass = overlay
    ? "astralis-absolute astralis-z-10 astralis-right-3 astralis-top-1/2 -astralis-translate-y-1/2"
    : "";
  return (
    <button
      type="button"
      aria-label="Next slide"
      disabled={isDisabled}
      onClick={() => setIndex(index + 1)}
      className={[
        positionClass,
        "astralis-flex astralis-items-center astralis-justify-center",
        "astralis-w-8 astralis-h-8 astralis-rounded-full astralis-cursor-pointer",
        "astralis-bg-surface-base/90 astralis-shadow-md astralis-text-label-base",
        "astralis-transition-all astralis-duration-200 hover:astralis-bg-surface-muted",
        "astralis-outline-none focus-visible:astralis-ring-2 focus-visible:astralis-ring-brand-600 focus-visible:astralis-ring-offset-2",
        "disabled:astralis-opacity-moderate disabled:astralis-cursor-not-allowed",
      ].join(" ")}
    >
      {icon ?? (
        <Icon
          name={orientation === "vertical" ? "ChevronDown" : "ChevronRight"}
          size="xs"
        />
      )}
    </button>
  );
}
