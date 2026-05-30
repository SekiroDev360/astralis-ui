import type { Meta, StoryObj } from "@storybook/react-vite";
import { Tabs } from "./index";
import Icon from "../../icon/icon";

const meta: Meta<typeof Tabs> = {
  title: "Components/Navigation/Tabs",
  component: Tabs,
  tags: ["autodocs"],
  argTypes: {
    orientation: {
      control: "radio",
      options: ["horizontal", "vertical"],
    },
    defaultValue: {
      control: "text",
    },
  },
};
export default meta;

type Story = StoryObj<typeof Tabs>;

export const Default: Story = {
  args: {
    defaultValue: "account",
  },
  render: (args) => (
    <div className="-astralis-mt-5">
      <Tabs {...args}>
        <Tabs.List>
          <Tabs.Trigger value="account">Account</Tabs.Trigger>
          <Tabs.Trigger value="password">Password</Tabs.Trigger>
          <Tabs.Trigger value="preferences">Preferences</Tabs.Trigger>
        </Tabs.List>

        <Tabs.Content value="account">
          <div className="astralis-p-4 astralis-bg-surface-raised astralis-rounded-md">
            <h3 className="astralis-font-medium astralis-mb-2 astralis-text-content-primary">
              Account
            </h3>
            <p className="astralis-text-content-secondary astralis-text-sm">
              Make changes to your account here. Click save when you're done.
            </p>
          </div>
        </Tabs.Content>

        <Tabs.Content value="password">
          <div className="astralis-p-4 astralis-bg-surface-raised astralis-rounded-md">
            <h3 className="astralis-font-medium astralis-mb-2 astralis-text-content-primary">
              Password
            </h3>
            <p className="astralis-text-content-secondary astralis-text-sm">
              Change your password here. After saving, you'll be logged out.
            </p>
          </div>
        </Tabs.Content>

        <Tabs.Content value="preferences">
          <div className="astralis-p-4 astralis-bg-surface-raised astralis-rounded-md">
            <h3 className="astralis-font-medium astralis-mb-2 astralis-text-content-primary">
              Preferences
            </h3>
            <p className="astralis-text-content-secondary astralis-text-sm">
              Manage your preferences here.
            </p>
          </div>
        </Tabs.Content>
      </Tabs>
    </div>
  ),
};

export const Disabled: Story = {
  args: {
    defaultValue: "account",
  },
  render: (args) => (
    <div className="-astralis-mt-5">
      <Tabs {...args}>
        <Tabs.List>
          <Tabs.Trigger value="account">Account</Tabs.Trigger>
          <Tabs.Trigger value="password" disabled>
            Password (Disabled)
          </Tabs.Trigger>
          <Tabs.Trigger value="preferences">Preferences</Tabs.Trigger>
        </Tabs.List>

        <Tabs.Content value="account">
          <div className="astralis-p-4 astralis-bg-surface-raised astralis-rounded-md">
            <h3 className="astralis-font-medium astralis-mb-2 astralis-text-content-primary">
              Account
            </h3>
            <p className="astralis-text-content-secondary astralis-text-sm">
              Make changes to your account here. Click save when you're done.
            </p>
          </div>
        </Tabs.Content>

        <Tabs.Content value="password">
          <div className="astralis-p-4 astralis-bg-surface-raised astralis-rounded-md">
            <h3 className="astralis-font-medium astralis-mb-2 astralis-text-content-primary">
              Password
            </h3>
            <p className="astralis-text-content-secondary astralis-text-sm">
              Change your password here. After saving, you'll be logged out.
            </p>
          </div>
        </Tabs.Content>

        <Tabs.Content value="preferences">
          <div className="astralis-p-4 astralis-bg-surface-raised astralis-rounded-md">
            <h3 className="astralis-font-medium astralis-mb-2 astralis-text-content-primary">
              Preferences
            </h3>
            <p className="astralis-text-content-secondary astralis-text-sm">
              Manage your preferences here.
            </p>
          </div>
        </Tabs.Content>
      </Tabs>
    </div>
  ),
};

export const Centered: Story = {
  args: {
    defaultValue: "music",
  },
  render: (args) => (
    <div className="-astralis-mt-5">
      <Tabs {...args}>
        <Tabs.List centered>
          <Tabs.Trigger value="music">Music</Tabs.Trigger>
          <Tabs.Trigger value="podcasts">Podcasts</Tabs.Trigger>
          <Tabs.Trigger value="live">Live</Tabs.Trigger>
        </Tabs.List>

        <Tabs.Content value="music">
          <div className="astralis-p-4 astralis-bg-surface-raised astralis-rounded-md">
            <h3 className="astralis-font-medium astralis-mb-2 astralis-text-content-primary">
              Music
            </h3>
            <p className="astralis-text-content-secondary astralis-text-sm">
              Music Content
            </p>
          </div>
        </Tabs.Content>

        <Tabs.Content value="podcasts">
          <div className="astralis-p-4 astralis-bg-surface-raised astralis-rounded-md">
            <h3 className="astralis-font-medium astralis-mb-2 astralis-text-content-primary">
              Podcasts
            </h3>
            <p className="astralis-text-content-secondary astralis-text-sm">
              Podcasts Content
            </p>
          </div>
        </Tabs.Content>

        <Tabs.Content value="live">
          <div className="astralis-p-4 astralis-bg-surface-raised astralis-rounded-md">
            <h3 className="astralis-font-medium astralis-mb-2 astralis-text-content-primary">
              Live
            </h3>
            <p className="astralis-text-content-secondary astralis-text-sm">
              Live Content
            </p>
          </div>
        </Tabs.Content>
      </Tabs>
    </div>
  ),
};

