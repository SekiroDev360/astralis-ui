import { cva } from "class-variance-authority";

export const textVariants = cva("astralis:transition-colors", {
  variants: {
    size: {
      xs: "astralis:text-xs",
      sm: "astralis:text-sm",
      md: "astralis:text-base",
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
    color: {
      base: "astralis:text-label-base",
      muted: "astralis:text-label-muted",
      subtle: "astralis:text-label-subtle",
      inverted: "astralis:text-label-inverted",
      warning: "astralis:text-label-warning",
      error: "astralis:text-label-error",
      success: "astralis:text-label-success",
      info: "astralis:text-label-info",
    },
    casing: {
      uppercase: "astralis:uppercase",
      lowercase: "astralis:lowercase",
      capitalize: "astralis:capitalize",
      normal: "astralis:normal-case",
    },
    leading: {
      none: "astralis:leading-none",
      tight: "astralis:leading-tight",
      snug: "astralis:leading-snug",
      normal: "astralis:leading-normal",
      relaxed: "astralis:leading-relaxed",
      loose: "astralis:leading-loose",
    },
    tracking: {
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
  },
  defaultVariants: {
    color: "base",
  }
});