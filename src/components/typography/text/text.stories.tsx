import type { Meta, StoryObj } from "@storybook/react-vite";
import Text from "./text";
import { AstralisProvider } from "../../../theme";

const meta: Meta<typeof Text> = {
  title: "Components/Typography/Text",
  component: Text,
  tags: ["autodocs"],
  argTypes: {
    element: {
      control: { type: "select" },
      options: [
        "h1",
        "h2",
        "h3",
        "h4",
        "h5",
        "h6",
        "p",
        "span",
        "strong",
        "b",
        "em",
        "i",
      ],
      description:
        "The HTML element to render the text as (e.g., heading, paragraph, or inline element).",
    },
    size: {
      control: { type: "select" },
      options: ["sm", "md", "lg", "xl", "2xl", "3xl", "4xl", "5xl", "6xl"],
      description:
        "The font size of the text, corresponding to Tailwind CSS size classes.",
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
      description:
        "The font weight of the text, corresponding to Tailwind CSS weight classes.",
    },
    align: {
      control: { type: "select" },
      options: ["left", "center", "right", "justify"],
      description:
        "The text alignment, controlling how the text is positioned horizontally.",
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
          "A versatile text component for rendering typography with customizable HTML elements, sizes, weights, and alignments.",
      },
    },
  },
  decorators: [
    (Story) => (
      <AstralisProvider>
        <div className="astralis-w-full">
          <Story />
        </div>
      </AstralisProvider>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof Text>;

// Sizes
export const Sizes: Story = {
  render: () => (
    <div>
      <Text size="sm">Text (sm)</Text>
      <Text size="md">Text (md)</Text>
      <Text size="lg">Text (lg)</Text>
      <Text size="xl">Text (xl)</Text>
      <Text size="2xl">Text (2xl)</Text>
      <Text size="3xl">Text (3xl)</Text>
      <Text size="4xl">Text (4xl)</Text>
      <Text size="5xl">Text (5xl)</Text>
      <Text size="6xl">Text (6xl)</Text>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "Use the size prop to change the size of the text component.",
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
  parameters: {
    docs: {
      description: {
        story:
          "Use the weight prop to change the weight of the text component.",
      },
    },
  },
};

// Alignment
export const Alignment: Story = {
  render: () => (
    <div className="astralis-w-[500px] astralis-flex astralis-flex-col astralis-gap-4 astralis-p-6 astralis-bg-gray-50 astralis-rounded-lg astralis-shadow-sm">
      <div className="astralis-p-4 astralis-bg-white astralis-rounded-md astralis-border astralis-border-gray-200">
        <Text align="left" size="lg">
          Text left
        </Text>
      </div>

      <div className="astralis-p-4 astralis-bg-white astralis-rounded-md astralis-border astralis-border-gray-200">
        <Text align="center" size="lg">
          Text center
        </Text>
      </div>

      <div className="astralis-p-4 astralis-bg-white astralis-rounded-md astralis-border astralis-border-gray-200">
        <Text align="right" size="lg">
          Text right
        </Text>
      </div>

      <div className="astralis-p-4 astralis-bg-white astralis-rounded-md astralis-border astralis-border-gray-200">
        <Text align="justify" size="lg">
          Text justify with a longer sentence to demonstrate the even spacing
          across the line
        </Text>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Use the align prop to change the alignment of the text component.",
      },
    },
  },
};

// AsAnotherElement
export const AsAnotherElement: Story = {
  render: () => (
    <div className="astralis-flex astralis-flex-col astralis-gap-5">
      <div>
        <Text element="h1">Element h1</Text>
        <Text element="h2">Element h2</Text>
        <Text element="h3">Element h3</Text>
        <Text element="h4">Element h4</Text>
        <Text element="h5">Element h5</Text>
        <Text element="h6">Element h6</Text>
        <Text element="p">Element p</Text>
      </div>

      <div>
        <Text weight="bold" size="xl" className="astralis-mb-1">
          Inline Elements
        </Text>
        <div className="astralis-space-x-3">
          <Text element="span">Element span</Text>
          <Text element="strong">Element strong</Text>
          <Text element="b">Element b</Text>
          <Text element="em">Element em</Text>
          <Text element="i">Element i</Text>
        </div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Use the element prop to render the text as another HTML element.",
      },
    },
  },
};

// Truncation
export const Truncation: Story = {
  render: () => (
    <div className="astralis-w-[400px] astralis-flex astralis-flex-col astralis-gap-3">
      <Text size="sm" className="astralis-text-content-secondary">
        Container width: 400px
      </Text>
      <Text truncate>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
        veniam, quis nostrud exercitation ullamco laboris.
      </Text>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Use the `truncate` prop to clip text after a single line with an ellipsis.",
      },
    },
  },
};

// LineClamp
export const LineClamp: Story = {
  render: () => (
    <div className="astralis-w-[400px] astralis-flex astralis-flex-col astralis-gap-5">
      {([2, 3, 4] as const).map((lines) => (
        <div key={lines}>
          <Text
            size="sm"
            className="astralis-text-content-secondary astralis-mb-1"
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
  parameters: {
    docs: {
      description: {
        story:
          "Use the `lineClamp` prop to truncate text after a given number of lines.",
      },
    },
  },
};
