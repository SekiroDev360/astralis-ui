import { CarouselRoot } from "./components/carousel-root";
import { CarouselTrack } from "./components/carousel-track";
import { CarouselSlide } from "./components/carousel-slide";
import { CarouselPrev } from "./components/carousel-prev";
import { CarouselNext } from "./components/carousel-next";
import { CarouselIndicator } from "./components/carousel-indicator";
import { CarouselIndicators } from "./components/carousel-indicators";
import { CarouselProgressText } from "./components/carousel-progress-text";
import { CarouselAutoPlayTrigger } from "./components/carousel-autoplay-trigger";
/* 1️⃣ Compound API */
export const Carousel = Object.assign(CarouselRoot, {
  Track: CarouselTrack,
  Slide: CarouselSlide,
  Prev: CarouselPrev,
  Next: CarouselNext,
  Indicator: CarouselIndicator,
  Indicators: CarouselIndicators,
  ProgressText: CarouselProgressText,
  AutoPlayTrigger: CarouselAutoPlayTrigger,
});
/* 2️⃣ Flat exports */
export {
  CarouselTrack,
  CarouselSlide,
  CarouselPrev,
  CarouselNext,
  CarouselIndicator,
  CarouselIndicators,
  CarouselProgressText,
  CarouselAutoPlayTrigger,
};
/* 3️⃣ Types */
export type {
  CarouselProps,
  CarouselAnimation,
  CarouselOrientation,
  CarouselIndicatorVariant,
  CarouselTrackProps,
  CarouselSlideProps,
  CarouselControlProps,
  CarouselIndicatorProps,
  CarouselIndicatorsProps,
  CarouselProgressTextProps,
  CarouselAutoPlayTriggerProps,
} from "./carousel.types";
