import type { CSSProperties, ReactNode } from "react";

export type BlockquoteVariant = "subtle" | "solid" | "plain";

export type BlockquoteColorScheme =
  | "gray"
  | "brand"
  | "success"
  | "warning"
  | "danger"
  | "info";

export type BlockquoteJustify = "start" | "center" | "end";

export interface BlockquoteRootProps {
  children: ReactNode;
  variant?: BlockquoteVariant;
  colorScheme?: BlockquoteColorScheme;
  justify?: BlockquoteJustify;
  className?: string;
  style?: CSSProperties;
}

export interface BlockquoteContentProps {
  children: ReactNode;
  /** URL of the quoted source — maps to the HTML cite attribute */
  cite?: string;
  className?: string;
  style?: CSSProperties;
}

export interface BlockquoteCaptionProps {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
}

export interface BlockquoteIconProps {
  /** Custom icon node. Defaults to a double-quote SVG. */
  children?: ReactNode;
  className?: string;
  style?: CSSProperties;
}
