import type { Meta, StoryObj } from "@storybook/react-vite";
import { Drawer } from "./index";
import { Button } from "../../buttons/button";
import { HStack } from "../../layout/stack";
import { Text } from "../../typography/text";

/**
 * Drawer is an edge-anchored dialog that slides in from the `placement` side.
 * It shares Modal's focus trap and dismissal, with a scrollable `Drawer.Body`.
 */
const meta: Meta<typeof Drawer> = {
  title: "Components/Overlay/Drawer",
  component: Drawer,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Drawer>;

/** Slides in from the right by default. */
export const Basic: Story = {
  render: () => (
    <Drawer>
      <Drawer.Trigger><Button>Open drawer</Button></Drawer.Trigger>
      <Drawer.Content>
        <Drawer.Header>
          <Drawer.Title>Settings</Drawer.Title>
          <Drawer.CloseButton />
        </Drawer.Header>
        <Drawer.Body>
          <Text>Drawer body content scrolls independently when it overflows.</Text>
        </Drawer.Body>
        <Drawer.Footer>
          <Drawer.Close><Button variant="text" colorScheme="gray">Cancel</Button></Drawer.Close>
          <Drawer.Close><Button>Save</Button></Drawer.Close>
        </Drawer.Footer>
      </Drawer.Content>
    </Drawer>
  ),
};

/** Any of the four edges via `placement`. */
export const Placements: Story = {
  render: () => (
    <HStack gap="3">
      {(["left", "right", "top", "bottom"] as const).map((placement) => (
        <Drawer key={placement} placement={placement}>
          <Drawer.Trigger><Button variant="outline" colorScheme="gray">{placement}</Button></Drawer.Trigger>
          <Drawer.Content>
            <Drawer.Header><Drawer.Title>Placement = {placement}</Drawer.Title><Drawer.CloseButton /></Drawer.Header>
            <Drawer.Body><Text>The drawer slides in from the {placement} edge.</Text></Drawer.Body>
          </Drawer.Content>
        </Drawer>
      ))}
    </HStack>
  ),
};
