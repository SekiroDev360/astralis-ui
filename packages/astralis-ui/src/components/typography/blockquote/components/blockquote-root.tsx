import { forwardRef, type Ref } from "react";
import type { BlockquoteRootProps } from "../blockquote.types";
import { JUSTIFY_MAP, VARIANT_COLOR_MAP } from "./blockquote.styles";

export const BlockquoteRoot = forwardRef<HTMLElement, BlockquoteRootProps>(
  function BlockquoteRoot(
    {
      children,
      variant = "subtle",
      colorScheme = "gray",
      justify = "start",
      className = "",
      style,
    },
    ref,
  ) {
    const variantClass = VARIANT_COLOR_MAP[variant]?.[colorScheme];
    const justifyClass = JUSTIFY_MAP[justify];

    return (
      <figure
        ref={ref as Ref<HTMLElement>}
        className={[
          "astralis-flex astralis-flex-col astralis-gap-1 astralis-rounded-md astralis-p-4 astralis-transition-colors",
          variantClass,
          justifyClass,
          className,
        ]
          .filter(Boolean)
          .join(" ")}
        style={style}
      >
        {children}
      </figure>
    );
  },
);

BlockquoteRoot.displayName = "Blockquote.Root";
