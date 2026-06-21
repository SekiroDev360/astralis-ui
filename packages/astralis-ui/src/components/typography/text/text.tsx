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
  props: TextProps<C> & { ref?: Ref<any> },
) => ReactNode;

const Text = forwardRef(
  <C extends ElementType = "p">(
    {
      children,
      as,
      className = "",
      size,
      weight,
      align,
      color,
      casing,
      leading,
      tracking,
      gutterBottom = false,
      paragraph = false,
      truncate = false,
      lineClamp,
      ...props
    }: TextProps<C>,
    ref: Ref<any>,
  ) => {
    const Element = (paragraph ? "p" : as || "p") as ElementType;
    const elementStr = typeof Element === "string" ? Element : "";

    return (
      <Element
        className={astralisMerge(
          textVariants({
            size: size || DEFAULT_HEADING_SIZES[elementStr] || "md",
            weight: weight || DEFAULT_WEIGHTS[elementStr] || "normal",
            align,
            color,
            casing,
            leading,
            tracking,
            gutterBottom,
            paragraph,
            truncate,
            lineClamp: truncate ? undefined : lineClamp,
          }),
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
