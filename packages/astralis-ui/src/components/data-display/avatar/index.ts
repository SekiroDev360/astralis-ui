import { AvatarBadge } from "./components/avatar-badge";
import { AvatarGroup } from "./components/avatar-group";
import { AvatarRoot } from "./components/avatar-root";

export const Avatar = Object.assign(AvatarRoot, {
  Badge: AvatarBadge,
  Group: AvatarGroup,
});

export {  AvatarBadge, AvatarGroup };

export type {
  AvatarSize,
  AvatarShape,
  AvatarColor,
  AvatarStatus,
  AvatarProps,
  AvatarBadgeProps,
  AvatarGroupProps,
} from "./avatar.types";
