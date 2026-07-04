import type { Meta, StoryObj } from "@storybook/react-vite";
import { Check } from "lucide-react";
import { Timeline } from "./index";
import { Icon } from "../../icon";
import { Box } from "../../layout/box";

/**
 * Timeline shows a vertical sequence of events. `Timeline.Item` draws its own
 * connecting line; each item holds a `Timeline.Indicator` (dot, number, or icon)
 * and `Timeline.Content` (with `Title`/`Description`). `colorScheme` sets the hue.
 */
const meta: Meta<typeof Timeline> = {
  title: "Components/Data Display/Timeline",
  component: Timeline,
  tags: ["autodocs"],
  argTypes: {
    size: { control: { type: "select" }, options: ["sm", "md", "lg"] },
    variant: { control: { type: "select" }, options: ["solid", "subtle", "outline"] },
    colorScheme: {
      control: { type: "select" },
      options: ["brand", "gray", "red", "green", "blue", "purple"],
    },
  },
  decorators: [(Story) => <Box style={{ maxWidth: 420 }}><Story /></Box>],
};

export default meta;
type Story = StoryObj<typeof Timeline>;

const steps = [
  { title: "Order placed", desc: "Your order has been received." },
  { title: "Processing", desc: "We're preparing your items." },
  { title: "Shipped", desc: "On the way — track your package." },
  { title: "Delivered", desc: "Left at the front door." },
];

export const Numbered: Story = {
  render: (args) => (
    <Timeline {...args}>
      {steps.map((s, i) => (
        <Timeline.Item key={s.title}>
          <Timeline.Indicator>{i + 1}</Timeline.Indicator>
          <Timeline.Content>
            <Timeline.Title>{s.title}</Timeline.Title>
            <Timeline.Description>{s.desc}</Timeline.Description>
          </Timeline.Content>
        </Timeline.Item>
      ))}
    </Timeline>
  ),
};

/** Dot indicators (empty) and per-item hues for status. */
export const StatusDots: Story = {
  render: () => (
    <Timeline>
      <Timeline.Item>
        <Timeline.Indicator colorScheme="green"><Icon as={Check} size="xs" /></Timeline.Indicator>
        <Timeline.Content>
          <Timeline.Title>Deployed v2.1.0</Timeline.Title>
          <Timeline.Description>2 hours ago</Timeline.Description>
        </Timeline.Content>
      </Timeline.Item>
      <Timeline.Item>
        <Timeline.Indicator colorScheme="green"><Icon as={Check} size="xs" /></Timeline.Indicator>
        <Timeline.Content>
          <Timeline.Title>Fixed auth bug</Timeline.Title>
          <Timeline.Description>5 hours ago</Timeline.Description>
        </Timeline.Content>
      </Timeline.Item>
      <Timeline.Item>
        <Timeline.Indicator colorScheme="gray" />
        <Timeline.Content>
          <Timeline.Title>Pending review</Timeline.Title>
          <Timeline.Description>Awaiting approval</Timeline.Description>
        </Timeline.Content>
      </Timeline.Item>
    </Timeline>
  ),
};

export const Variants: Story = {
  render: () => (
    <Box style={{ display: "flex", gap: 48 }}>
      {(["solid", "subtle", "outline"] as const).map((v) => (
        <Timeline key={v} variant={v} colorScheme="blue">
          {steps.slice(0, 3).map((s, i) => (
            <Timeline.Item key={s.title}>
              <Timeline.Indicator>{i + 1}</Timeline.Indicator>
              <Timeline.Content><Timeline.Title>{s.title}</Timeline.Title></Timeline.Content>
            </Timeline.Item>
          ))}
        </Timeline>
      ))}
    </Box>
  ),
};
