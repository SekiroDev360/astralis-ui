"use client";

import { Button, HStack, Menu } from "astralis-ui";

function Placement({ side, align, label }: { side?: "top" | "bottom" | "left" | "right"; align?: "start" | "center" | "end"; label: string }) {
  return (
    <Menu side={side} align={align}>
      <Menu.Trigger>
        <Button size="sm" variant="subtle" colorScheme="gray">{label}</Button>
      </Menu.Trigger>
      <Menu.Content>
        <Menu.Item>First</Menu.Item>
        <Menu.Item>Second</Menu.Item>
        <Menu.Item>Third</Menu.Item>
      </Menu.Content>
    </Menu>
  );
}

export function MenuPlacement() {
  return (
    <HStack gap="3" wrap="wrap">
      <Placement label="bottom / start" />
      <Placement side="bottom" align="end" label="bottom / end" />
      <Placement side="top" align="start" label="top / start" />
      <Placement side="right" align="start" label="right / start" />
    </HStack>
  );
}
