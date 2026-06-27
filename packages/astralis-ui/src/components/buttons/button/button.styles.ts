import { cva } from "class-variance-authority";
import { COLOR_SCHEMES, type ColorScheme } from "../../../const/color-schemes";

/* ------------------------------------------------------------------ */
/* Variant + colorScheme taxonomy                                      */
/* ------------------------------------------------------------------ */

export const BUTTON_VARIANTS = ["solid", "subtle", "surface", "outline", "text", "link"] as const;
export type ButtonVariant = (typeof BUTTON_VARIANTS)[number];

/** Buttons paint with any library colorScheme; the hue is applied via the accent channel. */
export const BUTTON_COLOR_SCHEMES = COLOR_SCHEMES;
export type ButtonColorScheme = ColorScheme;

/* ------------------------------------------------------------------ */
/* Structure — everything hue-independent (geometry + interaction).    */
/* Colour is layered on separately via buttonColorClasses().           */
/* ------------------------------------------------------------------ */

export const buttonVariants = cva(
  "astralis:inline-flex astralis:items-center astralis:justify-center astralis:font-medium astralis:cursor-pointer astralis:transition-all astralis:outline-none astralis:focus-visible:outline-2 astralis:focus-visible:outline-offset-2",
  {
    variants: {
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
        true: "astralis:opacity-moderate astralis:cursor-not-allowed astralis:pointer-events-none",
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
      { isIconOnly: true, size: "md", className: "astralis:w-10 astralis:px-0" },
      { isIconOnly: true, size: "lg", className: "astralis:w-12 astralis:px-0" },
      { isIconOnly: true, size: "xl", className: "astralis:w-14 astralis:px-0" },
    ],
    defaultVariants: {
      size: "md",
      rounded: "lg",
      fullWidth: false,
    },
  },
);

/* ------------------------------------------------------------------ */
/* Colour — variant only.                                              */
/*                                                                     */
/* Every variant paints with the `accent-*` channel, so a single set   */
/* of classes covers all hues. The chosen hue is applied separately as */
/* an `astralis-accent-{scheme}` scope class (see accentClass).         */
/* ------------------------------------------------------------------ */

const accentRecipe: Record<ButtonVariant, string> = {
  // Signature fill; readable foreground from the accent `contrast` role.
  solid: "astralis:bg-accent-solid astralis:text-accent-contrast astralis:hover:opacity-higher astralis:focus-visible:outline-accent-ring",
  // Tinted fill, no border.
  subtle: "astralis:bg-accent-subtle astralis:text-accent-label astralis:hover:bg-accent-muted astralis:focus-visible:outline-accent-ring",
  // Tinted fill + matching border (the bordered sibling of `subtle`).
  surface: "astralis:bg-accent-subtle astralis:text-accent-label astralis:border-normal astralis:border-accent-stroke astralis:hover:bg-accent-muted astralis:focus-visible:outline-accent-ring",
  // Border only; fills with a faint tint on hover.
  outline: "astralis:bg-transparent astralis:border-normal astralis:border-accent-stroke astralis:text-accent-label astralis:hover:bg-accent-subtle astralis:focus-visible:outline-accent-ring",
  // No chrome until hover (a.k.a. "ghost").
  text: "astralis:bg-transparent astralis:text-accent-label astralis:hover:bg-accent-subtle astralis:focus-visible:outline-accent-ring",
  // Inline-link affordance.
  link: "astralis:bg-transparent astralis:text-accent-label astralis:hover:underline astralis:underline-offset-2 astralis:focus-visible:outline-accent-ring",
};

export function buttonColorClasses(variant: ButtonVariant): string {
  return accentRecipe[variant];
}
