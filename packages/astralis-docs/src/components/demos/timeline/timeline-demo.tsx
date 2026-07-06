"use client";

import { Timeline, Icon, Box } from "astralis-ui";
import { Check, Truck, Package } from "lucide-react";

export function TimelineDemo() {
  return (
    <Box w="full" maxW="xs">
      <Timeline>
        <Timeline.Item>
          <Timeline.Indicator colorScheme="green">
            <Icon as={Check} size="xs" />
          </Timeline.Indicator>
          <Timeline.Content>
            <Timeline.Title>Order placed</Timeline.Title>
            <Timeline.Description>Confirmed at 2:30 PM</Timeline.Description>
          </Timeline.Content>
        </Timeline.Item>
        <Timeline.Item>
          <Timeline.Indicator>
            <Icon as={Truck} size="xs" />
          </Timeline.Indicator>
          <Timeline.Content>
            <Timeline.Title>In transit</Timeline.Title>
            <Timeline.Description>Left the warehouse this morning</Timeline.Description>
          </Timeline.Content>
        </Timeline.Item>
        <Timeline.Item>
          <Timeline.Indicator colorScheme="gray">
            <Icon as={Package} size="xs" />
          </Timeline.Indicator>
          <Timeline.Content>
            <Timeline.Title>Delivery</Timeline.Title>
            <Timeline.Description>Expected Thursday</Timeline.Description>
          </Timeline.Content>
        </Timeline.Item>
      </Timeline>
    </Box>
  );
}
