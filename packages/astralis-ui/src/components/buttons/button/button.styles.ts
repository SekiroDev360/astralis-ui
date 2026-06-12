import { cva } from "class-variance-authority";

export const buttonVariants = cva(
  "astralis:inline-flex astralis:items-center astralis:justify-center astralis:font-medium astralis:cursor-pointer astralis:transition-all astralis:disabled:opacity-moderate astralis:disabled:cursor-not-allowed astralis:disabled:active:scale-100",
  {
    variants: {
      variant: {
        solid:
          "astralis:bg-brand-600 astralis:text-white astralis:hover:bg-brand-700",
        subtle:
          "astralis:bg-surface-subtle astralis:text-label-base astralis:hover:bg-surface-muted astralis:border astralis:border-stroke-base",
        outline:
          "astralis:border astralis:border-stroke-base astralis:bg-transparent astralis:text-label-base astralis:hover:bg-surface-muted",
        text: "astralis:bg-transparent astralis:hover:bg-surface-muted astralis:text-label-base",
        link: "astralis:bg-transparent astralis:text-brand-600 astralis:hover:text-brand-700",
      },
      size: {
        xs: "astralis:h-7 astralis:text-xs astralis:gap-1 astralis:px-2.5",
        sm: "astralis:h-8 astralis:text-sm astralis:gap-1.5 astralis:px-3",
        md: "astralis:h-10 astralis:text-base astralis:gap-2 astralis:px-4",
        lg: "astralis:h-12 astralis:text-lg astralis:gap-2.5 astralis:px-5",
        xl: "astralis:h-14 astralis:text-xl astralis:gap-3 astralis:px-7",
      },
      rounded: {
        none: "astralis:rounded-none",
        sm: "astralis:rounded-sm",
        md: "astralis:rounded-md",
        lg: "astralis:rounded-lg",
        xl: "astralis:rounded-xl",
        "2xl": "astralis:rounded-2xl",
        full: "astralis:rounded-full",
      },
      fullWidth: {
        true: "astralis:w-full",
        false: "",
      },
      isDisabledOrLoading: {
        true: "astralis:pointer-events-none",
        false: "astralis:active:scale-[0.98]",
      },
      isIconOnly: {
        true: "",
        false: "",
      },
    },
    compoundVariants: [
      { isIconOnly: true, size: "xs", className: "astralis:w-7 astralis:px-0" },
      { isIconOnly: true, size: "sm", className: "astralis:w-8 astralis:px-0" },
      {
        isIconOnly: true,
        size: "md",
        className: "astralis:w-10 astralis:px-0",
      },
      {
        isIconOnly: true,
        size: "lg",
        className: "astralis:w-12 astralis:px-0",
      },
      {
        isIconOnly: true,
        size: "xl",
        className: "astralis:w-14 astralis:px-0",
      },
    ],
    defaultVariants: {
      variant: "solid",
      size: "md",
      rounded: "lg",
      fullWidth: false,
    },
  },
);
