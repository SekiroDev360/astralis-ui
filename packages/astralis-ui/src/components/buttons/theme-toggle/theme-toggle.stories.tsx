import type { Meta, StoryObj } from "@storybook/react-vite";
import { ThemeToggle } from "./theme-toggle";
import { AstralisProvider } from "../../../theme";

const meta: Meta<typeof ThemeToggle> = {
  title: "Components/Buttons/ThemeToggle",
  component: ThemeToggle,
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: { type: "select" },
      options: ["solid", "subtle", "surface", "outline", "text", "link"],
      description: "The visual style variant of the button",
    },
    colorScheme: {
      control: { type: "select" },
      options: ["brand", "gray", "red", "orange", "yellow", "green", "teal", "blue", "cyan", "purple", "pink"],
      description: "Hue the underlying Button paints with",
    },
    size: {
      control: { type: "select" },
      options: ["xs", "sm", "md", "lg", "xl"],
      description: "The size of the button",
    },
    showLabel: {
      control: { type: "boolean" },
      description: "Whether the button shows a text label next to the icon",
    },
    disabled: {
      control: { type: "boolean" },
      description: "Whether the button is disabled",
    },
  },
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "An out-of-the-box theme toggle button component that automatically integrates with the library's theme system and transitions cleanly between light and dark modes.",
      },
    },
  },
  decorators: [
    (Story) => (
      <AstralisProvider>
        <div style={{ padding: "2rem" }}>
          <Story />
        </div>
      </AstralisProvider>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof ThemeToggle>;

export const Default: Story = {
  args: {
    variant: "outline",
    size: "md",
    showLabel: false,
  },
};

export const WithLabel: Story = {
  args: {
    variant: "outline",
    size: "md",
    showLabel: true,
  },
};

export const Ghost: Story = {
  args: {
    variant: "text",
    size: "md",
    showLabel: false,
  },
  parameters: {
    docs: { description: { story: "The `text` (ghost) variant — no chrome until hover." } },
  },
};

export const Sizes: Story = {
  render: () => (
    <div className="astralis:flex astralis:items-center astralis:gap-4">
      <ThemeToggle size="xs" />
      <ThemeToggle size="sm" />
      <ThemeToggle size="md" />
      <ThemeToggle size="lg" />
      <ThemeToggle size="xl" />
    </div>
  ),
};
