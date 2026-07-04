import { cva } from "class-variance-authority";

/* ------------------------------------------------------------------ */
/* Root — outer container chrome per variant.                          */
/* ------------------------------------------------------------------ */
export const accordionRootVariants = cva("astralis:w-full", {
  variants: {
    variant: {
      // Shared outer border + rounded; items divided by inner borders.
      enclosed: "astralis:border-normal astralis:border-stroke-base astralis:rounded-lg astralis:overflow-hidden",
      // Divider lines only, no outer frame.
      outline: "",
      // Each item is its own card.
      separated: "astralis:flex astralis:flex-col astralis:gap-3",
      // Filled cards.
      subtle: "astralis:flex astralis:flex-col astralis:gap-2",
      // No chrome at all.
      plain: "",
    },
  },
  defaultVariants: { variant: "enclosed" },
});

/* ------------------------------------------------------------------ */
/* Item — per-row framing.                                             */
/* ------------------------------------------------------------------ */
export const accordionItemVariants = cva("astralis:transition-colors", {
  variants: {
    variant: {
      enclosed: "astralis:border-b astralis:border-stroke-base astralis:last:border-b-0",
      outline: "astralis:border-b astralis:border-stroke-base astralis:last:border-b-0",
      separated:
        "astralis:border-normal astralis:border-stroke-base astralis:rounded-lg astralis:overflow-hidden astralis:bg-surface-base",
      subtle: "astralis:rounded-lg astralis:overflow-hidden astralis:bg-surface-subtle",
      plain: "",
    },
    disabled: {
      true: "astralis:opacity-moderate astralis:pointer-events-none",
      false: "",
    },
  },
  defaultVariants: { variant: "enclosed", disabled: false },
});

/* ------------------------------------------------------------------ */
/* Trigger — the header button. `open` drives the subtle accent fill.  */
/* Focus ring is inset (full-width control) and uses the accent hue.   */
/* ------------------------------------------------------------------ */
export const accordionTriggerVariants = cva(
  "astralis:w-full astralis:flex astralis:items-center astralis:gap-3 astralis:text-left astralis:font-medium astralis:text-label-base astralis:cursor-pointer astralis:transition-colors astralis:outline-none astralis:focus-visible:outline-2 astralis:focus-visible:outline-offset-[-2px] astralis:focus-visible:outline-accent-ring astralis:disabled:cursor-not-allowed astralis:disabled:opacity-moderate",
  {
    variants: {
      size: {
        sm: "astralis:px-3 astralis:py-2 astralis:text-sm",
        md: "astralis:px-4 astralis:py-3 astralis:text-base",
        lg: "astralis:px-5 astralis:py-4 astralis:text-lg",
      },
      variant: {
        enclosed: "astralis:hover:bg-surface-subtle",
        outline: "astralis:hover:bg-surface-subtle",
        separated: "astralis:hover:bg-surface-subtle",
        subtle: "astralis:hover:bg-accent-subtle",
        plain: "",
      },
      open: { true: "", false: "" },
    },
    compoundVariants: [
      // Only the `subtle` variant tints its open header with the accent hue.
      { variant: "subtle", open: true, class: "astralis:bg-accent-subtle astralis:text-accent-label" },
    ],
    defaultVariants: { size: "md", variant: "enclosed", open: false },
  },
);

/* ------------------------------------------------------------------ */
/* Content — padded body inside the collapsing region.                 */
/* ------------------------------------------------------------------ */
export const accordionContentVariants = cva("astralis:text-label-muted", {
  variants: {
    size: {
      // pt is set so (trigger pad-bottom + content pad-top) === content pad-bottom,
      // making the gap above the body equal the gap below it.
      sm: "astralis:px-3 astralis:pb-3 astralis:pt-2 astralis:text-sm",
      md: "astralis:px-4 astralis:pb-4 astralis:pt-2 astralis:text-sm",
      lg: "astralis:px-5 astralis:pb-5 astralis:pt-2 astralis:text-base",
    },
  },
  defaultVariants: { size: "md" },
});

/* ------------------------------------------------------------------ */
/* Indicator — rotates a quarter-turn-plus on open.                    */
/* ------------------------------------------------------------------ */
export const accordionIndicatorVariants = cva(
  "astralis:shrink-0 astralis:text-label-muted astralis:transition-transform astralis:duration-moderate",
  {
    variants: {
      open: { true: "astralis:rotate-180", false: "astralis:rotate-0" },
    },
    defaultVariants: { open: false },
  },
);
