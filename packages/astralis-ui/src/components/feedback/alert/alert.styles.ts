import { cva } from "class-variance-authority";

/**
 * Every variant is written ONCE against the accent channel; the status→hue
 * mapping in alert.tsx rebinds it, so all four statuses (and any explicit
 * colorScheme) reuse the same table.
 */
export const alertVariants = cva(
  "astralis:flex astralis:items-start astralis:gap-3 astralis:rounded-lg astralis:px-4 astralis:py-3 astralis:text-sm",
  {
    variants: {
      variant: {
        subtle: "astralis:bg-accent-subtle astralis:text-accent-label",
        solid: "astralis:bg-accent-solid astralis:text-accent-contrast",
        outline: "astralis:bg-transparent astralis:border-normal astralis:border-accent-stroke astralis:text-accent-label",
        "left-accent": "astralis:bg-accent-subtle astralis:text-accent-label astralis:border-s-4 astralis:border-accent-solid astralis:rounded-s-none",
      },
    },
    defaultVariants: { variant: "subtle" },
  },
);

export const alertIconClasses = "astralis:h-5 astralis:w-5 astralis:shrink-0 astralis:mt-0.5";
export const alertTitleClasses = "astralis:font-semibold";
export const alertDescriptionClasses = "astralis:mt-0.5 astralis:opacity-90";
export const alertCloseClasses =
  "astralis:ml-auto astralis:shrink-0 astralis:cursor-pointer astralis:rounded-md astralis:p-1 astralis:-m-1 astralis:opacity-70 astralis:transition-opacity astralis:hover:opacity-100 astralis:focus-visible:outline-2 astralis:focus-visible:outline-offset-2 astralis:focus-visible:outline-accent-ring";
