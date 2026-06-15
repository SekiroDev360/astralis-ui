import type { Meta, StoryObj } from "@storybook/react-vite";
import Stack from "./stack";
import { Box } from "../box";

const meta: Meta<typeof Stack> = {
  title: "Components/Layout/Stack",
  component: Stack,
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
          "Used to layout its children in a vertical or horizontal stack.",
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Stack>;

export const Usage: Story = {
  render: () => (
    <Stack w={'full'} gap={'2'} direction="horizontal">
      <Box bg={"blue-400"} h={"10"} w={'full'}/>
      <Box bg={"yellow-400"} h={"10"} w={'full'}/>
      <Box bg={"yellow-400"} h={"10"} w={'full'}/>
    </Stack>
  ),
  parameters: {
    docs: {
      description: {
        story: "Basic usage of the Stack Component",
      },
    },
  },
};
