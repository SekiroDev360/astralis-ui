import { cva } from "class-variance-authority";

/**
 * The resting anchor of a FloatingButton before it is dragged: the four corners,
 * plus the two horizontal-edge midpoints (`center-bottom`/`center-top`) for a
 * launcher centred along the bottom or top.
 */
export const FLOATING_BUTTON_PLACEMENTS = [
  "bottom-right",
  "bottom-left",
  "top-right",
  "top-left",
  "center-bottom",
  "center-top",
] as const;
export type FloatingButtonPlacement = (typeof FLOATING_BUTTON_PLACEMENTS)[number];

export const FLOATING_BUTTON_OFFSETS = ["sm", "md", "lg"] as const;
export type FloatingButtonOffset = (typeof FLOATING_BUTTON_OFFSETS)[number];

/**
 * The fixed wrapper the button sits in.
 *
 * Placement is a class only while the button is at rest in a corner. Once it
 * has been dragged the position becomes an inline `left`/`top` — arbitrary
 * pixel values cannot be expressed as precompiled utilities, and interpolated
 * class names are invisible to both Tailwind's scanner and the responsive
 * safelist generator.
 *
 * `z-highest` rather than `z-max`: this must clear page chrome and sticky
 * headers, but still sit UNDER modals and drawers, which own the top of the
 * stack.
 */
export const floatingButtonWrapper = cva("astralis:fixed astralis:z-highest", {
  variants: {
    placement: {
      "bottom-right": "",
      "bottom-left": "",
      "top-right": "",
      "top-left": "",
      "center-bottom": "",
      "center-top": "",
    },
    offset: { sm: "", md: "", lg: "" },
    /** Dragged: the inline position wins, so no corner class applies. */
    floating: { true: "", false: "" },
    dragging: {
      // Suppress the resting transition so the button tracks the pointer exactly.
      true: "astralis:cursor-grabbing astralis:select-none astralis:transition-none",
      false: "",
    },
  },
  compoundVariants: [
    /* Corner + offset pairs. Written out because a class the scanner cannot
       see is never generated, and in a precompiled stylesheet that fails
       silently at runtime rather than at build time. */
    { floating: false, placement: "bottom-right", offset: "sm", class: "astralis:bottom-3 astralis:right-3" },
    { floating: false, placement: "bottom-right", offset: "md", class: "astralis:bottom-6 astralis:right-6" },
    { floating: false, placement: "bottom-right", offset: "lg", class: "astralis:bottom-10 astralis:right-10" },

    { floating: false, placement: "bottom-left", offset: "sm", class: "astralis:bottom-3 astralis:left-3" },
    { floating: false, placement: "bottom-left", offset: "md", class: "astralis:bottom-6 astralis:left-6" },
    { floating: false, placement: "bottom-left", offset: "lg", class: "astralis:bottom-10 astralis:left-10" },

    { floating: false, placement: "top-right", offset: "sm", class: "astralis:top-3 astralis:right-3" },
    { floating: false, placement: "top-right", offset: "md", class: "astralis:top-6 astralis:right-6" },
    { floating: false, placement: "top-right", offset: "lg", class: "astralis:top-10 astralis:right-10" },

    { floating: false, placement: "top-left", offset: "sm", class: "astralis:top-3 astralis:left-3" },
    { floating: false, placement: "top-left", offset: "md", class: "astralis:top-6 astralis:left-6" },
    { floating: false, placement: "top-left", offset: "lg", class: "astralis:top-10 astralis:left-10" },

    /* Horizontal midpoints. left-1/2 + a half-width shift centres the button;
       the translate only applies at rest (floating:false), so a dragged
       position — set as an inline left/top — is never offset by it. */
    { floating: false, placement: "center-bottom", offset: "sm", class: "astralis:bottom-3 astralis:left-1/2 astralis:-translate-x-1/2" },
    { floating: false, placement: "center-bottom", offset: "md", class: "astralis:bottom-6 astralis:left-1/2 astralis:-translate-x-1/2" },
    { floating: false, placement: "center-bottom", offset: "lg", class: "astralis:bottom-10 astralis:left-1/2 astralis:-translate-x-1/2" },

    { floating: false, placement: "center-top", offset: "sm", class: "astralis:top-3 astralis:left-1/2 astralis:-translate-x-1/2" },
    { floating: false, placement: "center-top", offset: "md", class: "astralis:top-6 astralis:left-1/2 astralis:-translate-x-1/2" },
    { floating: false, placement: "center-top", offset: "lg", class: "astralis:top-10 astralis:left-1/2 astralis:-translate-x-1/2" },
  ],
  defaultVariants: {
    placement: "bottom-right",
    offset: "md",
    floating: false,
    dragging: false,
  },
});

/**
 * The button itself. Elevation and a circular shape by default — the affordance
 * of something sitting above the page rather than in it.
 */
export const floatingButtonVariants = cva("astralis:shadow-lg astralis:hover:shadow-xl", {
  variants: {
    draggable: {
      true: "astralis:cursor-grab astralis:touch-none",
      false: "",
    },
  },
  defaultVariants: { draggable: false },
});
