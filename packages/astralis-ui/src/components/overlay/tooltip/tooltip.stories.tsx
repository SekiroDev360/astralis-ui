import type { Meta, StoryObj } from "@storybook/react-vite";
import { Tooltip } from "./index";

const meta: Meta<typeof Tooltip> = {
  title: "Components/Overlay/Tooltip",
  component: Tooltip,
  parameters: {
    layout: "centered",
  },
  argTypes: {
    label: {
      control: "text",
      description: "Tooltip text content",
    },
    side: {
      control: "select",
      options: ["top", "right", "bottom", "left"],
      description: "Position of the tooltip relative to the trigger",
    },
    delay: {
      control: "number",
      description: "Delay before showing the tooltip (ms)",
    },
  },
};

export default meta;
type Story = StoryObj<typeof Tooltip>;

export const Default: Story = {
  args: {
    label: "This is a tooltip",
  },
  render: (args) => (
    <Tooltip {...args}>
      <button className="astralis-btn">Hover me</button>
    </Tooltip>
  ),
};

export const Bottom: Story = {
  args: {
    label: "Appears below",
    side: "bottom",
  },
  render: (args) => (
    <Tooltip {...args}>
      <button className="astralis-btn">Bottom tooltip</button>
    </Tooltip>
  ),
};

export const Left: Story = {
  args: {
    label: "Appears on the left",
    side: "left",
  },
  render: (args) => (
    <Tooltip {...args}>
      <button className="astralis-btn">Left tooltip</button>
    </Tooltip>
  ),
};

export const Right: Story = {
  args: {
    label: "Appears on the right",
    side: "right",
  },
  render: (args) => (
    <Tooltip {...args}>
      <button className="astralis-btn">Right tooltip</button>
    </Tooltip>
  ),
};

export const WithDelay: Story = {
  args: {
    label: "Shows after 1 second",
    delay: 1000,
  },
  render: (args) => (
    <Tooltip {...args}>
      <button className="astralis-btn">Delayed tooltip</button>
    </Tooltip>
  ),
};

export const Icon: Story = {
  args: {
    label: "Settings",
  },
  render: (args) => (
    <Tooltip {...args}>
      <button className="astralis-rounded-full astralis-p-2 astralis-bg-gray-200">
        ⚙️
      </button>
    </Tooltip>
  ),
};

export const LongText: Story = {
  args: {
    label:
      "This is a longer tooltip message that explains something in more detail.",
  },
  render: (args) => (
    <Tooltip {...args}>
      <span className="astralis-underline astralis-cursor-help">
        Hover for info
      </span>
    </Tooltip>
  ),
};

