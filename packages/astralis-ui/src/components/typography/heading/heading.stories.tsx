import type { Meta, StoryObj } from "@storybook/react-vite";
import { VStack } from "../../layout/stack";
import { Box } from "../../layout/box";
import { Text } from "../text";
import Heading from "./heading";

/**
 * Heading is a Text preset for titles. It renders an `h1`–`h6` via `as` (default `h2`),
 * derives a sensible default `size` and `weight` from the heading level, and applies a
 * tight `lineHeight` and `letterSpacing`. Every Text prop (except `paragraph`) still
 * works, so you can override `size`, `weight`, `color`, and the rest.
 */
const meta: Meta<typeof Heading> = {
  title: "Components/Typography/Heading",
  component: Heading,
  tags: ["autodocs"],
  argTypes: {
    as: {
      control: { type: "select" },
      options: ["h1", "h2", "h3", "h4", "h5", "h6"],
      table: { defaultValue: { summary: "h2" } },
    },
    size: {
      control: { type: "select" },
      options: ["md", "lg", "xl", "2xl", "3xl", "4xl", "5xl", "6xl"],
      description: "Overrides the size derived from the heading level.",
    },
    weight: {
      control: { type: "select" },
      options: ["medium", "semibold", "bold", "extrabold", "black"],
    },
    color: {
      control: { type: "select" },
      options: ["base", "muted", "subtle", "inverted", "warning", "error", "success", "info"],
    },
    children: { control: { type: "text" } },
  },
  parameters: {
    docs: {
      description: { component: "A semantic, level-aware title component built on Text." },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Heading>;

/** Interactive playground — change the level and overrides in Controls. */
export const Playground: Story = {
  args: {
    children: "The spark that lights the system",
    as: "h2",
  },
};

/** Each level (`h1`–`h6`) carries a default size and weight derived from the tag. */
export const Levels: Story = {
  render: () => (
    <VStack gap="3" alignItems="start">
      {(["h1", "h2", "h3", "h4", "h5", "h6"] as const).map((level) => (
        <Box key={level}>
          <Text size="xs" color="subtle" fontFamily="mono">{`<Heading as="${level}" />`}</Text>
          <Heading as={level}>Astralis design system</Heading>
        </Box>
      ))}
    </VStack>
  ),
};

/** Decouple appearance from semantics — an `h2` rendered at a larger size. */
export const SizeOverride: Story = {
  render: () => (
    <VStack gap="3" alignItems="start">
      <Text size="xs" color="subtle" fontFamily="mono">{`<Heading as="h2" size="5xl" />`}</Text>
      <Heading as="h2" size="5xl">Big, but still an h2</Heading>
      <Text size="xs" color="subtle" fontFamily="mono">{`<Heading as="h1" size="lg" />`}</Text>
      <Heading as="h1" size="lg">Small, but still an h1</Heading>
    </VStack>
  ),
};

/** Override `weight` independently of the level. */
export const Weights: Story = {
  render: () => (
    <VStack gap="2" alignItems="start">
      {(["medium", "semibold", "bold", "extrabold", "black"] as const).map((w) => (
        <Heading key={w} as="h3" weight={w}>Heading weight {w}</Heading>
      ))}
    </VStack>
  ),
};

/** Headings accept the same semantic color tokens as Text. */
export const Colors: Story = {
  render: () => (
    <VStack gap="2" alignItems="start">
      {(["base", "muted", "info", "success", "warning", "error"] as const).map((c) => (
        <Heading key={c} as="h3" color={c}>Heading color {c}</Heading>
      ))}
    </VStack>
  ),
};

/** `size` can be responsive for fluid display headings. */
export const Responsive: Story = {
  render: () => (
    <Box>
      <Text size="xs" color="subtle" fontFamily="mono">{`size={{ base: "2xl", md: "4xl", lg: "6xl" }}`}</Text>
      <Heading as="h1" size={{ base: "2xl", md: "4xl", lg: "6xl" }}>Fluid heading</Heading>
    </Box>
  ),
};
