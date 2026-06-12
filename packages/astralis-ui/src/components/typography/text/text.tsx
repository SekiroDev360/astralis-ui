import { forwardRef, type ElementType, type Ref, type ReactNode } from "react";
import type { TextProps, TextSize, TextWeight } from "./text.types";
import { astralisMerge } from "../../../utils/astralis-merge";
import { textVariants } from "./text.styles";

const DEFAULT_HEADING_SIZES: Record<string, TextSize> = {
  h1: "4xl",
  h2: "3xl",
  h3: "2xl",
  h4: "xl",
  h5: "lg",
  h6: "md",
};

const DEFAULT_WEIGHTS: Record<string, TextWeight> = {
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
  prope: TextProps<C> & { ref?: Ref<any> },
) => ReactNode;

const Text = forwardRef(
  <C extends ElementType = "p">(
    {
      children,
      as,
      element,
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
    const Element = (paragraph ? "p" : as || element || "p") as ElementType;
    const elementStr = typeof Element === "string" ? Element : "";
    const lineClampClass =
      lineClamp && !truncate ? `astralis:line-clamp-${lineClamp}` : "";

    return (
      <Element
        className={astralisMerge(
          textVariants({
            size: size || DEFAULT_HEADING_SIZES[elementStr] || "md",
            weight: weight || DEFAULT_WEIGHTS[elementStr] || "normal",
            align: align,
            color: color,
            casing: casing,
            gutterBottom,
            paragraph,
            truncate,
          }),
          lineClampClass,
          className,
        )}
        ref={ref}
        {...props}
      >
        {children}
      </Element>
    );
  },
) as unknown as TextComponent;
(Text as any).displayName = "Text";
export default Text;
