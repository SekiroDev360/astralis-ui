import { forwardRef, type ElementType } from "react";
import type { TextElementType, TextProps } from "./text.types";

// Font size mappings for explicit size prop
const SIZES = {
  sm: "astralis-text-sm",
  md: "astralis-text-base",
  lg: "astralis-text-lg",
  xl: "astralis-text-xl",
  "2xl": "astralis-text-2xl",
  "3xl": "astralis-text-3xl",
  "4xl": "astralis-text-4xl",
  "5xl": "astralis-text-5xl",
  "6xl": "astralis-text-6xl",
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

// Element-to-size mappings for headings (based on standard HTML conventions)
const DEFAULT_HEADING_SIZES: Partial<
  Record<keyof TextElementType, keyof typeof SIZES>
> = {
  h1: "4xl",
  h2: "3xl",
  h3: "2xl",
  h4: "xl",
  h5: "lg",
  h6: "md",
};

// Element-to-weight mappings for bold elements
const DEFAULT_WEIGHTS: Partial<
  Record<keyof TextElementType, keyof typeof WEIGHTS>
> = {
  b: "bold",
  strong: "bold",
};

const ELEMENT_MAP: Record<keyof TextElementType, ElementType> = {
  h1: "h1",
  h2: "h2",
  h3: "h3",
  h4: "h4",
  h5: "h5",
  h6: "h6",
  p: "p",
  span: "span",
  strong: "strong",
  b: "b",
  em: "em",
  i: "i",
};

const Text = forwardRef<TextElementType[keyof TextElementType], TextProps>(
  (
    {
      children,
      className = "",
      element = "p",
      size, // Optional, will use element-based defaults for headings
      weight, // Optional, will use element-based defaults for b/strong
      align = "left",
      truncate,
      lineClamp,
    },
    ref,
  ) => {
    const baseStyles = "astralis-transition-colors";

    const Element = ELEMENT_MAP[element] as ElementType;

    // Determine font size: Use explicit size prop, fallback to default heading size, or default to 'md'
    const fontSizeClass = size
      ? SIZES[size]
      : DEFAULT_HEADING_SIZES[element]
        ? SIZES[DEFAULT_HEADING_SIZES[element]!]
        : SIZES.md;

    // Determine font weight: Use explicit weight prop, fallback to default weight for b/strong, or default to 'normal'
    const fontWeightClass = weight
      ? WEIGHTS[weight]
      : DEFAULT_WEIGHTS[element]
        ? WEIGHTS[DEFAULT_WEIGHTS[element]!]
        : WEIGHTS.normal;

    // Truncate / line-clamp classes
    const truncateClass = truncate ? "astralis-truncate" : "";
    const lineClampClass =
      lineClamp && !truncate ? `astralis-line-clamp-${lineClamp}` : "";

    return (
      <Element
        ref={ref}
        className={`${baseStyles} ${fontSizeClass} ${fontWeightClass} ${ALIGNS[align]} astralis-text-content-primary ${truncateClass} ${lineClampClass} ${className}`}
      >
        {children}
      </Element>
    );
  },
);

Text.displayName = "Text";
export default Text;
