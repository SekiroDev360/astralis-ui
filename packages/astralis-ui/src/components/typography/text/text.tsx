import { forwardRef, type ElementType, type Ref, type ReactNode } from "react";
import type { TextProps } from "./text.types";
// Font size mappings for explicit size prop
const SIZES = {
  xs: "astralis-text-xs",
  sm: "astralis-text-sm",
  md: "astralis-text-base",
  lg: "astralis-text-lg",
  xl: "astralis-text-xl",
  "2xl": "astralis-text-2xl",
  "3xl": "astralis-text-3xl",
  "4xl": "astralis-text-4xl",
  "5xl": "astralis-text-5xl",
  "6xl": "astralis-text-6xl",
  "7xl": "astralis-text-7xl",
  "8xl": "astralis-text-8xl",
  "9xl": "astralis-text-9xl",
};
// Font weight mappings for explicit weight prop
const WEIGHTS = {
  thin: "astralis-font-thin",
  extralight: "astralis-font-extralight",
  light: "astralis-font-light",
  normal: "astralis-font-normal",
  medium: "astralis-font-medium",
  semibold: "astralis-font-semibold",
  bold: "astralis-font-bold",
  extrabold: "astralis-font-extrabold",
  black: "astralis-font-black",
};
// Alignment mappings
const ALIGNS = {
  left: "astralis-text-left",
  center: "astralis-text-center",
  right: "astralis-text-right",
  justify: "astralis-text-justify",
};
// Color mappings (pointing to label tokens defined in semantic.css / tailwind.config.js)
const COLORS = {
  base: "astralis-text-label-base",
  muted: "astralis-text-label-muted",
  subtle: "astralis-text-label-subtle",
  inverted: "astralis-text-label-inverted",
  warning: "astralis-text-label-warning",
  error: "astralis-text-label-error",
  success: "astralis-text-label-success",
  info: "astralis-text-label-info",
};
// Casing mappings
const CASINGS = {
  uppercase: "astralis-uppercase",
  lowercase: "astralis-lowercase",
  capitalize: "astralis-capitalize",
  "normal-case": "astralis-normal-case",
};

const DEFAULT_HEADING_SIZES: Record<string, keyof typeof SIZES> = {
  h1: "4xl",
  h2: "3xl",
  h3: "2xl",
  h4: "xl",
  h5: "lg",
  h6: "md",
};

// Element-to-weight mappings for bold/heading elements
const DEFAULT_WEIGHTS: Record<string, keyof typeof WEIGHTS> = {
  h1: "bold",
  h2: "bold",
  h3: "bold",
  h4: "semibold",
  h5: "semibold",
  h6: "semibold",
  b: "bold",
  strong: "bold",
};

type TextComponent = <C extends ElementType = "p">(
  props: TextProps<C> & { ref?: Ref<any> },
) => ReactNode;

const Text = forwardRef(
  <C extends ElementType = "p">(
    {
      children,
      as,
      element, // Backward compatibility fallback
      className = "",
      size,
      weight,
      align,
      color = "base",
      casing,
      gutterBottom = false,
      paragraph = false,
      truncate,
      lineClamp,
      ...props
    }: TextProps<C>,
    ref: Ref<any>,
  ) => {
    const baseStyles = "astralis-transition-colors";

    // Determine the rendered HTML tag
    // paragraph prop automatically forces tag to "p"
    const Element = (paragraph ? "p" : as || element || "p") as ElementType;
    const elementStr = typeof Element === "string" ? Element : "";

    const resolvedSize = size || DEFAULT_HEADING_SIZES[elementStr] || "md";
    const fontSizeClass = SIZES[resolvedSize] || SIZES.md;

    // Determine font weight: Use explicit weight prop, fallback to default weight, or default to 'normal'
    const resolvedWeight = weight || DEFAULT_WEIGHTS[elementStr] || "normal";
    const fontWeightClass = WEIGHTS[resolvedWeight] || WEIGHTS.normal;
    // Alignment, color, and casing classes
    const alignClass = align ? ALIGNS[align] : "";
    const colorClass = COLORS[color] || COLORS.base;
    const casingClass = casing ? CASINGS[casing] : "";
    // Layout margins
    const gutterClass = gutterBottom ? "astralis-mb-2" : "";
    const paragraphClass = paragraph ? "astralis-mb-4" : "";
    // Truncate / line-clamp classes
    const truncateClass = truncate ? "astralis-truncate" : "";
    const lineClampClass =
      lineClamp && !truncate ? `astralis-line-clamp-${lineClamp}` : "";
    const combinedClasses = [
      baseStyles,
      fontSizeClass,
      fontWeightClass,
      alignClass,
      colorClass,
      casingClass,
      gutterClass,
      paragraphClass,
      truncateClass,
      lineClampClass,
      className,
    ]
      .filter(Boolean)
      .join(" ");
    return (
      <Element ref={ref} className={combinedClasses} {...props}>
        {children}
      </Element>
    );
  },
) as unknown as TextComponent;
(Text as any).displayName = "Text";
export default Text;