export const IconTabs: Story = {
  args: {
    defaultValue: "phone",
  },
  render: (args) => (
    <div className="-astralis-mt-5">
      <Tabs {...args}>
        <Tabs.List>
          <Tabs.Trigger value="phone">
            <Icon name="Phone" size="sm" />
            <span className="astralis-ml-2">Phone</span>
          </Tabs.Trigger>
          <Tabs.Trigger value="tablet">
            <Icon name="Tablet" size="sm" />
            <span className="astralis-ml-2">Tablet</span>
          </Tabs.Trigger>
          <Tabs.Trigger value="laptop">
            <Icon name="Laptop" size="sm" />
            <span className="astralis-ml-2">Laptop</span>
          </Tabs.Trigger>
        </Tabs.List>

        <Tabs.Content value="phone">
          <div className="astralis-p-4 astralis-bg-surface-raised astralis-rounded-md">
            <h3 className="astralis-font-medium astralis-mb-2 astralis-text-content-primary">
              Phone
            </h3>
            <p className="astralis-text-content-secondary astralis-text-sm">
              Phone Content
            </p>
          </div>
        </Tabs.Content>
        <Tabs.Content value="tablet">
          <div className="astralis-p-4 astralis-bg-surface-raised astralis-rounded-md">
            <h3 className="astralis-font-medium astralis-mb-2 astralis-text-content-primary">
              Tablet
            </h3>
            <p className="astralis-text-content-secondary astralis-text-sm">
              Tablet Content
            </p>
          </div>
        </Tabs.Content>
        <Tabs.Content value="laptop">
          <div className="astralis-p-4 astralis-bg-surface-raised astralis-rounded-md">
            <h3 className="astralis-font-medium astralis-mb-2 astralis-text-content-primary">
              Laptop
            </h3>
            <p className="astralis-text-content-secondary astralis-text-sm">
              Laptop Content
            </p>
          </div>
        </Tabs.Content>
      </Tabs>
    </div>
  ),
};

export const Slide: Story = {
  args: {
    defaultValue: "tab1",
    loop: false,
  },
  render: (args) => (
    <div className="-astralis-mt-3 astralis-border astralis-border-border-subtle astralis-p-4 astralis-rounded-lg">
      <Tabs {...args}>
        <Tabs.List>
          {Array.from({ length: 15 }).map((_, i) => (
            <Tabs.Trigger key={i} value={`tab${i + 1}`}>
              Tab {i + 1}
            </Tabs.Trigger>
          ))}
        </Tabs.List>
        {Array.from({ length: 15 }).map((_, i) => (
          <Tabs.Content key={i} value={`tab${i + 1}`}>
            <div className="astralis-p-4 astralis-bg-surface-raised astralis-rounded-md">
              <h3 className="astralis-font-medium astralis-mb-2 astralis-text-content-primary">
                Tab {i + 1}
              </h3>
              <p className="astralis-text-content-secondary astralis-text-sm">
                Content of Tab {i + 1}
              </p>
            </div>
          </Tabs.Content>
        ))}
      </Tabs>
    </div>
  ),
};

export const Vertical: Story = {
  args: {
    defaultValue: "profile",
    orientation: "vertical",
  },
  render: (args) => (
    <div className="-astralis-mt-3 astralis-flex astralis-border astralis-border-border-subtle astralis-rounded-lg astralis-h-[300px]">
      <Tabs {...args} className="astralis-w-full">
        <Tabs.List>
          <Tabs.Trigger value="profile">Profile</Tabs.Trigger>
          <Tabs.Trigger value="dashboard">Dashboard</Tabs.Trigger>
          <Tabs.Trigger value="settings">Settings</Tabs.Trigger>
          <Tabs.Trigger value="messages">Messages</Tabs.Trigger>
        </Tabs.List>

        <div className="astralis-flex-1 astralis-p-10">
          <Tabs.Content value="profile">
            <div className="astralis-p-4 astralis-bg-surface-raised astralis-rounded-md">
              <h3 className="astralis-font-medium astralis-mb-2 astralis-text-content-primary">
                Profile
              </h3>
              <p className="astralis-text-content-secondary astralis-text-sm">
                Profile info...
              </p>
            </div>
          </Tabs.Content>

          <Tabs.Content value="dashboard">
            <div className="astralis-p-4 astralis-bg-surface-raised astralis-rounded-md">
              <h3 className="astralis-font-medium astralis-mb-2 astralis-text-content-primary">
                Dashboard
              </h3>
              <p className="astralis-text-content-secondary astralis-text-sm">
                Dashboard metrics...
              </p>
            </div>
          </Tabs.Content>

          <Tabs.Content value="settings">
            <div className="astralis-p-4 astralis-bg-surface-raised astralis-rounded-md">
              <h3 className="astralis-font-medium astralis-mb-2 astralis-text-content-primary">
                Settings
              </h3>
              <p className="astralis-text-content-secondary astralis-text-sm">
                App settings...
              </p>
            </div>
          </Tabs.Content>

          <Tabs.Content value="messages">
            <div className="astralis-p-4 astralis-bg-surface-raised astralis-rounded-md">
              <h3 className="astralis-font-medium astralis-mb-2 astralis-text-content-primary">
                Messages
              </h3>
              <p className="astralis-text-content-secondary astralis-text-sm">
                Inbox...
              </p>
            </div>
          </Tabs.Content>
        </div>
      </Tabs>
    </div>
  ),
};
