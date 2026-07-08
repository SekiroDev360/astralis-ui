import type { Ref } from "react";
import { useCardContext } from "../card.context";
import { cardPadding } from "../card.styles";
import type { CardHeaderProps } from "../card.types";
import { astralisMerge } from "../../../../utils/astralis-merge";

export function CardHeader({
  extra,
  className = "",
  style,
  children,
  ref,
  ...rest
}: CardHeaderProps & { ref?: Ref<HTMLDivElement> }) {
    const { size } = useCardContext();
    const hasExtra = extra !== undefined && extra !== null;

    return (
      <div
        ref={ref}
        className={astralisMerge(
          "astralis:flex astralis:items-start astralis:justify-between astralis:gap-3",
          hasExtra ? "astralis:border-b astralis:border-stroke-subtle" : "",
          cardPadding[size],
          className,
        )}
        style={style}
        {...rest}
      >
        <div className="astralis:flex astralis:flex-col astralis:gap-1 astralis:min-w-0">{children}</div>
        {hasExtra && <div className="astralis:shrink-0 astralis:flex astralis:items-center astralis:gap-2">{extra}</div>}
      </div>
    );
}

CardHeader.displayName = "Card.Header";
