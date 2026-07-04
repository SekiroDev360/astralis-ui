import { forwardRef } from "react";
import type { CalendarHeaderProps } from "../calendar.types";

export const CalendarHeader = forwardRef<HTMLDivElement, CalendarHeaderProps>(
  ({ className, ...props }, ref) => (
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
  ),
);

CalendarHeader.displayName = "Calendar.Header";
