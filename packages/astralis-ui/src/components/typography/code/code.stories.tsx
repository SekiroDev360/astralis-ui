import type { Meta, StoryObj } from "@storybook/react-vite";
import { Code } from "./code";

const meta: Meta<typeof Code> = {
  title: "Components/Typography/Code",
  component: Code,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Code is used to display inline code snippets. Supports `variant`, `size`, and `colorScheme` props.",
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
type Story = StoryObj<typeof Code>;

/* ── Default ──────────────────────────────────────────────────────── */
export const Default: Story = {
  args: { children: "console.log()" },
  parameters: {
    docs: {
      description: {
        story: "Default Code with `subtle` variant and `gray` color scheme.",
      },
    },
  },
};

/* ── Sizes ───────────────────────────────────────────────────────── */
export const Sizes: Story = {
  render: () => (
    <div className="astralis-flex astralis-items-center astralis-gap-4 astralis-flex-wrap">
      <Code size="sm">console.log()</Code>
      <Code size="md">console.log()</Code>
      <Code size="lg">console.log()</Code>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "Three sizes available: `sm`, `md` (default), `lg`.",
      },
    },
  },
};

/* ── Variants ────────────────────────────────────────────────────── */
export const Variants: Story = {
  render: () => (
    <div className="astralis-flex astralis-gap-4 astralis-flex-wrap astralis-items-center">
      <Code variant="subtle">subtle</Code>
      <Code variant="solid">solid</Code>
      <Code variant="outline">outline</Code>
      <Code variant="surface">surface</Code>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Four variants: `subtle` (tinted bg), `solid` (filled), `outline` (border only), `surface` (elevated surface).",
      },
    },
  },
};

/* ── Color Schemes ───────────────────────────────────────────────── */
export const ColorSchemes: Story = {
  render: () => (
    <div className="astralis-flex astralis-flex-col astralis-gap-6">
      {(["subtle", "outline"] as const).map((variant) => (
        <div key={variant}>
          <p className="astralis-text-xs astralis-text-content-secondary astralis-mb-2 astralis-font-mono">
            variant=&ldquo;{variant}&rdquo;
          </p>
          <div className="astralis-flex astralis-gap-3 astralis-flex-wrap astralis-items-center">
            {(
              [
                "gray",
                "brand",
                "success",
                "warning",
                "danger",
                "info",
              ] as const
            ).map((cs) => (
              <Code key={cs} variant={variant} colorScheme={cs}>
                {cs}
              </Code>
            ))}
          </div>
        </div>
      ))}
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Six color schemes: `gray`, `brand`, `success`, `warning`, `danger`, `info`.",
      },
    },
  },
};

/* ── In Context ──────────────────────────────────────────────────── */
export const InContext: Story = {
  render: () => (
    <div className="astralis-flex astralis-flex-col astralis-gap-3 astralis-max-w-md astralis-text-base astralis-leading-relaxed">
      <p>
        Use <Code>useState</Code> to manage local component state in React.
      </p>
      <p>
        The <Code colorScheme="brand">useEffect</Code> hook runs after every
        render by default.
      </p>
      <p>
        Call{" "}
        <Code variant="outline" colorScheme="success">
          npm install
        </Code>{" "}
        to install dependencies.
      </p>
      <p>
        Never commit your{" "}
        <Code variant="solid" colorScheme="danger">
          .env
        </Code>{" "}
        file to version control.
      </p>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "Code used inline within prose text — the most common use case.",
      },
    },
  },
};
