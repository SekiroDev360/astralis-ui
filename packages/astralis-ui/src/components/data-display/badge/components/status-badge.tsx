import type { StatusBadgeProps } from "../badge.types";

const STATUS_MAP: Record<string, { dot: string; label: string }> = {
  default: { dot: "astralis-bg-gray-400", label: "Default" },
  processing: {
    dot: "astralis-bg-blue-500 astralis-animate-pulse",
    label: "Processing",
  },
  success: { dot: "astralis-bg-green-500", label: "Success" },
  warning: { dot: "astralis-bg-yellow-400", label: "Warning" },
  error: { dot: "astralis-bg-red-500", label: "Error" },
};

export function StatusBadge({
  status,
  label,
  className = "",
  style,
}: StatusBadgeProps) {
  const { dot, label: defaultLabel } = STATUS_MAP[status] ?? STATUS_MAP.default;

  return (
    <span
      className={[
        "astralis-inline-flex astralis-items-center astralis-gap-1.5",
        "astralis-text-sm astralis-text-content-secondary",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      style={style}
    >
      <span
        className={[
          "astralis-inline-block astralis-h-2 astralis-w-2 astralis-rounded-full astralis-shrink-0",
          dot,
        ].join(" ")}
      />
      {label ?? defaultLabel}
    </span>
  );
}

StatusBadge.displayName = "Badge.Status";
