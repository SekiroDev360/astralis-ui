import type { Ref } from "react";
import type { CardTitleProps } from "../card.types";
import { astralisMerge } from "../../../../utils/astralis-merge";

export function CardTitle({
  className = "",
  style,
  children,
  ref,
  ...rest
}: CardTitleProps & { ref?: Ref<HTMLHeadingElement> }) {
  return (
    <h3
      ref={ref}
      className={astralisMerge("astralis:text-base astralis:font-semibold astralis:leading-snug astralis:text-label-base", className)}
      style={style}
      {...rest}
    >
      {children}
    </h3>
  );
}

CardTitle.displayName = "Card.Title";
