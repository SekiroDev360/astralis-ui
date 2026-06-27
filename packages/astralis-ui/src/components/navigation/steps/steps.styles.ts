import { cva } from "class-variance-authority";
import type { TextProps } from "../../typography/text";

/**
 * Per-size class lookup. Drives indicator dimensions, the title/description
 * Text sizes, and the gap between indicator and label. Scalar (read from the
 * Steps context), so no responsive resolution needed here.
 */
export const stepSizeClasses = {
  sm: {
    circle: "astralis:size-6 astralis:text-xs",
    dot: "astralis:size-2.5",
    rowGap: "astralis:gap-2.5",
    titleSize: "sm" as TextProps["size"],
    descSize: "xs" as TextProps["size"],
  },
  md: {
    circle: "astralis:size-8 astralis:text-sm",
    dot: "astralis:size-3",
    rowGap: "astralis:gap-3",
    titleSize: "md" as TextProps["size"],
    descSize: "sm" as TextProps["size"],
  },
  lg: {
    circle: "astralis:size-10 astralis:text-md",
    dot: "astralis:size-4",
    rowGap: "astralis:gap-3.5",
    titleSize: "lg" as TextProps["size"],
    descSize: "sm" as TextProps["size"],
  },
} as const;

/* ------------------------------------------------------------------ */
/* Indicator — circle (solid / subtle variants)                        */
/* Colours come from semantic + brand-role tokens, so it flips cleanly */
/* between light/dark. compoundVariants pair variant × status.         */
/* ------------------------------------------------------------------ */

export const stepIndicatorVariants = cva(
  "astralis:flex astralis:items-center astralis:justify-center astralis:rounded-full astralis:border-moderate astralis:font-medium astralis:shrink-0 astralis:transition-colors",
  {
    variants: {
      size: {
        sm: "astralis:size-6 astralis:text-xs",
        md: "astralis:size-8 astralis:text-sm",
        lg: "astralis:size-10 astralis:text-md",
      },
      variant: { solid: "", subtle: "" },
      status: { upcoming: "", active: "", completed: "", error: "" },
    },
    compoundVariants: [
      // solid
      { variant: "solid", status: "upcoming", class: "astralis:bg-transparent astralis:text-label-subtle astralis:border-stroke-base" },
      { variant: "solid", status: "active", class: "astralis:bg-brand-solid astralis:text-brand-contrast astralis:border-brand-solid" },
      { variant: "solid", status: "completed", class: "astralis:bg-brand-solid astralis:text-brand-contrast astralis:border-brand-solid" },
      { variant: "solid", status: "error", class: "astralis:bg-surface-error astralis:text-label-error astralis:border-stroke-error" },
      // subtle
      { variant: "subtle", status: "upcoming", class: "astralis:bg-transparent astralis:text-label-subtle astralis:border-stroke-base" },
      { variant: "subtle", status: "active", class: "astralis:bg-brand-subtle astralis:text-brand-label astralis:border-brand-solid" },
      { variant: "subtle", status: "completed", class: "astralis:bg-brand-subtle astralis:text-brand-label astralis:border-brand-subtle" },
      { variant: "subtle", status: "error", class: "astralis:bg-surface-error astralis:text-label-error astralis:border-stroke-error" },
    ],
    defaultVariants: { size: "md", variant: "solid", status: "upcoming" },
  },
);

/* ------------------------------------------------------------------ */
/* Indicator — dot variant                                             */
/* ------------------------------------------------------------------ */

export const stepDotVariants = cva(
  "astralis:rounded-full astralis:shrink-0 astralis:transition-colors",
  {
    variants: {
      size: {
        sm: "astralis:size-2.5",
        md: "astralis:size-3",
        lg: "astralis:size-4",
      },
      status: {
        upcoming: "astralis:bg-surface-emphasized",
        active: "astralis:bg-brand-solid",
        completed: "astralis:bg-brand-solid",
        error: "astralis:bg-label-error",
      },
    },
    defaultVariants: { size: "md", status: "upcoming" },
  },
);

/* ------------------------------------------------------------------ */
/* Connector line — the bar/line between steps                         */
/* ------------------------------------------------------------------ */

export const stepConnectorVariants = cva(
  "astralis:rounded-full astralis:transition-colors",
  {
    variants: {
      orientation: {
        horizontal: "astralis:h-0.5 astralis:flex-1",
        vertical: "astralis:w-0.5 astralis:flex-1 astralis:min-h-6 astralis:my-1",
      },
      done: {
        true: "astralis:bg-brand-solid",
        false: "astralis:bg-stroke-base",
      },
    },
    defaultVariants: { orientation: "horizontal", done: false },
  },
);

/* ------------------------------------------------------------------ */
/* Clickable indicator wrapper (button) + nav triggers (Prev/Next)     */
/* ------------------------------------------------------------------ */

export const stepTriggerVariants = cva(
  // Hover feedback via opacity keeps it legible on any indicator colour.
  "astralis:rounded-full astralis:cursor-pointer astralis:transition-opacity astralis:hover:opacity-higher astralis:disabled:cursor-not-allowed astralis:disabled:opacity-moderate",
);

export const stepNavVariants = cva(
  "astralis:inline-flex astralis:items-center astralis:justify-center astralis:gap-2 astralis:rounded-md astralis:border-normal astralis:border-stroke-base astralis:bg-surface-base astralis:text-label-base astralis:px-4 astralis:py-2 astralis:text-sm astralis:font-medium astralis:transition-colors astralis:cursor-pointer astralis:hover:bg-surface-muted astralis:disabled:opacity-moderate astralis:disabled:cursor-not-allowed astralis:disabled:pointer-events-none",
);
