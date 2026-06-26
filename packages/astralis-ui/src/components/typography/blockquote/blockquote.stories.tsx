import type { Meta, StoryObj } from "@storybook/react-vite";
import { Text } from "../text";
import { VStack } from "../../layout/stack";
import { Box } from "../../layout/box";
import { Blockquote } from "./index";

/**
 * Blockquote is a quotation block with a leading accent rule. `variant` toggles a
 * tinted panel, `cite` renders a `<cite>` attribution line, and the accent colour is
 * overridable via `borderColor`. It composes Box for spacing and colour props.
 */
const meta: Meta<typeof Blockquote> = {
  title: "Components/Typography/Blockquote",
  component: Blockquote,
  tags: ["autodocs"],
  argTypes: {
    variant: { control: { type: "select" }, options: ["plain", "subtle"] },
    cite: { control: { type: "text" } },
    children: { control: { type: "text" } },
  },
  parameters: {
    docs: { description: { component: "A quotation block with an accent rule." } },
  },
};

export default meta;
type Story = StoryObj<typeof Blockquote>;

const QUOTE =
  "Design is not just what it looks like and feels like. Design is how it works.";

/** Interactive playground — adjust props in the Controls panel. */
export const Playground: Story = {
  args: { children: QUOTE, cite: "Steve Jobs", variant: "plain" },
  render: (args) => (
    <Box maxW="md">
      <Blockquote {...args} />
    </Box>
  ),
};

/** `variant` toggles between a bare rule and a tinted panel. */
export const Variants: Story = {
  render: () => (
    <VStack gap="6" w="full" maxW="lg" alignItems="stretch">
      {(["plain", "subtle"] as const).map((v) => (
        <Box key={v}>
          <Text size="xs" color="subtle" fontFamily="mono" gutterBottom>variant="{v}"</Text>
          <Blockquote variant={v} cite="Steve Jobs">{QUOTE}</Blockquote>
        </Box>
      ))}
    </VStack>
  ),
};

/** The accent colour is overridable via `borderColor`. */
export const ColoredAccent: Story = {
  render: () => (
    <VStack gap="6" w="full" maxW="lg" alignItems="stretch">
      <Blockquote borderColor="info" cite="Docs">Informational note worth setting apart.</Blockquote>
      <Blockquote borderColor="success" variant="subtle" cite="Changelog">Shipped and verified.</Blockquote>
      <Blockquote borderColor="error">A warning that demands attention.</Blockquote>
    </VStack>
  ),
};

/** Without `cite` — just the quote. */
export const NoAttribution: Story = {
  render: () => (
    <Box maxW="md">
      <Blockquote>{QUOTE}</Blockquote>
    </Box>
  ),
};
