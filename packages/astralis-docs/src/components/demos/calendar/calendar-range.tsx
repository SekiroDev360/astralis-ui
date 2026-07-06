"use client";

import { Calendar } from "astralis-ui";

export function CalendarRange() {
  return (
    /* Range mode: click a start, then an end; days between highlight. */
    <Calendar selectionMode="range" firstDayOfWeek={1} size="sm">
      <Calendar.Header>
        <Calendar.PrevTrigger />
        <Calendar.ViewTrigger />
        <Calendar.NextTrigger />
      </Calendar.Header>
      <Calendar.Weekdays />
      <Calendar.Grid />
    </Calendar>
  );
}
