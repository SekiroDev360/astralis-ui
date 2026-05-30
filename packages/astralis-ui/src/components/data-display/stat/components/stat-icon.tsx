import type { StatIconProps } from "../stat.types";

const COLOR_MAP: Record<string, { bg: string; text: string }> = {
  primary: {
    bg: "astralis-bg-primary-100 dark:astralis-bg-primary-900/40",
    text: "astralis-text-primary-600 dark:astralis-text-primary-400",
  },
  success: {
    bg: "astralis-bg-green-100 dark:astralis-bg-green-900/40",
    text: "astralis-text-green-600 dark:astralis-text-green-400",
  },
  warning: {
    bg: "astralis-bg-yellow-100 dark:astralis-bg-yellow-900/40",
    text: "astralis-text-yellow-600 dark:astralis-text-yellow-400",
  },
  danger: {
    bg: "astralis-bg-red-100 dark:astralis-bg-red-900/40",
    text: "astralis-text-red-600 dark:astralis-text-red-400",
  },
  neutral: {
    bg: "astralis-bg-gray-100 dark:astralis-bg-gray-800",
    text: "astralis-text-gray-600 dark:astralis-text-gray-400",
  },
};

export function StatIcon({
  children,
  colorScheme = "primary",
  className = "",
  style,
}: StatIconProps) {
  const { bg, text } = COLOR_MAP[colorScheme] ?? COLOR_MAP.primary;
  return (
    <div
      className={[
        "astralis-inline-flex astralis-items-center astralis-justify-center",
        "astralis-h-10 astralis-w-10 astralis-rounded-full astralis-shrink-0",
        bg,
        text,
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      style={style}
    >
      {children}
    </div>
  );
}
StatIcon.displayName = "StatIcon";
