import { useEffect, useRef, useState, type KeyboardEvent, type Ref } from "react";
import { useCalendarContext } from "../calendar.context";
import type { CalendarGridProps } from "../calendar.types";
import { CalendarCell } from "./calendar-cell";
import { toStartOfMonth, isToday } from "./calendar-root";

function addDays(date: Date, days: number) {
  const nextDate = new Date(date);
  nextDate.setDate(date.getDate() + days);
  return nextDate;
}

/** Same day in an adjacent month, clamped to that month's length (Jan 31 → Feb 28). */
function addMonthsClamped(date: Date, delta: number) {
  const next = new Date(date.getFullYear(), date.getMonth() + delta, 1);
  const lastDay = new Date(next.getFullYear(), next.getMonth() + 1, 0).getDate();
  next.setDate(Math.min(date.getDate(), lastDay));
  return next;
}

function isSameDay(a: Date, b: Date) {
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  );
}

/** Timezone-safe local key used to find a cell's button after re-render. */
function dateKey(date: Date) {
  return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
}

export function CalendarGrid({
  className,
  ref,
  ...props
}: CalendarGridProps & { ref?: Ref<HTMLDivElement> }) {
    const {
      visibleMonth,
      setVisibleMonth,
      firstDayOfWeek,
      isDateSelected,
      isOutsideMonth,
    } = useCalendarContext();

    const gridRef = useRef<HTMLDivElement | null>(null);
    // Roving focus target. Arrow keys move it; crossing a month boundary also
    // flips the visible month, then the effect below restores DOM focus.
    const [focusedDate, setFocusedDate] = useState<Date | null>(null);
    const pendingFocus = useRef(false);

    const monthStart = toStartOfMonth(visibleMonth);
    const weekDayOffset =
      (monthStart.getDay() - firstDayOfWeek + 7) % 7;
    const gridStart = addDays(monthStart, -weekDayOffset);

    const dates = Array.from({ length: 42 }, (_, index) =>
      addDays(gridStart, index),
    );

    // The single tabbable cell (roving tabindex): the roving target if it's in
    // this month, else the selected day, else today, else the 1st.
    const inMonth = dates.filter((d) => !isOutsideMonth(d));
    const tabbableDate =
      (focusedDate && !isOutsideMonth(focusedDate) && dates.some((d) => isSameDay(d, focusedDate))
        ? focusedDate
        : null) ??
      inMonth.find((d) => isDateSelected(d)) ??
      inMonth.find((d) => isToday(d)) ??
      inMonth[0];

    const moveFocus = (target: Date) => {
      setFocusedDate(target);
      pendingFocus.current = true;
      // Navigating past the month edge scrolls the calendar with the focus.
      if (isOutsideMonth(target)) setVisibleMonth(target);
    };

    useEffect(() => {
      if (!pendingFocus.current || !focusedDate) return;
      pendingFocus.current = false;
      gridRef.current
        ?.querySelector<HTMLButtonElement>(`[data-date="${dateKey(focusedDate)}"]`)
        ?.focus();
    });

    // WAI-ARIA date-grid keyboard model: arrows ±1/±7 days, Home/End to the
    // week bounds, PageUp/PageDown ±1 month (same day, clamped).
    const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
      const base = focusedDate ?? tabbableDate;
      if (!base) return;

      let target: Date | null = null;
      switch (event.key) {
        case "ArrowLeft": target = addDays(base, -1); break;
        case "ArrowRight": target = addDays(base, 1); break;
        case "ArrowUp": target = addDays(base, -7); break;
        case "ArrowDown": target = addDays(base, 7); break;
        case "Home": {
          const dow = (base.getDay() - firstDayOfWeek + 7) % 7;
          target = addDays(base, -dow);
          break;
        }
        case "End": {
          const dow = (base.getDay() - firstDayOfWeek + 7) % 7;
          target = addDays(base, 6 - dow);
          break;
        }
        case "PageUp": target = addMonthsClamped(base, -1); break;
        case "PageDown": target = addMonthsClamped(base, 1); break;
        default: return;
      }

      event.preventDefault();
      moveFocus(target);
    };

    return (
      <div
        ref={(node) => {
          gridRef.current = node;
          if (typeof ref === "function") ref(node);
          else if (ref) ref.current = node;
        }}
        onKeyDown={handleKeyDown}
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
            data-date={dateKey(date)}
            tabIndex={tabbableDate && isSameDay(date, tabbableDate) ? 0 : -1}
            onFocus={() => setFocusedDate(date)}
            aria-label={date.toDateString()}
          />
        ))}
      </div>
    );
}

CalendarGrid.displayName = "Calendar.Grid";
