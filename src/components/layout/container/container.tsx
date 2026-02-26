import type { ElementType } from "react";
import type { ContainerProps, ContainerSize } from "./container.types";

const SIZE_MAP: Record<ContainerSize, string> = {
  sm: "astralis-max-w-screen-sm",
  md: "astralis-max-w-screen-md",
  lg: "astralis-max-w-screen-lg",
  xl: "astralis-max-w-screen-xl",
  full: "astralis-max-w-full",
};

export function Container<T extends ElementType = "div">({
  as,
  children,
  className = "",
  size = "lg",
  centered = true,
  ...props
}: ContainerProps<T>) {
  const Tag = (as ?? "div") as ElementType;

  const classes = [
    "astralis-w-full astralis-px-4 sm:astralis-px-6 lg:astralis-px-8",
    SIZE_MAP[size],
    centered ? "astralis-mx-auto" : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <Tag className={classes} {...props}>
      {children}
    </Tag>
  );
}
