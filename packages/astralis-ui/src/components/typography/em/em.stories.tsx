import type { Meta, StoryObj } from "@storybook/react-vite";
import { Em } from "./em";

const meta: Meta<typeof Em> = {
  title: "Components/Typography/Em",
  component: Em,
  tags: ["autodocs"],
  argTypes: {
    color: {
      control: { type: "select" },
      options: ["base", "muted", "subtle", "inverted", "warning", "error", "success", "info"],
      description: "The text color, corresponding to theme label variables.",
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
      description: "The font weight.",
    },
    size: {
      control: { type: "select" },
      options: ["xs", "sm", "md", "lg", "xl", "2xl", "3xl", "4xl", "5xl", "6xl", "7xl", "8xl", "9xl"],
      description: "The font size scale.",
    },
  },
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Em is used to mark text for semantic emphasis. It renders an `<em>` element and is typically displayed in italic. " +
          "Supports `color`, `weight`, and `size` prop overrides.",
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
type Story = StoryObj<typeof Em>;
/* ── Default ──────────────────────────────────────────────────────── */
export const Default: Story = {
  args: { children: "emphasized text" },
  parameters: {
    docs: {
      description: { story: "A simple `Em` component rendered standalone." },
    },
  },
};
/* ── Colors ───────────────────────────────────────────────────────── */
export const Colors: Story = {
  render: () => (
    <div className="astralis-flex astralis-flex-col astralis-gap-2">
      <p>This is <Em color="base">base emphasized</Em> text.</p>
      <p>This is <Em color="muted">muted emphasized</Em> text.</p>
      <p>This is <Em color="subtle">subtle emphasized</Em> text.</p>
      <p>This is <Em color="info">info emphasized</Em> text.</p>
      <p>This is <Em color="success">success emphasized</Em> text.</p>
      <p>This is <Em color="warning">warning emphasized</Em> text.</p>
      <p>This is <Em color="error">error emphasized</Em> text.</p>
    </div>
  ),
};
/* ── Weights ──────────────────────────────────────────────────────── */
export const Weights: Story = {
  render: () => (
    <div className="astralis-flex astralis-flex-col astralis-gap-2">
      <p><Em weight="thin">thin emphasized</Em></p>
      <p><Em weight="normal">normal emphasized</Em></p>
      <p><Em weight="medium">medium emphasized</Em></p>
      <p><Em weight="semibold">semibold emphasized</Em></p>
      <p><Em weight="bold">bold emphasized</Em></p>
      <p><Em weight="black">black emphasized</Em></p>
    </div>
  ),
};
/* ── Sizes ────────────────────────────────────────────────────────── */
export const Sizes: Story = {
  render: () => (
    <div className="astralis-flex astralis-flex-col astralis-gap-2">
      <Em size="xs">Em (xs)</Em>
      <Em size="sm">Em (sm)</Em>
      <Em size="md">Em (md)</Em>
      <Em size="lg">Em (lg)</Em>
      <Em size="xl">Em (xl)</Em>
      <Em size="2xl">Em (2xl)</Em>
      <Em size="3xl">Em (3xl)</Em>
    </div>
  ),
};
/* ── In Context ──────────────────────────────────────────────────── */
export const InContext: Story = {
  render: () => (
    <div className="astralis-flex astralis-flex-col astralis-gap-3 astralis-max-w-md astralis-text-base astralis-leading-relaxed">
      <p>
        The <Em>design system</Em> is a collection of reusable UI elements that
        makes it easier to build consistent interfaces.
      </p>
      <p>
        You should <Em color="error" weight="bold">always</Em> test your code before shipping to production.
      </p>
      <p>
        This component renders a <Em>semantic</Em> HTML{" "}
        <code className="astralis-text-sm astralis-bg-gray-100 dark:astralis-bg-gray-800 astralis-px-1 astralis-rounded astralis-font-mono">
          &lt;em&gt;
        </code>{" "}
        element, which communicates emphasis to screen readers.
      </p>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "`Em` works best inline within paragraphs to draw attention to key words.",
      },
    },
  },
};
/* ── Custom Styling ───────────────────────────────────────────────── */
export const CustomStyling: Story = {
  render: () => (
    <p className="astralis-text-base astralis-leading-relaxed">
      Use the{" "}
      <Em className="astralis-text-brand-600 dark:astralis-text-brand-400 astralis-font-semibold">
        className
      </Em>{" "}
      prop to apply custom Tailwind or CSS classes directly.
    </p>
  ),
};
