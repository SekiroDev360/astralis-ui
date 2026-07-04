import type { Meta, StoryObj } from "@storybook/react-vite";
import { Popover } from "./index";
import { Button } from "../../buttons/button";
import { HStack, VStack } from "../../layout/stack";
import { Text } from "../../typography/text";

/**
 * Popover is a non-modal floating panel anchored to its trigger. It positions
 * itself with collision-aware flipping, dismisses on outside-click or Escape,
 * and returns focus to the trigger on close.
 */
const meta: Meta<typeof Popover> = {
  title: "Components/Overlay/Popover",
  component: Popover,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Popover>;

/** Title + description content with an arrow. */
export const Basic: Story = {
  render: () => (
    <Popover> 
      <Popover.Trigger><Button variant="outline" colorScheme="gray">Open popover</Button></Popover.Trigger>
      <Popover.Content withArrow>
        <Popover.Title>Dimensions</Popover.Title>
        <Popover.Description>Set the width and height of the frame.</Popover.Description>
      </Popover.Content>
    </Popover>
  ),
};

/** Placement via `side`. */
export const Sides: Story = {
  render: () => (
    <HStack gap="3">
      {(["top", "right", "bottom", "left"] as const).map((side) => (
        <Popover key={side} side={side}>
          <Popover.Trigger><Button variant="outline" colorScheme="gray">{side}</Button></Popover.Trigger>
          <Popover.Content withArrow>
            <Text size="sm">Anchored to the {side}.</Text>
          </Popover.Content>
        </Popover>
      ))}
    </HStack>
  ),
};

/** Interactive content with a close action. */
export const WithActions: Story = {
  render: () => (
    <Popover>
      <Popover.Trigger><Button>Invite</Button></Popover.Trigger>
      <Popover.Content>
        <VStack gap="3" alignItems="stretch">
          <Popover.Title>Invite teammate</Popover.Title>
          <Popover.Description>They'll get access to this project.</Popover.Description>
          <HStack gap="2" justifyContent="end">
            <Popover.Close><Button size="sm" variant="text" colorScheme="gray">Cancel</Button></Popover.Close>
            <Popover.Close><Button size="sm">Send</Button></Popover.Close>
          </HStack>
        </VStack>
      </Popover.Content>
    </Popover>
  ),
};
