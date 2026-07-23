"use client";

import { Tabs, Box } from "astralis-ui";

export function TabsFitted() {
  return (
    /* fitted stretches triggers across the list; rounded makes it a pill. */
    <Box w="full" maxW="sm">
      <Tabs variant="segmented" fitted rounded defaultValue="day">
        <Tabs.List>
          <Tabs.Trigger value="day">Day</Tabs.Trigger>
          <Tabs.Trigger value="week">Week</Tabs.Trigger>
          <Tabs.Trigger value="month">Month</Tabs.Trigger>
        </Tabs.List>
      </Tabs>
    </Box>
  );
}
