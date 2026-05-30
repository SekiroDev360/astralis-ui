import { CarouselRoot } from "./components/carousel-root";
import { CarouselTrack } from "./components/carousel-track";
import { CarouselSlide } from "./components/carousel-slide";
import { CarouselPrev } from "./components/carousel-prev";
import { CarouselNext } from "./components/carousel-next";
import { CarouselIndicator } from "./components/carousel-indicator";
import { CarouselIndicators } from "./components/carousel-indicators";

/* 1️⃣ Compound API */
export const Carousel = Object.assign(CarouselRoot, {
  Track: CarouselTrack,
  Slide: CarouselSlide,
  Prev: CarouselPrev,
  Next: CarouselNext,
  Indicator: CarouselIndicator,
  Indicators: CarouselIndicators,
});

/* 2️⃣ Flat exports */
export {
  CarouselTrack,
  CarouselSlide,
  CarouselPrev,
  CarouselNext,
  CarouselIndicator,
  CarouselIndicators,
};

/* 3️⃣ Types */
export type {
  CarouselProps,
  CarouselTrackProps,
  CarouselSlideProps,
  CarouselControlProps,
  CarouselIndicatorProps,
  CarouselIndicatorsProps,
} from "./carousel.types";
