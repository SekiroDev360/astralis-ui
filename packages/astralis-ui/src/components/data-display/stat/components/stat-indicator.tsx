import type { StatIndicatorProps } from "../stat.types";

export function StatIndicator({
  type = "increase",
  children,
}: StatIndicatorProps) {
  const isIncrease = type === "increase";

  return (
    <span
      className={[
        "astralis-inline-flex astralis-items-center astralis-gap-1 astralis-text-sm",
        isIncrease
          ? "astralis-text-green-600"
          : "astralis-text-red-600",
      ].join(" ")}
    >
      {children ?? (isIncrease ? "▲" : "▼")}
    </span>
  );
}
