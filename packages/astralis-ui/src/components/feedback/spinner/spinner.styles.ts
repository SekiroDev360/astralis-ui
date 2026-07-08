import { cva } from "class-variance-authority";

export const spinnerVariants = cva("astralis:inline-flex astralis:shrink-0 astralis:text-accent-solid", {
  variants: {
    size: {
      xs: "astralis:h-3 astralis:w-3",
      sm: "astralis:h-4 astralis:w-4",
      md: "astralis:h-5 astralis:w-5",
      lg: "astralis:h-6 astralis:w-6",
      xl: "astralis:h-8 astralis:w-8",
    },
  },
  defaultVariants: { size: "md" },
});
