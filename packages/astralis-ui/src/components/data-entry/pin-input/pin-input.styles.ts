import { cva } from "class-variance-authority";

/** A single PIN cell — square, centred, mono. Chrome mirrors Input's outline/filled. */
export const pinCell = cva(
  "astralis:text-center astralis:text-label-base astralis:font-mono astralis:font-semibold " +
    "astralis:transition-colors astralis:outline-none " +
    "astralis:placeholder:text-label-subtle astralis:placeholder:font-normal " +
    "astralis:disabled:cursor-not-allowed astralis:disabled:opacity-moderate",
  {
    variants: {
      size: {
        sm: "astralis:h-8 astralis:w-8 astralis:text-sm",
        md: "astralis:h-10 astralis:w-10 astralis:text-base",
        lg: "astralis:h-12 astralis:w-12 astralis:text-lg",
      },
      variant: {
        outline:
          "astralis:border-normal astralis:border-stroke-base astralis:bg-surface-base astralis:rounded-lg " +
          "astralis:hover:border-stroke-emphasized " +
          "astralis:focus-visible:border-accent-stroke astralis:focus-visible:ring-2 astralis:focus-visible:ring-accent-ring",
        filled:
          "astralis:border-normal astralis:border-transparent astralis:bg-surface-muted astralis:rounded-lg " +
          "astralis:hover:bg-surface-subtle " +
          "astralis:focus-visible:bg-surface-base astralis:focus-visible:border-accent-stroke astralis:focus-visible:ring-2 astralis:focus-visible:ring-accent-ring",
      },
      invalid: { true: "", false: "" },
    },
    compoundVariants: [
      {
        invalid: true,
        variant: "outline",
        className:
          "astralis:border-red-solid astralis:hover:border-red-solid astralis:focus-visible:border-red-solid astralis:focus-visible:ring-red-muted",
      },
      {
        invalid: true,
        variant: "filled",
        className:
          "astralis:border-red-solid astralis:hover:border-red-solid astralis:focus-visible:border-red-solid astralis:focus-visible:ring-red-muted",
      },
    ],
    defaultVariants: { size: "md", variant: "outline", invalid: false },
  },
);
