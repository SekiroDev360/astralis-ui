import type { ElementType } from "react";
import type { BoxProps } from "./box.types";

export function Box<T extends ElementType = "div">({
  as,
  children,
  className = "",
  ...props
}: BoxProps<T>) {
  const Tag = (as ?? "div") as ElementType;
  return (
    <Tag className={className || undefined} {...props}>
      {children}
    </Tag>
  );
}
