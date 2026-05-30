import { forwardRef } from "react";
import type { MarqueeItemProps } from "../marquee.types";

export const MarqueeItem = forwardRef<HTMLDivElement, MarqueeItemProps>(
  ({ className = "", style, children, ...rest }, ref) => (
    <div
      ref={ref}
      className={[
        "astralis-inline-flex astralis-shrink-0 astralis-items-center",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      style={style}
      {...rest}
    >
      {children}
    </div>
  ),
);

MarqueeItem.displayName = "Marquee.Item";
