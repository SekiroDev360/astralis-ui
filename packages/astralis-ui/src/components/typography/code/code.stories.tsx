import type { Meta, StoryObj } from "@storybook/react-vite";
import { Text } from "../text";
import { VStack } from "../../layout/stack";
import { Box } from "../../layout/box";
import { Code } from "./index";

/**
 * Code is an inline, monospace `<code>` chip for snippets inside prose. `variant`
 * sets the surface (subtle / solid / outline) and `size` the font size. It composes
 * Box, so spacing and colour props are available as an escape hatch.
 */
const meta: Meta<typeof Code> = {
  title: "Components/Typography/Code",
  component: Code,
  tags: ["autodocs"],
  argTypes: {
    variant: { control: { type: "select" }, options: ["subtle", "solid", "outline"] },
    size: { control: { type: "select" }, options: ["sm", "md", "lg"] },
    children: { control: { type: "text" } },
  },
  parameters: {
    docs: { description: { component: "Inline monospace code." } },
  },
};

export default meta;
type Story = StoryObj<typeof Code>;

/** Interactive playground — adjust props in the Controls panel. */
export const Playground: Story = {
  args: { children: "npm install astralis-ui", variant: "subtle", size: "sm" },
};

/** Inline within a sentence — `size="sm"` keeps it proportional to body text. */
export const Inline: Story = {
  render: () => (
    <Box maxW="md">
      <Text size="md">
        Run <Code>pnpm install</Code> first, then import <Code>{`{ Button }`}</Code> from the
        package root. The default export is <Code>undefined</Code>.
      </Text>
    </Box>
  ),
};

/** `variant` switches the surface treatment. */
export const Variants: Story = {
  render: () => (
    <VStack gap="3" alignItems="start">
      {(["subtle", "solid", "outline"] as const).map((v) => (
        <Box key={v}>
          <Text size="xs" color="subtle" fontFamily="mono" gutterBottom>variant="{v}"</Text>
          <Code variant={v}>const x = 42</Code>
        </Box>
      ))}
    </VStack>
  ),
};

/** `size` scales the font from sm to lg. */
export const Sizes: Story = {
  render: () => (
    <VStack gap="3" alignItems="start">
      {(["sm", "md", "lg"] as const).map((s) => (
        <Code key={s} size={s}>{`size="${s}"`}</Code>
      ))}
    </VStack>
  ),
};
