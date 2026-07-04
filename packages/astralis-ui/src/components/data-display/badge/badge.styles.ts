import { cva } from "class-variance-authority";

/** Label chip. Colour comes from the accent channel; `colorScheme` sets the hue. */
export const badgeVariants = cva(
  "astralis:inline-flex astralis:items-center astralis:gap-1 astralis:rounded-full astralis:font-medium astralis:leading-none astralis:whitespace-nowrap",
  {
    variants: {
      size: {
        xs: "astralis:text-xs astralis:px-1.5 astralis:py-0.5",
        sm: "astralis:text-xs astralis:px-2 astralis:py-1",
        md: "astralis:text-sm astralis:px-2.5 astralis:py-1",
        lg: "astralis:text-sm astralis:px-3 astralis:py-1.5",
      },
      variant: {
        solid: "astralis:bg-accent-solid astralis:text-accent-contrast",
        subtle: "astralis:bg-accent-subtle astralis:text-accent-label",
        surface: "astralis:bg-accent-subtle astralis:text-accent-label astralis:border-normal astralis:border-accent-stroke",
        outline: "astralis:bg-transparent astralis:border-normal astralis:border-accent-stroke astralis:text-accent-label",
      },
    },
    defaultVariants: { size: "sm", variant: "subtle" },
  },
);
