"use client";

import { Tabs, Text, VStack } from "astralis-ui";

const variants = ["line", "subtle", "segmented", "outline", "plain"] as const;

export function TabsVariants() {
  return (
    <VStack gap="5" alignItems="start">
      {variants.map((variant) => (
        <VStack key={variant} gap="1" alignItems="start">
          <Text as="span" size="xs" color="muted">{variant}</Text>
          <Tabs variant={variant} size="sm" defaultValue="one">
            <Tabs.List>
              <Tabs.Trigger value="one">First</Tabs.Trigger>
              <Tabs.Trigger value="two">Second</Tabs.Trigger>
              <Tabs.Trigger value="three" disabled>Disabled</Tabs.Trigger>
            </Tabs.List>
          </Tabs>
        </VStack>
      ))}
    </VStack>
  );
}
