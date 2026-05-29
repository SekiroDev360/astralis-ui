import { forwardRef } from "react";
import type { CheckableTagProps } from "../tag.types";
import { TagRoot } from "./tag-root";

export const CheckableTag = forwardRef<HTMLSpanElement, CheckableTagProps>(
  (
    {
      children,
      checked = false,
      onChange,
      size = "md",
      startElement,
      endElement,
      className = "",
      ...rest
    },
    ref,
  ) => {
    return (
      <TagRoot
        ref={ref}
        size={size}
        variant={checked ? "solid" : "subtle"}
        colorScheme={checked ? "primary" : "neutral"}
        className={[
          "astralis-cursor-pointer hover:astralis-opacity-80 active:astralis-scale-95 astralis-transition-all astralis-duration-200",
          className,
        ]
          .filter(Boolean)
          .join(" ")}
        onClick={() => onChange?.(!checked)}
        startElement={startElement}
        endElement={endElement}
        {...rest}
      >
        {children}
      </TagRoot>
    );
  },
);

CheckableTag.displayName = "Tag.Checkable";
