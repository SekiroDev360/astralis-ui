import type { Meta, StoryObj } from "@storybook/react-vite";
import { Badge } from "./index";
import { Box } from "../../layout/box";
import { HStack, VStack } from "../../layout/stack";
import { Text } from "../../typography/text";

/**
 * Badge is a small label chip for statuses, counts, and categories. `variant`
 * sets the fill treatment and `colorScheme` the hue (via the accent channel).
 */
const meta: Meta<typeof Badge> = {
  title: "Components/Data Display/Badge",
  component: Badge,
  tags: ["autodocs"],
  argTypes: {
    variant: { control: { type: "select" }, options: ["solid", "subtle", "surface", "outline"] },
    size: { control: { type: "select" }, options: ["xs", "sm", "md", "lg"] },
    colorScheme: {
      control: { type: "select" },
      options: ["gray", "brand", "red", "orange", "yellow", "green", "teal", "blue", "cyan", "purple", "pink"],
    },
  },
};

export default meta;
type Story = StoryObj<typeof Badge>;

export const Playground: Story = {
  args: { children: "Badge", variant: "subtle", colorScheme: "gray", size: "sm" },
};

const VARIANTS = ["solid", "subtle", "surface", "outline"] as const;

/** Four fill treatments. */
export const Variants: Story = {
  render: () => (
    <HStack gap="3">
      {VARIANTS.map((v) => (
        <Badge key={v} variant={v} colorScheme="brand">{v}</Badge>
      ))}
    </HStack>
  ),
};

/** `colorScheme` × variant. */
export const ColorSchemes: Story = {
  render: () => (
    <VStack gap="3" alignItems="start">
      {VARIANTS.map((v) => (
        <HStack key={v} gap="2" alignItems="center">
          <Box style={{ width: 64 }}><Text size="sm" fontFamily="mono" color="muted">{v}</Text></Box>
          {(["gray", "red", "green", "blue", "yellow", "purple"] as const).map((c) => (
            <Badge key={c} variant={v} colorScheme={c}>{c}</Badge>
          ))}
        </HStack>
      ))}
    </VStack>
  ),
};

/** Sizes. */
export const Sizes: Story = {
  render: () => (
    <HStack gap="3" alignItems="center">
      {(["xs", "sm", "md", "lg"] as const).map((s) => (
        <Badge key={s} size={s} colorScheme="green">{s}</Badge>
      ))}
    </HStack>
  ),
};

/** Common semantic uses. */
export const SemanticStatuses: Story = {
  render: () => (
    <HStack gap="3">
      <Badge colorScheme="green" variant="subtle">Active</Badge>
      <Badge colorScheme="yellow" variant="subtle">Pending</Badge>
      <Badge colorScheme="red" variant="subtle">Failed</Badge>
      <Badge colorScheme="gray" variant="subtle">Archived</Badge>
    </HStack>
  ),
};
