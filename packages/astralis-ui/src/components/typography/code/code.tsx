import { forwardRef, type Ref } from "react";
import type { CodeProps } from "./code.types";

/* ------------------------------------------------------------------ */
/* Style maps                                                           */
/* ------------------------------------------------------------------ */

const SIZE_MAP = {
  sm: "astralis-text-xs astralis-px-1 astralis-py-px",
  md: "astralis-text-sm astralis-px-1.5 astralis-py-0.5",
  lg: "astralis-text-base astralis-px-2 astralis-py-0.5",
};

// [variant][colorScheme]
const VARIANT_COLOR_MAP: Record<string, Record<string, string>> = {
  subtle: {
    gray: "astralis-bg-gray-100 astralis-text-label-base dark:astralis-bg-gray-800",
    brand:
      "astralis-bg-brand-100 astralis-text-brand-800 dark:astralis-bg-brand-900/40 dark:astralis-text-brand-200",    success:
      "astralis-bg-green-100 astralis-text-green-800 dark:astralis-bg-green-900/40 dark:astralis-text-green-200",
    warning:
      "astralis-bg-yellow-100 astralis-text-yellow-800 dark:astralis-bg-yellow-900/40 dark:astralis-text-yellow-200",
    danger:
      "astralis-bg-red-100 astralis-text-red-800 dark:astralis-bg-red-900/40 dark:astralis-text-red-200",
    info: "astralis-bg-blue-100 astralis-text-blue-800 dark:astralis-bg-blue-900/40 dark:astralis-text-blue-200",
  },
  solid: {
    gray: "astralis-bg-gray-700 astralis-text-white dark:astralis-bg-gray-100 dark:astralis-text-gray-900",
  brand: "astralis-bg-brand-600 astralis-text-white",
      success: "astralis-bg-green-600 astralis-text-white",
    warning: "astralis-bg-yellow-500 astralis-text-yellow-950",
    danger: "astralis-bg-red-600 astralis-text-white",
    info: "astralis-bg-blue-600 astralis-text-white",
  },
  outline: {
    gray: "astralis-border astralis-border-subtle astralis-text-label-muted",
    brand:
      "astralis-border astralis-border-brand-400 astralis-text-brand-700 dark:astralis-border-brand-500 dark:astralis-text-brand-300",    success:
      "astralis-border astralis-border-green-400 astralis-text-green-700 dark:astralis-border-green-500 dark:astralis-text-green-300",
    warning:
      "astralis-border astralis-border-yellow-400 astralis-text-yellow-700 dark:astralis-border-yellow-500 dark:astralis-text-yellow-300",
    danger:
      "astralis-border astralis-border-red-400 astralis-text-red-700 dark:astralis-border-red-500 dark:astralis-text-red-300",
    info: "astralis-border astralis-border-blue-400 astralis-text-blue-700 dark:astralis-border-blue-500 dark:astralis-text-blue-300",
  },
  surface: {
    gray: "astralis-bg-surface-base astralis-border astralis-border-subtle astralis-text-label-base",
    brand:
      "astralis-bg-white astralis-border astralis-border-brand-200 astralis-text-brand-800 dark:astralis-bg-surface-base dark:astralis-border-brand-700 dark:astralis-text-brand-200",    success:
      "astralis-bg-white astralis-border astralis-border-green-200 astralis-text-green-800 dark:astralis-bg-surface-base dark:astralis-border-green-700 dark:astralis-text-green-200",
    warning:
      "astralis-bg-white astralis-border astralis-border-yellow-200 astralis-text-yellow-800 dark:astralis-bg-surface-base dark:astralis-border-yellow-700 dark:astralis-text-yellow-200",
    danger:
      "astralis-bg-white astralis-border astralis-border-red-200 astralis-text-red-800 dark:astralis-bg-surface-base dark:astralis-border-red-700 dark:astralis-text-red-200",
    info: "astralis-bg-white astralis-border astralis-border-blue-200 astralis-text-blue-800 dark:astralis-bg-surface-base dark:astralis-border-blue-700 dark:astralis-text-blue-200",
  },
};

/* ------------------------------------------------------------------ */
/* Code                                                                 */
/* ------------------------------------------------------------------ */

export const Code = forwardRef<HTMLElement, CodeProps>(function Code(
  {
    children,
    variant = "subtle",
    size = "md",
    colorScheme = "gray",
    className = "",
    style,
  },
  ref,
) {
  const variantClass =
    VARIANT_COLOR_MAP[variant]?.[colorScheme] ?? VARIANT_COLOR_MAP.subtle.gray;
  const sizeClass = SIZE_MAP[size];

  return (
    <code
      ref={ref as Ref<HTMLElement>}
      className={[
        "astralis-font-mono astralis-rounded astralis-transition-colors",
        variantClass,
        sizeClass,
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      style={style}
    >
      {children}
    </code>
  );
});

export default Code;
