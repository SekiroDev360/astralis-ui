"use client";

import { Popover, Button, Text, VStack } from "astralis-ui";

export function PopoverDemo() {
  return (
    <Popover>
      <Popover.Trigger>
        <Button variant="outline" colorScheme="gray">Share</Button>
      </Popover.Trigger>
      <Popover.Content withArrow>
        <VStack gap="2" alignItems="stretch" maxW="3xs">
          <Popover.Title>Share this page</Popover.Title>
          <Popover.Description>
            Anyone with the link can view. Popovers hold interactive content —
            unlike tooltips.
          </Popover.Description>
          <Text size="xs" color="subtle">astralis.dev/docs/popover</Text>
          <Popover.Close>
            <Button size="sm">Copy link</Button>
          </Popover.Close>
        </VStack>
      </Popover.Content>
    </Popover>
  );
}
