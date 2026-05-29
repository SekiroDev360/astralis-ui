import { forwardRef, useMemo, useState } from "react";
import { CalendarContext } from "../calendar.context";
import type {
  CalendarRangeValue,
  CalendarRootProps,
  CalendarValue,
} from "../calendar.types";
import { CalendarGrid } from "./calendar-grid";
import { CalendarHeader } from "./calendar-header";
import { CalendarNextTrigger } from "./calendar-next-trigger";
import { CalendarPrevTrigger } from "./calendar-prev-trigger";
import { CalendarViewTrigger } from "./calendar-view-trigger";
import { CalendarWeekdays } from "./calendar-weekdays";

const SIZE_MAP = {
  sm: "astralis-text-xs",
  md: "astralis-text-sm",
  lg: "astralis-text-base",
} as const;

function startOfDay(date: Date) {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate());
}

function startOfMonth(date: Date) {
  return new Date(date.getFullYear(), date.getMonth(), 1);
}

function addMonths(date: Date, months: number) {
  return new Date(date.getFullYear(), date.getMonth() + months, 1);
}

function isSameDay(a: Date, b: Date) {
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  );
}

function isRangeValue(value: CalendarValue): value is CalendarRangeValue {
  return !!value && !Array.isArray(value) && !(value instanceof Date);
}

function normalizeValue(value: CalendarValue, selectionMode: CalendarRootProps["selectionMode"]) {
  if (selectionMode === "single") {
    return value instanceof Date ? startOfDay(value) : null;
  }

  if (selectionMode === "multiple") {
    return Array.isArray(value) ? value.map(startOfDay) : [];
  }

  if (isRangeValue(value)) {
    return {
      start: value.start ? startOfDay(value.start) : null,
      end: value.end ? startOfDay(value.end) : null,
    };
  }

  return { start: null, end: null };
}

export const CalendarRoot = forwardRef<HTMLDivElement, CalendarRootProps>(
  (
    {
      selectionMode = "single",
      value,
      defaultValue,
      onValueChange,
      defaultMonth,
      locale = "en-US",
      firstDayOfWeek = 0,
      showOutsideDays = true,
      minDate,
      maxDate,
      isDateUnavailable,
      size = "md",
      className,
      style,
      children,
      ...props
    },
    ref,
  ) => {
    const initialMonth = startOfMonth(defaultMonth ?? new Date());

    const [visibleMonth, setVisibleMonth] = useState(initialMonth);
    const [internalValue, setInternalValue] = useState<CalendarValue>(() =>
      normalizeValue(defaultValue ?? null, selectionMode),
    );

    const selectedValue = useMemo(
      () => normalizeValue(value ?? internalValue, selectionMode),
      [value, internalValue, selectionMode],
    );

    const monthLabel = useMemo(
      () =>
        new Intl.DateTimeFormat(locale, {
          month: "long",
          year: "numeric",
        }).format(visibleMonth),
      [locale, visibleMonth],
    );

    const min = minDate ? startOfDay(minDate) : null;
    const max = maxDate ? startOfDay(maxDate) : null;

    const isDateDisabled = (date: Date) => {
      const normalized = startOfDay(date);

      if (min && normalized < min) {
        return true;
      }

      if (max && normalized > max) {
        return true;
      }

      return isDateUnavailable ? isDateUnavailable(normalized) : false;
    };

    const emitValueChange = (nextValue: CalendarValue) => {
      if (value === undefined) {
        setInternalValue(nextValue);
      }

      onValueChange?.(nextValue);
    };

    const selectDate = (date: Date) => {
      const normalized = startOfDay(date);

      if (isDateDisabled(normalized)) {
        return;
      }

      if (selectionMode === "single") {
        emitValueChange(normalized);
        return;
      }

      if (selectionMode === "multiple") {
        const current = Array.isArray(selectedValue) ? selectedValue : [];
        const hasDate = current.some((item) => isSameDay(item, normalized));
        const next = hasDate
          ? current.filter((item) => !isSameDay(item, normalized))
          : [...current, normalized];

        emitValueChange(next);
        return;
      }

      const current = isRangeValue(selectedValue)
        ? selectedValue
        : { start: null, end: null };

      if (!current.start || current.end) {
        emitValueChange({ start: normalized, end: null });
        return;
      }

      if (normalized < current.start) {
        emitValueChange({ start: normalized, end: current.start });
        return;
      }

      emitValueChange({ start: current.start, end: normalized });
    };

    const isDateSelected = (date: Date) => {
      if (selectedValue instanceof Date) {
        return isSameDay(selectedValue, date);
      }

      if (Array.isArray(selectedValue)) {
        return selectedValue.some((item) => isSameDay(item, date));
      }

      if (isRangeValue(selectedValue)) {
        return (
          !!selectedValue.start && isSameDay(selectedValue.start, date)
        ) || (!!selectedValue.end && isSameDay(selectedValue.end, date));
      }

      return false;
    };

    const isDateInRange = (date: Date) => {
      if (!isRangeValue(selectedValue) || !selectedValue.start || !selectedValue.end) {
        return false;
      }

      const valueDate = startOfDay(date);
      return valueDate > selectedValue.start && valueDate < selectedValue.end;
    };

    const contextValue = {
      visibleMonth,
      setVisibleMonth,
      monthLabel,
      selectionMode,
      selectedValue,
      selectDate,
      isDateSelected,
      isDateInRange,
      isDateDisabled,
      isOutsideMonth: (date: Date) => date.getMonth() !== visibleMonth.getMonth(),
      showOutsideDays,
      firstDayOfWeek,
      locale,
      size,
    };

    return (
      <CalendarContext.Provider value={contextValue}>
        <div
          ref={ref}
          className={[
            "astralis-inline-flex astralis-flex-col astralis-gap-3 astralis-rounded-xl astralis-border astralis-border-border-subtle astralis-bg-surface-base astralis-p-3",
            SIZE_MAP[size],
            className,
          ]
            .filter(Boolean)
            .join(" ")}
          style={style}
          {...props}
        >
          {children ?? (
            <>
              <CalendarHeader>
                <CalendarPrevTrigger />
                <CalendarViewTrigger />
                <CalendarNextTrigger />
              </CalendarHeader>
              <CalendarWeekdays />
              <CalendarGrid />
            </>
          )}
        </div>
      </CalendarContext.Provider>
    );
  },
);

export function moveVisibleMonth(currentMonth: Date, delta: number) {
  return addMonths(currentMonth, delta);
}

export function isToday(date: Date) {
  return isSameDay(date, new Date());
}

export function toStartOfDay(date: Date) {
  return startOfDay(date);
}

export function toStartOfMonth(date: Date) {
  return startOfMonth(date);
}

CalendarRoot.displayName = "Calendar.Root";
