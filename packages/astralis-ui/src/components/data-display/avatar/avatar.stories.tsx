import type { Meta, StoryObj } from "@storybook/react-vite";
import { Avatar } from "./index";
import { HStack } from "../../layout/stack";

/**
 * Avatar shows a user image with graceful fallbacks: initials from `name` (on a
 * deterministic hue), a custom `icon`, or a generic silhouette. `Avatar.Group`
 * overlaps a set with a "+N" overflow chip, and `Avatar.Badge` adds a status dot.
 */
const meta: Meta<typeof Avatar> = {
  title: "Components/Data Display/Avatar",
  component: Avatar,
  tags: ["autodocs"],
  argTypes: {
    size: { control: { type: "select" }, options: ["xs", "sm", "md", "lg", "xl", "2xl"] },
    shape: { control: { type: "select" }, options: ["circle", "rounded", "square"] },
  },
};

export default meta;
type Story = StoryObj<typeof Avatar>;

export const Image: Story = {
  args: { src: "https://i.pravatar.cc/150?img=3", name: "John Doe" },
};

/** Initials fall back to a hue derived from the name. */
export const Initials: Story = {
  render: () => (
    <HStack gap="3">
      {["Jane Smith", "Alex Kim", "Maria Lopez", "Sam Patel"].map((n) => (
        <Avatar key={n} name={n} />
      ))}
    </HStack>
  ),
};

export const Sizes: Story = {
  render: () => (
    <HStack gap="3" alignItems="center">
      {(["xs", "sm", "md", "lg", "xl", "2xl"] as const).map((s) => (
        <Avatar key={s} size={s} name="Jane Smith" />
      ))}
    </HStack>
  ),
};

export const Shapes: Story = {
  render: () => (
    <HStack gap="3">
      {(["circle", "rounded", "square"] as const).map((sh) => (
        <Avatar key={sh} shape={sh} name="Jane Smith" />
      ))}
    </HStack>
  ),
};

/** A status dot via `Avatar.Badge`. */
export const WithStatus: Story = {
  render: () => (
    <HStack gap="3">
      {(["online", "away", "busy", "offline"] as const).map((status) => (
        <Avatar key={status} name="Jane Smith">
          <Avatar.Badge status={status} />
        </Avatar>
      ))}
    </HStack>
  ),
};

/** Overlapping group capped with `max`. */
export const Group: Story = {
  render: () => (
    <Avatar.Group max={4}>
      {["Jane Smith", "Alex Kim", "Maria Lopez", "Sam Patel", "Chris Ray", "Nina Bell"].map((n) => (
        <Avatar key={n} name={n} />
      ))}
    </Avatar.Group>
  ),
};
