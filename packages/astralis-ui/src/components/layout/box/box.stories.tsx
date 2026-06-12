import type { Meta, StoryObj } from "@storybook/react-vite";
import { Box } from "./index";
import { AstralisProvider } from "../../../theme";

const meta: Meta<typeof Box> = {
  title: "Components/Layout/Box",
  component: Box,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "`Box` is the foundational layout primitive — a polymorphic `div` wrapper with no visual opinions. Every other layout component builds on this zero-abstraction philosophy. Use it to apply spacing, background, border, or any utility directly via `className`, and swap its rendered tag with the `as` prop for semantic HTML.",
      },
    },
  },
  decorators: [
    (Story) => (
      <AstralisProvider>
        <Story />
      </AstralisProvider>
    ),
  ],
};
export default meta;
type Story = StoryObj<typeof Box>;

// ─── Default ──────────────────────────────────────────────────────────────────

/** A Box used as a card shell — padding, background, border and radius all via className. */
export const Default: Story = {
  render: () => (
    <Box className="astralis-w-80 astralis-p-6 astralis-bg-surface-raised astralis-rounded-xl astralis-border astralis-border-stroke-subtle astralis-shadow-sm">
      <p className="astralis-text-sm astralis-font-semibold astralis-text-content-primary astralis-mb-1">
        Notification
      </p>
      <p className="astralis-text-sm astralis-text-content-secondary">
        Your report has been generated and is ready to download.
      </p>
    </Box>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Box as a card shell. Padding, background, border and border-radius are applied via `className` — Box itself has zero opinions.",
      },
    },
  },
};

// ─── Polymorphic ──────────────────────────────────────────────────────────────

/** The `as` prop renders Box as any HTML element — div, section, article, nav, or aside. */
export const Polymorphic: Story = {
  render: () => (
    <div className="astralis-flex astralis-flex-col astralis-gap-3 astralis-w-80">
      {(
        [
          { tag: "div", note: "Generic block container (default)" },
          { tag: "section", note: "Standalone page section" },
          { tag: "article", note: "Self-contained content (posts, cards)" },
          { tag: "nav", note: "Navigation landmark" },
          { tag: "aside", note: "Supplementary / sidebar content" },
        ] as const
      ).map(({ tag, note }) => (
        <Box
          key={tag}
          as={tag}
          className="astralis-flex astralis-items-center astralis-gap-3 astralis-px-4 astralis-py-3 astralis-bg-surface-raised astralis-border astralis-border-stroke-subtle astralis-rounded-lg"
        >
          <code className="astralis-text-sm astralis-font-mono astralis-text-primary-600 astralis-shrink-0">
            &lt;{tag}&gt;
          </code>
          <span className="astralis-text-xs astralis-text-content-tertiary">
            {note}
          </span>
        </Box>
      ))}
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Pass any valid HTML tag to `as` and Box will render that element — all HTML attributes for that element are then fully type-safe.",
      },
    },
  },
};

// ─── Spacing ──────────────────────────────────────────────────────────────────

/** Layering spacing utilities on Box — padding, margin and gap via Tailwind. */
export const Spacing: Story = {
  render: () => (
    <div className="astralis-flex astralis-flex-col astralis-gap-6 astralis-w-80">
      {(
        [
          { label: "p-2 (8px)", cls: "astralis-p-2" },
          { label: "p-4 (16px)", cls: "astralis-p-4" },
          { label: "p-6 (24px)", cls: "astralis-p-6" },
          { label: "p-8 (32px)", cls: "astralis-p-8" },
        ] as const
      ).map(({ label, cls }) => (
        <div key={label}>
          <p className="astralis-text-xs astralis-font-mono astralis-text-content-tertiary astralis-mb-1">
            className=&quot;{cls}&quot;
          </p>
          <Box
            className={`${cls} astralis-bg-primary-50 astralis-border astralis-border-primary-200 astralis-rounded-md`}
          >
            <div className="astralis-bg-primary-200 astralis-rounded astralis-h-6 astralis-flex astralis-items-center astralis-justify-center">
              <span className="astralis-text-xs astralis-text-primary-700 astralis-font-medium">
                {label}
              </span>
            </div>
          </Box>
        </div>
      ))}
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Box is intentionally unstyled — use Tailwind utilities via `className` to apply any spacing, color, or layout you need.",
      },
    },
  },
};
