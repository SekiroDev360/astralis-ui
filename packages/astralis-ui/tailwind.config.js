// tailwind.config.js
/** @type {import('tailwindcss').Config} */

// Helper to automatically generate scale definitions from CSS variables
const shades = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950];

// Spacing scale values
const spacingKeys = [
  "0.5", "1", "1.5", "2", "2.5", "3", "3.5", "4", "4.5", "5", "6", "7", "8", "9",
  "10", "11", "12", "14", "16", "20", "24", "28", "32", "36", "40", "44", "48",
  "52", "56", "60", "64", "72", "80", "96"
];

const spacingScale = spacingKeys.reduce((acc, key) => {
  const cssVarKey = key.replace(".", "\\.");
  acc[key] = `var(--astralis-spacing-${cssVarKey})`;
  return acc;
}, {});

// Sizing scale values (numeric spacing + custom container sizes + percentage fractions + viewports)
const sizeKeys = [
  ...spacingKeys,
  "3xs", "2xs", "xs", "sm", "md", "lg", "xl", "2xl", "3xl", "4xl", "5xl", "6xl",
  "7xl", "8xl", "1/2", "1/3", "2/3", "1/4", "3/4", "1/5", "2/5", "3/5", "4/5",
  "1/6", "2/6", "3/6", "4/6", "5/6", "1/12", "2/12", "3/12", "4/12", "5/12",
  "6/12", "7/12", "8/12", "9/12", "10/12", "11/12", "max", "min", "fit",
  "prose", "full", "dvh", "svh", "lvh", "dvw", "svw", "lvw", "vw", "vh"
];

const sizeScale = sizeKeys.reduce((acc, key) => {
  const cssVarKey = key.replace(".", "\\.").replace("/", "\\/");
  acc[key] = `var(--astralis-size-${cssVarKey})`;
  return acc;
}, {});

const colorScale = (name) => {
  return shades.reduce((acc, shade) => {
    acc[shade] = `var(--astralis-color-${name}-${shade})`;
    return acc;
  }, {});
};

// Mappings for semantic scales (skip 950 for semantic colors that don't need it)
const semanticScale = (name, baseColorName) => {
  return shades.reduce((acc, shade) => {
    if (shade === 950 && name !== "gray") return acc;
    acc[shade] = `var(--astralis-color-${baseColorName}-${shade})`;
    return acc;
  }, {});
};

