import type { Meta, StoryObj } from "@storybook/react-vite";
import { Avatar } from "./index";

const meta: Meta<typeof Avatar> = {
  title: "Components/Data Display/Avatar",
  component: Avatar,
};
export default meta;

type Story = StoryObj<typeof Avatar>;

export const Image: Story = {
  args: {
    src: "https://i.pravatar.cc/150?img=3",
    name: "John Doe",
  },
};

export const Initials: Story = {
  args: {
    name: "Jane Smith",
  },
};

export const Icon: Story = {
  render: () => (
    <Avatar
      icon={
        <span className="astralis-text-sm astralis-font-bold">
          👤
        </span>
      }
    />
  ),
};

export const Sizes: Story = {
  render: () => (
    <div className="astralis-flex astralis-gap-4">
      <Avatar size="sm" name="Small User" />
      <Avatar size="md" name="Medium User" />
      <Avatar size="lg" name="Large User" />
    </div>
  ),
};
