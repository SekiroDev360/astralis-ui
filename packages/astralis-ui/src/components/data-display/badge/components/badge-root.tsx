import type { BadgeProps, BadgeSize, BadgeVariant } from "../badge.types";

const VARIANT_MAP: Record<BadgeVariant, string> = {
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

const SIZE_MAP: Record<BadgeSize, string> = {
  xs: "astralis-text-[10px] astralis-px-1.5 astralis-py-px astralis-gap-0.5",
  sm: "astralis-text-xs astralis-px-2 astralis-py-0.5 astralis-gap-1",
  md: "astralis-text-sm astralis-px-2.5 astralis-py-1 astralis-gap-1",
  lg: "astralis-text-sm astralis-px-3 astralis-py-1.5 astralis-gap-1.5",
};

export function BadgeRoot({
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

BadgeRoot.displayName = "Badge";
