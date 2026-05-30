import type { HTMLAttributes } from "react";
import type { DividerProps } from "./divider.types";

const BORDER_STYLE_MAP = {
  solid: "astralis-border-solid",
  dashed: "astralis-border-dashed",
  dotted: "astralis-border-dotted",
};

export function Divider({
  orientation = "horizontal",
  label,
  variant = "solid",
  className = "",
  ...props
}: DividerProps) {
  // ─── Vertical ─────────────────────────────────────────────────────────
  if (orientation === "vertical") {
    return (
      <div
        role="separator"
        aria-orientation="vertical"
        className={[
          "astralis-inline-block astralis-self-stretch",
          "astralis-border-l astralis-border-border-subtle",
          BORDER_STYLE_MAP[variant],
          className,
        ]
          .filter(Boolean)
          .join(" ")}
        {...props}
      />
    );
  }

  // ─── Horizontal with label ─────────────────────────────────────────────
  if (label) {
    return (
      <div
        role="separator"
        aria-orientation="horizontal"
        className={[
          "astralis-flex astralis-items-center astralis-gap-3",
          className,
        ]
          .filter(Boolean)
          .join(" ")}
        {...props}
      >
        <span
          className={[
            "astralis-flex-1 astralis-border-t astralis-border-border-subtle",
            BORDER_STYLE_MAP[variant],
          ].join(" ")}
        />
        <span className="astralis-text-sm astralis-text-content-tertiary astralis-whitespace-nowrap astralis-select-none">
          {label}
        </span>
        <span
          className={[
            "astralis-flex-1 astralis-border-t astralis-border-border-subtle",
            BORDER_STYLE_MAP[variant],
          ].join(" ")}
        />
      </div>
    );
  }

  // ─── Horizontal plain ─────────────────────────────────────────────────
  return (
    <hr
      role="separator"
      className={[
        "astralis-border-0 astralis-border-t astralis-border-border-subtle",
        BORDER_STYLE_MAP[variant],
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      {...(props as HTMLAttributes<HTMLHRElement>)}
    />
  );
}
