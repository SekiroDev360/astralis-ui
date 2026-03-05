import { useState, Children, isValidElement, cloneElement } from "react";
import type { ReactElement } from "react";
import type {
  AvatarProps,
  AvatarBadgeProps,
  AvatarGroupProps,
  AvatarSize,
  AvatarColor,
} from "./avatar.types";

/* ------------------------------------------------------------------ */
/* Size map                                                             */
/* ------------------------------------------------------------------ */

const SIZE_MAP: Record<AvatarSize, string> = {
  xs: "astralis-h-6 astralis-w-6 astralis-text-[10px]",
  sm: "astralis-h-8 astralis-w-8 astralis-text-xs",
  md: "astralis-h-10 astralis-w-10 astralis-text-sm",
  lg: "astralis-h-12 astralis-w-12 astralis-text-base",
  xl: "astralis-h-16 astralis-w-16 astralis-text-xl",
  "2xl": "astralis-h-20 astralis-w-20 astralis-text-2xl",
};

const BADGE_SIZE_MAP: Record<AvatarSize, string> = {
  xs: "astralis-h-1.5 astralis-w-1.5",
  sm: "astralis-h-2 astralis-w-2",
  md: "astralis-h-2.5 astralis-w-2.5",
  lg: "astralis-h-3 astralis-w-3",
  xl: "astralis-h-3.5 astralis-w-3.5",
  "2xl": "astralis-h-4 astralis-w-4",
};

/* ------------------------------------------------------------------ */
/* Colour palette — used for initials fallback                          */
/* ------------------------------------------------------------------ */

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

/* Deterministic colour from a name string */
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
  for (let i = 0; i < name.length; i++)
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  return PALETTE[Math.abs(hash) % PALETTE.length];
}

/* ------------------------------------------------------------------ */
/* Status colour map                                                    */
/* ------------------------------------------------------------------ */

const STATUS_COLOR: Record<string, string> = {
  online: "astralis-bg-green-500",
  away: "astralis-bg-yellow-400",
  busy: "astralis-bg-red-500",
  offline: "astralis-bg-gray-400",
};

/* ------------------------------------------------------------------ */
/* AvatarBadge (status dot overlay)                                    */
/* ------------------------------------------------------------------ */

export function AvatarBadge({
  status = "online",
  color,
  className = "",
  style,
}: AvatarBadgeProps) {
  const dotColor = color ? "" : (STATUS_COLOR[status] ?? STATUS_COLOR.online);
  return (
    <span
      className={[
        "astralis-absolute astralis-bottom-0 astralis-right-0",
        "astralis-block astralis-h-2.5 astralis-w-2.5 astralis-rounded-full",
        "astralis-ring-2 astralis-ring-white dark:astralis-ring-gray-900",
        dotColor,
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      style={color ? { backgroundColor: color, ...style } : style}
    />
  );
}

/* ------------------------------------------------------------------ */
/* Avatar (single)                                                      */
/* ------------------------------------------------------------------ */

export function Avatar({
  src,
  alt,
  name,
  icon,
  size = "md",
  shape = "rounded",
  color,
  ring = false,
  className = "",
  style,
}: AvatarProps) {
  const [imgError, setImgError] = useState(false);

  const initials = name
    ? name
        .split(" ")
        .map((p) => p[0])
        .slice(0, 2)
        .join("")
        .toUpperCase()
    : null;

  /* Resolve colour */
  const resolvedColor = color ?? (name ? colorFromName(name) : "gray");
  const { bg, text } = COLOR_MAP[resolvedColor];

  const shapeClass =
    shape === "square" ? "astralis-rounded-lg" : "astralis-rounded-full";
  const ringClass = ring
    ? "astralis-ring-2 astralis-ring-white dark:astralis-ring-gray-900 astralis-ring-offset-1"
    : "";

  return (
    <div
      className={[
        "astralis-relative astralis-inline-flex astralis-items-center astralis-justify-center",
        "astralis-font-semibold astralis-overflow-hidden astralis-select-none astralis-shrink-0",
        shapeClass,
        ringClass,
        SIZE_MAP[size],
        src && !imgError ? "" : `${bg} ${text}`,
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
          className="astralis-h-full astralis-w-full astralis-object-cover"
        />
      ) : initials ? (
        <span>{initials}</span>
      ) : icon ? (
        icon
      ) : (
        /* Generic user icon fallback */
        <svg
          viewBox="0 0 24 24"
          fill="currentColor"
          className="astralis-h-1/2 astralis-w-1/2 astralis-opacity-60"
        >
          <path d="M12 12c2.7 0 4.8-2.1 4.8-4.8S14.7 2.4 12 2.4 7.2 4.5 7.2 7.2 9.3 12 12 12zm0 2.4c-3.2 0-9.6 1.6-9.6 4.8v2.4h19.2v-2.4c0-3.2-6.4-4.8-9.6-4.8z" />
        </svg>
      )}
    </div>
  );
}

Avatar.displayName = "Avatar";

/* ------------------------------------------------------------------ */
/* AvatarGroup                                                          */
/* ------------------------------------------------------------------ */

export function AvatarGroup({
  children,
  max,
  stacking = "start",
  spacing = -8,
  size = "md",
  className = "",
  style,
}: AvatarGroupProps) {
  const all = Children.toArray(children).filter(isValidElement);
  const visible = max !== undefined ? all.slice(0, max) : all;
  const overflow = max !== undefined ? all.length - max : 0;

  /* Reverse so first avatar sits on top when stacking="start" */
  const ordered = stacking === "start" ? [...visible].reverse() : visible;

  const sizeClass = SIZE_MAP[size];

  return (
    <div
      className={[
        "astralis-flex astralis-flex-row-reverse astralis-items-center",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      style={style}
    >
      {/* Overflow count bubble */}
      {overflow > 0 && (
        <div
          className={[
            "astralis-relative astralis-inline-flex astralis-items-center astralis-justify-center",
            "astralis-rounded-full astralis-bg-gray-100 astralis-text-gray-600",
            "astralis-font-semibold astralis-border-2 astralis-border-white dark:astralis-border-gray-900",
            sizeClass,
          ].join(" ")}
          style={{ marginLeft: spacing }}
        >
          +{overflow}
        </div>
      )}

      {ordered.map((child, i) =>
        cloneElement(child as ReactElement<AvatarProps>, {
          key: i,
          size,
          ring: true,
          style: {
            marginLeft: i === ordered.length - 1 ? 0 : spacing,
            ...(child as ReactElement<AvatarProps>).props.style,
          },
        }),
      )}
    </div>
  );
}

AvatarGroup.displayName = "AvatarGroup";

/* ------------------------------------------------------------------ */
/* Compound export helper                                               */
/* ------------------------------------------------------------------ */

export const AvatarWithBadge = Object.assign(Avatar, {
  Badge: AvatarBadge,
  Group: AvatarGroup,
});
