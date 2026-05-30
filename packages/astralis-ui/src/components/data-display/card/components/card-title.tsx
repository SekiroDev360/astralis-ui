import { forwardRef } from "react";
import type { CardTitleProps } from "../card.types";

export const CardTitle = forwardRef<HTMLHeadingElement, CardTitleProps>(
  ({ className = "", style, children, ...rest }, ref) => (
    <h3
      ref={ref}
      className={[
        "astralis-font-semibold astralis-text-content-primary astralis-leading-snug astralis-text-base",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      style={style}
      {...rest}
    >
      {children}
    </h3>
  ),
);

CardTitle.displayName = "Card.Title";
