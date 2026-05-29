import { useState } from "react";
import { useAvatarGroupContext } from "../avatar.context";
import type { AvatarColor, AvatarProps, AvatarSize } from "../avatar.types";

const SIZE_MAP: Record<AvatarSize, string> = {
  xs: "astralis-h-6 astralis-w-6 astralis-text-[10px]",
  sm: "astralis-h-8 astralis-w-8 astralis-text-xs",
  md: "astralis-h-10 astralis-w-10 astralis-text-sm",
  lg: "astralis-h-12 astralis-w-12 astralis-text-base",
  xl: "astralis-h-16 astralis-w-16 astralis-text-xl",
  "2xl": "astralis-h-20 astralis-w-20 astralis-text-2xl",
};

const COLOR_MAP: Record<AvatarColor, { bg: string; text: string }> = {
  gray: { bg: "astralis-bg-gray-200", text: "astralis-text-gray-700" },
  red: { bg: "astralis-bg-red-100", text: "astralis-text-red-700" },
  orange: { bg: "astralis-bg-orange-100", text: "astralis-text-orange-700" },
  green: { bg: "astralis-bg-green-100", text: "astralis-text-green-700" },
  blue: { bg: "astralis-bg-blue-100", text: "astralis-text-blue-700" },
  purple: { bg: "astralis-bg-purple-100", text: "astralis-text-purple-700" },
  pink: { bg: "astralis-bg-pink-100", text: "astralis-text-pink-700" },
  teal: { bg: "astralis-bg-teal-100", text: "astralis-text-teal-700" },
  cyan: { bg: "astralis-bg-cyan-100", text: "astralis-text-cyan-700" },
};

const PALETTE: AvatarColor[] = [
  "blue",
  "purple",
  "green",
  "teal",
  "orange",
  "pink",
  "red",
  "cyan",
];

function colorFromName(name: string): AvatarColor {
  let hash = 0;
  for (let index = 0; index < name.length; index++) {
    hash = name.charCodeAt(index) + ((hash << 5) - hash);
  }
  return PALETTE[Math.abs(hash) % PALETTE.length];
}

export function AvatarRoot({
  src,
  alt,
  name,
  icon,
  size,
  shape = "rounded",
  color,
  ring,
  children,
  className = "",
  style,
}: AvatarProps) {
  const [imgError, setImgError] = useState(false);
  const groupContext = useAvatarGroupContext();

  const resolvedSize = size ?? groupContext?.size ?? "md";
  const resolvedRing = ring ?? groupContext?.ring ?? false;

  const initials = name
    ? name
        .split(" ")
        .filter(Boolean)
        .map((part) => part[0])
        .slice(0, 2)
        .join("")
        .toUpperCase()
    : null;

  const resolvedColor = color ?? (name ? colorFromName(name) : "gray");
  const { bg, text } = COLOR_MAP[resolvedColor];

  const shapeClass =
    shape === "square" ? "astralis-rounded-lg" : "astralis-rounded-full";
  const ringClass = resolvedRing
    ? "astralis-ring-2 astralis-ring-white dark:astralis-ring-gray-900 astralis-ring-offset-1"
    : "";

  return (
    <div
      className={[
        "astralis-relative astralis-inline-flex astralis-items-center astralis-justify-center",
        "astralis-font-semibold astralis-select-none astralis-shrink-0",
        ringClass,
        SIZE_MAP[resolvedSize],
        src && !imgError ? "" : `${bg} ${text} ${shapeClass}`,
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      style={style}
    >
      {src && !imgError ? (
        <img
          src={src}
          alt={alt ?? name ?? "Avatar"}
          onError={() => setImgError(true)}
          className={`astralis-h-full astralis-w-full astralis-object-cover astralis-overflow-hidden ${shapeClass}`}
        />
      ) : initials ? (
        <span className={`astralis-h-full astralis-w-full astralis-flex astralis-items-center astralis-justify-center astralis-overflow-hidden ${shapeClass}`}>
          {initials}
        </span>
      ) : icon ? (
        <span className={`astralis-h-full astralis-w-full astralis-flex astralis-items-center astralis-justify-center astralis-overflow-hidden ${shapeClass}`}>
          {icon}
        </span>
      ) : (
        <span className={`astralis-h-full astralis-w-full astralis-flex astralis-items-center astralis-justify-center astralis-overflow-hidden ${shapeClass}`}>
          <svg
            viewBox="0 0 24 24"
            fill="currentColor"
            className="astralis-h-1/2 astralis-w-1/2 astralis-opacity-60"
          >
            <path d="M12 12c2.7 0 4.8-2.1 4.8-4.8S14.7 2.4 12 2.4 7.2 4.5 7.2 7.2 9.3 12 12 12zm0 2.4c-3.2 0-9.6 1.6-9.6 4.8v2.4h19.2v-2.4c0-3.2-6.4-4.8-9.6-4.8z" />
          </svg>
        </span>
      )}
      {children}
    </div>
  );
}

AvatarRoot.displayName = "Avatar";
