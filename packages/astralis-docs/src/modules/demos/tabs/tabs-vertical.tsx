"use client";

import { Tabs, Text, HStack, Box } from "astralis-ui";

export function TabsVertical() {
  return (
    <Tabs orientation="vertical" variant="subtle" defaultValue="profile">
      <HStack gap="6" alignItems="start">
        <Tabs.List>
          <Tabs.Trigger value="profile">Profile</Tabs.Trigger>
          <Tabs.Trigger value="security">Security</Tabs.Trigger>
          <Tabs.Trigger value="billing">Billing</Tabs.Trigger>
        </Tabs.List>
        <Box minW="3xs">
          <Tabs.Content value="profile">
            <Text size="sm" color="muted">Name, avatar, bio.</Text>
          </Tabs.Content>
          <Tabs.Content value="security">
            <Text size="sm" color="muted">Password and sessions.</Text>
          </Tabs.Content>
          <Tabs.Content value="billing">
            <Text size="sm" color="muted">Plan and invoices.</Text>
          </Tabs.Content>
        </Box>
      </HStack>
    </Tabs>
  );
}
