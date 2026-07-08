import type { Ref } from "react";
import type { CalendarHeaderProps } from "../calendar.types";

export function CalendarHeader({
  className,
  ref,
  ...props
}: CalendarHeaderProps & { ref?: Ref<HTMLDivElement> }) {
  return (
    <div
      ref={ref}
      className={[
        "astralis:flex astralis:items-center astralis:justify-between astralis:gap-2",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      {...props}
    />
  );
}

CalendarHeader.displayName = "Calendar.Header";
