import type { StatIndicatorProps } from "../stat.types";

export function StatIndicator({ type = "increase" }: StatIndicatorProps) {
  const isUp = type === "increase";
  return (
    <span
      className={
        isUp
          ? "astralis-text-green-600 dark:astralis-text-green-400"
          : "astralis-text-red-600 dark:astralis-text-red-400"
      }
      aria-label={isUp ? "increase" : "decrease"}
    >
      {isUp ? "▲" : "▼"}
    </span>
  );
}
StatIndicator.displayName = "StatIndicator";
