import type { CheckboxSize } from "./checkbox.types";

/** Per-size geometry for the control box, the icon inside it, and the label. */
export const checkboxSizes: Record<CheckboxSize, { box: string; icon: string; label: string }> = {
  sm: { box: "astralis:h-3.5 astralis:w-3.5", icon: "astralis:h-3 astralis:w-3", label: "astralis:text-xs" },
  md: { box: "astralis:h-4 astralis:w-4", icon: "astralis:h-3.5 astralis:w-3.5", label: "astralis:text-sm" },
  lg: { box: "astralis:h-5 astralis:w-5", icon: "astralis:h-4 astralis:w-4", label: "astralis:text-base" },
};

/** Structural chrome shared by every state. Colour is layered on conditionally. */
export const checkboxControl =
  "astralis:shrink-0 astralis:rounded-sm astralis:border-normal astralis:flex astralis:items-center astralis:justify-center " +
  "astralis:transition-colors " +
  "astralis:peer-focus-visible:ring-2 astralis:peer-focus-visible:ring-accent-ring astralis:peer-focus-visible:ring-offset-2 astralis:peer-focus-visible:ring-offset-surface-base";

/**
 * Fill + border for the control given its state. `invalid` always wins with red;
 * otherwise a checked/indeterminate box paints from the accent channel.
 */
export function checkboxControlColor(active: boolean, invalid: boolean): string {
  if (invalid) {
    return active
      ? "astralis:bg-red-solid astralis:border-red-solid"
      : "astralis:bg-surface-base astralis:border-red-solid";
  }
  return active
    ? "astralis:bg-accent-solid astralis:border-accent-solid"
    : "astralis:bg-surface-base astralis:border-stroke-emphasized";
}
