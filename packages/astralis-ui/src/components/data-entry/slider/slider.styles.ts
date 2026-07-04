import type { SliderSize } from "./slider.types";

/** Track thickness per size. */
export const sliderTrackH: Record<SliderSize, string> = {
  sm: "astralis:h-1",
  md: "astralis:h-1.5",
  lg: "astralis:h-2",
};

/** Thumb diameter per size. */
export const sliderThumbSize: Record<SliderSize, string> = {
  sm: "astralis:h-3.5 astralis:w-3.5",
  md: "astralis:h-5 astralis:w-5",
  lg: "astralis:h-6 astralis:w-6",
};

/** Centres an absolutely-positioned element on a point. Inline because the
 *  fraction-based `-translate-*` utilities don't generate under this engine. */
export const CENTER_XY = { top: "50%", transform: "translate(-50%, -50%)" } as const;
