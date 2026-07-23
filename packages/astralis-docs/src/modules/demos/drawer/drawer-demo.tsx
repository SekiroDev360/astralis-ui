"use client";

import { Drawer, Button, Text, VStack } from "astralis-ui";

export function DrawerDemo() {
  return (
    <Drawer>
      <Drawer.Trigger>
        <Button variant="outline" colorScheme="gray">Open settings</Button>
      </Drawer.Trigger>
      <Drawer.Content>
        <Drawer.Header>
          <Drawer.Title>Workspace settings</Drawer.Title>
          <Drawer.CloseButton />
        </Drawer.Header>
        <Drawer.Body>
          <VStack gap="3" alignItems="stretch">
            <Drawer.Description>
              Slides in from the right by default; the body scrolls
              independently of the header and footer.
            </Drawer.Description>
            <Text size="sm" color="muted">Notifications, members, billing…</Text>
          </VStack>
        </Drawer.Body>
        <Drawer.Footer>
          <Drawer.Close>
            <Button variant="text" colorScheme="gray">Cancel</Button>
          </Drawer.Close>
          <Drawer.Close>
            <Button>Save</Button>
          </Drawer.Close>
        </Drawer.Footer>
      </Drawer.Content>
    </Drawer>
  );
}
