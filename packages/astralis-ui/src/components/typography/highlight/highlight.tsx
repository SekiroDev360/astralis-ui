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
 * based on the provided query strings and option flags.
 */
function splitByQuery(
  text: string,
  query: string | string[],
  options: { ignoreCase?: boolean; exactMatch?: boolean; matchAll?: boolean },
): Array<{ matched: boolean; text: string }> {
  const { ignoreCase = true, exactMatch = false, matchAll = true } = options;
  const queries = (Array.isArray(query) ? query : [query]).filter(
    (q) => q.length > 0,
  );
  if (queries.length === 0) {
    return [{ matched: false, text }];
  }

  let escapedQueries = queries.map(escapeRegex);
  if (exactMatch) {
    escapedQueries = escapedQueries.map((q) => `\\b${q}\\b`);
  }
  const pattern = escapedQueries.join("|");
  if (!matchAll) {
    const regex = new RegExp(`(${pattern})`, ignoreCase ? "i" : "");
    const match = text.match(regex);
    if (!match || match.index === undefined) {
      return [{ matched: false, text }];
    }
    const matchStr = match[0];
    const matchIndex = match.index;
    const before = text.slice(0, matchIndex);
    const after = text.slice(matchIndex + matchStr.length);
    const result = [];
    if (before) result.push({ matched: false, text: before });
    result.push({ matched: true, text: matchStr });
    if (after) result.push({ matched: false, text: after });
    return result;
  }
  // Use capturing group so split preserves the matched delimiters as parts
  const splitRegex = new RegExp(`(${pattern})`, ignoreCase ? "gi" : "g");
  // Separate non-global regex (anchored) to test each part individually

  const matchRegex = new RegExp(`^(?:${pattern})$`, ignoreCase ? "i" : "");
  const parts = text.split(splitRegex);
  return parts
    .filter((part) => part.length > 0)
    .map((part) => ({
      matched: matchRegex.test(part),
      text: part,
    }));
}
// Color mappings (pointing to labels & surface tokens defined in semantic.css / tailwind.config.js)
const COLORS = {
  warning: "astralis-bg-surface-warning astralis-text-label-warning",
  error: "astralis-bg-surface-error astralis-text-label-error",
  success: "astralis-bg-surface-success astralis-text-label-success",
  info: "astralis-bg-surface-info astralis-text-label-info",
  muted: "astralis-bg-surface-muted astralis-text-label-muted",
  subtle: "astralis-bg-surface-subtle astralis-text-label-subtle",
};
/* ------------------------------------------------------------------ */
/* Highlight                                                            */
/* ------------------------------------------------------------------ */

export const Highlight = forwardRef<HTMLSpanElement, HighlightProps>(
  function Highlight(
    {
      children,
      query,
      styles,
      className = "",
      style,
      color = "warning",
      ignoreCase = true,
      matchAll = true,
      exactMatch = false,
    },
    ref,
  ) {
    const chunks = splitByQuery(children, query, {
      ignoreCase,
      exactMatch,
      matchAll,
    });
    const colorClass = COLORS[color] || COLORS.warning;
    const wrapperClass = ["astralis-text-label-base", className]
      .filter(Boolean)
      .join(" ");
    return (
      <span ref={ref} className={wrapperClass} style={style}>
        {chunks.map((chunk, idx) =>
          chunk.matched ? (
            <mark
              key={idx}
              className={`${colorClass} astralis-rounded astralis-px-0.5`}
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
