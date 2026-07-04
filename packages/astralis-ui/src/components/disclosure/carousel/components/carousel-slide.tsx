import type { CSSProperties } from "react";
import type { CarouselSlideProps } from "../carousel.types";
import { useCarousel, useCarouselItemIndex } from "../carousel.context";

export function CarouselSlide({ children, className = "" }: CarouselSlideProps) {
  const { index, slideCount, slidesPerView, slideGap, orientation, animation, speed, easing } = useCarousel();
  const i = useCarouselItemIndex();
  const isVertical = orientation === "vertical";

  /* --- fade: every slide shares one grid cell; opacity reveals the active one --- */
  if (animation === "fade") {
    const active = i === index;
    return (
      <div
        role="group"
        aria-roledescription="slide"
        aria-label={`Slide ${i + 1} of ${slideCount}`}
        aria-hidden={!active}
        inert={!active}
        className={className}
        style={{
          gridArea: "1 / 1",
          opacity: active ? 1 : 0,
          zIndex: active ? 1 : 0,
          transitionProperty: "opacity",
          transitionDuration: `${speed}ms`,
          transitionTimingFunction: easing,
        }}
      >
        {children}
      </div>
    );
  }

  /* --- slide: a flex item sized to show `slidesPerView` per view --- */
  const scroll = Math.min(index, Math.max(0, slideCount - slidesPerView));
  const visible = i >= Math.floor(scroll) && i < scroll + slidesPerView;
  const basis = `calc((100% - ${slidesPerView - 1} * ${slideGap}px) / ${slidesPerView})`;
  const style: CSSProperties = {
    flex: `0 0 ${basis}`,
    ...(isVertical ? { minHeight: 0 } : { minWidth: 0 }),
  };

  return (
    <div
      role="group"
      aria-roledescription="slide"
      aria-label={`Slide ${i + 1} of ${slideCount}`}
      aria-hidden={!visible}
      inert={!visible}
      className={className}
      style={style}
    >
      {children}
    </div>
  );
}
