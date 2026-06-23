import { cva } from "class-variance-authority";

/**
 * Shared by CVA + the responsive engine. Each placement anchors to an edge/corner
 * of the nearest positioned ancestor and translates by 50% so the element sits
 * centered ON that point (badge/notification-dot behaviour).
 */
export const floatVariantMap = {
  placement: {
    "top-start": "astralis:top-0 astralis:left-0 astralis:-translate-x-1/2 astralis:-translate-y-1/2",
    "top-center": "astralis:top-0 astralis:left-1/2 astralis:-translate-x-1/2 astralis:-translate-y-1/2",
    "top-end": "astralis:top-0 astralis:right-0 astralis:translate-x-1/2 astralis:-translate-y-1/2",
    "middle-start": "astralis:top-1/2 astralis:left-0 astralis:-translate-x-1/2 astralis:-translate-y-1/2",
    "middle-center": "astralis:top-1/2 astralis:left-1/2 astralis:-translate-x-1/2 astralis:-translate-y-1/2",
    "middle-end": "astralis:top-1/2 astralis:right-0 astralis:translate-x-1/2 astralis:-translate-y-1/2",
    "bottom-start": "astralis:bottom-0 astralis:left-0 astralis:-translate-x-1/2 astralis:translate-y-1/2",
    "bottom-center": "astralis:bottom-0 astralis:left-1/2 astralis:-translate-x-1/2 astralis:translate-y-1/2",
    "bottom-end": "astralis:bottom-0 astralis:right-0 astralis:translate-x-1/2 astralis:translate-y-1/2",
  },
} as const;

export const floatVariants = cva(
  "astralis:absolute astralis:z-lower astralis:inline-flex astralis:items-center astralis:justify-center",
  {
    variants: floatVariantMap,
    defaultVariants: { placement: "top-end" },
  },
);
