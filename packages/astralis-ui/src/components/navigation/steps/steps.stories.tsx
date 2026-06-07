import type { Meta, StoryObj } from "@storybook/react-vite";
import { Steps } from "./index";

const meta: Meta<typeof Steps> = {
  title: "Components/Navigation/Steps",
  component: Steps,
};
export default meta;

type Story = StoryObj<typeof Steps>;

export const Default: Story = {
  args: {
    defaultValue: 0,
  },
  render: (args) => (
    <Steps {...args}>
      <Steps.List>
        <Steps.Item>
          <Steps.Indicator />
          <Steps.Content>
            <Steps.Title>Account</Steps.Title>
            <Steps.Description>Create account</Steps.Description>
          </Steps.Content>
        </Steps.Item>

        <Steps.Item>
          <Steps.Indicator />
          <Steps.Content>
            <Steps.Title>Profile</Steps.Title>
            <Steps.Description>Set up profile</Steps.Description>
          </Steps.Content>
        </Steps.Item>

        <Steps.Item>
          <Steps.Indicator />
          <Steps.Content>
            <Steps.Title>Finish</Steps.Title>
            <Steps.Description>All done</Steps.Description>
          </Steps.Content>
        </Steps.Item>
      </Steps.List>
    </Steps>
  ),
};
