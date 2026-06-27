import type { Meta, StoryObj } from "@storybook/react-vite";
import { Box } from "../../layout/box";
import { VStack } from "../../layout/stack";
import { Text } from "../../typography/text";
import { Tabs } from "./index";

/**
 * Tabs organize content into switchable panels. Compound: `Tabs.Root` owns the
 * active value + config via context; `List`/`Trigger`/`Content` compose freely.
 * Features an animated sliding indicator (line variant), full ARIA + keyboard
 * support (roving tabindex, arrow/Home/End), three variants, sizes, vertical
 * orientation, `fitted`, `activationMode`, and `keepMounted`.
 */
const meta: Meta<typeof Tabs> = {
  title: "Components/Navigation/Tabs",
  component: Tabs,
  tags: ["autodocs"],
  argTypes: {
    variant: { control: { type: "select" }, options: ["line", "subtle", "segmented", "outline", "plain"] },
    size: { control: { type: "select" }, options: ["sm", "md", "lg"] },
    orientation: { control: { type: "select" }, options: ["horizontal", "vertical"] },
    fitted: { control: { type: "boolean" } },
    rounded: { control: { type: "boolean" } },
    activationMode: { control: { type: "select" }, options: ["automatic", "manual"] },
    keepMounted: { control: { type: "boolean" } },
  },
  parameters: {
    docs: { description: { component: "Switchable content panels with an animated indicator." } },
  },
};

export default meta;
type Story = StoryObj<typeof Tabs>;

const TABS = [
  { value: "overview", label: "Overview", body: "A high-level summary of the project." },
  { value: "analytics", label: "Analytics", body: "Charts, metrics, and usage trends." },
  { value: "settings", label: "Settings", body: "Configure preferences and access." },
];

const renderTabs = () => (
  <>
    <Tabs.List>
      {TABS.map((t) => (
        <Tabs.Trigger key={t.value} value={t.value}>{t.label}</Tabs.Trigger>
      ))}
    </Tabs.List>
    {TABS.map((t) => (
      <Tabs.Content key={t.value} value={t.value}>
        <Text size={"sm"}>{t.body}</Text>
      </Tabs.Content>
    ))}
  </>
);

/** Interactive playground — adjust props in the Controls panel. */
export const Playground: Story = {
  args: { defaultValue: "overview", variant: "line", size: "md" },
  render: (args) => (
    <Box w="full" maxW="2xl">
      <Tabs {...args}>{renderTabs()}</Tabs>
    </Box>
  ),
};

/** `variant` — line (sliding underline), subtle (filled), segmented (track + raised card), outline (folder tab), plain. */
export const Variants: Story = {
  render: () => (
    <VStack gap="10" w="full" maxW="2xl" alignItems="stretch">
      {(["line", "subtle", "segmented", "outline", "plain"] as const).map((v) => (
        <Box key={v}>
          <Text size="xs" fontFamily="mono" gutterBottom>variant="{v}"</Text>
          <Tabs defaultValue="overview" variant={v}>{renderTabs()}</Tabs>
        </Box>
      ))}
    </VStack>
  ),
};

/** `rounded` bumps the radius on subtle / segmented / outline for a pill-like look. */
export const Rounded: Story = {
  render: () => (
    <VStack gap="10" w="full" maxW="2xl" alignItems="stretch">
      {(["subtle", "segmented", "outline"] as const).map((v) => (
        <Box key={v}>
          <Text size="xs" fontFamily="mono" gutterBottom>variant="{v}" rounded</Text>
          <Tabs defaultValue="overview" variant={v} rounded>{renderTabs()}</Tabs>
        </Box>
      ))}
    </VStack>
  ),
};

/** `size` scales padding and text. */
export const Sizes: Story = {
  render: () => (
    <VStack gap="8" w="full" maxW="2xl" alignItems="stretch">
      {(["sm", "md", "lg"] as const).map((s) => (
        <Box key={s}>
          <Text size="xs" fontFamily="mono" gutterBottom>size="{s}"</Text>
          <Tabs defaultValue="overview" size={s}>{renderTabs()}</Tabs>
        </Box>
      ))}
    </VStack>
  ),
};

/** `fitted` stretches the triggers to fill the list width. */
export const Fitted: Story = {
  render: () => (
    <Box w="full" maxW="2xl">
      <Tabs defaultValue="overview" fitted>{renderTabs()}</Tabs>
    </Box>
  ),
};

/** Vertical orientation — the indicator runs down the trailing edge of the list. */
export const Vertical: Story = {
  render: () => (
    <Box w="full" maxW="2xl">
      <Tabs defaultValue="overview" orientation="vertical">{renderTabs()}</Tabs>
    </Box>
  ),
};

/** Triggers accept any content, including leading icons. */
export const WithIcons: Story = {
  render: () => {
    const Dot = () => (
      <svg width="14" height="14" viewBox="0 0 16 16" aria-hidden="true">
        <circle cx="8" cy="8" r="5" fill="currentColor" />
      </svg>
    );
    return (
      <Box w="full" maxW="2xl">
        <Tabs defaultValue="overview">
          <Tabs.List>
            <Tabs.Trigger value="overview"><Dot /> Overview</Tabs.Trigger>
            <Tabs.Trigger value="analytics"><Dot /> Analytics</Tabs.Trigger>
            <Tabs.Trigger value="settings" disabled><Dot /> Settings</Tabs.Trigger>
          </Tabs.List>
          {TABS.map((t) => (
            <Tabs.Content key={t.value} value={t.value}><Text>{t.body}</Text></Tabs.Content>
          ))}
        </Tabs>
      </Box>
    );
  },
};

/** `keepMounted` keeps inactive panels in the DOM (hidden) — handy for forms. */
export const KeepMounted: Story = {
  render: () => (
    <Box w="full" maxW="2xl">
      <Tabs defaultValue="overview" keepMounted>{renderTabs()}</Tabs>
    </Box>
  ),
};
