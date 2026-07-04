import { createContext, useContext } from "react";
import type { CarouselAnimation, CarouselOrientation, CarouselSize } from "./carousel.types";

export interface CarouselContextValue {
  /* state */
  index: number;
  setIndex: (index: number) => void;
  slideCount: number;
  setSlideCount: (count: number) => void;
  /** Highest navigable leading index (the last page's start). */
  lastIndex: number;

  /* layout */
  slidesPerView: number;
  slidesToScroll: number;
  slideGap: number;
  orientation: CarouselOrientation;
  animation: CarouselAnimation;
  speed: number;
  easing: string;
  size: CarouselSize;

  /* behaviour */
  loop: boolean;
  disabled: boolean;
  swipeable: boolean;
  draggable: boolean;

  /* autoplay */
  isPlaying: boolean;
  toggleAutoPlay: () => void;
}

export const CarouselContext = createContext<CarouselContextValue | null>(null);

export function useCarousel(): CarouselContextValue {
  const ctx = useContext(CarouselContext);
  if (!ctx) throw new Error("Carousel sub-components must be used within <Carousel>");
  return ctx;
}

/** A slide's ordinal, provided by Track so slides don't self-register. */
export const CarouselItemContext = createContext<number>(0);
export function useCarouselItemIndex(): number {
  return useContext(CarouselItemContext);
}
