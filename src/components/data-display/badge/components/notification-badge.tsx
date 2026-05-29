import type { NotificationBadgeProps } from "../badge.types";

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

NotificationBadge.displayName = "Badge.Notification";
