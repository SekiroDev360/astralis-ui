import type { BadgeProps } from "./badge.types";

const VARIANT_MAP = {
  neutral:
    "astralis-bg-gray-100 astralis-text-gray-700",
  primary:
    "astralis-bg-primary astralis-text-white",
  success:
    "astralis-bg-green-100 astralis-text-green-700",
  warning:
    "astralis-bg-yellow-100 astralis-text-yellow-800",
  danger:
    "astralis-bg-red-100 astralis-text-red-700",
};

const SIZE_MAP = {
  sm: "astralis-text-xs astralis-px-2 astralis-py-0.5",
  md: "astralis-text-sm astralis-px-2.5 astralis-py-1",
};

export function Badge({
  children,
  variant = "neutral",
  size = "md",
}: BadgeProps) {
  return (
    <span
      className={[
        "astralis-inline-flex astralis-items-center astralis-rounded-full",
        "astralis-font-medium astralis-whitespace-nowrap",
        VARIANT_MAP[variant],
        SIZE_MAP[size],
      ].join(" ")}
    >
      {children}
    </span>
  );
}
