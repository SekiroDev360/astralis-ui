import type { Ref } from "react";
import { useCardContext } from "../card.context";
import { cardPadding } from "../card.styles";
import type { CardFooterProps } from "../card.types";
import { astralisMerge } from "../../../../utils/astralis-merge";

export function CardFooter({
  className = "",
  style,
  children,
  ref,
  ...rest
}: CardFooterProps & { ref?: Ref<HTMLDivElement> }) {
    const { size } = useCardContext();
    return (
      <div
        ref={ref}
        className={astralisMerge(
          "astralis:flex astralis:items-center astralis:gap-3 astralis:border-t astralis:border-stroke-subtle",
          cardPadding[size],
          className,
        )}
        style={style}
        {...rest}
      >
        {children}
      </div>
    );
}

CardFooter.displayName = "Card.Footer";
