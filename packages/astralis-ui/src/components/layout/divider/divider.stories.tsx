import type { Meta, StoryObj } from "@storybook/react-vite";
import { Divider } from "./index";
import { AstralisProvider } from "../../../theme";

const meta: Meta<typeof Divider> = {
  title: "Components/Layout/Divider",
  component: Divider,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "`Divider` renders a semantic separator between sections of content. It supports `horizontal` and `vertical` orientations, an optional centred `label`, and three line styles: `solid`, `dashed`, and `dotted`.",
      },
    },
  },
  decorators: [
    (Story) => (
      <AstralisProvider>
        <div className="astralis-p-4">
          <Story />
        </div>
      </AstralisProvider>
    ),
  ],
};
export default meta;
type Story = StoryObj<typeof Divider>;

// ─── Horizontal ───────────────────────────────────────────────────────────────

/** Default horizontal divider between two blocks of content. */
export const Horizontal: Story = {
  render: () => (
    <div className="astralis-flex astralis-flex-col astralis-gap-4 astralis-p-6 astralis-bg-surface-raised astralis-rounded-lg astralis-w-80">
      <p className="astralis-text-sm astralis-text-content-primary">
        Above the divider
      </p>
      <Divider />
      <p className="astralis-text-sm astralis-text-content-primary">
        Below the divider
      </p>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "The default `Divider` renders a full-width horizontal rule using the design system's `border-subtle` colour token.",
      },
    },
  },
};

// ─── With Label ────────────────────────────────────────────────────────────────

/** Divider with a centred label — classic auth-form separator. */
export const WithLabel: Story = {
  render: () => (
    <div className="astralis-flex astralis-flex-col astralis-gap-4 astralis-p-6 astralis-bg-surface-raised astralis-rounded-xl astralis-border astralis-border-stroke-subtle astralis-w-80">
      <div className="astralis-flex astralis-flex-col astralis-gap-3">
        <p className="astralis-text-sm astralis-font-semibold astralis-text-content-primary">
          Sign in
        </p>
        <div className="astralis-h-9 astralis-rounded-md astralis-border astralis-border-stroke-subtle astralis-bg-surface-base astralis-flex astralis-items-center astralis-px-3">
          <span className="astralis-text-sm astralis-text-content-tertiary">
            you@example.com
          </span>
        </div>
      </div>

      <Divider label="Or continue with" />

      <div className="astralis-flex astralis-flex-col astralis-gap-2">
        {["Google", "GitHub"].map((provider) => (
          <button
            key={provider}
            className="astralis-h-9 astralis-w-full astralis-rounded-md astralis-border astralis-border-stroke-subtle astralis-bg-surface-raised astralis-text-sm astralis-font-medium astralis-text-content-primary hover:astralis-bg-surface-sunken astralis-transition-colors"
          >
            Continue with {provider}
          </button>
        ))}
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Pass a `label` string to render centred text in the divider line — the classic 'Or continue with' auth-form pattern.",
      },
    },
  },
};

// ─── Variants ─────────────────────────────────────────────────────────────────

/** Three border styles: solid (default), dashed, dotted. */
export const Variants: Story = {
  render: () => (
    <div className="astralis-flex astralis-flex-col astralis-gap-6 astralis-p-6 astralis-w-80">
      {(["solid", "dashed", "dotted"] as const).map((variant) => (
        <div key={variant}>
          <p className="astralis-text-xs astralis-text-content-tertiary astralis-mb-3 astralis-font-mono">
            variant=&quot;{variant}&quot;
          </p>
          <Divider variant={variant} label={variant} />
        </div>
      ))}
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Three `variant` options control the border style: `solid` (default), `dashed`, and `dotted`.",
      },
    },
  },
};

// ─── Vertical ─────────────────────────────────────────────────────────────────

/** Vertical divider — ideal for breadcrumbs and inline nav links. */
export const Vertical: Story = {
  render: () => (
    <div className="astralis-flex astralis-items-center astralis-gap-4 astralis-p-6 astralis-bg-surface-raised astralis-rounded-lg astralis-h-14">
      {["Home", "Products", "About", "Contact"].map((label, i, arr) => (
        <div
          key={label}
          className="astralis-flex astralis-items-center astralis-gap-4"
        >
          <span className="astralis-text-sm astralis-text-content-primary astralis-whitespace-nowrap">
            {label}
          </span>
          {i < arr.length - 1 && <Divider orientation="vertical" />}
        </div>
      ))}
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'Set `orientation="vertical"` for inline separators. The divider inherits the line height of its parent container.',
      },
    },
  },
};
