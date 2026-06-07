import type { CSSProperties } from "react";

export interface HighlightProps {
  /** The full text string to render */
  children: string;
  /** One or more substrings to highlight */
  query: string | string[];
  /** Custom styles applied to the <mark> element */
  styles?: CSSProperties;
  /** Additional className applied to the wrapping <span> */
  className?: string;
  /** Custom inline styles applied to the wrapping <span> */
  style?: CSSProperties;
  /**
   * The semantic theme color state for the highlight mark.
   * @default "warning"
   */
  color?: "warning" | "error" | "success" | "info" | "muted" | "subtle";
  /**
   * If true, matching is case-insensitive.
   * @default true
   */
  ignoreCase?: boolean;
  /**
   * If true, matches all instances of the query. If false, matches only the first.
   * @default true
   */
  matchAll?: boolean;
  /**
   * If true, matches only whole words.
   * @default false
   */
  exactMatch?: boolean;
}
