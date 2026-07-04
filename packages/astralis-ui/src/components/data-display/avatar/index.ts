import { AvatarRoot } from "./components/avatar-root";
import { AvatarGroup } from "./components/avatar-group";
import { AvatarBadge } from "./components/avatar-badge";

/** Compound API — `Avatar` is the root; parts hang off it. */
export const Avatar = Object.assign(AvatarRoot, {
  Group: AvatarGroup,
  Badge: AvatarBadge,
});

export { AvatarGroup, AvatarBadge };

export type { AvatarProps, AvatarGroupProps, AvatarBadgeProps, AvatarSize, AvatarShape, AvatarStatus } from "./avatar.types";
