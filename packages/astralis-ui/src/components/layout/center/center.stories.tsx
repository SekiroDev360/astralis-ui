import type { Meta, StoryObj } from "@storybook/react-vite";
import { Text } from "../../typography";
import { Center } from "./index";

/**
 * Center places its children in the exact middle, both horizontally and vertically.
 * It's a Box, so it accepts every style prop (`w`, `h`, `bg`, `rounded`, …) — handy
 * for icon buttons, empty states, avatars, and media placeholders.
 */
const meta: Meta<typeof Center> = {
  title: "Components/Layout/Center",
  component: Center,
  tags: ["autodocs"],
  parameters: {
    docs: { description: { component: "Centers content on both axes." } },
  },
};

export default meta;
type Story = StoryObj<typeof Center>;

/** A fixed box with perfectly centered content. */
export const Usage: Story = {
  render: () => (
    <Center bg="subtle" border="normal" borderColor="muted" rounded="lg" w="64" h="40">
      <Text>Centered</Text>
    </Center>
  ),
};

/** Centering works at any size — here a square "icon button". */
export const Square: Story = {
  render: () => (
    <Center bg="brand-500" color="white" rounded="lg" size="14">
      <Text color="current" size="xl" weight="bold">A</Text>
    </Center>
  ),
};

/** Combined with `rounded="full"` for a circular avatar/badge. */
export const Circle: Story = {
  render: () => (
    <Center bg="brand-500" color="white" rounded="full" size="16">
      <Text color="current" size="lg" weight="bold">AB</Text>
    </Center>
  ),
};
