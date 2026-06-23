import type { Meta, StoryObj } from "@storybook/react-vite";
import { Text } from "../../typography";
import { Box } from "../box";
import { HStack, VStack } from "../stack";
import { Separator } from "./index";

/**
 * Separator draws a thin dividing line between content — horizontal (default) or
 * vertical. `variant` sets the line style; colour comes from the muted stroke token
 * and is overridable via `borderColor`. It renders with `role="separator"`.
 */
const meta: Meta<typeof Separator> = {
  title: "Components/Layout/Separator",
  component: Separator,
  tags: ["autodocs"],
  argTypes: {
    orientation: { control: { type: "select" }, options: ["horizontal", "vertical"] },
    variant: { control: { type: "select" }, options: ["solid", "dashed", "dotted"] },
  },
  parameters: {
    docs: { description: { component: "A horizontal or vertical dividing line." } },
  },
};

export default meta;
type Story = StoryObj<typeof Separator>;

/** A horizontal separator between stacked content. */
export const Usage: Story = {
  render: () => (
    <VStack gap="4" w="full" maxW="sm" alignItems="stretch">
      <Text>Above the line</Text>
      <Separator />
      <Text>Below the line</Text>
    </VStack>
  ),
};

/** Line styles via `variant`. */
export const Variants: Story = {
  render: () => (
    <VStack gap="6" w="full" maxW="sm" alignItems="stretch">
      {(["solid", "dashed", "dotted"] as const).map((v) => (
        <Box key={v}>
          <Text size="sm" color="muted" gutterBottom>variant="{v}"</Text>
          <Separator variant={v} />
        </Box>
      ))}
    </VStack>
  ),
};

/** Vertical separator inside a horizontal row. */
export const Vertical: Story = {
  render: () => (
    <HStack gap="4" h="10">
      <Text>Home</Text>
      <Separator orientation="vertical" />
      <Text>Docs</Text>
      <Separator orientation="vertical" />
      <Text>Blog</Text>
    </HStack>
  ),
};

/** Colour overrides via `borderColor`. */
export const Colored: Story = {
  render: () => (
    <VStack gap="6" w="full" maxW="sm" alignItems="stretch">
      <Separator borderColor="info" />
      <Separator borderColor="success" />
      <Separator borderColor="error" variant="dashed" />
    </VStack>
  ),
};
