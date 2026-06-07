import { useEffect, useState } from "react";
import type { CarouselSlideProps } from "../carousel.types";
import { useCarousel } from "../carousel.context";
export function CarouselSlide({ children }: CarouselSlideProps) {
  const { registerSlide, index: activeIndex, slideCount, animation, speed, easing } =
    useCarousel();
  const [slideIndex, setSlideIndex] = useState<number | null>(null);
  useEffect(() => {
    const { slideIndex: idx, unregister } = registerSlide();
    setSlideIndex(idx);
    return unregister;
  }, [registerSlide]);
  const isActive = slideIndex === activeIndex;
  /* ---------------------------------------------------------------- */
  /* Fade mode — absolutely stacked, opacity-driven                    */
  /* ---------------------------------------------------------------- */
  if (animation === "fade") {
    return (
      <div
        role="group"
        aria-roledescription="slide"
        aria-label={
          slideIndex !== null
            ? `Slide ${slideIndex + 1} of ${slideCount}`
            : undefined
        }
        aria-hidden={!isActive}
        className="astralis-absolute astralis-inset-0 astralis-w-full"
        style={{
          opacity: isActive ? 1 : 0,
          zIndex: isActive ? 1 : 0,
          pointerEvents: isActive ? "auto" : "none",
          transitionProperty: "opacity",
          transitionDuration: `${speed}ms`,
          transitionTimingFunction: easing,
        }}
      >
        {children}
      </div>
    );
  }
  /* ---------------------------------------------------------------- */
  /* Slide mode                                                         */
  /* ---------------------------------------------------------------- */
  return (
    <div
      role="group"
      aria-roledescription="slide"
      aria-label={
        slideIndex !== null
          ? `Slide ${slideIndex + 1} of ${slideCount}`
          : undefined
      }
      aria-hidden={!isActive}
      className="astralis-w-full astralis-flex-shrink-0"
    >
      {children}
    </div>
  );
}
