import { forwardRef } from "react";
import { CardContext } from "../card.context";
import { cardRootVariants } from "../card.styles";
import type { CardRootProps } from "../card.types";
import { astralisMerge } from "../../../../utils/astralis-merge";

export const CardRoot = forwardRef<HTMLDivElement, CardRootProps>(
  ({ variant = "elevated", size = "md", hoverable = false, className = "", style, children, ...rest }, ref) => {
    return (
      <CardContext.Provider value={{ size }}>
        <div
          ref={ref}
          className={astralisMerge(cardRootVariants({ variant, size, hoverable }), className)}
          style={style}
          {...rest}
        >
          {children}
        </div>
      </CardContext.Provider>
    );
  },
);

CardRoot.displayName = "Card.Root";
