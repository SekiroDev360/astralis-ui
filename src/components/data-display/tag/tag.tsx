import { forwardRef } from "react";
import type {
  TagProps,
  CheckableTagProps,
  CheckableTagGroupProps,
} from "./tag.types";

/* ------------------------------------------------------------------ */
/* Helpers                                                              */
/* ------------------------------------------------------------------ */

const SIZE_MAP = {
  sm: "astralis-h-5 astralis-px-1.5 astralis-text-[10px]",
  md: "astralis-h-6 astralis-px-2 astralis-text-xs",
  lg: "astralis-h-8 astralis-px-3 astralis-text-sm",
};

const CLOSE_ICON_SIZE_MAP = {
  sm: "astralis-h-2.5 astralis-w-2.5 astralis-ml-1",
  md: "astralis-h-3   astralis-w-3   astralis-ml-1.5",
  lg: "astralis-h-3.5 astralis-w-3.5 astralis-ml-2",
};

function getVariantClasses(variant: string, colorScheme: string) {
  const isNeutral = colorScheme === "neutral" || colorScheme === "gray";
  const c = colorScheme; // shorthand

  if (variant === "solid") {
    if (isNeutral)
      return "astralis-bg-gray-700 astralis-text-white dark:astralis-bg-gray-100 dark:astralis-text-gray-900 astralis-border-transparent";
    if (c === "primary")
      return "astralis-bg-primary-600 astralis-text-white astralis-border-transparent";
    if (c === "success" || c === "green")
      return "astralis-bg-green-600 astralis-text-white astralis-border-transparent";
    if (c === "warning" || c === "yellow")
      return "astralis-bg-yellow-500 astralis-text-yellow-950 astralis-border-transparent";
    if (c === "danger" || c === "red")
      return "astralis-bg-red-600 astralis-text-white astralis-border-transparent";
    // For other semantic colours, we construct Tailwind classes (since this is an internal library, we assume these exist or map them roughly)
    return `astralis-bg-${c}-600 astralis-text-white astralis-border-transparent`;
  }

  if (variant === "outline") {
    if (isNeutral)
      return "astralis-bg-transparent astralis-text-gray-700 dark:astralis-text-gray-300 astralis-border-gray-300 dark:astralis-border-gray-600";
    if (c === "primary")
      return "astralis-bg-transparent astralis-text-primary-700 dark:astralis-text-primary-300 astralis-border-primary-500";
    if (c === "success" || c === "green")
      return "astralis-bg-transparent astralis-text-green-700 dark:astralis-text-green-300 astralis-border-green-500";
    if (c === "warning" || c === "yellow")
      return "astralis-bg-transparent astralis-text-yellow-700 dark:astralis-text-yellow-300 astralis-border-yellow-500";
    if (c === "danger" || c === "red")
      return "astralis-bg-transparent astralis-text-red-700 dark:astralis-text-red-300 astralis-border-red-500";
    return `astralis-bg-transparent astralis-text-${c}-700 dark:astralis-text-${c}-300 astralis-border-${c}-500`;
  }

  // subtle (default)
  if (isNeutral)
    return "astralis-bg-gray-100 astralis-text-gray-700 dark:astralis-bg-gray-800 dark:astralis-text-gray-300 astralis-border-transparent";
  if (c === "primary")
    return "astralis-bg-primary-100 astralis-text-primary-800 dark:astralis-bg-primary-900/40 dark:astralis-text-primary-300 astralis-border-transparent";
  if (c === "success" || c === "green")
    return "astralis-bg-green-100 astralis-text-green-800 dark:astralis-bg-green-900/40 dark:astralis-text-green-300 astralis-border-transparent";
  if (c === "warning" || c === "yellow")
    return "astralis-bg-yellow-100 astralis-text-yellow-800 dark:astralis-bg-yellow-900/40 dark:astralis-text-yellow-300 astralis-border-transparent";
  if (c === "danger" || c === "red")
    return "astralis-bg-red-100 astralis-text-red-800 dark:astralis-bg-red-900/40 dark:astralis-text-red-300 astralis-border-transparent";
  return `astralis-bg-${c}-100 astralis-text-${c}-800 dark:astralis-bg-${c}-900/40 dark:astralis-text-${c}-300 astralis-border-transparent`;
}

/* ------------------------------------------------------------------ */
/* Tag                                                                  */
/* ------------------------------------------------------------------ */

export const Tag = forwardRef<HTMLSpanElement, TagProps>(
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
        <span className="astralis-truncate astralis-max-w-full">
          {children}
        </span>
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
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
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
Tag.displayName = "Tag";

/* ------------------------------------------------------------------ */
/* CheckableTag                                                         */
/* ------------------------------------------------------------------ */

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
    // Unchecked acts like subtle neutral. Checked acts like solid primary.
    const activeClasses = checked
      ? getVariantClasses("solid", "primary")
      : getVariantClasses("subtle", "neutral");

    return (
      <Tag
        ref={ref}
        size={size}
        className={[
          "astralis-cursor-pointer hover:astralis-opacity-80 active:astralis-scale-95 astralis-transition-all astralis-duration-200",
          activeClasses,
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
      </Tag>
    );
  },
);
CheckableTag.displayName = "CheckableTag";

/* ------------------------------------------------------------------ */
/* CheckableTagGroup                                                    */
/* ------------------------------------------------------------------ */

export function CheckableTagGroup({
  value = [],
  onChange,
  options,
  multiple = false,
  size = "md",
  className = "",
  style,
}: CheckableTagGroupProps) {
  const handleToggle = (optVal: string | number, isChecked: boolean) => {
    if (!onChange) return;
    if (multiple) {
      if (isChecked) {
        onChange([...value, optVal]);
      } else {
        onChange(value.filter((v) => v !== optVal));
      }
    } else {
      if (isChecked) {
        onChange([optVal]);
      } else {
        onChange([]); // Or enforce at least one if required
      }
    }
  };

  return (
    <div
      className={["astralis-flex astralis-flex-wrap astralis-gap-2", className]
        .filter(Boolean)
        .join(" ")}
      style={style}
    >
      {options.map((opt) => {
        const isObj = typeof opt === "object" && opt !== null;
        const optVal = isObj ? opt.value : opt;
        const optLabel = isObj ? opt.label : opt;
        const checked = value.includes(optVal);

        return (
          <CheckableTag
            key={String(optVal)}
            size={size}
            checked={checked}
            onChange={(c) => handleToggle(optVal, c)}
          >
            {optLabel}
          </CheckableTag>
        );
      })}
    </div>
  );
}
CheckableTagGroup.displayName = "CheckableTagGroup";
