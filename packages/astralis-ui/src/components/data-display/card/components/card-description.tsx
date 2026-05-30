import { forwardRef } from "react";
import type { CardDescriptionProps } from "../card.types";

export const CardDescription = forwardRef<
  HTMLParagraphElement,
  CardDescriptionProps
>(({ className = "", style, children, ...rest }, ref) => (
  <p
    ref={ref}
    className={[
      "astralis-text-sm astralis-text-content-secondary astralis-leading-relaxed",
      className,
    ]
      .filter(Boolean)
      .join(" ")}
    style={style}
    {...rest}
  >
    {children}
  </p>
));

CardDescription.displayName = "Card.Description";
