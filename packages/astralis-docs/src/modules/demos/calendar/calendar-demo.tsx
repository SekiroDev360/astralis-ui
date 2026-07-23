"use client";

import { useState } from "react";
import { Calendar, Text, VStack } from "astralis-ui";

export function CalendarDemo() {
  const [date, setDate] = useState<Date | null>(null);

  return (
    <VStack gap="3">
      <Calendar
        selectionMode="single"
        value={date}
        onValueChange={(next) => setDate(next instanceof Date ? next : null)}
      >
        <Calendar.Header>
          <Calendar.PrevTrigger />
          <Calendar.ViewTrigger />
          <Calendar.NextTrigger />
        </Calendar.Header>
        <Calendar.Weekdays />
        <Calendar.Grid />
      </Calendar>
      <Text size="xs" color="muted">
        {date ? `Selected: ${date.toDateString()}` : "Pick a date"}
      </Text>
    </VStack>
  );
}
