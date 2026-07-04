import type { Meta, StoryObj } from "@storybook/react-vite";
import type { ComponentProps } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Pagination } from "./index";
import { Icon } from "../../icon";
import { VStack } from "../../layout/stack";
import { Text } from "../../typography/text";

/**
 * Pagination is a compound component. `Pagination` is the root; compose the bar
 * from `Pagination.Prev`, `Pagination.Pages`, `Pagination.Next` (and optionally
 * `First`/`Last`/`PageText`/`Jumper`) inside a `Pagination.List`. It supports
 * variants, sizes, `rounded`, `colorScheme`, and either `totalPages` or
 * `count` + `pageSize`.
 */
const meta: Meta<typeof Pagination> = {
  title: "Components/Disclosure/Pagination",
  component: Pagination,
  tags: ["autodocs"],
  argTypes: {
    variant: { control: { type: "select" }, options: ["solid", "outline", "subtle", "plain"] },
    size: { control: { type: "select" }, options: ["xs", "sm", "md", "lg"] },
    rounded: { control: { type: "select" }, options: ["none", "sm", "md", "lg", "xl", "2xl", "full"] },
    colorScheme: {
      control: { type: "select" },
      options: ["brand", "gray", "red", "orange", "yellow", "green", "teal", "blue", "cyan", "purple", "pink"],
    },
    disabled: { control: { type: "boolean" } },
    totalPages: { control: { type: "number" } },
    defaultPage: { control: { type: "number" } },
  },
};

export default meta;
type Story = StoryObj<typeof Pagination>;

const Bar = (props: Omit<ComponentProps<typeof Pagination>, "children">) => (
  <Pagination {...props}>
    <Pagination.List>
      <Pagination.Prev />
      <Pagination.Pages />
      <Pagination.Next />
    </Pagination.List>
  </Pagination>
);

/** Interactive playground. */
export const Playground: Story = {
  args: { totalPages: 10, defaultPage: 5, variant: "solid", size: "md", rounded: "md", colorScheme: "brand" },
  render: (args) => <Bar {...args} />,
};

const VARIANTS = ["solid", "outline", "subtle", "plain"] as const;

/** Four variants — the active page follows `colorScheme`. */
export const Variants: Story = {
  render: () => (
    <VStack gap="6" alignItems="start">
      {VARIANTS.map((variant) => (
        <VStack key={variant} gap="1.5" alignItems="start">
          <Text size="sm" fontFamily="mono" color="muted">{variant}</Text>
          <Bar totalPages={10} defaultPage={5} variant={variant} />
        </VStack>
      ))}
    </VStack>
  ),
};

/** Sizes — xs, sm, md, lg. */
export const Sizes: Story = {
  render: () => (
    <VStack gap="5" alignItems="start">
      {(["xs", "sm", "md", "lg"] as const).map((size) => (
        <Bar key={size} totalPages={10} defaultPage={3} size={size} />
      ))}
    </VStack>
  ),
};

/** `rounded` from square to pill. */
export const Rounded: Story = {
  render: () => (
    <VStack gap="4" alignItems="start">
      {(["none", "md", "full"] as const).map((rounded) => (
        <Bar key={rounded} totalPages={7} defaultPage={4} rounded={rounded} />
      ))}
    </VStack>
  ),
};

/** `colorScheme` recolours the active page and focus rings. */
export const ColorScheme: Story = {
  render: () => (
    <VStack gap="4" alignItems="start">
      {(["brand", "green", "red", "blue"] as const).map((c) => (
        <Bar key={c} totalPages={10} defaultPage={5} colorScheme={c} />
      ))}
    </VStack>
  ),
};

/** First/Last jump buttons, added by composing extra parts. */
export const WithFirstAndLast: Story = {
  render: () => (
    <Pagination totalPages={20} defaultPage={10}>
      <Pagination.List>
        <Pagination.First />
        <Pagination.Prev />
        <Pagination.Pages />
        <Pagination.Next />
        <Pagination.Last />
      </Pagination.List>
    </Pagination>
  ),
};

/** Ellipsis logic at scale — 100 pages, siblings=1, boundaryCount=1. */
export const ManyPages: Story = {
  render: (args) => <Bar {...args} />,
  args: { totalPages: 100, defaultPage: 50 },
};

/** `count` + `pageSize` derives the page count; `PageText` reads it out. */
export const CountAndPageText: Story = {
  render: () => (
    <Pagination count={195} pageSize={10} defaultPage={3}>
      <Pagination.List>
        <Pagination.Prev />
        <Pagination.Pages />
        <Pagination.Next />
        <Pagination.PageText />
      </Pagination.List>
    </Pagination>
  ),
};

/** A quick-jump input (press Enter) for many-page datasets. */
export const WithJumper: Story = {
  render: () => (
    <Pagination totalPages={50} defaultPage={12}>
      <Pagination.List>
        <Pagination.Prev />
        <Pagination.Pages />
        <Pagination.Next />
        <Pagination.Jumper />
      </Pagination.List>
    </Pagination>
  ),
};

/** Simple mode — just Prev / PageText / Next. */
export const Simple: Story = {
  render: () => (
    <Pagination totalPages={10} defaultPage={4} variant="subtle">
      <Pagination.List>
        <Pagination.Prev />
        <Pagination.PageText />
        <Pagination.Next />
      </Pagination.List>
    </Pagination>
  ),
};

/** Bring your own control icons via the `icon` prop. */
export const CustomControlIcons: Story = {
  render: () => (
    <Pagination totalPages={10} defaultPage={5}>
      <Pagination.List>
        <Pagination.Prev icon={<Icon as={ArrowLeft} size="xs" />} />
        <Pagination.Pages />
        <Pagination.Next icon={<Icon as={ArrowRight} size="xs" />} />
      </Pagination.List>
    </Pagination>
  ),
};

/** Disabled — the whole control is inert. */
export const Disabled: Story = {
  render: (args) => <Bar {...args} />,
  args: { totalPages: 10, defaultPage: 5, disabled: true },
};
