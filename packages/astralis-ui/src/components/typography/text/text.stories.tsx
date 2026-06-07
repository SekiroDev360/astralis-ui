import type { Meta, StoryObj } from "@storybook/react-vite";
import Text from "./text";

const meta: Meta<typeof Text> = {
  title: "Components/Typography/Text",
  component: Text,
  tags: ["autodocs"],
  argTypes: {
    as: {
      control: { type: "text" },
      description: "The HTML element or React component to render the text as.",
      table: {
        defaultValue: { summary: "p" },
      },
    },
    element: {
      control: { type: "text" },
      description: "Legacy prop for rendering HTML element (deprecated).",
    },
    size: {
      control: { type: "select" },
      options: ["xs", "sm", "md", "lg", "xl", "2xl", "3xl", "4xl", "5xl", "6xl", "7xl", "8xl", "9xl"],
      description: "The font size of the text, corresponding to Tailwind CSS size classes.",
    },
    weight: {
      control: { type: "select" },
      options: [
        "thin",
        "extralight",
        "light",
        "normal",
        "medium",
        "semibold",
        "bold",
        "extrabold",
        "black",
      ],
      description: "The font weight of the text, corresponding to Tailwind CSS weight classes.",
    },
    align: {
      control: { type: "select" },
      options: ["left", "center", "right", "justify"],
      description: "The text alignment, controlling how the text is positioned horizontally.",
    },
    color: {
      control: { type: "select" },
      options: ["base", "muted", "subtle", "inverted", "warning", "error", "success", "info"],
      description: "The color of the text, pointing to design token styles.",
    },
    casing: {
      control: { type: "select" },
      options: ["uppercase", "lowercase", "capitalize", "normal-case"],
      description: "The casing / text-transform of the text.",
    },
    gutterBottom: {
      control: { type: "boolean" },
      description: "If true, adds a bottom margin of 0.5rem.",
    },
    paragraph: {
      control: { type: "boolean" },
      description: "If true, renders a paragraph with a bottom margin of 1rem.",
    },
    truncate: {
      control: { type: "boolean" },
      description: "Truncate text with an ellipsis after a single line.",
    },
    lineClamp: {
      control: { type: "number" },
      description: "Clamp text to N lines with an ellipsis.",
    },
    children: {
      control: { type: "text" },
      description: "Text content",
    },
  },
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "A versatile text component for rendering typography with customizable HTML elements, sizes, weights, alignments, and styling presets.",
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
type Story = StoryObj<typeof Text>;
// Sizes
export const Sizes: Story = {
  render: () => (
    <div className="astralis-flex astralis-flex-col astralis-gap-2">
      <Text size="xs">Text (xs)</Text>
      <Text size="sm">Text (sm)</Text>
      <Text size="md">Text (md)</Text>
      <Text size="lg">Text (lg)</Text>
      <Text size="xl">Text (xl)</Text>
      <Text size="2xl">Text (2xl)</Text>
      <Text size="3xl">Text (3xl)</Text>
      <Text size="4xl">Text (4xl)</Text>
      <Text size="5xl">Text (5xl)</Text>
      <Text size="6xl">Text (6xl)</Text>
      <Text size="7xl">Text (7xl)</Text>
      <Text size="8xl">Text (8xl)</Text>
      <Text size="9xl">Text (9xl)</Text>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "Use the size prop to choose a scale from xs to 9xl.",
      },
    },
  },
};
// Weights
export const Weights: Story = {
  render: () => (
    <div className="astralis-flex astralis-flex-wrap astralis-gap-5">
      <Text weight="thin">Text (thin)</Text>
      <Text weight="extralight">Text (extralight)</Text>
      <Text weight="light">Text (light)</Text>
      <Text weight="normal">Text (normal)</Text>
      <Text weight="medium">Text (medium)</Text>
      <Text weight="semibold">Text (semibold)</Text>
      <Text weight="bold">Text (bold)</Text>
      <Text weight="extrabold">Text (extrabold)</Text>
      <Text weight="black">Text (black)</Text>
    </div>
  ),
};
// Colors
export const Colors: Story = {
  render: () => (
    <div className="astralis-flex astralis-flex-col astralis-gap-3">
      <Text color="base">Base Color (astralis-text-label-base)</Text>
      <Text color="muted">Muted Color (astralis-text-label-muted)</Text>
      <Text color="subtle">Subtle Color (astralis-text-label-subtle)</Text>
      <Text color="info">Info Color (astralis-text-label-info)</Text>
      <Text color="success">Success Color (astralis-text-label-success)</Text>
      <Text color="warning">Warning Color (astralis-text-label-warning)</Text>
      <Text color="error">Error Color (astralis-text-label-error)</Text>
      
      <div className="astralis-bg-gray-900 astralis-p-4 astralis-rounded-md">
        <Text color="inverted">Inverted Color (astralis-text-label-inverted)</Text>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "The color prop points directly to our theme semantic design tokens.",
      },
    },
  },
};
// Casings
export const Casings: Story = {
  render: () => (
    <div className="astralis-flex astralis-flex-col astralis-gap-2">
      <Text casing="uppercase">uppercase text example</Text>
      <Text casing="lowercase">LOWERCASE TEXT EXAMPLE</Text>
      <Text casing="capitalize">capitalize text example</Text>
      <Text casing="normal-case">Normal Case Example</Text>
    </div>
  ),
};
// LayoutSpacing
export const LayoutSpacing: Story = {
  render: () => (
    <div className="astralis-max-w-[500px]">
      <Text size="2xl" weight="bold" gutterBottom>
        This title has gutterBottom
      </Text>
      <Text paragraph>
        This paragraph has paragraph spacing enabled. It renders as a p element and adds margin to the bottom, pushing subsequent text down automatically.
      </Text>
      <Text paragraph>
        This is another paragraph following it. Using layout properties creates a natural vertical rhythm in articles and forms without needing custom spacing classes.
      </Text>
    </div>
  ),
};
// Polymorphism
export const Polymorphism: Story = {
  render: () => (
    <div className="astralis-flex astralis-flex-col astralis-gap-4">
      <div>
        <Text as="kbd">Ctrl + C</Text>
      </div>
      <div>
        <Text as="abbr" title="HyperText Markup Language">HTML</Text>
      </div>
      <div>
        <Text as="cite">Source Citation</Text>
      </div>
      <div>
        <Text as="a" href="https://google.com" target="_blank" className="astralis-text-brand-600 hover:astralis-underline">
          Rendered as anchor (a tag)
        </Text>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "Use the `as` prop to render as any HTML tag or React component while inheriting theme fonts and colors.",
      },
    },
  },
};
// AsLegacyElement (testing backwards compatibility)
export const AsLegacyElement: Story = {
  render: () => (
    <div className="astralis-flex astralis-flex-col astralis-gap-5">
      <div>
        <Text element="h1">Legacy h1</Text>
        <Text element="h2">Legacy h2</Text>
        <Text element="h3">Legacy h3</Text>
        <Text element="h4">Legacy h4</Text>
        <Text element="h5">Legacy h5</Text>
        <Text element="h6">Legacy h6</Text>
        <Text element="p">Legacy p</Text>
      </div>
      <div>
        <Text weight="bold" size="xl" className="astralis-mb-1">
          Legacy Inline Elements
        </Text>
        <div className="astralis-space-x-3">
          <Text element="span">Legacy span</Text>
          <Text element="strong">Legacy strong</Text>
          <Text element="b">Legacy b</Text>
          <Text element="em">Legacy em</Text>
          <Text element="i">Legacy i</Text>
        </div>
      </div>
    </div>
  ),
};
// Truncation
export const Truncation: Story = {
  render: () => (
    <div className="astralis-w-[400px] astralis-flex astralis-flex-col astralis-gap-3">
      <Text size="sm" color="muted">
        Container width: 400px
      </Text>
      <Text truncate>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
        veniam, quis nostrud exercitation ullamco laboris.
      </Text>
    </div>
  ),
};
// LineClamp
export const LineClamp: Story = {
  render: () => (
    <div className="astralis-w-[400px] astralis-flex astralis-flex-col astralis-gap-5">
      {([2, 3, 4] as const).map((lines) => (
        <div key={lines}>
          <Text
            size="sm"
            color="muted"
            className="astralis-mb-1"
          >
            lineClamp={lines}
          </Text>
          <Text lineClamp={lines}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur.
          </Text>
        </div>
      ))}
    </div>
  ),
};
