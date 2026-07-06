"use client";

import { Drawer, Button, HStack } from "astralis-ui";

const placements = ["left", "right", "top", "bottom"] as const;

export function DrawerPlacements() {
  return (
    <HStack gap="3" wrap="wrap" justifyContent="center">
      {placements.map((placement) => (
        <Drawer key={placement} placement={placement} size="sm">
          <Drawer.Trigger>
            <Button variant="subtle" size="sm">{placement}</Button>
          </Drawer.Trigger>
          <Drawer.Content>
            <Drawer.Header>
              <Drawer.Title>From the {placement}</Drawer.Title>
              <Drawer.CloseButton />
            </Drawer.Header>
            <Drawer.Body>
              <Drawer.Description>
                left/right size the width; top/bottom size the height.
              </Drawer.Description>
            </Drawer.Body>
          </Drawer.Content>
        </Drawer>
      ))}
    </HStack>
  );
}
