import type {
  BlockquoteColorScheme,
  BlockquoteJustify,
  BlockquoteVariant,
} from "../blockquote.types";

export const JUSTIFY_MAP: Record<BlockquoteJustify, string> = {
  start: "astralis-items-start astralis-text-left",
  center: "astralis-items-center astralis-text-center",
  end: "astralis-items-end astralis-text-right",
};

export const VARIANT_COLOR_MAP: Record<
  BlockquoteVariant,
  Record<BlockquoteColorScheme, string>
> = {
  subtle: {
    gray: "astralis-border-l-4 astralis-border-subtle astralis-bg-surface-subtle astralis-text-label-base",
    brand:
      "astralis-border-l-4 astralis-border-brand-400 astralis-bg-brand-100 dark:astralis-border-brand-500 dark:astralis-bg-brand-900/40",
    success:
      "astralis-border-l-4 astralis-border-green-400 astralis-bg-green-100 dark:astralis-border-green-500 dark:astralis-bg-green-900/40",
    warning:
      "astralis-border-l-4 astralis-border-yellow-400 astralis-bg-yellow-100 dark:astralis-border-yellow-500 dark:astralis-bg-yellow-900/40",
    danger:
      "astralis-border-l-4 astralis-border-red-400 astralis-bg-red-100 dark:astralis-border-red-500 dark:astralis-bg-red-900/40",
    info: "astralis-border-l-4 astralis-border-blue-400 astralis-bg-blue-100 dark:astralis-border-blue-500 dark:astralis-bg-blue-900/40",
  },
  solid: {
    gray: "astralis-bg-surface-inverted astralis-text-label-inverted",
    brand: "astralis-bg-brand-600 astralis-text-white",
    success: "astralis-bg-green-600 astralis-text-white",
    warning: "astralis-bg-yellow-500 astralis-text-yellow-950",
    danger: "astralis-bg-red-600 astralis-text-white",
    info: "astralis-bg-blue-600 astralis-text-white",
  },
  plain: {
    gray: "astralis-text-label-base",
    brand: "astralis-text-brand-700 dark:astralis-text-brand-300",
    success: "astralis-text-green-700 dark:astralis-text-green-300",
    warning: "astralis-text-yellow-700 dark:astralis-text-yellow-300",
    danger: "astralis-text-red-700 dark:astralis-text-red-300",
    info: "astralis-text-blue-700 dark:astralis-text-blue-300",
  },
};
