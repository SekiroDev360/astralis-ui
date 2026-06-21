import type { Meta, StoryObj } from "@storybook/react-vite";
import { Box } from "../../layout/box";
import { VStack } from "../../layout/stack";
import Text from "./text";

/**
 * Text is the typographic primitive. It controls `size`, `weight`, `align`, `color`,
 * `casing`, `lineHeight`, `letterSpacing`, `fontFamily`, `fontStyle`, and
 * `textDecoration`, plus layout helpers (`gutterBottom`, `paragraph`) and truncation
 * (`truncate`, `lineClamp`). Every prop also accepts a responsive object.
 *
 * It is polymorphic via `as` and renders a `<p>` by default.
 */
const meta: Meta<typeof Text> = {
  title: "Components/Typography/Text",
  component: Text,
  tags: ["autodocs"],
  argTypes: {
    as: {
      control: { type: "text" },
      description: "The element/component to render as.",
      table: { defaultValue: { summary: "p" } },
    },
    size: {
      control: { type: "select" },
      options: ["xs", "sm", "md", "lg", "xl", "2xl", "3xl", "4xl", "5xl", "6xl", "7xl", "8xl", "9xl"],
    },
    weight: {
      control: { type: "select" },
      options: ["thin", "extralight", "light", "normal", "medium", "semibold", "bold", "extrabold", "black"],
    },
    align: { control: { type: "select" }, options: ["left", "center", "right", "justify"] },
    color: {
      control: { type: "select" },
      options: ["base", "muted", "subtle", "inverted", "warning", "error", "success", "info"],
    },
    casing: { control: { type: "select" }, options: ["uppercase", "lowercase", "capitalize", "normal"] },
    lineHeight: { control: { type: "select" }, options: ["none", "tight", "snug", "normal", "relaxed", "loose"] },
    letterSpacing: {
      control: { type: "select" },
      options: ["tighter", "tight", "normal", "wide", "wider", "widest"],
    },
    fontFamily: { control: { type: "select" }, options: ["sans", "serif", "mono"] },
    fontStyle: { control: { type: "select" }, options: ["normal", "italic"] },
    textDecoration: { control: { type: "select" }, options: ["underline", "line-through", "overline", "none"] },
    gutterBottom: { control: { type: "boolean" } },
    paragraph: { control: { type: "boolean" } },
    truncate: { control: { type: "boolean" } },
    lineClamp: { control: { type: "select" }, options: ["1", "2", "3", "4", "5", "6"] },
    children: { control: { type: "text" } },
  },
  parameters: {
    docs: {
      description: {
        component: "A versatile text component with size, weight, color, and typographic controls.",
      },
    },
  },
};
export default meta;
type Story = StoryObj<typeof Text>;

const Label = ({ children }: { children: React.ReactNode }) => (
  <Text size="xs" color="subtle" fontFamily="mono">{children}</Text>
);

/** Interactive playground — adjust props in the Controls panel. */
export const Playground: Story = {
  args: {
    children: "The quick brown fox jumps over the lazy dog",
    size: "lg",
    weight: "medium",
    color: "base",
  },
};

/** `size` ranges from xs to 9xl. */
export const Sizes: Story = {
  render: () => (
    <VStack gap="2" alignItems="start">
      {(["xs", "sm", "md", "lg", "xl", "2xl", "3xl", "4xl", "5xl"] as const).map((s) => (
        <Box key={s}>
          <Text size={s}>Text {s}</Text>
        </Box>
      ))}
    </VStack>
  ),
};

/** `weight` from thin (100) to black (900). */
export const Weights: Story = {
  render: () => (
    <VStack gap="1" alignItems="start">
      {(["thin", "extralight", "light", "normal", "medium", "semibold", "bold", "extrabold", "black"] as const).map((w) => (
        <Text key={w} size="xl" weight={w}>{w}</Text>
      ))}
    </VStack>
  ),
};

/** `color` maps to semantic label tokens (inverted shown on a dark surface). */
export const Colors: Story = {
  render: () => (
    <VStack gap="2" alignItems="start">
      {(["base", "muted", "subtle", "info", "success", "warning", "error"] as const).map((c) => (
        <Text key={c} color={c} size="lg">{c}</Text>
      ))}
      <Box bg="inverted" p="3" rounded="md">
        <Text color="inverted" size="lg">inverted</Text>
      </Box>
    </VStack>
  ),
};

/** `lineHeight` uses unitless multipliers that scale with the font size. */
export const LineHeight: Story = {
  render: () => (
    <VStack gap="5" w="full" maxW="md" alignItems="start">
      {(["none", "tight", "snug", "normal", "relaxed", "loose"] as const).map((lh) => (
        <Box key={lh} w="full">
          <Label>lineHeight="{lh}"</Label>
          <Text lineHeight={lh}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
            tempor incididunt ut labore et dolore magna aliqua.
          </Text>
        </Box>
      ))}
    </VStack>
  ),
};

