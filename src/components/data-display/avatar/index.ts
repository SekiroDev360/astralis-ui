import { Avatar, AvatarBadge, AvatarGroup, AvatarWithBadge } from "./avatar";

/* Compound API */
export const AvatarCompound = AvatarWithBadge;
export { Avatar, AvatarBadge, AvatarGroup };

/* Re-export compound as default named export expected by stories */
export { AvatarWithBadge as AvatarRoot };

/* Types */
export type {
  AvatarSize,
  AvatarShape,
  AvatarColor,
  AvatarStatus,
  AvatarProps,
  AvatarBadgeProps,
  AvatarGroupProps,
} from "./avatar.types";
