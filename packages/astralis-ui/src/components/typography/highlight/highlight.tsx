import { forwardRef, Fragment, type Ref } from "react";
import type { HighlightProps } from "./highlight.types";
import { astralisMerge } from "../../../utils/astralis-merge";
import { highlightMarkVariants } from "./highlight.styles";

/** Escape regex metacharacters so query terms match literally. */
const escapeRegExp = (value: string) => value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

/**
 * Highlight wraps every occurrence of `query` within its text in a styled `<mark>`.
 * It renders inline, so it can live inside a `<Text>` or any prose.
 */
const Highlight = forwardRef<HTMLSpanElement, HighlightProps>(
  (
    { children, query, ignoreCase = true, variant, markClassName, className, ...props },
    ref: Ref<HTMLSpanElement>,
  ) => {
    const terms = (Array.isArray(query) ? query : [query]).filter(Boolean).map(escapeRegExp);

    let nodes: React.ReactNode = children;
    if (terms.length > 0) {
      const regex = new RegExp(`(${terms.join("|")})`, ignoreCase ? "gi" : "g");
      // A single capturing group makes split() alternate text / match / text…
      const segments = children.split(regex);
      const markClass = astralisMerge(highlightMarkVariants({ variant }), markClassName);
      nodes = segments.map((segment, index) => {
        if (!segment) return null;
        return index % 2 === 1 ? (
          <mark key={index} className={markClass}>
            {segment}
          </mark>
        ) : (
          <Fragment key={index}>{segment}</Fragment>
        );
      });
    }

    return (
      <span ref={ref} className={className} {...props}>
        {nodes}
      </span>
    );
  },
);

Highlight.displayName = "Highlight";
export default Highlight;
