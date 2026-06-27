import { cva } from "class-variance-authority";

/* ------------------------------------------------------------------ */
/* List — the tablist + its track / container per variant              */
/* ------------------------------------------------------------------ */

export const tabsListVariants = cva("astralis:flex astralis:relative astralis:gap-1", {
  variants: {
    orientation: {
      horizontal: "astralis:flex-row astralis:items-center",
      vertical: "astralis:flex-col astralis:items-stretch",
    },
    variant: { line: "", subtle: "", segmented: "astralis:p-1", outline: "", plain: "" },
    rounded: { true: "", false: "" },
  },
  compoundVariants: [
    // line + outline sit on a track border
    { orientation: "horizontal", variant: "line", class: "astralis:border-b astralis:border-stroke-base" },
    { orientation: "vertical", variant: "line", class: "astralis:border-e astralis:border-stroke-base" },
    { orientation: "horizontal", variant: "outline", class: "astralis:border-b astralis:border-stroke-base" },
    { orientation: "vertical", variant: "outline", class: "astralis:border-e astralis:border-stroke-base" },
    // segmented is a filled container
    { variant: "segmented", class: "astralis:bg-surface-subtle" },
    { variant: "segmented", rounded: false, class: "astralis:rounded-md" },
    { variant: "segmented", rounded: true, class: "astralis:rounded-full" },
  ],
  defaultVariants: { orientation: "horizontal", variant: "line", rounded: false },
});

/* The sliding active indicator (line variant only). Position set inline at runtime. */
export const tabsIndicatorVariants = cva(
  "astralis:absolute astralis:bg-brand-solid astralis:rounded-full astralis:transition-all astralis:duration-fast astralis:pointer-events-none",
  {
    variants: {
      orientation: {
        horizontal: "astralis:bottom-0 astralis:h-0.5",
        vertical: "astralis:end-0 astralis:w-0.5",
      },
    },
    defaultVariants: { orientation: "horizontal" },
  },
);

/* ------------------------------------------------------------------ */
/* Trigger — a single tab button                                       */
/* Active state always carries the brand text colour to signal it.     */
/* ------------------------------------------------------------------ */

export const tabsTriggerVariants = cva(
  "astralis:inline-flex astralis:items-center astralis:justify-center astralis:gap-2 astralis:whitespace-nowrap astralis:font-medium astralis:transition-colors astralis:cursor-pointer astralis:outline-none astralis:disabled:opacity-moderate astralis:disabled:cursor-not-allowed astralis:focus-visible:outline-2 astralis:focus-visible:outline-offset-2 astralis:focus-visible:outline-brand-ring astralis:focus-visible:rounded-sm",
  {
    variants: {
      size: {
        sm: "astralis:text-xs astralis:px-3 astralis:py-1.5",
        md: "astralis:text-sm astralis:px-4 astralis:py-2",
        lg: "astralis:text-md astralis:px-5 astralis:py-2.5",
      },
      // `outline` reserves a transparent border so the layout doesn't shift when active.
      variant: { line: "", subtle: "", segmented: "", outline: "astralis:border-normal astralis:border-transparent", plain: "astralis:rounded-md" },
      active: { true: "", false: "" },
      fitted: { true: "astralis:flex-1", false: "" },
      rounded: { true: "", false: "" },
    },
    compoundVariants: [
      // --- radius per variant (default vs rounded) ---
      { variant: "subtle", rounded: false, class: "astralis:rounded-md" },
      { variant: "subtle", rounded: true, class: "astralis:rounded-full" },
      { variant: "segmented", rounded: false, class: "astralis:rounded-md" },
      { variant: "segmented", rounded: true, class: "astralis:rounded-full" },
      { variant: "outline", rounded: false, class: "astralis:rounded-t-md" },
      { variant: "outline", rounded: true, class: "astralis:rounded-t-xl" },
      // --- active / inactive colours (active = brand text everywhere) ---
      { variant: "line", active: true, class: "astralis:text-brand-solid" },
      { variant: "line", active: false, class: "astralis:text-label-muted astralis:hover:text-label-base" },
      { variant: "subtle", active: true, class: "astralis:bg-surface-subtle astralis:text-brand-solid" },
      { variant: "subtle", active: false, class: "astralis:text-label-muted astralis:hover:bg-surface-subtle astralis:hover:text-label-base" },
      { variant: "segmented", active: true, class: "astralis:bg-surface-base astralis:shadow-sm astralis:text-brand-solid" },
      { variant: "segmented", active: false, class: "astralis:text-label-muted astralis:hover:text-label-base" },
      { variant: "outline", active: true, class: "astralis:bg-surface-base astralis:border-stroke-base astralis:border-b-transparent astralis:text-brand-solid astralis:-mb-px" },
      { variant: "outline", active: false, class: "astralis:text-label-muted astralis:hover:text-label-base" },
      { variant: "plain", active: true, class: "astralis:text-brand-solid" },
      { variant: "plain", active: false, class: "astralis:text-label-muted astralis:hover:text-label-base" },
    ],
    defaultVariants: { size: "md", variant: "line", active: false, fitted: false, rounded: false },
  },
);

/* ------------------------------------------------------------------ */
/* Content panel                                                       */
/* ------------------------------------------------------------------ */

export const tabsContentVariants = cva(
  "astralis:flex-1 astralis:text-label-base astralis:outline-none astralis:focus-visible:outline-2 astralis:focus-visible:outline-offset-2 astralis:focus-visible:outline-brand-ring astralis:focus-visible:rounded-sm",
);
