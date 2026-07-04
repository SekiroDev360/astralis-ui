import { CarouselRoot } from "./components/carousel-root";
import { CarouselTrack } from "./components/carousel-track";
import { CarouselSlide } from "./components/carousel-slide";
import { CarouselControl } from "./components/carousel-control";
import { CarouselPrev } from "./components/carousel-prev";
import { CarouselNext } from "./components/carousel-next";
import { CarouselIndicator } from "./components/carousel-indicator";
import { CarouselIndicators } from "./components/carousel-indicators";
import { CarouselProgressText } from "./components/carousel-progress-text";
import { CarouselAutoPlayTrigger } from "./components/carousel-autoplay-trigger";

/** Compound API — `Carousel` is the root; parts hang off it. */
export const Carousel = Object.assign(CarouselRoot, {
  Track: CarouselTrack,
  Slide: CarouselSlide,
  Control: CarouselControl,
  Prev: CarouselPrev,
  Next: CarouselNext,
  Indicator: CarouselIndicator,
  Indicators: CarouselIndicators,
  ProgressText: CarouselProgressText,
  AutoPlayTrigger: CarouselAutoPlayTrigger,
});

/** Flat exports of the sub-parts only. */
export {
  CarouselTrack,
  CarouselSlide,
  CarouselControl,
  CarouselPrev,
  CarouselNext,
  CarouselIndicator,
  CarouselIndicators,
  CarouselProgressText,
  CarouselAutoPlayTrigger,
};

export type {
  CarouselProps,
  CarouselAnimation,
  CarouselOrientation,
  CarouselIndicatorVariant,
  CarouselSize,
  CarouselTrackProps,
  CarouselSlideProps,
  CarouselControlGroupProps,
  CarouselControlProps,
  CarouselIndicatorProps,
  CarouselIndicatorsProps,
  CarouselProgressTextProps,
  CarouselAutoPlayTriggerProps,
} from "./carousel.types";
