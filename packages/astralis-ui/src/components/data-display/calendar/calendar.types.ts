import type {
  ButtonHTMLAttributes,
  CSSProperties,
  HTMLAttributes,
  ReactNode,
} from "react";

export type CalendarSize = "sm" | "md" | "lg";
export type CalendarSelectionMode = "single" | "multiple" | "range";

export type CalendarRangeValue = {
  start: Date | null;
  end: Date | null;
};

export type CalendarValue = Date | Date[] | CalendarRangeValue | null;

export interface CalendarRootProps
  extends Omit<HTMLAttributes<HTMLDivElement>, "defaultValue"> {
  selectionMode?: CalendarSelectionMode;
  value?: CalendarValue;
  defaultValue?: CalendarValue;
  onValueChange?: (value: CalendarValue) => void;
  defaultMonth?: Date;
  locale?: string;
  firstDayOfWeek?: 0 | 1 | 2 | 3 | 4 | 5 | 6;
  showOutsideDays?: boolean;
  minDate?: Date;
  maxDate?: Date;
  isDateUnavailable?: (date: Date) => boolean;
  size?: CalendarSize;
  className?: string;
  style?: CSSProperties;
  children?: ReactNode;
}

export interface CalendarHeaderProps extends HTMLAttributes<HTMLDivElement> {}

export interface CalendarTriggerProps
  extends ButtonHTMLAttributes<HTMLButtonElement> {}

export interface CalendarWeekdaysProps extends HTMLAttributes<HTMLDivElement> {}

export interface CalendarGridProps extends HTMLAttributes<HTMLDivElement> {}

export interface CalendarCellProps
  extends ButtonHTMLAttributes<HTMLButtonElement> {
  date: Date;
}
