import { cva } from "class-variance-authority";

/**
 * Layout for a row/column of related buttons.
 *
 * - `attached` welds them into a single segmented control: zero gap, inner radii
 *   collapsed, and adjacent borders merged (negative margin) so shared edges don't
 *   double up. The child-targeting utilities are safelisted in tailwind-entry.css.
 * - Otherwise the buttons are spaced by `spacing`.
 */
export const buttonGroupVariants = cva("astralis:inline-flex", {
  variants: {
    orientation: {
      horizontal: "astralis:flex-row",
      vertical: "astralis:flex-col",
    },
    attached: { true: "", false: "" },
    spacing: {
      none: "astralis:gap-0",
      sm: "astralis:gap-1.5",
      md: "astralis:gap-2",
      lg: "astralis:gap-3",
    },
  },
  compoundVariants: [
    // Attached → no gap; spacing is ignored.
    { attached: true, class: "astralis:gap-0" },
    {
      attached: true,
      orientation: "horizontal",
      class:
        "astralis:[&>*:not(:first-child)]:rounded-s-none astralis:[&>*:not(:last-child)]:rounded-e-none astralis:[&>*:not(:first-child)]:-ms-px",
    },
    {
      attached: true,
      orientation: "vertical",
      class:
        "astralis:[&>*:not(:first-child)]:rounded-t-none astralis:[&>*:not(:last-child)]:rounded-b-none astralis:[&>*:not(:first-child)]:-mt-px",
    },
  ],
  defaultVariants: {
    orientation: "horizontal",
    attached: false,
    spacing: "md",
  },
});
