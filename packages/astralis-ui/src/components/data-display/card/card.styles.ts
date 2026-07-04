import { cva } from "class-variance-authority";
import type { CardSize } from "./card.types";

export const cardRootVariants = cva("astralis:overflow-hidden astralis:transition-all astralis:duration-moderate", {
  variants: {
    variant: {
      elevated: "astralis:bg-surface-base astralis:border-normal astralis:border-stroke-subtle astralis:shadow-md",
      outline: "astralis:bg-transparent astralis:border-normal astralis:border-stroke-subtle",
      filled: "astralis:bg-surface-muted astralis:border-normal astralis:border-transparent",
      unstyled: "",
    },
    size: {
      sm: "astralis:rounded-lg",
      md: "astralis:rounded-xl",
      lg: "astralis:rounded-2xl",
    },
    hoverable: {
      true: "astralis:cursor-pointer astralis:hover:shadow-lg astralis:hover:-translate-y-0.5 astralis:active:scale-95",
      false: "",
    },
  },
  defaultVariants: { variant: "elevated", size: "md", hoverable: false },
});

/** Section padding shared by Header/Body/Footer, keyed by the card size. */
export const cardPadding: Record<CardSize, string> = {
  sm: "astralis:px-4 astralis:py-3",
  md: "astralis:px-5 astralis:py-4",
  lg: "astralis:px-7 astralis:py-5",
};
