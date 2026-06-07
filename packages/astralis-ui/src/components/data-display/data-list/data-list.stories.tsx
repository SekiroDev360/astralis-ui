import type { Meta, StoryObj } from "@storybook/react-vite";
import { DataList } from "./index";

const meta: Meta<typeof DataList> = {
  title: "Components/Data Display/DataList",
  component: DataList,
};
export default meta;

type Story = StoryObj<typeof DataList>;

export const Default: Story = {
  render: () => (
    <DataList>
      <DataList.Item>
        <DataList.Label>Name</DataList.Label>
        <DataList.Value>John Doe</DataList.Value>
      </DataList.Item>

      <DataList.Item>
        <DataList.Label>Email</DataList.Label>
        <DataList.Value>john@example.com</DataList.Value>
      </DataList.Item>

      <DataList.Item>
        <DataList.Label>Role</DataList.Label>
        <DataList.Value>Administrator</DataList.Value>
      </DataList.Item>
    </DataList>
  ),
};
