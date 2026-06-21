import type { Meta, StoryObj } from "@storybook/react-vite";
import { Text } from "../../typography";
import { Box } from "../box";
import { Flex } from "./index";

/**
 * Flex is a Box that lays its children out with flexbox. It exposes the flex
 * container props (`direction`, `justifyContent`, `alignItems`, `alignContent`,
 * `placeContent`, `wrap`, `gap`) plus every Box style prop. Per-child control
 * lives on `Flex.Item` (`basis`, `grow`, `shrink`, `order`, `alignSelf`).
 *
 * Only flex-valid alignment props are exposed — `justifyItems`/`placeItems`
 * (container) and `justifySelf`/`placeSelf` (item) are omitted because they
 * have no effect in flexbox.
 */
const meta: Meta<typeof Flex> = {
  title: "Components/Layout/Flex",
  component: Flex,
  tags: ["autodocs"],
  argTypes: {
    direction: {
      control: { type: "select" },
      options: ["row", "column", "row-reverse", "column-reverse"],
    },
    justifyContent: {
      control: { type: "select" },
      options: ["start", "center", "end", "between", "around", "evenly"],
    },
    alignItems: {
      control: { type: "select" },
      options: ["start", "center", "end", "baseline", "stretch"],
    },
    wrap: { control: { type: "select" }, options: ["wrap", "nowrap", "wrap-reverse"] },
    gap: { control: { type: "text" } },
  },
  parameters: {
    docs: {
      description: { component: "A flexbox container with first-class alignment and gap props." },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Flex>;

const Item = ({ children }: { children: React.ReactNode }) => (
  <Flex bg="brand-500" color="white" px="4" py="3" rounded="md" alignItems="center" justifyContent="center">
    <Text color="current" size="sm">{children}</Text>
  </Flex>
);

const Frame = ({ children }: { children: React.ReactNode }) => (
  <Box bg="subtle" border="normal" borderColor="muted" rounded="lg" p="3" w="full">
    {children}
  </Box>
);

/** A basic horizontal flex row. */
export const Usage: Story = {
  render: () => (
    <Flex gap="3" w="full">
      <Item>One</Item>
      <Item>Two</Item>
      <Item>Three</Item>
    </Flex>
  ),
};

/** `direction` sets the main axis. */
export const Direction: Story = {
  render: () => (
    <Flex gap="6" wrap="wrap" w="full">
      {(["row", "column", "row-reverse", "column-reverse"] as const).map((d) => (
        <Box key={d}>
          <Text size="sm" color="muted" gutterBottom>direction="{d}"</Text>
          <Frame>
            <Flex direction={d} gap="2">
              <Item>1</Item>
              <Item>2</Item>
              <Item>3</Item>
            </Flex>
          </Frame>
        </Box>
      ))}
    </Flex>
  ),
};

/** `justifyContent` distributes items along the main axis. */
export const JustifyContent: Story = {
  render: () => (
    <Flex direction="column" gap="4" w="full">
      {(["start", "center", "end", "between", "around", "evenly"] as const).map((j) => (
        <Box key={j}>
          <Text size="sm" color="muted" gutterBottom>justifyContent="{j}"</Text>
          <Frame>
            <Flex justifyContent={j} gap="2">
              <Item>1</Item>
              <Item>2</Item>
              <Item>3</Item>
            </Flex>
          </Frame>
        </Box>
      ))}
    </Flex>
  ),
};

/** `alignItems` aligns items on the cross axis. */
export const AlignItems: Story = {
  render: () => (
    <Flex direction="column" gap="4" w="full">
      {(["start", "center", "end", "stretch", "baseline"] as const).map((a) => (
        <Box key={a}>
          <Text size="sm" color="muted" gutterBottom>alignItems="{a}"</Text>
          <Frame>
            <Flex alignItems={a} gap="2" h="24">
              <Item>tall</Item>
              <Box bg="blue-solid" color="white" px="4" py="6" rounded="md"><Text color="current" size="sm">taller</Text></Box>
              <Item>tall</Item>
            </Flex>
          </Frame>
        </Box>
      ))}
    </Flex>
  ),
};

/** `wrap` lets items flow onto multiple lines in a constrained container. */
export const Wrapping: Story = {
  render: () => (
    <Box>
      <Text size="sm" color="muted" gutterBottom>wrap="wrap" with a narrow container</Text>
      <Box w="full" maxW="sm">
        <Frame>
          <Flex wrap="wrap" gap="2">
            {Array.from({ length: 8 }).map((_, i) => (
              <Item key={i}>{i + 1}</Item>
            ))}
          </Flex>
        </Frame>
      </Box>
    </Box>
  ),
};

/** `gap` sets spacing between items (also `rowGap` / `columnGap`). */
export const Gap: Story = {
  render: () => (
    <Flex direction="column" gap="4" w="full">
      {(["1", "3", "6"] as const).map((g) => (
        <Box key={g}>
          <Text size="sm" color="muted" gutterBottom>gap="{g}"</Text>
          <Frame>
            <Flex gap={g}>
              <Item>1</Item>
              <Item>2</Item>
              <Item>3</Item>
            </Flex>
          </Frame>
        </Box>
      ))}
    </Flex>
  ),
};

/** `Flex.Item` controls a single child: `grow`/`flex`, `order`, `alignSelf`, `basis`. */
export const FlexItem: Story = {
  render: () => (
    <Flex direction="column" gap="6" w="full">
      <Box>
        <Text size="sm" color="muted" gutterBottom>flex="1" — the middle item fills remaining space</Text>
        <Frame>
          <Flex gap="2">
            <Item>fixed</Item>
            <Flex.Item flex="1" bg="green-solid" color="white" px="4" py="3" rounded="md">
              <Text color="current" size="sm" align="center">Flex.Item flex="1"</Text>
            </Flex.Item>
            <Item>fixed</Item>
          </Flex>
        </Frame>
      </Box>
      <Box>
        <Text size="sm" color="muted" gutterBottom>order — reorder without touching markup</Text>
        <Frame>
          <Flex gap="2">
            <Flex.Item order="3"><Item>A (order 3)</Item></Flex.Item>
            <Flex.Item order="2"><Item>B (order 2)</Item></Flex.Item>
            <Flex.Item order="1"><Item>C (order 1)</Item></Flex.Item>
          </Flex>
        </Frame>
      </Box>
      <Box>
        <Text size="sm" color="muted" gutterBottom>alignSelf — opt one item out of the row's alignment</Text>
        <Frame>
          <Flex alignItems="start" gap="2" h="24">
            <Item>start</Item>
            <Flex.Item alignSelf="center"><Item>center</Item></Flex.Item>
            <Flex.Item alignSelf="end"><Item>end</Item></Flex.Item>
          </Flex>
        </Frame>
      </Box>
    </Flex>
  ),
};

/** Any prop can be responsive — column on small screens, row on large. */
export const Responsive: Story = {
  render: () => (
    <Box w="full">
      <Text size="sm" color="muted" gutterBottom>{`direction={{ base: "column", md: "row" }}`}</Text>
      <Frame>
        <Flex direction={{ base: "column", md: "row" }} gap="2">
          <Item>1</Item>
          <Item>2</Item>
          <Item>3</Item>
        </Flex>
      </Frame>
    </Box>
  ),
};
