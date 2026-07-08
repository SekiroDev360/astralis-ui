import type { Ref } from "react";
import type { CardDescriptionProps } from "../card.types";
import { astralisMerge } from "../../../../utils/astralis-merge";

export function CardDescription({
  className = "",
  style,
  children,
  ref,
  ...rest
}: CardDescriptionProps & { ref?: Ref<HTMLParagraphElement> }) {
  return (
    <p
      ref={ref}
      className={astralisMerge("astralis:text-sm astralis:text-label-muted astralis:leading-relaxed", className)}
      style={style}
      {...rest}
    >
      {children}
    </p>
  );
}

CardDescription.displayName = "Card.Description";
