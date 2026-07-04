import { cva } from "class-variance-authority";
import type { AvatarSize } from "./avatar.types";

export const avatarVariants = cva(
  "astralis:relative astralis:inline-flex astralis:items-center astralis:justify-center astralis:font-semibold astralis:select-none astralis:shrink-0 astralis:overflow-hidden",
  {
    variants: {
      size: {
        xs: "astralis:size-6 astralis:text-xs",
        sm: "astralis:size-8 astralis:text-xs",
        md: "astralis:size-10 astralis:text-sm",
        lg: "astralis:size-12 astralis:text-base",
        xl: "astralis:size-16 astralis:text-xl",
        "2xl": "astralis:size-20 astralis:text-2xl",
      },
      shape: {
        circle: "astralis:rounded-full",
        rounded: "astralis:rounded-lg",
        square: "astralis:rounded-none",
      },
    },
    defaultVariants: { size: "md", shape: "circle" },
  },
);

/** Status-dot size per avatar size. */
export const avatarBadgeSize: Record<AvatarSize, string> = {
  xs: "astralis:size-1.5",
  sm: "astralis:size-2",
  md: "astralis:size-2.5",
  lg: "astralis:size-3",
  xl: "astralis:size-3.5",
  "2xl": "astralis:size-4",
};

export const avatarStatusColor: Record<string, string> = {
  online: "astralis:bg-green-solid",
  away: "astralis:bg-yellow-solid",
  busy: "astralis:bg-red-solid",
  offline: "astralis:bg-gray-solid",
};
