import type { PropRow } from "@/modules/docs/props-table";

/** Keep in sync with carousel.types.ts */
export const carouselProps: PropRow[] = [
  {
    prop: "index · defaultIndex · onIndexChange",
    type: "number · number · (index: number) => void",
    default: "— · 0 · —",
    description: "Controlled / initial slide, and the change callback.",
  },
  {
    prop: "slidesPerView",
    type: "number",
    default: "1",
    description: "Visible slides; fractional values (1.5) peek the next slide.",
  },
  {
    prop: "slidesToScroll",
    type: "number",
    default: "1",
    description: "Slides advanced per step.",
  },
  {
    prop: "slideGap",
    type: "number",
    default: "0",
    description: "Pixel gap between slides.",
  },
  {
    prop: "loop",
    type: "boolean",
    default: "false",
    description: "Wraps from the last slide back to the first.",
  },
  {
    prop: "autoPlay · autoPlayInterval · pauseOnHover",
    type: "boolean · number · boolean",
    default: "false · 3000 · true",
    description: "Automatic advancing, its cadence, and hover pause.",
  },
  {
    prop: "animation",
    type: `"slide" | "fade"`,
    default: `"slide"`,
    description: "Translate the track, or cross-fade in place.",
  },
  {
    prop: "orientation",
    type: `"horizontal" | "vertical"`,
    default: `"horizontal"`,
    description: "Slide axis; keyboard arrows follow it.",
  },
  {
    prop: "speed · easing",
    type: "number · string",
    default: `300 · "ease-out"`,
    description: "Transition duration (ms) and CSS easing.",
  },
  {
    prop: "swipeable · draggable",
    type: "boolean",
    default: "true · false",
    description: "Touch swipe and mouse drag gestures.",
  },
  {
    prop: "size",
    type: `"sm" | "md" | "lg"`,
    default: `"md"`,
    description: "Control and indicator sizing.",
  },
  {
    prop: "colorScheme",
    type: `"brand" | "gray" | … (all 11 schemes)`,
    default: `"brand"`,
    description: "Active indicator and focus-ring hue.",
  },
  {
    prop: "beforeChange · afterChange",
    type: "(from, to) => void · (current) => void",
    description: "Transition lifecycle hooks.",
  },
];

export const carouselPartsProps: PropRow[] = [
  {
    prop: "Carousel.Track / Carousel.Slide",
    type: "children",
    description: "The scroller and each slide (role=group with slide labels).",
  },
  {
    prop: "Carousel.Prev / Carousel.Next",
    type: "icon?: ReactNode",
    description: "Step buttons; default chevrons follow the orientation.",
  },
  {
    prop: "Carousel.Indicators",
    type: `variant?: "dot" | "line" | "number"`,
    default: `"dot"`,
    description: "One indicator per slide, rendered as an accessible tablist.",
  },
  {
    prop: "Carousel.ProgressText",
    type: "format?: (index, total) => ReactNode",
    default: `"1 / 3"`,
    description: "Live-region progress readout.",
  },
  {
    prop: "Carousel.AutoPlayTrigger",
    type: "children?: (isPlaying) => ReactNode",
    description: "Play/pause toggle for autoPlay.",
  },
];
