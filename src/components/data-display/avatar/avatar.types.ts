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

/* ------------------------------------------------------------------ */
/* Root / single avatar                                                 */
/* ------------------------------------------------------------------ */

export interface AvatarProps {
  /** Image URL */
  src?: string;
  /** Alt text for the image */
  alt?: string;
  /** Full name — used to derive initials and default colour */
  name?: string;
  /** Custom element shown when no src/name available */
  icon?: ReactNode;
  /** Size of the avatar */
  size?: AvatarSize;
  /** Shape of the avatar */
  shape?: AvatarShape;
  /** Fallback background colour palette for initials */
  color?: AvatarColor;
  /** Show a white ring around the avatar */
  ring?: boolean;
  className?: string;
  style?: CSSProperties;
}

/* ------------------------------------------------------------------ */
/* Status badge overlay                                                 */
/* ------------------------------------------------------------------ */

export interface AvatarBadgeProps {
  /** Online presence status */
  status?: AvatarStatus;
  /** Override colour entirely */
  color?: string;
  className?: string;
  style?: CSSProperties;
}

/* ------------------------------------------------------------------ */
/* Group                                                                */
/* ------------------------------------------------------------------ */

export interface AvatarGroupProps {
  children: ReactNode;
  /** Max avatars to show before overflow "+N" */
  max?: number;
  /** "start" = first avatar on top (default), "end" = last on top */
  stacking?: "start" | "end";
  /** Gap between stacked avatars (negative px value), default -8 */
  spacing?: number;
  /** Size forwarded to all children */
  size?: AvatarSize;
  className?: string;
  style?: CSSProperties;
}
