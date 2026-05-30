import type { StatTrendProps } from "../stat.types";

const TREND_CONFIG = {
  increase: {
    icon: (
      <svg
        viewBox="0 0 16 16"
        fill="currentColor"
        className="astralis-h-3.5 astralis-w-3.5"
      >
        <path
          fillRule="evenodd"
          d="M8 2a.5.5 0 0 1 .5.5v11a.5.5 0 0 1-1 0v-11A.5.5 0 0 1 8 2zm3.354 3.854a.5.5 0 0 0 0-.708l-3-3a.5.5 0 0 0-.708 0l-3 3a.5.5 0 1 0 .708.708L8 3.207l2.646 2.647a.5.5 0 0 0 .708 0z"
        />
      </svg>
    ),
    color: "astralis-text-green-600 dark:astralis-text-green-400",
    bg: "astralis-bg-green-50 dark:astralis-bg-green-900/30",
    sign: "+",
  },
  decrease: {
    icon: (
      <svg
        viewBox="0 0 16 16"
        fill="currentColor"
        className="astralis-h-3.5 astralis-w-3.5"
      >
        <path
          fillRule="evenodd"
          d="M8 14a.5.5 0 0 0 .5-.5v-11a.5.5 0 0 0-1 0v11a.5.5 0 0 0 .5.5zm3.354-9.854a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708 0l-3-3a.5.5 0 1 1 .708-.708L8 7.293l2.646-2.647a.5.5 0 0 1 .708 0z"
        />
      </svg>
    ),
    color: "astralis-text-red-600 dark:astralis-text-red-400",
    bg: "astralis-bg-red-50 dark:astralis-bg-red-900/30",
    sign: "-",
  },
  neutral: {
    icon: (
      <svg
        viewBox="0 0 16 16"
        fill="currentColor"
        className="astralis-h-3.5 astralis-w-3.5"
      >
        <path
          fillRule="evenodd"
          d="M4 8a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7A.5.5 0 0 1 4 8z"
        />
      </svg>
    ),
    color: "astralis-text-gray-600 dark:astralis-text-gray-400",
    bg: "astralis-bg-gray-100 dark:astralis-bg-gray-800",
    sign: "",
  },
};

export function StatTrend({
  type,
  value,
  formatted,
  className = "",
  style,
}: StatTrendProps) {
  const cfg = TREND_CONFIG[type];
  const display =
    formatted ??
    (value !== undefined ? `${cfg.sign}${Math.abs(value).toFixed(2)}%` : "");

  return (
    <span
      className={[
        "astralis-inline-flex astralis-items-center astralis-gap-1 astralis-rounded astralis-px-1.5 astralis-py-0.5",
        "astralis-text-xs astralis-font-semibold",
        cfg.color,
        cfg.bg,
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      style={style}
    >
      {cfg.icon}
      {display}
    </span>
  );
}
StatTrend.displayName = "StatTrend";
