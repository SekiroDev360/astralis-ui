import type { Ref } from "react";
import type { MarqueeItemProps } from "../marquee.types";

export function MarqueeItem({
  className = "",
  style,
  children,
  ref,
  ...rest
}: MarqueeItemProps & { ref?: Ref<HTMLDivElement> }) {
  return (
    <div
      ref={ref}
      className={[
        "astralis:inline-flex astralis:shrink-0 astralis:items-center",
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
}

MarqueeItem.displayName = "Marquee.Item";
