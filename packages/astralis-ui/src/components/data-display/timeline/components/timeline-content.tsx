import type {
  TimelineContentProps,
  TimelineTitleProps,
  TimelineDescriptionProps,
} from "../timeline.types";

/* ------------------------------------------------------------------ */
/* Content wrapper                                                      */
/* ------------------------------------------------------------------ */

export function TimelineContent({
  children,
  className = "",
  style,
}: TimelineContentProps) {
  return (
    <div
      className={[
        "astralis-flex astralis-flex-col astralis-gap-0.5 astralis-flex-1 astralis-pb-6",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      style={style}
    >
      {children}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Title                                                                */
/* ------------------------------------------------------------------ */

export function TimelineTitle({
  children,
  className = "",
  style,
}: TimelineTitleProps) {
  return (
    <p
      className={[
        "astralis-text-sm astralis-font-semibold astralis-text-content-primary astralis-leading-snug",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      style={style}
    >
      {children}
    </p>
  );
}

/* ------------------------------------------------------------------ */
/* Description                                                          */
/* ------------------------------------------------------------------ */

export function TimelineDescription({
  children,
  className = "",
  style,
}: TimelineDescriptionProps) {
  return (
    <p
      className={[
        "astralis-text-sm astralis-text-content-secondary astralis-leading-relaxed",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      style={style}
    >
      {children}
    </p>
  );
}
