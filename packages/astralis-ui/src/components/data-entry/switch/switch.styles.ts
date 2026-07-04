import type { SwitchSize } from "./switch.types";

/**
 * Per-size geometry. Thumb diameter = track height − 4px (2px inset each side via
 * `px-0.5`), so the "on" travel lands on clean `translate-x` tokens — no fractions.
 */
export const switchSizes: Record<SwitchSize, { track: string; thumb: string; on: string; label: string }> = {
  sm: { track: "astralis:h-4 astralis:w-7", thumb: "astralis:h-3 astralis:w-3", on: "astralis:translate-x-3", label: "astralis:text-xs" },
  md: { track: "astralis:h-5 astralis:w-9", thumb: "astralis:h-4 astralis:w-4", on: "astralis:translate-x-4", label: "astralis:text-sm" },
  lg: { track: "astralis:h-6 astralis:w-11", thumb: "astralis:h-5 astralis:w-5", on: "astralis:translate-x-5", label: "astralis:text-base" },
};

/** Track chrome shared by every state. */
export const switchTrack =
  "astralis:inline-flex astralis:shrink-0 astralis:items-center astralis:px-0.5 astralis:rounded-full " +
  "astralis:transition-colors " +
  "astralis:peer-focus-visible:ring-2 astralis:peer-focus-visible:ring-accent-ring astralis:peer-focus-visible:ring-offset-2 astralis:peer-focus-visible:ring-offset-surface-base";

/** Track fill given its state. `invalid` always wins with red; "on" paints from the accent channel. */
export function switchTrackColor(on: boolean, invalid: boolean): string {
  if (invalid) {
    return on
      ? "astralis:bg-red-solid"
      : "astralis:bg-surface-muted astralis:border-normal astralis:border-red-solid";
  }
  return on
    ? "astralis:bg-accent-solid"
    : "astralis:bg-surface-muted astralis:border-normal astralis:border-stroke-emphasized";
}
