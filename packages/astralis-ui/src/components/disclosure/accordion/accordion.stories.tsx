import type { Meta, StoryObj } from "@storybook/react-vite";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
  AccordionIndicator,
  AccordionTitle,
} from "./index";
import { AstralisProvider } from "../../../theme";
import React from "react";

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
      <AstralisProvider>
        <div className="astralis-w-full astralis-max-w-md astralis-p-4">
          <Story />
        </div>
      </AstralisProvider>
    ),
  ],
};

export default meta;
type Story = StoryObj;

export const Basic: Story = {
  render: () => (
    <Accordion collapsible>
      <AccordionItem value="item-1">
        <AccordionTrigger value="item-1">
          <AccordionTitle>What is Astralis?</AccordionTitle>
          <AccordionIndicator value="item-1" />
        </AccordionTrigger>
        
        <AccordionContent value="item-1">
          Astralis is a modern UI library built with React, TypeScript, and Tailwind.
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

export const Multiple: Story = {
  render: () => (
    <Accordion type="multiple" defaultValue={["item-1"]}>
      <AccordionItem value="item-1">
        <AccordionTrigger value="item-1">
          First section
          <AccordionIndicator value="item-1" />
        </AccordionTrigger>
        <AccordionContent value="item-1">
          This section is open by default.
        </AccordionContent>
      </AccordionItem>

      <AccordionItem value="item-2">
        <AccordionTrigger value="item-2">
          Second section
          <AccordionIndicator value="item-2" />
        </AccordionTrigger>
        <AccordionContent value="item-2">
          Multiple sections can remain open simultaneously.
        </AccordionContent>
      </AccordionItem>
    </Accordion>
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

export const Controlled: Story = {
  render: () => {
    const [value, setValue] = React.useState<string>("item-1");

    return (
      <Accordion value={value} onValueChange={(val) => setValue(val as string)}>
        <AccordionItem value="item-1">
          <AccordionTrigger value="item-1">
            Controlled item 1
            <AccordionIndicator value="item-1" />
          </AccordionTrigger>
          <AccordionContent value="item-1">
            Currently open: {value}
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-2">
          <AccordionTrigger value="item-2">
            Controlled item 2
            <AccordionIndicator value="item-2" />
          </AccordionTrigger>
          <AccordionContent value="item-2">
            Clicking updates external state.
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    );
  },
  parameters: {
    docs: {
      description: {
        story:
          "A controlled accordion where the open state is managed externally via React state.",
      },
    },
  },
};

export const WithoutIndicator: Story = {
  render: () => (
    <Accordion>
      <AccordionItem value="item-1">
        <AccordionTrigger value="item-1">
          Simple trigger without indicator
        </AccordionTrigger>
        <AccordionContent value="item-1">
          The indicator component is optional and fully customizable.
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Accordion usage without the indicator component, demonstrating full control over layout and visuals.",
      },
    },
  },
};
