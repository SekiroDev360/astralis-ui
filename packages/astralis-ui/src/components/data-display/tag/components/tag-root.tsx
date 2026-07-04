import { forwardRef } from "react";
import type { TagProps } from "../tag.types";
import { tagVariants, closeIconSize } from "../tag.styles";
import { astralisMerge } from "../../../../utils/astralis-merge";
import { accentClass } from "../../../../const/color-schemes";
import Icon from "../../../icon/icon";
import { XIcon } from "../../../icon/internal-icons";

export const TagRoot = forwardRef<HTMLSpanElement, TagProps>(
  (
    { children, size = "md", variant = "subtle", colorScheme = "gray", startElement, endElement, closable, onClose, className = "", style, ...rest },
    ref,
  ) => {
    return (
      <span
        ref={ref}
        className={astralisMerge(tagVariants({ size, variant }), accentClass(colorScheme), className)}
        style={style}
        {...rest}
      >
        {startElement && <span className="astralis:shrink-0 astralis:inline-flex">{startElement}</span>}
        <span className="astralis:truncate">{children}</span>
        {endElement && !closable && <span className="astralis:shrink-0 astralis:inline-flex">{endElement}</span>}
        {closable && (
          <button
            type="button"
            aria-label="Remove"
            onClick={(e) => { e.preventDefault(); e.stopPropagation(); onClose?.(); }}
            className="astralis:shrink-0 astralis:inline-flex astralis:rounded-sm astralis:opacity-70 astralis:cursor-pointer astralis:transition-opacity astralis:hover:opacity-100 astralis:outline-none astralis:focus-visible:outline-2 astralis:focus-visible:outline-offset-1 astralis:focus-visible:outline-accent-ring"
          >
            <Icon size={closeIconSize[size]}><XIcon /></Icon>
          </button>
        )}
      </span>
    );
  },
);

TagRoot.displayName = "Tag";
