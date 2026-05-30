import type { StatProgressProps } from "../stat.types";

const COLOR_MAP: Record<string, string> = {
  primary: "astralis-bg-primary-500",
  success: "astralis-bg-green-500",
  warning: "astralis-bg-yellow-400",
  danger: "astralis-bg-red-500",
  neutral: "astralis-bg-gray-400",
};

export function StatProgress({
  value,
  colorScheme = "primary",
  className = "",
  style,
}: StatProgressProps) {
  const pct = Math.min(100, Math.max(0, value));
  return (
    <div
      className={[
        "astralis-w-full astralis-h-1.5 astralis-rounded-full astralis-bg-gray-200 dark:astralis-bg-gray-700 astralis-overflow-hidden",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      style={style}
      role="progressbar"
      aria-valuenow={pct}
      aria-valuemin={0}
      aria-valuemax={100}
    >
      <div
        className={[
          COLOR_MAP[colorScheme],
          "astralis-h-full astralis-rounded-full astralis-transition-all astralis-duration-500",
        ].join(" ")}
        style={{ width: `${pct}%` }}
      />
    </div>
  );
}
StatProgress.displayName = "StatProgress";
