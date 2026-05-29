import type { Meta, StoryObj } from "@storybook/react-vite";
import { Em } from "./em";
import { AstralisProvider } from "../../../theme";

const meta: Meta<typeof Em> = {
  title: "Components/Typography/Em",
  component: Em,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Em is used to mark text for semantic emphasis. It renders an `<em>` element and is typically displayed in italic. Use it inside prose to stress specific words.",
      },
    },
  },
  decorators: [
    (Story) => (
      <AstralisProvider>
        <div className="astralis-p-6">
          <Story />
        </div>
      </AstralisProvider>
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

/* ── In Context ──────────────────────────────────────────────────── */
export const InContext: Story = {
  render: () => (
    <div className="astralis-flex astralis-flex-col astralis-gap-3 astralis-max-w-md astralis-text-base astralis-leading-relaxed">
      <p>
        The <Em>design system</Em> is a collection of reusable UI elements that
        makes it easier to build consistent interfaces.
      </p>
      <p>
        You should <Em>always</Em> test your code before shipping to production.
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

/* ── Nested ──────────────────────────────────────────────────────── */
export const WithCustomClass: Story = {
  render: () => (
    <p className="astralis-text-base astralis-leading-relaxed">
      Use the{" "}
      <Em className="astralis-text-primary-600 dark:astralis-text-primary-400 astralis-font-medium">
        className
      </Em>{" "}
      prop to apply custom Tailwind or CSS classes to the emphasis element.
    </p>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Pass a `className` to customize the appearance beyond the default italic.",
      },
    },
  },
};
