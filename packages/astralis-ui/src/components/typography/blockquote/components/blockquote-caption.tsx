import { forwardRef, type Ref } from "react";
import type { BlockquoteCaptionProps } from "../blockquote.types";

export const BlockquoteCaption = forwardRef<
  HTMLElement,
  BlockquoteCaptionProps
>(function BlockquoteCaption({ children, className = "", style }, ref) {
  return (
    <figcaption
      ref={ref as Ref<HTMLElement>}
      className={[
        "astralis-mt-3 astralis-text-sm astralis-text-inherit astralis-opacity-80",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      style={style}
    >
      {children}
    </figcaption>
  );
});

BlockquoteCaption.displayName = "Blockquote.Caption";

