import { cva } from "class-variance-authority";
import type { ProgressSize } from "./progress.types";

export const progressTrackVariants = cva(
  "astralis:w-full astralis:overflow-hidden astralis:rounded-full astralis:bg-surface-emphasized",
  {
    variants: {
      size: {
        sm: "astralis:h-1",
        md: "astralis:h-2",
        lg: "astralis:h-3",
      },
    },
    defaultVariants: { size: "md" },
  },
);

export const progressBarClasses =
  "astralis:h-full astralis:rounded-full astralis:bg-accent-solid astralis:transition-[width] astralis:duration-moderate";

/** Ring diameter (px) and stroke width per size. */
export const progressCircleSizes: Record<ProgressSize, { px: number; stroke: number }> = {
  sm: { px: 32, stroke: 4 },
  md: { px: 44, stroke: 4 },
  lg: { px: 56, stroke: 5 },
};

export const progressValueLabelClasses =
  "astralis:font-medium astralis:tabular-nums astralis:text-label-muted";
