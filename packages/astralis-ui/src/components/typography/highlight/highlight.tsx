import { forwardRef } from "react";
import type { HighlightProps } from "./highlight.types";

/* ------------------------------------------------------------------ */
/* Helpers                                                              */
/* ------------------------------------------------------------------ */

/** Escape special regex characters in the query string */
function escapeRegex(str: string): string {
  return str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

/**
 * Splits `text` into an array of { matched: boolean; text: string } chunks
 * based on the provided query strings (case-insensitive).
 */
function splitByQuery(
  text: string,
  query: string | string[],
): Array<{ matched: boolean; text: string }> {
  const queries = (Array.isArray(query) ? query : [query]).filter(
    (q) => q.length > 0,
  );

  if (queries.length === 0) {
    return [{ matched: false, text }];
  }

  const pattern = queries.map(escapeRegex).join("|");
  // Use capturing group so split preserves the matched delimiters as parts
  const splitRegex = new RegExp(`(${pattern})`, "gi");
  // Separate non-global regex (anchored) to test each part individually
  const matchRegex = new RegExp(`^(?:${pattern})$`, "i");
  const parts = text.split(splitRegex);

  return parts
    .filter((part) => part.length > 0)
    .map((part) => ({
      matched: matchRegex.test(part),
      text: part,
    }));
}

/* ------------------------------------------------------------------ */
/* Highlight                                                            */
/* ------------------------------------------------------------------ */

export const Highlight = forwardRef<HTMLSpanElement, HighlightProps>(
  function Highlight({ children, query, styles, className = "", style }, ref) {
    const chunks = splitByQuery(children, query);

    return (
      <span ref={ref} className={className} style={style}>
        {chunks.map((chunk, idx) =>
          chunk.matched ? (
            <mark
              key={idx}
              className="astralis-bg-warning-200/70 dark:astralis-bg-warning-500/30 astralis-text-content-primary astralis-rounded astralis-px-0.5"
              style={styles}
            >
              {chunk.text}
            </mark>
          ) : (
            <span key={idx}>{chunk.text}</span>
          ),
        )}
      </span>
    );
  },
);

export default Highlight;
