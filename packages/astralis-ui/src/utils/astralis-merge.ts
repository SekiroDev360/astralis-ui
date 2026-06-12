import { clsx, type ClassValue } from "clsx";

/**
 * Merges any combination of class strings, conditionals, arrays, or objects
 * into a single clean space-separated class string.
 *
 * Uses clsx only — no tailwind-merge needed because:
 * - Our classes use the astralis: prefix, consumer classes don't.
 * - There are no cross-namespace conflicts to resolve.
 * - The CSS cascade (layered vs unlayered) handles consumer overrides naturally.
 */
export function astralisMerge(...inputs: ClassValue[]): string {
  return clsx(inputs);
}