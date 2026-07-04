import { forwardRef } from "react";
import type { CardDescriptionProps } from "../card.types";
import { astralisMerge } from "../../../../utils/astralis-merge";

export const CardDescription = forwardRef<HTMLParagraphElement, CardDescriptionProps>(
  ({ className = "", style, children, ...rest }, ref) => (
    <p
      ref={ref}
      className={astralisMerge("astralis:text-sm astralis:text-label-muted astralis:leading-relaxed", className)}
      style={style}
      {...rest}
    >
      {children}
    </p>
  ),
);

CardDescription.displayName = "Card.Description";
