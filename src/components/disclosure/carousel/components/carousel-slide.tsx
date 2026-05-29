import { useEffect } from "react";
import type { CarouselSlideProps } from "../carousel.types";
import { useCarousel } from "../carousel.context";

export function CarouselSlide({
  children,
}: CarouselSlideProps) {
  const { registerSlide } = useCarousel();

  useEffect(() => {
    const unregister = registerSlide();
    return () => {
      unregister();
    };
  }, [registerSlide]);

  return (
    <div
      role="group"
      aria-roledescription="slide"
      className="astralis-w-full astralis-flex-shrink-0"
    >
      {children}
    </div>
  );
}