/** `letterSpacing` (tracking) tightens or loosens character spacing. */
export const LetterSpacing: Story = {
  render: () => (
    <VStack gap="2" alignItems="start">
      {(["tighter", "tight", "normal", "wide", "wider", "widest"] as const).map((ls) => (
        <Box key={ls}>
          <Label>letterSpacing="{ls}"</Label>
          <Text size="xl" casing="uppercase" letterSpacing={ls}>Astralis</Text>
        </Box>
      ))}
    </VStack>
  ),
};

/** `fontFamily` switches between the sans, serif, and mono token stacks. */
export const FontFamily: Story = {
  render: () => (
    <VStack gap="3" alignItems="start">
      {(["sans", "serif", "mono"] as const).map((f) => (
        <Box key={f}>
          <Label>fontFamily="{f}"</Label>
          <Text size="xl" fontFamily={f}>The quick brown fox</Text>
        </Box>
      ))}
    </VStack>
  ),
};

/** `fontStyle` and `textDecoration` add italics and decoration lines. */
export const StyleAndDecoration: Story = {
  render: () => (
    <VStack gap="2" alignItems="start">
      <Text size="lg" fontStyle="italic">fontStyle="italic"</Text>
      <Text size="lg" textDecoration="underline">textDecoration="underline"</Text>
      <Text size="lg" textDecoration="line-through" color="muted">textDecoration="line-through"</Text>
      <Text size="lg" textDecoration="overline">textDecoration="overline"</Text>
    </VStack>
  ),
};

/** `casing` controls text-transform. */
export const Casing: Story = {
  render: () => (
    <VStack gap="2" alignItems="start">
      <Text casing="uppercase">uppercase text example</Text>
      <Text casing="lowercase">LOWERCASE TEXT EXAMPLE</Text>
      <Text casing="capitalize">capitalize text example</Text>
      <Text casing="normal">Normal Case Example</Text>
    </VStack>
  ),
};

/** `align` controls horizontal alignment within the text block. */
export const Alignment: Story = {
  render: () => (
    <VStack gap="3" w="full" maxW="md" alignItems="stretch">
      {(["left", "center", "right", "justify"] as const).map((a) => (
        <Box key={a} bg="subtle" p="3" rounded="md">
          <Text align={a}>
            <Label>align="{a}"</Label> — Lorem ipsum dolor sit amet, consectetur adipiscing
            elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </Text>
        </Box>
      ))}
    </VStack>
  ),
};

/** `gutterBottom` and `paragraph` add vertical rhythm without custom spacing. */
export const Spacing: Story = {
  render: () => (
    <Box maxW="md">
      <Text size="2xl" weight="bold" gutterBottom>Title with gutterBottom</Text>
      <Text paragraph>
        This paragraph uses the `paragraph` prop, which renders a paragraph element and
        adds bottom margin so the next block flows naturally beneath it.
      </Text>
      <Text paragraph>
        A second paragraph. Stacking these creates consistent vertical rhythm for long-form
        content without manual margins.
      </Text>
    </Box>
  ),
};

/** `truncate` cuts off a single line with an ellipsis. */
export const Truncate: Story = {
  render: () => (
    <Box w="full" maxW="sm">
      <Label>container width: 24rem</Label>
      <Text truncate>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
        incididunt ut labore et dolore magna aliqua.
      </Text>
    </Box>
  ),
};

/** `lineClamp` limits to N lines with an ellipsis. */
export const LineClamp: Story = {
  render: () => (
    <VStack gap="5" w="full" maxW="sm" alignItems="start">
      {(["2", "3", "4"] as const).map((n) => (
        <Box key={n} w="full">
          <Label>lineClamp="{n}"</Label>
          <Text lineClamp={n}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
            incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis
            nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
          </Text>
        </Box>
      ))}
    </VStack>
  ),
};

/** `size` (and any prop) can be responsive. */
export const Responsive: Story = {
  render: () => (
    <Box>
      <Label>{`size={{ base: "lg", md: "3xl", lg: "5xl" }}`}</Label>
      <Text size={{ base: "lg", md: "3xl", lg: "5xl" }} weight="bold">Resize me</Text>
    </Box>
  ),
};

/** The `as` prop renders any element while keeping typography props. */
export const Polymorphism: Story = {
  render: () => (
    <VStack gap="2" alignItems="start">
      <Text as="kbd" fontFamily="mono">Ctrl + C</Text>
      <Text as="abbr" title="HyperText Markup Language">HTML</Text>
      <Text as="cite">Source Citation</Text>
      <Text as="label">Form label</Text>
    </VStack>
  ),
};
