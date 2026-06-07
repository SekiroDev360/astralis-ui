import { useState } from "react";
import type { AvatarProps } from "./avatar.types";

const SIZE_MAP = {
  sm: "astralis-h-8 astralis-w-8 astralis-text-xs",
  md: "astralis-h-10 astralis-w-10 astralis-text-sm",
  lg: "astralis-h-14 astralis-w-14 astralis-text-base",
};

export function Avatar({
  src,
  alt,
  name,
  icon,
  size = "md",
}: AvatarProps) {
  const [error, setError] = useState(false);

  const initials = name
    ? name
        .split(" ")
        .map((part) => part[0])
        .slice(0, 2)
        .join("")
        .toUpperCase()
    : null;

  return (
    <div
      className={[
        "astralis-inline-flex astralis-items-center astralis-justify-center",
        "astralis-rounded-full astralis-bg-gray-200 astralis-text-gray-700",
        "astralis-font-medium astralis-overflow-hidden astralis-select-none",
        SIZE_MAP[size],
      ].join(" ")}
    >
      {src && !error ? (
        <img
          src={src}
          alt={alt ?? name ?? "Avatar"}
          onError={() => setError(true)}
          className="astralis-h-full astralis-w-full astralis-object-cover"
        />
      ) : initials ? (
        <span>{initials}</span>
      ) : icon ? (
        icon
      ) : (
        <span className="astralis-text-gray-400">?</span>
      )}
    </div>
  );
}
