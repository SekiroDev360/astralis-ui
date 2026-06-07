import type { Meta, StoryObj } from "@storybook/react-vite";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
  AccordionIndicator,
  AccordionTitle,
} from "./index";
const meta: Meta = {
  title: "Components/Disclosure/Accordion",
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Accordion allows users to toggle the visibility of related sections of content. It is built as a compound component to provide maximum flexibility and composability.",
      },
    },
  },
  decorators: [
    (Story) => (
      <div className="astralis-flex astralis-items-center astralis-justify-center">
        <Story />
      </div>
    ),
  ],
};
export default meta;
type Story = StoryObj;
const sampleItems = [
  { value: "item-1", label: "First Item", content: "Some value 1..." },
  { value: "item-2", label: "Second Item", content: "Some value 2..." },
  { value: "item-3", label: "Third Item", content: "Some value 3..." },
];
export const Basic: Story = {
  render: () => (
    <Accordion collapsible>
      <AccordionItem value="item-1">
        <AccordionTrigger value="item-1">
          <AccordionTitle>What is Astralis?</AccordionTitle>
          <AccordionIndicator value="item-1" />
        </AccordionTrigger>
        <AccordionContent value="item-1">
          Astralis is a modern UI library built with React, TypeScript, and
          Tailwind.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-2">
        <AccordionTrigger value="item-2">
          <AccordionTitle>Why use Astralis?</AccordionTitle>
          <AccordionIndicator value="item-2" />
        </AccordionTrigger>
        <AccordionContent value="item-2">
          It focuses on composability, strong typing, and predictable APIs.
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "A basic accordion where only one item can be open at a time, with collapsible behavior enabled.",
      },
    },
  },
};
export const Spaced: Story = {
  render: () => (
    <div style={{ width: 560 }}>
      <Accordion variant="spaced" collapsible defaultValue="item-1">
        {sampleItems.map((item) => (
          <AccordionItem key={item.value} value={item.value}>
            <AccordionTrigger value={item.value}>
              <AccordionTitle>{item.label}</AccordionTitle>
              <AccordionIndicator value={item.value} />
            </AccordionTrigger>
            <AccordionContent value={item.value}>
              {item.content}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Each accordion item is displayed as a separated card with borders, rounded corners, and gaps between items.",
      },
    },
  },
};
export const Outline: Story = {
  render: () => (
    <div style={{ width: 560 }}>
      <Accordion variant="outline" collapsible defaultValue="item-1">
        {sampleItems.map((item) => (
          <AccordionItem key={item.value} value={item.value}>
            <AccordionTrigger value={item.value}>
              <AccordionTitle>{item.label}</AccordionTitle>
              <AccordionIndicator value={item.value} />
            </AccordionTrigger>
            <AccordionContent value={item.value}>
              {item.content}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Items are separated by horizontal divider lines only — no card borders, backgrounds, or outer container border.",
      },
    },
  },
};
export const Enclosed: Story = {
  render: () => (
    <div style={{ width: 560 }}>
      <Accordion variant="enclosed" collapsible defaultValue="item-1">
        {sampleItems.map((item) => (
          <AccordionItem key={item.value} value={item.value}>
            <AccordionTrigger value={item.value}>
              <AccordionTitle>{item.label}</AccordionTitle>
              <AccordionIndicator value={item.value} />
            </AccordionTrigger>
            <AccordionContent value={item.value}>
              {item.content}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "All items are wrapped in a single shared outer border with rounded corners. Inner items are separated by dividers. This is the default variant.",
      },
    },
  },
};
export const Plain: Story = {
  render: () => (
    <div style={{ width: 560 }}>
      <Accordion variant="plain" collapsible defaultValue="item-1">
        {sampleItems.map((item) => (
          <AccordionItem key={item.value} value={item.value}>
            <AccordionTrigger value={item.value}>
              <AccordionTitle>{item.label}</AccordionTitle>
              <AccordionIndicator value={item.value} />
            </AccordionTrigger>
            <AccordionContent value={item.value}>
              {item.content}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Minimal variant with no borders, backgrounds, or dividers. Ideal for inline or embedded usage.",
      },
    },
  },
};
export const Multiple: Story = {
  render: () => (
    <div style={{ width: 560 }}>
      <Accordion type="multiple" defaultValue={["item-1"]}>
        {sampleItems.map((item) => (
          <AccordionItem key={item.value} value={item.value}>
            <AccordionTrigger value={item.value}>
              <AccordionTitle>{item.label}</AccordionTitle>
              <AccordionIndicator value={item.value} />
            </AccordionTrigger>
            <AccordionContent value={item.value}>
              {item.content}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Accordion configured in multiple mode, allowing more than one section to be expanded at once.",
      },
    },
  },
};
export const Disabled: Story = {
  render: () => (
    <div style={{ width: 560 }}>
      <Accordion collapsible defaultValue="item-1">
        <AccordionItem value="item-1">
          <AccordionTrigger value="item-1">
            <AccordionTitle>First Item</AccordionTitle>
            <AccordionIndicator value="item-1" />
          </AccordionTrigger>
          <AccordionContent value="item-1">Some value 1...</AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-2" disabled>
          <AccordionTrigger value="item-2">
            <AccordionTitle>Second Item (Disabled)</AccordionTitle>
            <AccordionIndicator value="item-2" />
          </AccordionTrigger>
          <AccordionContent value="item-2">Some value 2...</AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-3">
          <AccordionTrigger value="item-3">
            <AccordionTitle>Third Item</AccordionTitle>
            <AccordionIndicator value="item-3" />
          </AccordionTrigger>
          <AccordionContent value="item-3">Some value 3...</AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Individual accordion items can be disabled via the disabled prop on AccordionItem. Disabled items are visually dimmed and cannot be interacted with.",
      },
    },
  },
};
