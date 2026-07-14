import type { ButtonHTMLAttributes, CSSProperties, HTMLAttributes, ReactNode } from "react";

export type CodeBlockSize = "sm" | "md" | "lg";
export type CodeBlockVariant = "subtle" | "solid" | "outline";

/* ------------------------------------------------------------------ */
/* CodeBlockRoot                                                        */
/* ------------------------------------------------------------------ */

export interface CodeBlockRootProps extends HTMLAttributes<HTMLDivElement> {
  /** Visual style of the container */
  variant?: CodeBlockVariant;
  /** Controls the content's font size and padding */
  size?: CodeBlockSize;
  /**
   * The source string. Flows down via context: `CodeBlock.Code` renders it
   * when given no children, and `CodeBlock.CopyTrigger` copies it.
   */
  code?: string;
  className?: string;
  style?: CSSProperties;
  children?: ReactNode;
}

/* ------------------------------------------------------------------ */
/* CodeBlockHeader                                                      */
/* ------------------------------------------------------------------ */

export interface CodeBlockHeaderProps extends HTMLAttributes<HTMLDivElement> {
  className?: string;
  style?: CSSProperties;
  children?: ReactNode;
}

/* ------------------------------------------------------------------ */
/* CodeBlockTitle                                                       */
/* ------------------------------------------------------------------ */

export interface CodeBlockTitleProps extends HTMLAttributes<HTMLSpanElement> {
  className?: string;
  style?: CSSProperties;
  children?: ReactNode;
}

/* ------------------------------------------------------------------ */
/* CodeBlockControl                                                     */
/* ------------------------------------------------------------------ */

export interface CodeBlockControlProps extends HTMLAttributes<HTMLDivElement> {
  className?: string;
  style?: CSSProperties;
  children?: ReactNode;
}

/* ------------------------------------------------------------------ */
/* CodeBlockCopyTrigger                                                 */
/* ------------------------------------------------------------------ */

export interface CodeBlockCopyTriggerProps
  extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, "children"> {
  /** Override the copied string; defaults to the Root's `code`. */
  code?: string;
  className?: string;
  style?: CSSProperties;
  /** Replace the default copy/check glyphs; receives the copied state. */
  children?: ReactNode | ((copied: boolean) => ReactNode);
}

/* ------------------------------------------------------------------ */
/* CodeBlockWindowControls                                              */
/* ------------------------------------------------------------------ */

export interface CodeBlockWindowControlsProps extends HTMLAttributes<HTMLSpanElement> {
  className?: string;
  style?: CSSProperties;
}

/* ------------------------------------------------------------------ */
/* CodeBlockContent                                                     */
/* ------------------------------------------------------------------ */

export interface CodeBlockContentProps extends HTMLAttributes<HTMLPreElement> {
  className?: string;
  style?: CSSProperties;
  children?: ReactNode;
}

/* ------------------------------------------------------------------ */
/* CodeBlockCode                                                        */
/* ------------------------------------------------------------------ */

export interface CodeBlockCodeProps extends HTMLAttributes<HTMLElement> {
  /**
   * Opt-in syntax-highlighting slot. Pass pre-tokenized HTML (e.g. the output of
   * Shiki/Prism in the consumer app) and it renders raw, bypassing `children`.
   * The library stays dependency-free; highlighting is the consumer's call.
   */
  highlightedHtml?: string;
  className?: string;
  style?: CSSProperties;
  children?: ReactNode;
}
