import { Children, isValidElement } from "react";
import { AvatarGroupContext } from "../avatar.context";
import type { AvatarGroupProps, AvatarSize } from "../avatar.types";

const SIZE_MAP: Record<AvatarSize, string> = {
  xs: "astralis-h-6 astralis-w-6 astralis-text-[10px]",
  sm: "astralis-h-8 astralis-w-8 astralis-text-xs",
  md: "astralis-h-10 astralis-w-10 astralis-text-sm",
  lg: "astralis-h-12 astralis-w-12 astralis-text-base",
  xl: "astralis-h-16 astralis-w-16 astralis-text-xl",
  "2xl": "astralis-h-20 astralis-w-20 astralis-text-2xl",
};

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

  const ordered = stacking === "start" ? [...visible].reverse() : visible;

  return (
    <AvatarGroupContext.Provider value={{ size, ring: true }}>
      <div
        className={[
          "astralis-flex astralis-flex-row-reverse astralis-items-center",
          className,
        ]
          .filter(Boolean)
          .join(" ")}
        style={style}
      >
        {overflow > 0 && (
          <div
            className={[
              "astralis-relative astralis-inline-flex astralis-items-center astralis-justify-center",
              "astralis-rounded-full astralis-bg-gray-100 astralis-text-gray-600",
              "astralis-font-semibold astralis-border-2 astralis-border-white dark:astralis-border-gray-900",
              SIZE_MAP[size],
            ].join(" ")}
            style={{ marginLeft: spacing }}
          >
            +{overflow}
          </div>
        )}

        {ordered.map((child, index) => (
          <div
            key={index}
            style={{ marginLeft: index === ordered.length - 1 ? 0 : spacing }}
          >
            {child}
          </div>
        ))}
      </div>
    </AvatarGroupContext.Provider>
  );
}

AvatarGroup.displayName = "AvatarGroup";
