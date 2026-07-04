import { cva } from "class-variance-authority";
import type { TimelineSize } from "./timeline.types";

/** The circular indicator. Colour comes from the accent channel. */
export const timelineIndicatorVariants = cva(
  "astralis:inline-flex astralis:items-center astralis:justify-center astralis:rounded-full astralis:shrink-0 astralis:font-medium",
  {
    variants: {
      size: {
        sm: "astralis:size-5 astralis:text-xs",
        md: "astralis:size-6 astralis:text-xs",
        lg: "astralis:size-8 astralis:text-sm",
      },
      variant: {
        solid: "astralis:bg-accent-solid astralis:text-accent-contrast",
        subtle: "astralis:bg-accent-subtle astralis:text-accent-label",
        outline: "astralis:bg-surface-base astralis:border-normal astralis:border-accent-stroke astralis:text-accent-label",
      },
    },
    defaultVariants: { size: "md", variant: "solid" },
  },
);

/** Connector-column width matches the indicator so the line runs through its centre. */
export const timelineColumnWidth: Record<TimelineSize, string> = {
  sm: "astralis:w-5",
  md: "astralis:w-6",
  lg: "astralis:w-8",
};

export const timelineTitleSize: Record<TimelineSize, string> = {
  sm: "astralis:text-sm",
  md: "astralis:text-sm",
  lg: "astralis:text-base",
};
