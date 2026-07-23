"use client";

import { Popover, Button, HStack } from "astralis-ui";

export function PopoverPlacement() {
  return (
    <HStack gap="3" wrap="wrap" justifyContent="center">
      <Popover side="top">
        <Popover.Trigger>
          <Button variant="subtle" size="sm">top</Button>
        </Popover.Trigger>
        <Popover.Content withArrow>
          <Popover.Description>Anchored above.</Popover.Description>
        </Popover.Content>
      </Popover>

      <Popover side="right" align="start">
        <Popover.Trigger>
          <Button variant="subtle" size="sm">right / start</Button>
        </Popover.Trigger>
        <Popover.Content withArrow>
          <Popover.Description>Side and align compose.</Popover.Description>
        </Popover.Content>
      </Popover>

      <Popover side="bottom" align="end" sideOffset={12}>
        <Popover.Trigger>
          <Button variant="subtle" size="sm">bottom / end / offset</Button>
        </Popover.Trigger>
        <Popover.Content withArrow>
          <Popover.Description>With an extra 12px gap.</Popover.Description>
        </Popover.Content>
      </Popover>
    </HStack>
  );
}
