import type { Meta, StoryObj } from "@storybook/react-vite";
import { InfoList } from "./index";

const meta: Meta<typeof InfoList> = {
  title: "Components/Data Display/InfoList",
  component: InfoList,
};
export default meta;

type Story = StoryObj<typeof InfoList>;

export const Default: Story = {
  render: () => (
    <InfoList>
      <InfoList.Item>
        <InfoList.Label>Name</InfoList.Label>
        <InfoList.Value>John Doe</InfoList.Value>
      </InfoList.Item>

      <InfoList.Item>
        <InfoList.Label>Email</InfoList.Label>
        <InfoList.Value>john@example.com</InfoList.Value>
      </InfoList.Item>

      <InfoList.Item>
        <InfoList.Label>Role</InfoList.Label>
        <InfoList.Value>Administrator</InfoList.Value>
      </InfoList.Item>
    </InfoList>
  ),
};
