import { useCarousel } from "../carousel.context";
import { CarouselIndicator } from "./carousel-indicator";
import type { CarouselIndicatorsProps } from "../carousel.types";

export function CarouselIndicators({
  className = "",
  variant = "dot",
}: CarouselIndicatorsProps) {
  const { slideCount, index, setIndex, orientation } = useCarousel();
  
  const isVertical = orientation === "vertical";
  if (slideCount <= 1) return null;
  /* Shared layout: horizontal gets row + top-margin, vertical gets column */
  const baseLayout = isVertical
    ? "astralis-flex astralis-flex-col astralis-justify-center astralis-items-center astralis-gap-2"
    : "astralis-flex astralis-flex-row astralis-justify-center astralis-items-center astralis-gap-2 astralis-mt-4";
  /* ── number variant ─────────────────────────────────────────────── */
  if (variant === "number") {
    return (
      <div
        aria-label="Slide progress"
        className={[
          "astralis-flex astralis-justify-center astralis-items-center",
          isVertical ? "" : "astralis-mt-4",
          "astralis-text-sm astralis-font-medium astralis-tabular-nums astralis-text-label-muted",
          className,
        ].join(" ")}
      >
        {index + 1}
        <span className="astralis-mx-1 astralis-text-label-muted">/</span>
        {slideCount}
      </div>
    );
  }
  /* ── line variant ───────────────────────────────────────────────── */
  if (variant === "line") {
    return (
      <div
        role="tablist"
        aria-label="Slides"
        className={[baseLayout, className].join(" ")}
      >
        {Array.from({ length: slideCount }).map((_, i) => {
          const active = i === index;
          return (
            <button
              key={i}
              type="button"
              role="tab"
              aria-label={`Go to slide ${i + 1} of ${slideCount}`}
              aria-selected={active}
              onClick={() => setIndex(i)}
              className={[
                isVertical
                  ? "astralis-w-1 astralis-flex-1 astralis-max-h-8"
                  : "astralis-h-1 astralis-flex-1 astralis-max-w-8",
                "astralis-rounded-full astralis-transition-all astralis-duration-300 astralis-cursor-pointer",
                "astralis-outline-none focus-visible:astralis-ring-2 focus-visible:astralis-ring-brand-600 focus-visible:astralis-ring-offset-2",
                active
                  ? "astralis-bg-brand-600"
                  : "astralis-bg-surface-muted hover:astralis-bg-surface-raised",
              ].join(" ")}
            />
          );
        })}
      </div>
    );
  }

  /* ── dot variant (default) ─────────────────────────────────────── */
  return (
    <div
      role="tablist"
      aria-label="Slides"
      className={[baseLayout, className].join(" ")}
    >
      {Array.from({ length: slideCount }).map((_, i) => (
        <CarouselIndicator key={i} index={i} />
      ))}
    </div>
  );
}
