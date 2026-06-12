import { forwardRef } from "react";
import { useCardContext } from "../card.context";
import type { CardFooterProps, CardSize } from "../card.types";

const SIZE_MAP: Record<CardSize, { footer: string }> = {
  sm: { footer: "astralis-px-4 astralis-py-3" },
  md: { footer: "astralis-px-5 astralis-py-4" },
  lg: { footer: "astralis-px-7 astralis-py-5" },
};

export const CardFooter = forwardRef<HTMLDivElement, CardFooterProps>(
  ({ className = "", style, children, ...rest }, ref) => {
    const { size } = useCardContext();
    const { footer } = SIZE_MAP[size];

    return (
      <div
        ref={ref}
        className={[
          "astralis-flex astralis-items-center astralis-gap-3 astralis-border-t astralis-border-stroke-subtle",
          footer,
          className,
        ]
          .filter(Boolean)
          .join(" ")}
        style={style}
        {...rest}
      >
        {children}
      </div>
    );
  },
);

CardFooter.displayName = "Card.Footer";
