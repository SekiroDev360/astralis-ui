import { useAvatarGroupContext } from "../avatar.context";
import { avatarBadgeSize, avatarStatusColor } from "../avatar.styles";
import type { AvatarBadgeProps } from "../avatar.types";
import { astralisMerge } from "../../../../utils/astralis-merge";

/** A status dot pinned to the avatar's bottom-right corner. */
export function AvatarBadge({ status = "online", color, size, className = "", style }: AvatarBadgeProps) {
  const group = useAvatarGroupContext();
  const resolvedSize = size ?? group?.size ?? "md";

  return (
    <span
      className={astralisMerge(
        "astralis:absolute astralis:bottom-0 astralis:right-0 astralis:block astralis:rounded-full astralis:ring-2 astralis:ring-surface-base",
        avatarBadgeSize[resolvedSize],
        color ? "" : avatarStatusColor[status] ?? avatarStatusColor.online,
        className,
      )}
      style={color ? { backgroundColor: color, ...style } : style}
    />
  );
}

AvatarBadge.displayName = "Avatar.Badge";
