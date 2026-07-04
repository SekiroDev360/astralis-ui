import { forwardRef, useMemo } from "react";
import { useCalendarContext } from "../calendar.context";
import type { CalendarWeekdaysProps } from "../calendar.types";

function rotateWeekdays(days: string[], firstDayOfWeek: number) {
  return [...days.slice(firstDayOfWeek), ...days.slice(0, firstDayOfWeek)];
}

export const CalendarWeekdays = forwardRef<HTMLDivElement, CalendarWeekdaysProps>(
  ({ className, ...props }, ref) => {
    const { locale, firstDayOfWeek } = useCalendarContext();

    const labels = useMemo(() => {
      const baseDate = new Date(2024, 0, 7);
      const formatter = new Intl.DateTimeFormat(locale, { weekday: "short" });
      const weekdays = Array.from({ length: 7 }, (_, index) => {
        const date = new Date(baseDate);
        date.setDate(baseDate.getDate() + index);
        return formatter.format(date);
      });

      return rotateWeekdays(weekdays, firstDayOfWeek);
    }, [firstDayOfWeek, locale]);

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
        {labels.map((label, index) => (
          <div
            key={index}
            className="astralis:flex astralis:h-8 astralis:items-center astralis:justify-center astralis:text-xs astralis:font-medium astralis:uppercase astralis:tracking-wide astralis:text-label-subtle"
          >
            {label}
          </div>
        ))}
      </div>
    );
  },
);

CalendarWeekdays.displayName = "Calendar.Weekdays";
