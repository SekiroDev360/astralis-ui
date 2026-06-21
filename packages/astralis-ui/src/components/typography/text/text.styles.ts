import { cva } from "class-variance-authority";
import { textColors } from "../../../const/color-mappings";

/** Shared by CVA (typing + scalar) and the responsive engine (per-breakpoint). */
export const textVariantMap = {
    size: {
      xs: "astralis:text-xs",
      sm: "astralis:text-sm",
      md: "astralis:text-md",
      lg: "astralis:text-lg",
      xl: "astralis:text-xl",
      "2xl": "astralis:text-2xl",
      "3xl": "astralis:text-3xl",
      "4xl": "astralis:text-4xl",
      "5xl": "astralis:text-5xl",
      "6xl": "astralis:text-6xl",
      "7xl": "astralis:text-7xl",
      "8xl": "astralis:text-8xl",
      "9xl": "astralis:text-9xl",
    },
    weight: {
      thin: "astralis:font-thin",
      extralight: "astralis:font-extralight",
      light: "astralis:font-light",
      normal: "astralis:font-normal",
      medium: "astralis:font-medium",
      semibold: "astralis:font-semibold",
      bold: "astralis:font-bold",
      extrabold: "astralis:font-extrabold",
      black: "astralis:font-black",
    },
    align: {
      left: "astralis:text-left",
      center: "astralis:text-center",
      right: "astralis:text-right",
      justify: "astralis:text-justify",
    },
    // Full palette parity with Box — semantic tokens, every palette shade,
    // brand, plus `current`/`inherit` (use `inherit` to cascade from a parent's color).
    color: textColors,
    casing: {
      uppercase: "astralis:uppercase",
      lowercase: "astralis:lowercase",
      capitalize: "astralis:capitalize",
      normal: "astralis:normal-case",
    },
    fontFamily: {
      heading: "astralis:font-heading",
      body: "astralis:font-body",
      sans: "astralis:font-sans",
      serif: "astralis:font-serif",
      mono: "astralis:font-mono",
    },
    fontStyle: {
      italic: "astralis:italic",
      normal: "astralis:not-italic",
    },
    textDecoration: {
      underline: "astralis:underline",
      "line-through": "astralis:line-through",
      overline: "astralis:overline",
      none: "astralis:no-underline",
    },
    // Unitless line-height multipliers — scale with font-size, safe across
    // text-xs -> text-9xl. Sourced from the explicit --astralis-line-height-* tokens.
    lineHeight: {
      none: "astralis:leading-none",
      tight: "astralis:leading-tight",
      snug: "astralis:leading-snug",
      normal: "astralis:leading-normal",
      relaxed: "astralis:leading-relaxed",
      loose: "astralis:leading-loose",
    },
    letterSpacing: {
      tighter: "astralis:tracking-tighter",
      tight: "astralis:tracking-tight",
      normal: "astralis:tracking-normal",
      wide: "astralis:tracking-wide",
      wider: "astralis:tracking-wider",
      widest: "astralis:tracking-widest",
    },
    lineClamp: {
      "1": "astralis:line-clamp-1",
      "2": "astralis:line-clamp-2",
      "3": "astralis:line-clamp-3",
      "4": "astralis:line-clamp-4",
      "5": "astralis:line-clamp-5",
      "6": "astralis:line-clamp-6",
    },
    gutterBottom: {
      true: "astralis:mb-2",
      false: ""
    },
    paragraph: {
      true: "astralis:mb-4",
      false: ""
    },
    truncate: {
      true: "astralis:truncate",
      false: ""
    }
} as const;

export const textVariants = cva("astralis:transition-colors", {
  variants: textVariantMap,
  defaultVariants: {
    color: "base",
  }
});