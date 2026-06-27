import type { Meta, StoryObj } from "@storybook/react-vite";
import { Rocket, Heart, Bell, Search, Settings } from "lucide-react";
import { Box } from "../layout/box";
import { HStack, VStack } from "../layout/stack";
import { Text } from "../typography/text";
import { Icon } from "./index";

/**
 * Icon is a bring-your-own-icon wrapper. The library bundles **no** icon set —
 * you pass your own icon via `as` (an icon component from Lucide, Heroicons, etc.)
 * or `children` (a raw `<svg>`). Icon standardizes size (our sizing tokens), colour
 * (semantic tokens via `currentColor`), and stroke width. Decorative by default
 * (`aria-hidden`); pass `aria-label` to expose it to assistive tech.
 */
const meta: Meta<typeof Icon> = {
  title: "Components/Icon",
  component: Icon,
  tags: ["autodocs"],
  argTypes: {
    size: { control: { type: "select" }, options: ["xs", "sm", "md", "lg", "xl"] },
    color: { control: { type: "select" }, options: ["base", "muted", "subtle", "brand-solid", "info", "success", "warning", "error"] },
    strokeWidth: { control: { type: "number" } },
  },
  parameters: {
    docs: { description: { component: "A bring-your-own-icon wrapper (no bundled icon set)." } },
  },
};

export default meta;
type Story = StoryObj<typeof Icon>;

/** Interactive playground — adjust props in the Controls panel. */
export const Playground: Story = {
  args: { as: Rocket, size: "md" },
};

/** `size` maps to our sizing scale (xs 16 → xl 40px); a number sets exact pixels. */
export const Sizes: Story = {
  render: () => (
    <HStack gap="6" alignItems="end">
      {(["xs", "sm", "md", "lg", "xl"] as const).map((s) => (
        <VStack key={s} gap="2" alignItems="center">
          <Icon as={Rocket} size={s} />
          <Text size="xs" fontFamily="mono">{s}</Text>
        </VStack>
      ))}
    </HStack>
  ),
};

/** `color` uses semantic text tokens; omit it and the icon inherits the text colour. */
export const Colors: Story = {
  render: () => (
    <HStack gap="6">
      {(["base", "muted", "brand-solid", "info", "success", "warning", "error"] as const).map((c) => (
        <VStack key={c} gap="2" alignItems="center">
          <Icon as={Heart} color={c} size="lg" />
          <Text size="xs" fontFamily="mono">{c}</Text>
        </VStack>
      ))}
    </HStack>
  ),
};

/** Icons inherit `currentColor`, so they match surrounding text automatically. */
export const InheritsTextColor: Story = {
  render: () => (
    <VStack gap="3" alignItems="start">
      <Text color="success" size="lg"><Icon as={Bell} size="sm" /> Inherited success colour</Text>
      <Text color="error" size="lg"><Icon as={Bell} size="sm" /> Inherited error colour</Text>
    </VStack>
  ),
};

/** Bring any icon set via `as` — here a few different Lucide icons. */
export const AnyIconSet: Story = {
  render: () => (
    <HStack gap="5">
      {[Search, Settings, Bell, Heart, Rocket].map((I, i) => (
        <Icon key={i} as={I} size="lg" />
      ))}
    </HStack>
  ),
};

/** Or pass a raw `<svg>` as children — it fills the sized wrapper and inherits colour. */
export const RawSvgChildren: Story = {
  render: () => (
    <HStack gap="6" alignItems="center">
      <Icon size="lg" color="brand-solid">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 2l2.4 7.4H22l-6 4.6 2.3 7.4-6.3-4.6L5.7 21.4 8 14 2 9.4h7.6z" />
        </svg>
      </Icon>
      <Box bg="subtle" p="3" rounded="md">
        <Icon size="md">
          <svg viewBox="0 0 24 24" fill="currentColor"><circle cx="12" cy="12" r="9" /></svg>
        </Icon>
      </Box>
    </HStack>
  ),
};
