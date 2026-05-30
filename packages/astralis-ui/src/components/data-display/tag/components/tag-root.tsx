import { forwardRef } from "react";
import type { TagProps } from "../tag.types";
import { CLOSE_ICON_SIZE_MAP, SIZE_MAP, getVariantClasses } from "./tag.shared";

export const TagRoot = forwardRef<HTMLSpanElement, TagProps>(
  (
    {
      children,
      size = "md",
      variant = "subtle",
      colorScheme = "neutral",
      startElement,
      endElement,
      closable,
      onClose,
      className = "",
      style,
      ...rest
    },
    ref,
  ) => {
    return (
      <span
        ref={ref}
        className={[
          "astralis-inline-flex astralis-items-center astralis-justify-center astralis-font-medium astralis-rounded astralis-border",
          "astralis-transition-colors astralis-duration-200",
          SIZE_MAP[size],
          getVariantClasses(variant, colorScheme),
          className,
        ]
          .filter(Boolean)
          .join(" ")}
        style={style}
        {...rest}
      >
        {startElement && (
          <span className="astralis-mr-1.5 astralis-flex-shrink-0">
            {startElement}
          </span>
        )}
        <span className="astralis-truncate astralis-max-w-full">{children}</span>
        {endElement && !closable && (
          <span className="astralis-ml-1.5 astralis-flex-shrink-0">
            {endElement}
          </span>
        )}
        {closable && (
          <button
            type="button"
            className={[
              "astralis-flex-shrink-0 astralis-rounded-sm astralis-opacity-60 hover:astralis-opacity-100 focus:astralis-outline-none focus-visible:astralis-ring-2 focus-visible:astralis-ring-offset-1 astralis-transition-opacity",
              CLOSE_ICON_SIZE_MAP[size],
            ].join(" ")}
            onClick={(event) => {
              event.preventDefault();
              event.stopPropagation();
              onClose?.();
            }}
            aria-label="Remove tag"
          >
            <svg
              viewBox="0 0 16 16"
              fill="currentColor"
              className="astralis-h-full astralis-w-full"
            >
              <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
            </svg>
          </button>
        )}
      </span>
    );
  },
);

TagRoot.displayName = "Tag";
