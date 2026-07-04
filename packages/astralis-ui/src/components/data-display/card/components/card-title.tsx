import { forwardRef } from "react";
import type { CardTitleProps } from "../card.types";
import { astralisMerge } from "../../../../utils/astralis-merge";

export const CardTitle = forwardRef<HTMLHeadingElement, CardTitleProps>(
  ({ className = "", style, children, ...rest }, ref) => (
    <h3
      ref={ref}
      className={astralisMerge("astralis:text-base astralis:font-semibold astralis:leading-snug astralis:text-label-base", className)}
      style={style}
      {...rest}
    >
      {children}
    </h3>
  ),
);

CardTitle.displayName = "Card.Title";
