import type {
  BadgeProps,
  NotificationBadgeProps,
  StatusBadgeProps,
  RibbonProps,
} from "./badge.types";

/* ------------------------------------------------------------------ */
/* Variant map                                                          */
/* ------------------------------------------------------------------ */

const VARIANT_MAP: Record<string, string> = {
  neutral:
    "astralis-bg-gray-100 astralis-text-gray-700 dark:astralis-bg-gray-800 dark:astralis-text-gray-300",
  primary:
    "astralis-bg-primary-100 astralis-text-primary-700 dark:astralis-bg-primary-900 dark:astralis-text-primary-300",
  success:
    "astralis-bg-green-100 astralis-text-green-700 dark:astralis-bg-green-900/40 dark:astralis-text-green-400",
  warning:
    "astralis-bg-yellow-100 astralis-text-yellow-800 dark:astralis-bg-yellow-900/40 dark:astralis-text-yellow-400",
  danger:
    "astralis-bg-red-100 astralis-text-red-700 dark:astralis-bg-red-900/40 dark:astralis-text-red-400",
  info: "astralis-bg-blue-100 astralis-text-blue-700 dark:astralis-bg-blue-900/40 dark:astralis-text-blue-400",
  solid: "astralis-bg-primary-600 astralis-text-white",
  outline:
    "astralis-bg-transparent astralis-border astralis-border-current astralis-text-primary-600 dark:astralis-text-primary-400",
};

const SIZE_MAP: Record<string, string> = {
  xs: "astralis-text-[10px] astralis-px-1.5 astralis-py-px astralis-gap-0.5",
  sm: "astralis-text-xs astralis-px-2 astralis-py-0.5 astralis-gap-1",
  md: "astralis-text-sm astralis-px-2.5 astralis-py-1 astralis-gap-1",
  lg: "astralis-text-sm astralis-px-3 astralis-py-1.5 astralis-gap-1.5",
};

/* ------------------------------------------------------------------ */
/* Badge (inline text label)                                           */
/* ------------------------------------------------------------------ */

export function Badge({
  children,
  variant = "neutral",
  size = "sm",
  icon,
  className = "",
  style,
}: BadgeProps) {
  return (
    <span
      className={[
        "astralis-inline-flex astralis-items-center astralis-rounded-full",
        "astralis-font-medium astralis-whitespace-nowrap astralis-leading-none",
        VARIANT_MAP[variant],
        SIZE_MAP[size],
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      style={style}
    >
      {icon && (
        <span className="astralis-shrink-0 astralis-inline-flex">{icon}</span>
      )}
      {children}
    </span>
  );
}

/* ------------------------------------------------------------------ */
/* NotificationBadge (count/dot overlay wrapping another element)      */
/* ------------------------------------------------------------------ */

const NOTIF_COLOR_MAP: Record<string, string> = {
  danger: "astralis-bg-red-500",
  primary: "astralis-bg-primary-600",
  success: "astralis-bg-green-500",
  warning: "astralis-bg-yellow-400",
  neutral: "astralis-bg-gray-400",
};

export function NotificationBadge({
  children,
  count = 0,
  dot = false,
  overflowCount = 99,
  showZero = false,
  color = "danger",
  offset = [0, 0],
  className = "",
  style,
}: NotificationBadgeProps) {
  const isCustomColor = !NOTIF_COLOR_MAP[color];
  const bgClass = isCustomColor ? "" : NOTIF_COLOR_MAP[color];

  const displayCount =
    count > overflowCount ? `${overflowCount}+` : String(count);
  const isVisible = dot || showZero || count > 0;

  return (
    <span
      className={["astralis-relative astralis-inline-flex", className]
        .filter(Boolean)
        .join(" ")}
      style={style}
    >
      {children}
      {isVisible && (
        <span
          className={[
            "astralis-absolute astralis-z-10",
            "astralis-flex astralis-items-center astralis-justify-center",
            "astralis-text-white astralis-font-semibold astralis-leading-none",
            dot
              ? "astralis-h-2 astralis-w-2 astralis-rounded-full"
              : "astralis-min-w-[1.25rem] astralis-h-5 astralis-rounded-full astralis-text-[10px] astralis-px-1",
            bgClass,
          ]
            .filter(Boolean)
            .join(" ")}
          style={{
            top: `calc(-0.375rem + ${offset[1]}px)`,
            right: `calc(-0.375rem + ${-offset[0]}px)`,
            ...(isCustomColor ? { backgroundColor: color } : {}),
          }}
        >
          {!dot && displayCount}
        </span>
      )}
    </span>
  );
}

/* ------------------------------------------------------------------ */
/* StatusBadge (standalone dot + optional label)                       */
/* ------------------------------------------------------------------ */

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

/* ------------------------------------------------------------------ */
/* Ribbon (corner banner on a parent element)                          */
/* ------------------------------------------------------------------ */

const RIBBON_COLOR: Record<string, string> = {
  primary: "astralis-bg-primary-600",
  success: "astralis-bg-green-500",
  warning: "astralis-bg-yellow-400",
  danger: "astralis-bg-red-500",
  neutral: "astralis-bg-gray-400",
};

export function Ribbon({
  children,
  text,
  color = "primary",
  placement = "end",
  className = "",
  style,
}: RibbonProps) {
  const isCustomColor = !RIBBON_COLOR[color];
  const bgClass = isCustomColor ? "" : RIBBON_COLOR[color];
  const posClass =
    placement === "end"
      ? "astralis-right-0 astralis-top-0 astralis-origin-top-right"
      : "astralis-left-0 astralis-top-0 astralis-origin-top-left";

  return (
    <div
      className={["astralis-relative astralis-overflow-hidden", className]
        .filter(Boolean)
        .join(" ")}
      style={style}
    >
      {children}
      {text && (
        <div
          className={[
            "astralis-absolute astralis-z-10 astralis-text-white astralis-text-xs astralis-font-bold",
            "astralis-py-0.5 astralis-px-6 astralis-shadow-sm",
            posClass,
            bgClass,
          ]
            .filter(Boolean)
            .join(" ")}
          style={{
            transform:
              placement === "end"
                ? "translate(29%, 0) rotate(45deg) translate(0, 100%)"
                : "translate(-29%, 0) rotate(-45deg) translate(0, 100%)",
            ...(isCustomColor ? { backgroundColor: color } : {}),
          }}
        >
          {text}
        </div>
      )}
    </div>
  );
}
