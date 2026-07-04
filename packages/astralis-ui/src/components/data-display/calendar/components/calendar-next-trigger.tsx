import { forwardRef } from "react";
import type { CalendarTriggerProps } from "../calendar.types";
import { useCalendarContext } from "../calendar.context";
import { moveVisibleMonth } from "./calendar-root";

export const CalendarNextTrigger = forwardRef<
  HTMLButtonElement,
  CalendarTriggerProps
>(({ className, onClick, children, ...props }, ref) => {
  const { visibleMonth, setVisibleMonth } = useCalendarContext();

  return (
    <button
      ref={ref}
      type="button"
      aria-label="Next month"
      className={[
        "astralis:inline-flex astralis:h-8 astralis:w-8 astralis:items-center astralis:justify-center astralis:rounded-md astralis:text-label-muted astralis:hover:bg-surface-muted astralis:hover:text-label-base",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      onClick={(event) => {
        setVisibleMonth(moveVisibleMonth(visibleMonth, 1));
        onClick?.(event);
      }}
      {...props}
    >
      {children ?? ">"}
    </button>
  );
});

CalendarNextTrigger.displayName = "Calendar.NextTrigger";
