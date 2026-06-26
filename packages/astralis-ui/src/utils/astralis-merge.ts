import { clsx, type ClassValue } from "clsx";
import { extendTailwindMerge } from "tailwind-merge";

const twMerge = extendTailwindMerge({
  prefix: "astralis",
  extend: {
    classGroups: {
      // Tell tailwind-merge that 'border-<val>' are valid border widths for these custom keys
      "border-w": [{ border: ["normal", "moderate", "thick", "thicker", "thickest"] }],
      // Tell tailwind-merge that 'border-<val>' are valid colors for these custom keys
      "border-color": [{ 
        border: [
          "stroke-base", "stroke-muted", "stroke-subtle", "stroke-inverted", 
          "stroke-warning", "stroke-error", "stroke-success", "stroke-info"
        ] 
      }]
    }
  }
});

export function astralisMerge(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}