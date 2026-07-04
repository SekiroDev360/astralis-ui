import type { CSSProperties, ReactNode } from "react";
import type { ColorScheme } from "../../../const/color-schemes";

export type AvatarSize = "xs" | "sm" | "md" | "lg" | "xl" | "2xl";
export type AvatarShape = "circle" | "rounded" | "square";
export type AvatarStatus = "online" | "away" | "busy" | "offline";

export interface AvatarProps {
  src?: string;
  alt?: string;
  /** Name — used for initials and (unless `colorScheme` is set) a deterministic hue. */
  name?: string;
  /** Fallback node when there's no image or name. */
  icon?: ReactNode;
  size?: AvatarSize;
  shape?: AvatarShape;
  /** Override the auto hue derived from `name`. */
  colorScheme?: ColorScheme;
  /** Ring separating overlapping avatars (auto-on inside `Avatar.Group`). */
  ring?: boolean;
  /** e.g. an `Avatar.Badge`. */
  children?: ReactNode;
  className?: string;
  style?: CSSProperties;
}

export interface AvatarGroupProps {
  children: ReactNode;
  /** Cap the number shown; the rest collapse into a "+N" chip. */
  max?: number;
  size?: AvatarSize;
  /** Overlap between avatars, px (negative overlaps). @default -8 */
  spacing?: number;
  className?: string;
  style?: CSSProperties;
}

export interface AvatarBadgeProps {
  status?: AvatarStatus;
  /** Custom dot colour, overriding `status`. */
  color?: string;
  size?: AvatarSize;
  className?: string;
  style?: CSSProperties;
}
