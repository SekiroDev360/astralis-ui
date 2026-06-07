import { createContext, useContext } from "react";
import type { CarouselAnimation, CarouselOrientation } from "./carousel.types";
export interface CarouselContextValue {
  /* ── state ─────────────────────────────────────────────────────── */
  index: number;
  slideCount: number;
  setIndex: (index: number) => void;
  /**
   * Register a slide. Returns the slide's own 0-based index and an
   * unregister cleanup function.
   */
  registerSlide: () => { slideIndex: number; unregister: () => void };
  /* ── config ─────────────────────────────────────────────────────── */
  loop: boolean;
  orientation: CarouselOrientation;
  animation: CarouselAnimation;
  speed: number;
  easing: string;
  disabled: boolean;
  swipeable: boolean;
  draggable: boolean;
  /* ── autoplay ────────────────────────────────────────────────────── */
  isPlaying: boolean;
  toggleAutoPlay: () => void;
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
