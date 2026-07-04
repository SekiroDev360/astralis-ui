import type { RadioSize } from "./radio.types";

/** Per-size geometry for the outer circle, the inner dot, and the label. */
export const radioSizes: Record<RadioSize, { circle: string; dot: string; label: string }> = {
  sm: { circle: "astralis:h-3.5 astralis:w-3.5", dot: "astralis:h-1.5 astralis:w-1.5", label: "astralis:text-xs" },
  md: { circle: "astralis:h-4 astralis:w-4", dot: "astralis:h-2 astralis:w-2", label: "astralis:text-sm" },
  lg: { circle: "astralis:h-5 astralis:w-5", dot: "astralis:h-2.5 astralis:w-2.5", label: "astralis:text-base" },
};

/** Structural chrome shared by every state. Colour is layered on conditionally. */
export const radioControl =
  "astralis:shrink-0 astralis:rounded-full astralis:border-normal astralis:flex astralis:items-center astralis:justify-center " +
  "astralis:transition-colors " +
  "astralis:peer-focus-visible:ring-2 astralis:peer-focus-visible:ring-accent-ring astralis:peer-focus-visible:ring-offset-2 astralis:peer-focus-visible:ring-offset-surface-base";

/** Fill + border for the circle given its state. `invalid` always wins with red. */
export function radioControlColor(checked: boolean, invalid: boolean): string {
  if (invalid) {
    return checked
      ? "astralis:bg-red-solid astralis:border-red-solid"
      : "astralis:bg-surface-base astralis:border-red-solid";
  }
  return checked
    ? "astralis:bg-accent-solid astralis:border-accent-solid"
    : "astralis:bg-surface-base astralis:border-stroke-emphasized";
}
