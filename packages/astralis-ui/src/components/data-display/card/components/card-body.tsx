import { forwardRef } from "react";
import { useCardContext } from "../card.context";
import type { CardBodyProps, CardSize } from "../card.types";

const SIZE_MAP: Record<CardSize, { body: string }> = {
  sm: { body: "astralis-px-4 astralis-py-3" },
  md: { body: "astralis-px-5 astralis-py-4" },
  lg: { body: "astralis-px-7 astralis-py-5" },
};

export const CardBody = forwardRef<HTMLDivElement, CardBodyProps>(
  ({ className = "", style, children, ...rest }, ref) => {
    const { size } = useCardContext();
    const { body } = SIZE_MAP[size];

    return (
      <div
        ref={ref}
        className={[body, className].filter(Boolean).join(" ")}
        style={style}
        {...rest}
      >
        {children}
      </div>
    );
  },
);

CardBody.displayName = "Card.Body";
