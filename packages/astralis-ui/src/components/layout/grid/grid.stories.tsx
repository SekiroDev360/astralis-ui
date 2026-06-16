import type { Meta, StoryObj } from "@storybook/react-vite";
import Grid from "./grid";
import { Box } from "../box";

const meta: Meta<typeof Grid> = {
  title: "Components/Layout/Grid",
  component: Grid,
  tags: ["autodocs"],
  argTypes: {
    as: {
      control: { type: "text" },
      description: "The HTML element or React component to render the text as.",
      table: {
        defaultValue: { summary: "div" },
      },
    },
    children: {
      control: { type: "text" },
      description: "Text content",
    },
  },
  parameters: {
    docs: {
      description: {
        component:
          "Used to manage grid layouts",
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Grid>;

export const Usage: Story = {
  render: () => (
    <Grid w={'full'} rows={'1'} columns={'2'} gap={'3'}>
      <Box bg={"blue-400"} h={"10"} w={'full'}/>
      <Box bg={"yellow-400"} h={"10"} w={'full'}/>
      <Box bg={"yellow-400"} h={"10"} w={'full'}/>
      <Box bg={"yellow-400"} h={"10"} w={'full'}/>
      <Box bg={"yellow-400"} h={"10"} w={'full'}/>
    </Grid>
  ),
  parameters: {
    docs: {
      description: {
        story: "Basic usage of the Grid Component",
      },
    },
  },
};
