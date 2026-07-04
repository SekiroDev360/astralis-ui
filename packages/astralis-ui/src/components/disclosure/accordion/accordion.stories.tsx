import type { Meta, StoryObj } from "@storybook/react-vite";
import { Plus } from "lucide-react";
import { Accordion } from "./index";
import { Icon } from "../../icon";
import { Box } from "../../layout/box";
import { VStack } from "../../layout/stack";
import { Text } from "../../typography/text";

/**
 * Accordion toggles the visibility of stacked sections. It's a compound component:
 * `Accordion` is the root, with `Accordion.Item`, `Accordion.Trigger`, and
 * `Accordion.Content` as parts. `Trigger` infers its item from context, wraps
 * itself in a heading for accessibility, and renders a rotating indicator
 * automatically.
 */
const meta: Meta<typeof Accordion> = {
  title: "Components/Disclosure/Accordion",
  component: Accordion,
  tags: ["autodocs"],
  argTypes: {
    type: { control: { type: "inline-radio" }, options: ["single", "multiple"] },
    variant: { control: { type: "select" }, options: ["enclosed", "outline", "separated", "subtle", "plain"] },
    size: { control: { type: "select" }, options: ["sm", "md", "lg"] },
    colorScheme: {
      control: { type: "select" },
      options: ["gray", "brand", "red", "orange", "yellow", "green", "teal", "blue", "cyan", "purple", "pink"],
    },
    indicatorPosition: { control: { type: "inline-radio" }, options: ["start", "end"] },
    collapsible: { control: { type: "boolean" } },
  },
  parameters: {
    docs: {
      description: {
        component:
          "A composable, accessible accordion with animated expand/collapse, variants, sizes, and `colorScheme`.",
      },
    },
  },
  decorators: [(Story) => <Box style={{ width: "100%", maxWidth: 560, marginInline: "auto" }}><Story /></Box>],
};

export default meta;
type Story = StoryObj<typeof Accordion>;

const items = [
  { value: "item-1", label: "What is Astralis?", content: "Astralis is a modern UI library built with React, TypeScript, and Tailwind — shipping precompiled CSS with explicit design tokens." },
  { value: "item-2", label: "Why use Astralis?", content: "It focuses on composability, strong typing, and predictable APIs, with no Tailwind defaults leaking into your DOM." },
  { value: "item-3", label: "Is it accessible?", content: "Yes — triggers are wrapped in headings, wired with aria-expanded/aria-controls, and support full keyboard navigation." },
];

const renderItems = () =>
  items.map((it) => (
    <Accordion.Item key={it.value} value={it.value}>
      <Accordion.Trigger>{it.label}</Accordion.Trigger>
      <Accordion.Content>{it.content}</Accordion.Content>
    </Accordion.Item>
  ));

/** Interactive playground. */
export const Playground: Story = {
  args: { type: "single", variant: "enclosed", size: "md", colorScheme: "gray", collapsible: true },
  render: (args) => <Accordion {...args}>{renderItems()}</Accordion>,
};

/** One item open at a time; `collapsible` lets you close it entirely. */
export const Single: Story = {
  render: () => (
    <Accordion type="single" collapsible defaultValue="item-1">{renderItems()}</Accordion>
  ),
};

/** `multiple` lets several sections stay open at once. */
export const Multiple: Story = {
  render: () => (
    <Accordion type="multiple" defaultValue={["item-1", "item-3"]}>{renderItems()}</Accordion>
  ),
};

const VARIANTS = ["enclosed", "outline", "separated", "subtle", "plain"] as const;

/** Five variants, from a single shared frame to no chrome at all. */
export const Variants: Story = {
  render: () => (
    <VStack gap="8" alignItems="stretch">
      {VARIANTS.map((v) => (
        <VStack key={v} gap="2" alignItems="stretch">
          <Text size="sm" fontFamily="mono" color="muted">{v}</Text>
          <Accordion variant={v} collapsible defaultValue="item-1">{renderItems()}</Accordion>
        </VStack>
      ))}
    </VStack>
  ),
};

/** Sizes scale padding, type, and the indicator together. */
export const Sizes: Story = {
  render: () => (
    <VStack gap="6" alignItems="stretch">
      {(["sm", "md", "lg"] as const).map((s) => (
        <Accordion key={s} size={s} collapsible defaultValue="item-1">{renderItems()}</Accordion>
      ))}
    </VStack>
  ),
};

/** `colorScheme` drives the focus ring and the `subtle` variant's open fill. */
export const ColorScheme: Story = {
  render: () => (
    <Accordion variant="subtle" colorScheme="blue" type="multiple" defaultValue={["item-1"]}>
      {renderItems()}
    </Accordion>
  ),
};

/** Custom indicator and start placement — here a plus icon on the left. */
export const CustomIndicator: Story = {
  render: () => (
    <Accordion collapsible defaultValue="item-1" indicatorPosition="start" indicator={<Icon as={Plus} size="sm" />}>
      {renderItems()}
    </Accordion>
  ),
};

/** A disabled item can't be toggled and is visually dimmed. */
export const Disabled: Story = {
  render: () => (
    <Accordion collapsible defaultValue="item-1">
      <Accordion.Item value="item-1">
        <Accordion.Trigger>Enabled</Accordion.Trigger>
        <Accordion.Content>This item works normally.</Accordion.Content>
      </Accordion.Item>
      <Accordion.Item value="item-2" disabled>
        <Accordion.Trigger>Disabled</Accordion.Trigger>
        <Accordion.Content>You shouldn't be able to open this.</Accordion.Content>
      </Accordion.Item>
      <Accordion.Item value="item-3">
        <Accordion.Trigger>Enabled</Accordion.Trigger>
        <Accordion.Content>This one works too.</Accordion.Content>
      </Accordion.Item>
    </Accordion>
  ),
};
