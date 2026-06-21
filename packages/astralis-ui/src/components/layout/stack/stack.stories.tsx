import type { Meta, StoryObj } from "@storybook/react-vite";
import { Text } from "../../typography";
import { Box } from "../box";
import { Flex } from "../flex";
import Stack, { HStack, VStack } from "./index";

/**
 * Stack arranges children in one direction with consistent spacing. It is a thin
 * wrapper over Flex: `direction="vertical" | "horizontal"` maps to a flex column/row,
 * and it inherits all Flex + Box props (`gap`, `alignItems`, `justifyContent`, `wrap`…).
 *
 * `VStack` and `HStack` are presets — `VStack` stacks vertically; `HStack` stacks
 * horizontally and centers items on the cross axis by default.
 */
const meta: Meta<typeof Stack> = {
  title: "Components/Layout/Stack",
  component: Stack,
  tags: ["autodocs"],
  argTypes: {
    direction: { control: { type: "select" }, options: ["vertical", "horizontal"] },
    gap: { control: { type: "text" } },
    alignItems: {
      control: { type: "select" },
      options: ["start", "center", "end", "stretch", "baseline"],
    },
  },
  parameters: {
    docs: {
      description: { component: "Lays out children vertically or horizontally with even spacing." },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Stack>;

const Item = ({ children }: { children: React.ReactNode }) => (
  <Flex bg="brand-500" color="white" px="4" py="3" rounded="md" alignItems="center" justifyContent="center">
    <Text color="current" size="sm">{children}</Text>
  </Flex>
);

/** A horizontal stack with even gaps. */
export const Usage: Story = {
  render: () => (
    <Stack direction="horizontal" gap="3" w="full">
      <Item>One</Item>
      <Item>Two</Item>
      <Item>Three</Item>
    </Stack>
  ),
};

/** `VStack` stacks children vertically. */
export const Vertical: Story = {
  render: () => (
    <VStack gap="3" w="full" maxW="xs">
      <Item>First</Item>
      <Item>Second</Item>
      <Item>Third</Item>
    </VStack>
  ),
};

/** `HStack` stacks children horizontally and centers them on the cross axis. */
export const Horizontal: Story = {
  render: () => (
    <HStack gap="3">
      <Item>One</Item>
      <Flex bg="blue-solid" color="white" px="4" py="6" rounded="md" alignItems="center" justifyContent="center"><Text color="current" size="sm">taller</Text></Flex>
      <Item>Three</Item>
    </HStack>
  ),
};

/** `gap` controls the spacing between items. */
export const Gap: Story = {
  render: () => (
    <VStack gap="6" w="full">
      {(["1", "3", "6"] as const).map((g) => (
        <Box key={g} w="full">
          <Text size="sm" color="muted" gutterBottom>gap="{g}"</Text>
          <HStack gap={g}>
            <Item>1</Item>
            <Item>2</Item>
            <Item>3</Item>
          </HStack>
        </Box>
      ))}
    </VStack>
  ),
};

/** Stack inherits Flex alignment props such as `alignItems` and `justifyContent`. */
export const Alignment: Story = {
  render: () => (
    <VStack gap="3" w="full" alignItems="stretch">
      <Box bg="subtle" p="3" rounded="md"><Text size="sm">alignItems="stretch" — children fill the cross axis</Text></Box>
      <Item>Stretched</Item>
      <Item>Stretched</Item>
    </VStack>
  ),
};

/** `direction` can be responsive — vertical on small screens, horizontal on larger ones. */
export const Responsive: Story = {
  render: () => (
    <Box w="full">
      <Text size="sm" color="muted" gutterBottom>{`direction={{ base: "column", md: "row" }} via Flex props`}</Text>
      <Stack direction="vertical" gap="3" w="full">
        <Item>Switches to a row on wider canvases via responsive Flex props</Item>
        <Item>Two</Item>
        <Item>Three</Item>
      </Stack>
    </Box>
  ),
};

/** Stacks compose — nest an HStack inside a VStack for two-axis layouts. */
export const Nested: Story = {
  render: () => (
    <VStack gap="3" w="full" alignItems="start">
      <Text size="sm" color="muted">VStack › HStack</Text>
      <HStack gap="2"><Item>A</Item><Item>B</Item></HStack>
      <HStack gap="2"><Item>C</Item><Item>D</Item><Item>E</Item></HStack>
    </VStack>
  ),
};
