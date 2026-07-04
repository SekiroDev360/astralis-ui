import { useState } from "react";
import { useAvatarGroupContext } from "../avatar.context";
import { avatarVariants } from "../avatar.styles";
import type { AvatarProps } from "../avatar.types";
import { astralisMerge } from "../../../../utils/astralis-merge";
import { accentClass, type ColorScheme } from "../../../../const/color-schemes";

const PALETTE: ColorScheme[] = ["blue", "purple", "green", "teal", "orange", "pink", "red", "cyan"];

function hueFromName(name: string): ColorScheme {
  let hash = 0;
  for (let i = 0; i < name.length; i++) hash = name.charCodeAt(i) + ((hash << 5) - hash);
  return PALETTE[Math.abs(hash) % PALETTE.length];
}

export function AvatarRoot({
  src, alt, name, icon, size, shape, colorScheme, ring, children, className = "", style,
}: AvatarProps) {
  const [imgError, setImgError] = useState(false);
  const group = useAvatarGroupContext();

  const resolvedSize = size ?? group?.size ?? "md";
  const resolvedShape = shape ?? group?.shape ?? "circle";
  const resolvedRing = ring ?? group?.ring ?? false;
  const hue = colorScheme ?? (name ? hueFromName(name) : "gray");

  const initials = name
    ? name.split(" ").filter(Boolean).map((p) => p[0]).slice(0, 2).join("").toUpperCase()
    : null;

  const showImage = src && !imgError;

  return (
    <div
      className={astralisMerge(
        avatarVariants({ size: resolvedSize, shape: resolvedShape }),
        accentClass(hue),
        showImage ? "" : "astralis:bg-accent-muted astralis:text-accent-label",
        resolvedRing ? "astralis:ring-2 astralis:ring-surface-base" : "",
        className,
      )}
      style={style}
    >
      {showImage ? (
        <img
          src={src}
          alt={alt ?? name ?? "Avatar"}
          onError={() => setImgError(true)}
          className="astralis:size-full astralis:object-cover"
        />
      ) : initials ? (
        <span>{initials}</span>
      ) : icon ? (
        icon
      ) : (
        <svg viewBox="0 0 24 24" fill="currentColor" style={{ width: "60%", height: "60%", opacity: 0.6 }}>
          <path d="M12 12c2.7 0 4.8-2.1 4.8-4.8S14.7 2.4 12 2.4 7.2 4.5 7.2 7.2 9.3 12 12 12zm0 2.4c-3.2 0-9.6 1.6-9.6 4.8v2.4h19.2v-2.4c0-3.2-6.4-4.8-9.6-4.8z" />
        </svg>
      )}
      {children}
    </div>
  );
}

AvatarRoot.displayName = "Avatar";
