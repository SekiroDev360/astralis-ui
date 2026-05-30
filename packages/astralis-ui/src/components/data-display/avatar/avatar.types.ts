import type { CSSProperties, ReactNode } from "react";

export type AvatarSize = "xs" | "sm" | "md" | "lg" | "xl" | "2xl";
export type AvatarShape = "rounded" | "square";
export type AvatarColor =
  | "gray"
  | "red"
  | "orange"
  | "green"
  | "blue"
  | "purple"
  | "pink"
  | "teal"
  | "cyan";

export type AvatarStatus = "online" | "away" | "busy" | "offline";

export interface AvatarProps {
  src?: string;
  alt?: string;
  name?: string;
  icon?: ReactNode;
  size?: AvatarSize;
  shape?: AvatarShape;
  color?: AvatarColor;
  ring?: boolean;
  children?: ReactNode;
  className?: string;
  style?: CSSProperties;
}

export interface AvatarBadgeProps {
  status?: AvatarStatus;
  color?: string;
  size?: AvatarSize;
  className?: string;
  style?: CSSProperties;
}

export interface AvatarGroupProps {
  children: ReactNode;
  max?: number;
  stacking?: "start" | "end";
  spacing?: number;
  size?: AvatarSize;
  className?: string;
  style?: CSSProperties;
}
