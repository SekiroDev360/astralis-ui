import { forwardRef } from "react";
import type { CheckableTagProps } from "../tag.types";
import { TagRoot } from "./tag-root";
import { astralisMerge } from "../../../../utils/astralis-merge";

/** A selectable tag — solid/brand when checked, subtle/gray when not. */
export const CheckableTag = forwardRef<HTMLSpanElement, CheckableTagProps>(
  ({ children, checked = false, onChange, colorScheme = "brand", size = "md", startElement, endElement, className = "", ...rest }, ref) => {
    return (
      <TagRoot
        ref={ref}
        size={size}
        variant={checked ? "solid" : "subtle"}
        colorScheme={checked ? colorScheme : "gray"}
        role="checkbox"
        aria-checked={checked}
        tabIndex={0}
        onClick={() => onChange?.(!checked)}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") { e.preventDefault(); onChange?.(!checked); }
        }}
        startElement={startElement}
        endElement={endElement}
        className={astralisMerge(
          "astralis:cursor-pointer astralis:transition-all astralis:hover:opacity-90 astralis:active:scale-95 astralis:outline-none astralis:focus-visible:outline-2 astralis:focus-visible:outline-offset-2 astralis:focus-visible:outline-accent-ring",
          className,
        )}
        {...rest}
      >
        {children}
      </TagRoot>
    );
  },
);

CheckableTag.displayName = "Tag.Checkable";
