import { useAvatarGroupContext } from "../avatar.context";
import type { AvatarBadgeProps, AvatarSize } from "../avatar.types";

const BADGE_SIZE_MAP: Record<AvatarSize, string> = {
  xs: "astralis-h-1.5 astralis-w-1.5",
  sm: "astralis-h-2 astralis-w-2",
  md: "astralis-h-2.5 astralis-w-2.5",
  lg: "astralis-h-3 astralis-w-3",
  xl: "astralis-h-3.5 astralis-w-3.5",
  "2xl": "astralis-h-4 astralis-w-4",
};

const STATUS_COLOR: Record<string, string> = {
  online: "astralis-bg-green-500",
  away: "astralis-bg-yellow-400",
  busy: "astralis-bg-red-500",
  offline: "astralis-bg-gray-400",
};

export function AvatarBadge({
  status = "online",
  color,
  size,
  className = "",
  style,
}: AvatarBadgeProps) {
  const groupContext = useAvatarGroupContext();
  const resolvedSize = size ?? groupContext?.size ?? "md";
  const dotColor = color ? "" : (STATUS_COLOR[status] ?? STATUS_COLOR.online);

  return (
    <span
      className={[
        "astralis-absolute astralis-bottom-0 astralis-right-0",
        "astralis-block astralis-rounded-full",
        BADGE_SIZE_MAP[resolvedSize],
        "astralis-ring-2 astralis-ring-white dark:astralis-ring-gray-900",
        dotColor,
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      style={color ? { backgroundColor: color, ...style } : style}
    />
  );
}

AvatarBadge.displayName = "AvatarBadge";
