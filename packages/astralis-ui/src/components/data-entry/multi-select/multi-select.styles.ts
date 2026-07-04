import { cva } from "class-variance-authority";
import type { MultiSelectSize, MultiSelectVariant } from "./multi-select.types";

/** The tag-wrapping trigger container. Focus ring is applied separately (React-driven). */
export const msContainer = cva(
  "astralis:w-full astralis:flex astralis:items-center astralis:flex-wrap astralis:gap-1.5 astralis:cursor-text astralis:transition-colors",
  {
    variants: {
      size: {
        sm: "astralis:min-h-8 astralis:px-2 astralis:py-1",
        md: "astralis:min-h-10 astralis:px-3 astralis:py-1.5",
        lg: "astralis:min-h-12 astralis:px-3 astralis:py-2",
      },
      variant: {
        outline: "astralis:border-normal astralis:border-stroke-base astralis:bg-surface-base astralis:rounded-lg astralis:hover:border-stroke-emphasized",
        filled: "astralis:border-normal astralis:border-transparent astralis:bg-surface-muted astralis:rounded-lg astralis:hover:bg-surface-subtle",
      },
      invalid: { true: "", false: "" },
    },
    compoundVariants: [
      { invalid: true, variant: "outline", className: "astralis:border-red-solid astralis:hover:border-red-solid" },
      { invalid: true, variant: "filled", className: "astralis:border-red-solid astralis:hover:border-red-solid" },
    ],
    defaultVariants: { size: "md", variant: "outline", invalid: false },
  },
);

/** Focus-ring chrome applied while the inline search input is focused. */
export function msFocusRing(variant: MultiSelectVariant, invalid: boolean): string {
  const bg = variant === "filled" ? "astralis:bg-surface-base " : "";
  if (invalid) return bg + "astralis:border-red-solid astralis:ring-2 astralis:ring-red-muted";
  return bg + "astralis:border-accent-stroke astralis:ring-2 astralis:ring-accent-ring";
}

/** A selected-value chip. Paints from the accent channel. */
export const msTagSizes: Record<MultiSelectSize, string> = {
  sm: "astralis:text-xs astralis:h-5 astralis:px-1.5",
  md: "astralis:text-xs astralis:h-6 astralis:px-2",
  lg: "astralis:text-sm astralis:h-7 astralis:px-2.5",
};

export const msInputText: Record<MultiSelectSize, string> = {
  sm: "astralis:text-xs",
  md: "astralis:text-sm",
  lg: "astralis:text-base",
};

/** Fill/text for one option row given its state. */
export function msOptionClasses(active: boolean, disabled: boolean): string {
  if (disabled) return "astralis:cursor-not-allowed astralis:opacity-moderate astralis:text-label-subtle";
  if (active) return "astralis:bg-accent-subtle astralis:text-accent-label";
  return "astralis:text-label-base astralis:hover:bg-surface-muted";
}
