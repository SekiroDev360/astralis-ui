import { forwardRef } from "react";
import { useCalendarContext } from "../calendar.context";
import type { CalendarCellProps } from "../calendar.types";
import { isToday } from "./calendar-root";

const SIZE_MAP = {
  sm: "astralis:h-8 astralis:w-8",
  md: "astralis:h-9 astralis:w-9",
  lg: "astralis:h-10 astralis:w-10",
} as const;

export const CalendarCell = forwardRef<HTMLButtonElement, CalendarCellProps>(
  ({ date, className, children, onClick, ...props }, ref) => {
    const {
      showOutsideDays,
      isOutsideMonth,
      isDateDisabled,
      isDateSelected,
      isDateInRange,
      selectDate,
      size,
    } = useCalendarContext();

    const outside = isOutsideMonth(date);
    const disabled = isDateDisabled(date) || (outside && !showOutsideDays);
    const selected = isDateSelected(date);
    const inRange = isDateInRange(date);
    const today = isToday(date);

    if (outside && !showOutsideDays) {
      return <div className={SIZE_MAP[size]} />;
    }

    return (
      <button
        ref={ref}
        type="button"
        disabled={disabled}
        aria-pressed={selected}
        aria-current={today ? "date" : undefined}
        data-selected={selected ? "true" : "false"}
        data-in-range={inRange ? "true" : "false"}
        data-outside={outside ? "true" : "false"}
        className={[
          "astralis:inline-flex astralis:items-center astralis:justify-center astralis:rounded-md astralis:border astralis:border-transparent astralis:font-medium astralis:transition-colors",
          SIZE_MAP[size],
          selected &&
            "astralis:bg-brand-solid astralis:text-brand-contrast astralis:hover:opacity-higher",
          !selected && inRange &&
            "astralis:bg-brand-subtle astralis:text-brand-label",
          !selected && !inRange &&
            "astralis:text-label-base astralis:hover:bg-surface-muted",
          outside && !selected && "astralis:text-label-subtle",
          today && !selected && "astralis:border-stroke-base",
          disabled &&
            "astralis:cursor-not-allowed astralis:opacity-moderate astralis:hover:bg-transparent",
          className,
        ]
          .filter(Boolean)
          .join(" ")}
        onClick={(event) => {
          selectDate(date);
          onClick?.(event);
        }}
        {...props}
      >
        {children ?? date.getDate()}
      </button>
    );
  },
);

CalendarCell.displayName = "Calendar.Cell";
