import { forwardRef } from "react";
import { useCalendarContext } from "../calendar.context";
import type { CalendarGridProps } from "../calendar.types";
import { CalendarCell } from "./calendar-cell";
import { toStartOfMonth } from "./calendar-root";

function addDays(date: Date, days: number) {
  const nextDate = new Date(date);
  nextDate.setDate(date.getDate() + days);
  return nextDate;
}

export const CalendarGrid = forwardRef<HTMLDivElement, CalendarGridProps>(
  ({ className, ...props }, ref) => {
    const { visibleMonth, firstDayOfWeek } = useCalendarContext();

    const monthStart = toStartOfMonth(visibleMonth);
    const weekDayOffset =
      (monthStart.getDay() - firstDayOfWeek + 7) % 7;
    const gridStart = addDays(monthStart, -weekDayOffset);

    const dates = Array.from({ length: 42 }, (_, index) =>
      addDays(gridStart, index),
    );

    return (
      <div
        ref={ref}
        className={[
          "astralis:grid astralis:grid-cols-7 astralis:gap-1",
          className,
        ]
          .filter(Boolean)
          .join(" ")}
        {...props}
      >
        {dates.map((date) => (
          <CalendarCell
            key={date.toISOString()}
            date={date}
            aria-label={date.toDateString()}
          />
        ))}
      </div>
    );
  },
);

CalendarGrid.displayName = "Calendar.Grid";
