import type { Meta, StoryObj } from "@storybook/react-vite";
import { Pagination } from "./index";

const meta: Meta<typeof Pagination> = {
  title: "Components/Disclosure/Pagination",
  component: Pagination,
};
export default meta;

type Story = StoryObj<typeof Pagination>;

export const Default: Story = {
  args: {
    totalPages: 10,
    defaultPage: 1,
  },
  render: (args) => (
    <Pagination {...args}>
      <Pagination.List>
        <Pagination.Prev />
        <Pagination.Item page={1}>1</Pagination.Item>
        <Pagination.Item page={2}>2</Pagination.Item>
        <Pagination.Item page={3}>3</Pagination.Item>
        <Pagination.Ellipsis />
        <Pagination.Item page={10}>10</Pagination.Item>
        <Pagination.Next />
      </Pagination.List>
    </Pagination>
  ),
};
