import type { VariantProps } from "class-variance-authority";
import type { ComponentPropsWithoutRef } from "react";
import type { highlightMarkVariants } from "./highlight.styles";

export interface HighlightCustomProps {
  /** The full text to scan. Highlight operates on a plain string. */
  children: string;
  /** One or more substrings to wrap in `<mark>`. */
  query: string | string[];
  /** Match case-insensitively (default `true`). */
  ignoreCase?: boolean;
  /** Extra className applied to each matched `<mark>`. */
  markClassName?: string;
}

export type HighlightProps = HighlightCustomProps &
  VariantProps<typeof highlightMarkVariants> &
  Omit<ComponentPropsWithoutRef<"span">, keyof HighlightCustomProps>;
