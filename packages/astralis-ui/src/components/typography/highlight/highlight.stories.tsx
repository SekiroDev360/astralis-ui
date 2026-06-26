import type { Meta, StoryObj } from "@storybook/react-vite";
import { Text } from "../text";
import { VStack } from "../../layout/stack";
import { Box } from "../../layout/box";
import { Highlight } from "./index";

/**
 * Highlight wraps every occurrence of `query` within its text in a styled `<mark>`.
 * It renders inline, so it nests cleanly inside a `<Text>`. `query` accepts one term
 * or many, matching is case-insensitive by default, and `variant` styles the mark.
 */
const meta: Meta<typeof Highlight> = {
  title: "Components/Typography/Highlight",
  component: Highlight,
  tags: ["autodocs"],
  argTypes: {
    variant: { control: { type: "select" }, options: ["subtle", "solid"] },
    ignoreCase: { control: { type: "boolean" } },
    children: { control: { type: "text" } },
  },
  parameters: {
    docs: { description: { component: "Highlights matched substrings in a block of text." } },
  },
};

export default meta;
type Story = StoryObj<typeof Highlight>;

/** Interactive playground — adjust props in the Controls panel. */
export const Playground: Story = {
  args: {
    children: "Astralis is a from-scratch UI library built on explicit design tokens.",
    query: "design tokens",
    variant: "subtle",
  },
  render: (args) => (
    <Box maxW="md">
      <Text size="lg">
        <Highlight {...args} />
      </Text>
    </Box>
  ),
};

/** A single query term, matched case-insensitively. */
export const SingleTerm: Story = {
  render: () => (
    <Box maxW="md">
      <Text size="lg">
        <Highlight query="fox">
          The quick brown fox jumps over the lazy dog. The FOX is fast.
        </Highlight>
      </Text>
    </Box>
  ),
};

/** `query` can be an array — every term is highlighted. */
export const MultipleTerms: Story = {
  render: () => (
    <Box maxW="lg">
      <Text size="lg">
        <Highlight query={["React", "TypeScript", "Tailwind"]}>
          Astralis is built with React, typed end-to-end in TypeScript, and powered by
          Tailwind as a hidden CSS engine.
        </Highlight>
      </Text>
    </Box>
  ),
};

/** `variant` styles the mark. */
export const Variants: Story = {
  render: () => (
    <VStack gap="3" alignItems="start" maxW="md">
      {(["subtle", "solid"] as const).map((v) => (
        <Box key={v}>
          <Text size="xs" color="subtle" fontFamily="mono" gutterBottom>variant="{v}"</Text>
          <Text size="lg">
            <Highlight query="highlighted" variant={v}>
              This is the highlighted phrase.
            </Highlight>
          </Text>
        </Box>
      ))}
    </VStack>
  ),
};

/** `ignoreCase={false}` matches the exact casing only. */
export const CaseSensitive: Story = {
  render: () => (
    <Box maxW="md">
      <Text size="lg">
        <Highlight query="API" ignoreCase={false}>
          The API differs from the word "api" when matching is case-sensitive.
        </Highlight>
      </Text>
    </Box>
  ),
};
