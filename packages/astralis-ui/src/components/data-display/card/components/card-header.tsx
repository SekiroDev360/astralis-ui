import { forwardRef } from "react";
import { useCardContext } from "../card.context";
import type { CardHeaderProps, CardSize } from "../card.types";

const SIZE_MAP: Record<CardSize, { header: string }> = {
  sm: { header: "astralis-px-4 astralis-py-3" },
  md: { header: "astralis-px-5 astralis-py-4" },
  lg: { header: "astralis-px-7 astralis-py-5" },
};

export const CardHeader = forwardRef<HTMLDivElement, CardHeaderProps>(
  ({ extra, className = "", style, children, ...rest }, ref) => {
    const { size } = useCardContext();
    const { header } = SIZE_MAP[size];
    const hasExtra = extra !== undefined && extra !== null;

    return (
      <div
        ref={ref}
        className={[
          "astralis-flex astralis-items-start astralis-justify-between astralis-gap-3",
          hasExtra ? "astralis-border-b astralis-border-stroke-subtle" : "",
          header,
          className,
        ]
          .filter(Boolean)
          .join(" ")}
        style={style}
        {...rest}
      >
        <div className="astralis-flex astralis-flex-col astralis-gap-1 astralis-min-w-0">
          {children}
        </div>
        {hasExtra && (
          <div className="astralis-shrink-0 astralis-flex astralis-items-center astralis-gap-2">
            {extra}
          </div>
        )}
      </div>
    );
  },
);

CardHeader.displayName = "Card.Header";
