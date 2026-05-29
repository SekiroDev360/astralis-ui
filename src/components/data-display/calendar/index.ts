import { CalendarHeader } from "./components/calendar-header";
import { CalendarNextTrigger } from "./components/calendar-next-trigger";
import { CalendarPrevTrigger } from "./components/calendar-prev-trigger";
import { CalendarRoot } from "./components/calendar-root";
import { CalendarViewTrigger } from "./components/calendar-view-trigger";
import { CalendarWeekdays } from "./components/calendar-weekdays";
import { CalendarGrid } from "./components/calendar-grid";
import { CalendarCell } from "./components/calendar-cell";

export const Calendar = Object.assign(CalendarRoot, {
  Root: CalendarRoot,
  Header: CalendarHeader,
  PrevTrigger: CalendarPrevTrigger,
  ViewTrigger: CalendarViewTrigger,
  NextTrigger: CalendarNextTrigger,
  Weekdays: CalendarWeekdays,
  Grid: CalendarGrid,
  Cell: CalendarCell,
});

export {
  CalendarRoot,
  CalendarHeader,
  CalendarPrevTrigger,
  CalendarViewTrigger,
  CalendarNextTrigger,
  CalendarWeekdays,
  CalendarGrid,
  CalendarCell,
};

export type {
  CalendarRootProps,
  CalendarHeaderProps,
  CalendarTriggerProps,
  CalendarWeekdaysProps,
  CalendarGridProps,
  CalendarCellProps,
  CalendarSize,
  CalendarSelectionMode,
  CalendarValue,
  CalendarRangeValue,
} from "./calendar.types";
