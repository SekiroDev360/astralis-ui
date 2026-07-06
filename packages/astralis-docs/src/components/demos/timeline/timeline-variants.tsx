"use client";

import { Timeline, Text, HStack, VStack } from "astralis-ui";

const variants = ["solid", "subtle", "outline"] as const;

export function TimelineVariants() {
  return (
    <HStack gap="8" alignItems="start" wrap="wrap" justifyContent="center">
      {variants.map((variant) => (
        <VStack key={variant} gap="2" alignItems="start">
          <Text as="span" size="xs" color="muted">{variant}</Text>
          <Timeline variant={variant} size="sm">
            <Timeline.Item>
              <Timeline.Indicator>1</Timeline.Indicator>
              <Timeline.Content>
                <Timeline.Title>First</Timeline.Title>
              </Timeline.Content>
            </Timeline.Item>
            <Timeline.Item>
              <Timeline.Indicator>2</Timeline.Indicator>
              <Timeline.Content>
                <Timeline.Title>Second</Timeline.Title>
              </Timeline.Content>
            </Timeline.Item>
          </Timeline>
        </VStack>
      ))}
    </HStack>
  );
}
