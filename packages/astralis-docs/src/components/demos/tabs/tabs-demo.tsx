"use client";

import { Tabs, Text, Box } from "astralis-ui";

export function TabsDemo() {
  return (
    <Box w="full" maxW="md">
      <Tabs defaultValue="overview">
        <Tabs.List>
          <Tabs.Trigger value="overview">Overview</Tabs.Trigger>
          <Tabs.Trigger value="activity">Activity</Tabs.Trigger>
          <Tabs.Trigger value="settings">Settings</Tabs.Trigger>
        </Tabs.List>
        <Box pt="4">
          <Tabs.Content value="overview">
            <Text size="sm" color="muted">
              The line variant slides its indicator between triggers.
            </Text>
          </Tabs.Content>
          <Tabs.Content value="activity">
            <Text size="sm" color="muted">Recent activity shows here.</Text>
          </Tabs.Content>
          <Tabs.Content value="settings">
            <Text size="sm" color="muted">Settings panel.</Text>
          </Tabs.Content>
        </Box>
      </Tabs>
    </Box>
  );
}
