import { createContext, useContext } from "react";

export interface CarouselContextValue {
  index: number;
  slideCount: number;
  setIndex: (index: number) => void;
  registerSlide: () => () => void;
}

export const CarouselContext =
  createContext<CarouselContextValue | null>(null);

export function useCarousel() {
  const ctx = useContext(CarouselContext);
  if (!ctx) {
    throw new Error(
      "Carousel components must be used within <Carousel>"
    );
  }
  return ctx;
}
