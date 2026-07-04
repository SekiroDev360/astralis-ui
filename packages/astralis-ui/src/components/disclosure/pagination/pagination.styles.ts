import { cva } from "class-variance-authority";

/** Shared radius scale (page items, controls, jumper input). */
const rounded = {
  none: "astralis:rounded-none",
  sm: "astralis:rounded-sm",
  md: "astralis:rounded-md",
  lg: "astralis:rounded-lg",
  xl: "astralis:rounded-xl",
  "2xl": "astralis:rounded-2xl",
  full: "astralis:rounded-full",
} as const;

const focusRing =
  "astralis:outline-none astralis:focus-visible:outline-2 astralis:focus-visible:outline-offset-2 astralis:focus-visible:outline-accent-ring";
const disabledState =
  "astralis:disabled:opacity-moderate astralis:disabled:cursor-not-allowed astralis:disabled:pointer-events-none";

/* ------------------------------------------------------------------ */
/* Page item — variant × active colour comes from the accent channel.  */
/* ------------------------------------------------------------------ */
export const paginationItemVariants = cva(
  `astralis:inline-flex astralis:items-center astralis:justify-center astralis:font-medium astralis:cursor-pointer astralis:transition-colors ${focusRing} ${disabledState}`,
  {
    variants: {
      size: {
        xs: "astralis:h-7 astralis:min-w-7 astralis:px-2 astralis:text-xs",
        sm: "astralis:h-8 astralis:min-w-8 astralis:px-2.5 astralis:text-sm",
        md: "astralis:h-9 astralis:min-w-9 astralis:px-3 astralis:text-sm",
        lg: "astralis:h-10 astralis:min-w-10 astralis:px-4 astralis:text-base",
      },
      rounded,
      variant: { solid: "", outline: "", subtle: "", plain: "" },
      active: { true: "", false: "" },
    },
    compoundVariants: [
      { variant: "solid", active: true, class: "astralis:bg-accent-solid astralis:text-accent-contrast" },
      { variant: "solid", active: false, class: "astralis:text-label-base astralis:hover:bg-surface-muted" },
      { variant: "outline", active: true, class: "astralis:bg-transparent astralis:border-normal astralis:border-accent-stroke astralis:text-accent-label" },
      { variant: "outline", active: false, class: "astralis:border-normal astralis:border-transparent astralis:text-label-muted astralis:hover:border-stroke-base astralis:hover:text-label-base" },
      { variant: "subtle", active: true, class: "astralis:bg-accent-subtle astralis:text-accent-label" },
      { variant: "subtle", active: false, class: "astralis:text-label-muted astralis:hover:bg-surface-muted astralis:hover:text-label-base" },
      { variant: "plain", active: true, class: "astralis:text-accent-label astralis:font-semibold" },
      { variant: "plain", active: false, class: "astralis:text-label-muted astralis:hover:text-label-base" },
    ],
    defaultVariants: { size: "md", rounded: "md", variant: "solid", active: false },
  },
);

/* ------------------------------------------------------------------ */
/* Control buttons (Prev/Next/First/Last) — neutral, square, icon-only */
/* ------------------------------------------------------------------ */
export const paginationControlVariants = cva(
  `astralis:inline-flex astralis:items-center astralis:justify-center astralis:cursor-pointer astralis:text-label-muted astralis:transition-colors astralis:hover:bg-surface-muted astralis:hover:text-label-base ${focusRing} ${disabledState}`,
  {
    variants: {
      size: {
        xs: "astralis:size-7",
        sm: "astralis:size-8",
        md: "astralis:size-9",
        lg: "astralis:size-10",
      },
      rounded,
    },
    defaultVariants: { size: "md", rounded: "md" },
  },
);

/** Icon size paired with each control size. */
export const controlIconSize = { xs: "xs", sm: "xs", md: "sm", lg: "sm" } as const;

/* ------------------------------------------------------------------ */
/* Ellipsis — matches item footprint, non-interactive.                 */
/* ------------------------------------------------------------------ */
export const paginationEllipsisVariants = cva(
  "astralis:inline-flex astralis:items-center astralis:justify-center astralis:text-label-muted astralis:select-none",
  {
    variants: {
      size: {
        xs: "astralis:size-7 astralis:text-xs",
        sm: "astralis:size-8 astralis:text-sm",
        md: "astralis:size-9 astralis:text-sm",
        lg: "astralis:size-10 astralis:text-base",
      },
    },
    defaultVariants: { size: "md" },
  },
);

/* ------------------------------------------------------------------ */
/* Jumper input.                                                       */
/* ------------------------------------------------------------------ */
export const paginationJumperInputVariants = cva(
  `astralis:border-normal astralis:border-stroke-base astralis:bg-surface-base astralis:text-label-base astralis:text-center astralis:rounded-md astralis:transition-colors ${focusRing} ${disabledState}`,
  {
    variants: {
      size: {
        xs: "astralis:h-7 astralis:w-12 astralis:text-xs",
        sm: "astralis:h-8 astralis:w-12 astralis:text-sm",
        md: "astralis:h-9 astralis:w-14 astralis:text-sm",
        lg: "astralis:h-10 astralis:w-16 astralis:text-base",
      },
    },
    defaultVariants: { size: "md" },
  },
);
