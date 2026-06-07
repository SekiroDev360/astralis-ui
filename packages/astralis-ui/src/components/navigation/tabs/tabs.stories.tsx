import type { Meta, StoryObj } from "@storybook/react-vite";
import { Tabs } from "./index";

const meta: Meta<typeof Tabs> = {
  title: "Components/Navigation/Tabs",
  component: Tabs,
};
export default meta;

type Story = StoryObj<typeof Tabs>;

export const Default: Story = {
  args: {
    defaultValue: "account",
  },
  render: (args) => (
    <Tabs {...args}>
      <Tabs.List>
        <Tabs.Trigger value="account">Account</Tabs.Trigger>
        <Tabs.Trigger value="profile">Profile</Tabs.Trigger>
      </Tabs.List>

      <Tabs.Content value="account">
        Account settings
      </Tabs.Content>

      <Tabs.Content value="profile">
        Profile settings
      </Tabs.Content>
    </Tabs>
  ),
};
