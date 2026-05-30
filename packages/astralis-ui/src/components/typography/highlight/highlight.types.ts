import type { CSSProperties } from "react";

export interface HighlightProps {
  /** The full text string to render */
  children: string;
  /** One or more substrings to highlight (case-insensitive) */
  query: string | string[];
  /** Custom styles applied to the <mark> element */
  styles?: CSSProperties;
  /** Additional className applied to the wrapping <span> */
  className?: string;
  style?: CSSProperties;
}
