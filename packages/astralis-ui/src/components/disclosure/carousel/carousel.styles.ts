import { cva } from "class-variance-authority";

const focusRing =
  "astralis:outline-none astralis:focus-visible:outline-2 astralis:focus-visible:outline-offset-2 astralis:focus-visible:outline-accent-ring";

/* ------------------------------------------------------------------ */
/* Prev / Next / AutoPlay — circular control buttons.                  */
/* ------------------------------------------------------------------ */
export const carouselControlVariants = cva(
  `astralis:inline-flex astralis:items-center astralis:justify-center astralis:shrink-0 astralis:rounded-full astralis:cursor-pointer astralis:bg-surface-base astralis:text-label-base astralis:border-normal astralis:border-stroke-subtle astralis:shadow-md astralis:transition-colors astralis:hover:bg-surface-muted astralis:disabled:opacity-moderate astralis:disabled:cursor-not-allowed ${focusRing}`,
  {
    variants: {
      size: {
        sm: "astralis:size-7",
        md: "astralis:size-9",
        lg: "astralis:size-11",
      },
    },
    defaultVariants: { size: "md" },
  },
);

/** Icon size that pairs with each control size. */
export const controlIconSize = { sm: "xs", md: "sm", lg: "md" } as const;

/* ------------------------------------------------------------------ */
/* Control — wraps Prev/Indicators/Next and arranges them by axis.     */
/* Horizontal: a centered bar below the slides. Vertical: a column     */
/* beside them with the controls pushed to the ends.                   */
/* ------------------------------------------------------------------ */
export const carouselControlGroupVariants = cva("astralis:flex astralis:gap-4", {
  variants: {
    orientation: {
      horizontal: "astralis:flex-row astralis:items-center astralis:justify-center astralis:mt-4",
      vertical: "astralis:flex-col astralis:items-center astralis:justify-between",
    },
  },
  defaultVariants: { orientation: "horizontal" },
});

/* ------------------------------------------------------------------ */
/* Indicators                                                          */
/* ------------------------------------------------------------------ */
export const carouselIndicatorsVariants = cva(
  "astralis:flex astralis:items-center astralis:justify-center astralis:gap-2",
  {
    variants: {
      orientation: { horizontal: "astralis:flex-row", vertical: "astralis:flex-col" },
    },
    defaultVariants: { orientation: "horizontal" },
  },
);

/* Dot — active one elongates into a pill in the active accent colour. */
export const carouselDotVariants = cva(
  `astralis:rounded-full astralis:cursor-pointer astralis:transition-all astralis:duration-moderate ${focusRing}`,
  {
    variants: {
      size: { sm: "astralis:h-1.5", md: "astralis:h-2", lg: "astralis:h-2.5" },
      active: {
        true: "astralis:bg-accent-solid",
        false: "astralis:bg-surface-emphasized astralis:hover:bg-surface-muted",
      },
    },
    compoundVariants: [
      { size: "sm", active: true, class: "astralis:w-5" },
      { size: "sm", active: false, class: "astralis:w-1.5" },
      { size: "md", active: true, class: "astralis:w-6" },
      { size: "md", active: false, class: "astralis:w-2" },
      { size: "lg", active: true, class: "astralis:w-8" },
      { size: "lg", active: false, class: "astralis:w-2.5" },
    ],
    defaultVariants: { size: "md", active: false },
  },
);

/* Line — fixed-width bars that fill on activation. A fixed size (not flex-1)
   keeps them visible regardless of where the indicator row is placed. */
export const carouselLineVariants = cva(
  `astralis:shrink-0 astralis:rounded-full astralis:cursor-pointer astralis:transition-colors astralis:duration-moderate ${focusRing}`,
  {
    variants: {
      orientation: {
        horizontal: "astralis:h-1 astralis:w-8",
        vertical: "astralis:w-1 astralis:h-8",
      },
      active: {
        true: "astralis:bg-accent-solid",
        false: "astralis:bg-surface-emphasized astralis:hover:bg-surface-muted",
      },
    },
    defaultVariants: { orientation: "horizontal", active: false },
  },
);

/* Number / progress text. */
export const carouselProgressVariants = cva(
  "astralis:text-sm astralis:font-medium astralis:tabular-nums astralis:text-label-muted",
);
