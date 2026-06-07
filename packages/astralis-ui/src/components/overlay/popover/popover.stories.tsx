import type { Meta, StoryObj } from "@storybook/react-vite";
import { Popover } from "./index";

const meta: Meta<typeof Popover> = {
  title: "Components/Overlay/Popover",
  component: Popover,
  parameters: {
    layout: "centered",
  },
  argTypes: {
    open: {
      control: "boolean",
      description: "Controlled open state",
    },
    defaultOpen: {
      control: "boolean",
      description: "Initial open state (uncontrolled)",
    },
    onOpenChange: {
      action: "openChange",
    },
  },
};

export default meta;
type Story = StoryObj<typeof Popover>;

export const Default: Story = {
  args: {
    defaultOpen: false,
  },
  render: (args) => (
    <Popover {...args}>
      <Popover.Trigger>
        <button className="astralis-btn">Open Popover</button>
      </Popover.Trigger>

      <Popover.Content>
        <div className="astralis-w-[200px]">
          <p className="astralis-text-sm astralis-text-gray-600">
            This popover manages its own open state.
          </p>
        </div>
      </Popover.Content>
    </Popover>
  ),
};


export const Controlled: Story = {
  args: {
    open: true,
  },
  render: (args) => (
    <Popover {...args}>
      <Popover.Trigger>
        <button className="astralis-btn">Trigger</button>
      </Popover.Trigger>

      <Popover.Content>
        <div className="astralis-w-[200px]">
          <p className="astralis-text-sm astralis-text-gray-600">
            This popover is fully controlled.
          </p>
        </div>
      </Popover.Content>
    </Popover>
  ),
};

export const Top: Story = {
  render: () => (
    <Popover defaultOpen>
      <Popover.Trigger>
        <button className="astralis-btn">Top</button>
      </Popover.Trigger>

      <Popover.Content side="top">
        <div className="astralis-w-[180px] astralis-text-sm">
          Appears above the trigger.
        </div>
      </Popover.Content>
    </Popover>
  ),
};


export const Right: Story = {
  render: () => (
    <Popover defaultOpen>
      <Popover.Trigger>
        <button className="astralis-btn">Right</button>
      </Popover.Trigger>

      <Popover.Content side="right">
        <div className="astralis-w-[180px] astralis-text-sm">
          Appears to the right.
        </div>
      </Popover.Content>
    </Popover>
  ),
};


export const Bottom: Story = {
  render: () => (
    <Popover defaultOpen>
      <Popover.Trigger>
        <button className="astralis-btn">Bottom</button>
      </Popover.Trigger>

      <Popover.Content>
        <div className="astralis-w-[180px] astralis-text-sm">
          Appears below the trigger.
        </div>
      </Popover.Content>
    </Popover>
  ),
};

export const WithOffset: Story = {
  render: () => (
    <Popover defaultOpen>
      <Popover.Trigger>
        <button className="astralis-btn">Offset</button>
      </Popover.Trigger>

      <Popover.Content offset={16}>
        <div className="astralis-w-[200px] astralis-text-sm">
          Custom offset from trigger.
        </div>
      </Popover.Content>
    </Popover>
  ),
};

export const MenuLike: Story = {
  render: () => (
    <Popover>
      <Popover.Trigger>
        <button className="astralis-btn">Open Menu</button>
      </Popover.Trigger>

      <Popover.Content>
        <div className="astralis-flex astralis-flex-col astralis-gap-2">
          <button className="astralis-text-left astralis-text-sm">
            Profile
          </button>
          <button className="astralis-text-left astralis-text-sm">
            Settings
          </button>
          <button className="astralis-text-left astralis-text-sm astralis-text-red-600">
            Logout
          </button>
        </div>
      </Popover.Content>
    </Popover>
  ),
};