export default {
  prefix: "astralis-",
  corePlugins: {
    preflight: false,
  },
  content: ["./src/**/*.{ts,tsx}", "./.storybook/**/*.{ts,tsx}"],
  darkMode: ["class", ".astralis-dark"],
  theme: {
    extend: {
      colors: {
        transparent: "var(--astralis-color-transparent)",
        current: "var(--astralis-color-current)",
        black: "var(--astralis-color-black)",
        white: "var(--astralis-color-white)",

        // Base palettes
        gray: colorScale("gray"),
        red: colorScale("red"),
        orange: colorScale("orange"),
        yellow: colorScale("yellow"),
        green: colorScale("green"),
        teal: colorScale("teal"),
        blue: colorScale("blue"),
        cyan: colorScale("cyan"),
        purple: colorScale("purple"),
        pink: colorScale("pink"),

        // Semantic brand scale (points to base purple color vars)
        brand: semanticScale("brand", "purple"),
      },
      backgroundColor: {
        surface: {
          base: "var(--astralis-color-surface-base)",
          muted: "var(--astralis-color-surface-muted)",
          subtle: "var(--astralis-color-surface-subtle)",
          inverted: "var(--astralis-color-surface-inverted)",
          warning: "var(--astralis-color-surface-warning)",
          error: "var(--astralis-color-surface-error)",
          success: "var(--astralis-color-surface-success)",
          info: "var(--astralis-color-surface-info)",
        },
      },
      textColor: {
        label: {
          base: "var(--astralis-color-label-base)",
          muted: "var(--astralis-color-label-muted)",
          subtle: "var(--astralis-color-label-subtle)",
          inverted: "var(--astralis-color-label-inverted)",
          warning: "var(--astralis-color-label-warning)",
          error: "var(--astralis-color-label-error)",
          success: "var(--astralis-color-label-success)",
          info: "var(--astralis-color-label-info)",
        },
      },
      borderColor: {
        base: "var(--astralis-color-border-base)",
        muted: "var(--astralis-color-border-muted)",
        subtle: "var(--astralis-color-border-subtle)",
        inverted: "var(--astralis-color-border-inverted)",
        warning: "var(--astralis-color-border-warning)",
        error: "var(--astralis-color-border-error)",
        success: "var(--astralis-color-border-success)",
        info: "var(--astralis-color-border-info)",
      },
      fontFamily: {
        sans: "var(--astralis-font-sans)",
        serif: "var(--astralis-font-serif)",
        mono: "var(--astralis-font-mono)",
        heading: "var(--astralis-font-heading)",
        body: "var(--astralis-font-body)",
      },
      fontSize: {
        "3xs": "var(--astralis-font-size-3xs)",
        "2xs": "var(--astralis-font-size-2xs)",
        xs: "var(--astralis-font-size-xs)",
        sm: "var(--astralis-font-size-sm)",
        md: "var(--astralis-font-size-md)",
        lg: "var(--astralis-font-size-lg)",
        xl: "var(--astralis-font-size-xl)",
        "2xl": "var(--astralis-font-size-2xl)",
        "3xl": "var(--astralis-font-size-3xl)",
        "4xl": "var(--astralis-font-size-4xl)",
        "5xl": "var(--astralis-font-size-5xl)",
        "6xl": "var(--astralis-font-size-6xl)",
        "7xl": "var(--astralis-font-size-7xl)",
        "8xl": "var(--astralis-font-size-8xl)",
        "9xl": "var(--astralis-font-size-9xl)",
      },
      fontWeight: {
        thin: "var(--astralis-font-weight-thin)",
        extralight: "var(--astralis-font-weight-extralight)",
        light: "var(--astralis-font-weight-light)",
        normal: "var(--astralis-font-weight-normal)",
        medium: "var(--astralis-font-weight-medium)",
        semibold: "var(--astralis-font-weight-semibold)",
        bold: "var(--astralis-font-weight-bold)",
        extrabold: "var(--astralis-font-weight-extrabold)",
        black: "var(--astralis-font-weight-black)",
      },
      letterSpacing: {
        tighter: "var(--astralis-letter-spacing-tighter)",
        tight: "var(--astralis-letter-spacing-tight)",
        normal: "var(--astralis-letter-spacing-normal)",
        wide: "var(--astralis-letter-spacing-wide)",
        wider: "var(--astralis-letter-spacing-wider)",
        widest: "var(--astralis-letter-spacing-widest)",
      },
      lineHeight: {
        none: "var(--astralis-line-height-none)",
        shorter: "var(--astralis-line-height-shorter)",
        short: "var(--astralis-line-height-short)",
        moderate: "var(--astralis-line-height-moderate)",
        base: "var(--astralis-line-height-base)",
        tall: "var(--astralis-line-height-tall)",
        taller: "var(--astralis-line-height-taller)",
      },
      spacing: spacingScale,
      width: sizeScale,
      height: sizeScale,
      maxWidth: sizeScale,
      minWidth: sizeScale,
      maxHeight: sizeScale,
      minHeight: sizeScale,
      borderRadius: {
        none: "var(--astralis-rounded-none)",
        "2xs": "var(--astralis-rounded-2xs)",
        xs: "var(--astralis-rounded-xs)",
        sm: "var(--astralis-rounded-sm)",
        md: "var(--astralis-rounded-md)",
        lg: "var(--astralis-rounded-lg)",
        xl: "var(--astralis-rounded-xl)",
        "2xl": "var(--astralis-rounded-2xl)",
        "3xl": "var(--astralis-rounded-3xl)",
        "4xl": "var(--astralis-rounded-4xl)",
        full: "var(--astralis-rounded-full)",
      },
      screens: {
        sm: "480px",
        md: "768px",
        lg: "1024px",
        xl: "1280px",
        "2xl": "1536px",
      },
      transitionTimingFunction: {
        DEFAULT: "var(--astralis-easing-ease-in-out)",
        "ease-in": "var(--astralis-easing-ease-in)",
        "ease-out": "var(--astralis-easing-ease-out)",
        "ease-in-out": "var(--astralis-easing-ease-in-out)",
        linear: "var(--astralis-easing-linear)",
      },
      transitionDuration: {
        DEFAULT: "var(--astralis-duration-fast)",
        fastest: "var(--astralis-duration-fastest)",
        faster: "var(--astralis-duration-faster)",
        fast: "var(--astralis-duration-fast)",
        moderate: "var(--astralis-duration-moderate)",
        slow: "var(--astralis-duration-slow)",
        slower: "var(--astralis-duration-slower)",
        slowest: "var(--astralis-duration-slowest)",
      },
      aspectRatio: {
        square: "var(--astralis-aspect-ratio-square)",
        landscape: "var(--astralis-aspect-ratio-landscape)",
        portrait: "var(--astralis-aspect-ratio-portrait)",
        wide: "var(--astralis-aspect-ratio-wide)",
        ultrawide: "var(--astralis-aspect-ratio-ultrawide)",
        golden: "var(--astralis-aspect-ratio-golden)",
      },
      animation: {
        spin: "var(--astralis-animation-spin)",
        ping: "var(--astralis-animation-ping)",
        pulse: "var(--astralis-animation-pulse)",
        bounce: "var(--astralis-animation-bounce)",
      },
      blur: {
        sm: "var(--astralis-blur-sm)",
        md: "var(--astralis-blur-md)",
        lg: "var(--astralis-blur-lg)",
        xl: "var(--astralis-blur-xl)",
        "2xl": "var(--astralis-blur-2xl)",
        "3xl": "var(--astralis-blur-3xl)",
        "4xl": "var(--astralis-blur-4xl)",
      },
      zIndex: {
        lowest: "var(--astralis-z-index-lowest)",
        lower: "var(--astralis-z-index-lower)",
        low: "var(--astralis-z-index-low)",
        moderate: "var(--astralis-z-index-moderate)",
        high: "var(--astralis-z-index-high)",
        higher: "var(--astralis-z-index-higher)",
        highest: "var(--astralis-z-index-highest)",
        max: "var(--astralis-z-index-max)",
      },
      opacity: {
        lowest: "var(--astralis-opacity-lowest)",
        lower: "var(--astralis-opacity-lower)",
        low: "var(--astralis-opacity-low)",
        moderate: "var(--astralis-opacity-moderate)",
        high: "var(--astralis-opacity-high)",
        higher: "var(--astralis-opacity-higher)",
        highest: "var(--astralis-opacity-highest)",
        max: "var(--astralis-opacity-max)",
      },
    },
  },
  plugins: [],
};