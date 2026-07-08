import type { Ref } from "react";
import { useCardContext } from "../card.context";
import { cardPadding } from "../card.styles";
import type { CardBodyProps } from "../card.types";
import { astralisMerge } from "../../../../utils/astralis-merge";

export function CardBody({
  className = "",
  style,
  children,
  ref,
  ...rest
}: CardBodyProps & { ref?: Ref<HTMLDivElement> }) {
    const { size } = useCardContext();
    return (
      <div ref={ref} className={astralisMerge(cardPadding[size], "astralis:text-label-base", className)} style={style} {...rest}>
        {children}
      </div>
    );
}

CardBody.displayName = "Card.Body";
