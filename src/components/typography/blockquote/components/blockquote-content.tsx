import { forwardRef, type Ref } from "react";
import type { BlockquoteContentProps } from "../blockquote.types";

export const BlockquoteContent = forwardRef<
  HTMLElement,
  BlockquoteContentProps
>(function BlockquoteContent({ children, cite, className = "", style }, ref) {
  return (
    <blockquote
      ref={ref as Ref<HTMLQuoteElement>}
      cite={cite}
      className={[
        "astralis-text-base astralis-leading-relaxed astralis-italic astralis-text-inherit",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      style={style}
    >
      {children}
    </blockquote>
  );
});

BlockquoteContent.displayName = "Blockquote.Content";
