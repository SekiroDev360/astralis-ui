import type { Meta, StoryObj } from "@storybook/react-vite";
import { Text } from "../text";
import { VStack } from "../../layout/stack";
import { Box } from "../../layout/box";
import { List } from "./index";

/**
 * List renders a `<ul>` (or `<ol>` via `as`) with its `List.Item` children. `styleType`
 * picks the marker (disc / circle / square / decimal / lower-alpha / upper-roman / none),
 * `spacing` sets the vertical rhythm between items, and `List.Item`'s `icon` prop turns
 * any item into an icon row (suppressing the native marker).
 */
const meta: Meta<typeof List> = {
  title: "Components/Typography/List",
  component: List,
  subcomponents: { "List.Item": List.Item as any },
  tags: ["autodocs"],
  argTypes: {
    styleType: {
      control: { type: "select" },
      options: ["disc", "circle", "square", "decimal", "lower-alpha", "upper-roman", "none"],
    },
    spacing: {
      control: { type: "select" },
      options: ["0", "1", "1.5", "2", "2.5", "3", "4", "5", "6", "8"],
    },
  },
  parameters: {
    docs: { description: { component: "An ordered or unordered list." } },
  },
};

export default meta;
type Story = StoryObj<typeof List>;

const Check = () => (
  <svg width="18" height="18" viewBox="0 0 20 20" fill="none" aria-hidden="true">
    <path
      d="M5 10.5l3.5 3.5L15 6.5"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

/** Default unordered list with disc markers. */
export const Usage: Story = {
  render: () => (
    <List>
      <List.Item>Design tokens, mapped to explicit CSS variables</List.Item>
      <List.Item>Responsive style props on every primitive</List.Item>
      <List.Item>A precompiled stylesheet — no build step for consumers</List.Item>
    </List>
  ),
};

/** `styleType` selects the marker glyph. */
export const StyleTypes: Story = {
  render: () => (
    <VStack gap="6" alignItems="start">
      {(["disc", "circle", "square", "decimal", "lower-alpha", "upper-roman"] as const).map((t) => (
        <Box key={t}>
          <Text size="xs" color="subtle" fontFamily="mono" gutterBottom>styleType="{t}"</Text>
          <List as={t === "disc" || t === "circle" || t === "square" ? "ul" : "ol"} styleType={t}>
            <List.Item>First entry</List.Item>
            <List.Item>Second entry</List.Item>
            <List.Item>Third entry</List.Item>
          </List>
        </Box>
      ))}
    </VStack>
  ),
};

/** Ordered list via `as="ol"` + `styleType="decimal"`. */
export const Ordered: Story = {
  render: () => (
    <List as="ol" styleType="decimal" spacing="2">
      <List.Item>Install the package</List.Item>
      <List.Item>Wrap your app in the theme provider</List.Item>
      <List.Item>Import the precompiled stylesheet</List.Item>
      <List.Item>Start composing components</List.Item>
    </List>
  ),
};

/** `spacing` controls the gap between items. */
export const Spacing: Story = {
  render: () => (
    <VStack gap="8" alignItems="start">
      {(["1", "3", "6"] as const).map((s) => (
        <Box key={s}>
          <Text size="xs" color="subtle" fontFamily="mono" gutterBottom>spacing="{s}"</Text>
          <List spacing={s}>
            <List.Item>Item one</List.Item>
            <List.Item>Item two</List.Item>
            <List.Item>Item three</List.Item>
          </List>
        </Box>
      ))}
    </VStack>
  ),
};

/** Icon list — `List.Item icon` replaces the marker and aligns content beside it. */
export const WithIcons: Story = {
  render: () => (
    <List styleType="none" spacing="3">
      <List.Item icon={<Box as="span" color="success"><Check /></Box>}>
        Zero-runtime styling for consumers
      </List.Item>
      <List.Item icon={<Box as="span" color="success"><Check /></Box>}>
        Full TypeScript inference on every prop
      </List.Item>
      <List.Item icon={<Box as="span" color="success"><Check /></Box>}>
        Light and dark themes out of the box
      </List.Item>
    </List>
  ),
};

/** Marker and spacing can be responsive. */
export const Responsive: Story = {
  render: () => (
    <Box>
      <Text size="xs" color="subtle" fontFamily="mono" gutterBottom>
        {`spacing={{ base: "1", md: "5" }}`}
      </Text>
      <List spacing={{ base: "1", md: "5" }}>
        <List.Item>Tighter on mobile</List.Item>
        <List.Item>Roomier from md up</List.Item>
        <List.Item>Resize the viewport</List.Item>
      </List>
    </Box>
  ),
};
