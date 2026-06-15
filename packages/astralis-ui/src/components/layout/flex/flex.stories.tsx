import type { Meta, StoryObj } from "@storybook/react-vite";
import { Text } from "../../typography";
import Flex from "./flex";

const meta: Meta<typeof Flex> = {
  title: "Components/Layout/Flex",
  component: Flex,
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
          "Used to manage flex layouts",
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Flex>;

export const Usage: Story = {
  render: () => (
    <Flex
      bg="base"
      display={"block"}
      p={"8"}
      rounded={"xl"}
      border={"normal"}
      borderColor={"base"}
      w={"full"}
      align={"center"}
      justify={"center"}
    >
      <Text>This is a Flex Component</Text>
    </Flex>
  ),
  parameters: {
    docs: {
      description: {
        story: "Basic usage of the Flex Component",
      },
    },
  },
};
