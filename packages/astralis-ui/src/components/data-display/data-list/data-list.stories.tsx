import type { Meta, StoryObj } from "@storybook/react-vite";
import { DataList } from "./index";
import { Badge } from "../badge";
import { Box } from "../../layout/box";

/**
 * DataList presents key/value pairs in a `<dl>`. `orientation` lays label and
 * value side by side (`horizontal`) or stacked (`vertical`); `size` scales text.
 */
const meta: Meta<typeof DataList> = {
  title: "Components/Data Display/DataList",
  component: DataList,
  tags: ["autodocs"],
  argTypes: {
    orientation: { control: { type: "inline-radio" }, options: ["horizontal", "vertical"] },
    size: { control: { type: "select" }, options: ["sm", "md", "lg"] },
  },
  decorators: [(Story) => <Box style={{ maxWidth: 420 }}><Story /></Box>],
};

export default meta;
type Story = StoryObj<typeof DataList>;

const Rows = () => (
  <>
    <DataList.Item>
      <DataList.Label>Name</DataList.Label>
      <DataList.Value>Sophie Durand</DataList.Value>
    </DataList.Item>
    <DataList.Item>
      <DataList.Label>Email</DataList.Label>
      <DataList.Value>sophie@astralis.dev</DataList.Value>
    </DataList.Item>
    <DataList.Item>
      <DataList.Label>Role</DataList.Label>
      <DataList.Value>Design Lead</DataList.Value>
    </DataList.Item>
    <DataList.Item>
      <DataList.Label>Status</DataList.Label>
      <DataList.Value><Badge colorScheme="green">Active</Badge></DataList.Value>
    </DataList.Item>
  </>
);

export const Horizontal: Story = {
  render: (args) => <DataList {...args}><Rows /></DataList>,
  args: { orientation: "horizontal", size: "md" },
};

export const Vertical: Story = {
  render: () => <DataList orientation="vertical"><Rows /></DataList>,
};
