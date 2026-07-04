import { Children, isValidElement } from "react";
import { AvatarGroupContext } from "../avatar.context";
import { avatarVariants } from "../avatar.styles";
import type { AvatarGroupProps } from "../avatar.types";
import { astralisMerge } from "../../../../utils/astralis-merge";

export function AvatarGroup({ children, max, spacing = -8, size = "md", className = "", style }: AvatarGroupProps) {
  const all = Children.toArray(children).filter(isValidElement);
  const visible = max !== undefined ? all.slice(0, max) : all;
  const overflow = max !== undefined ? all.length - max : 0;

  return (
    <AvatarGroupContext.Provider value={{ size, ring: true }}>
      <div className={astralisMerge("astralis:inline-flex astralis:items-center", className)} style={style}>
        {visible.map((child, i) => (
          <div key={i} style={{ marginLeft: i === 0 ? 0 : spacing }}>{child}</div>
        ))}
        {overflow > 0 && (
          <div
            className={astralisMerge(
              avatarVariants({ size, shape: "circle" }),
              "astralis:bg-surface-muted astralis:text-label-muted astralis:ring-2 astralis:ring-surface-base",
            )}
            style={{ marginLeft: spacing }}
          >
            +{overflow}
          </div>
        )}
      </div>
    </AvatarGroupContext.Provider>
  );
}

AvatarGroup.displayName = "Avatar.Group";
