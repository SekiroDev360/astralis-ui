import type { Meta, StoryObj } from "@storybook/react-vite";
import { Container } from "./index";
import { AstralisProvider } from "../../../theme";

const meta: Meta<typeof Container> = {
  title: "Components/Layout/Container",
  component: Container,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "`Container` is a centred, max-width-constrained wrapper with consistent horizontal padding. Choose a `size` that maps to a standard breakpoint max-width — from `sm` (640 px) through `xl` (1280 px) — or use `full` for no cap. Set `centered={false}` to left-align instead.",
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
type Story = StoryObj<typeof Container>;

// ─── Sizes ────────────────────────────────────────────────────────────────────

const SizeMap: Record<string, string> = {
  sm: "640px",
  md: "768px",
  lg: "1024px",
  xl: "1280px",
  full: "100%",
};

/** All five container sizes — the ruler band shows how max-width is constrained. */
export const Sizes: Story = {
  render: () => (
    <div className="astralis-flex astralis-flex-col astralis-gap-3 astralis-bg-surface-sunken astralis-p-4 astralis-rounded-lg">
      {(["sm", "md", "lg", "xl", "full"] as const).map((size) => (
        <div key={size} className="astralis-relative">
          {/* full-width band so you can see how the container constrains */}
          <div className="astralis-w-full astralis-h-11 astralis-rounded-md astralis-bg-border-subtle/30 astralis-absolute astralis-inset-0" />
          <Container size={size} className="astralis-relative">
            <div className="astralis-h-11 astralis-rounded-md astralis-bg-primary-100 astralis-border astralis-border-primary-300 astralis-flex astralis-items-center astralis-px-4 astralis-justify-between">
              <code className="astralis-text-xs astralis-font-mono astralis-text-primary-700">
                size=&quot;{size}&quot;
              </code>
              <span className="astralis-text-xs astralis-text-primary-500">
                max-w: {SizeMap[size]}
              </span>
            </div>
          </Container>
        </div>
      ))}
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Five sizes map to standard breakpoint max-widths. The dimmed full-width band in each row shows how the container constrains its content relative to the viewport.",
      },
    },
  },
};

// ─── Default ──────────────────────────────────────────────────────────────────

/** The medium container — a comfortable default for most page content. */
export const Default: Story = {
  render: () => (
    <Container size="md">
      <div className="astralis-bg-primary-50 astralis-border astralis-border-primary-200 astralis-rounded-lg astralis-p-6">
        <p className="astralis-text-sm astralis-font-mono astralis-text-primary-700 astralis-mb-1">
          {'<Container size="md" />'}
        </p>
        <p className="astralis-text-xs astralis-text-content-tertiary">
          Content fills the available space within the container.
        </p>
      </div>
    </Container>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'A `size="md"` container (max-width 768 px) centred in the viewport — a sensible default for article or form layouts.',
      },
    },
  },
};

// ─── Not Centred ──────────────────────────────────────────────────────────────

/** Left-aligned container when centering is not desired. */
export const NotCentered: Story = {
  render: () => (
    <Container size="sm" centered={false}>
      <div className="astralis-bg-primary-50 astralis-border astralis-border-primary-200 astralis-rounded-lg astralis-p-4">
        <p className="astralis-text-sm astralis-font-mono astralis-text-primary-700 astralis-mb-1">
          {'<Container size="sm" centered={false} />'}
        </p>
        <p className="astralis-text-xs astralis-text-content-tertiary">
          Left-aligned — max-width is capped but margin-auto is not applied.
        </p>
      </div>
    </Container>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Set `centered={false}` to keep the container left-aligned while still applying its max-width cap. Useful for sidebar or panel content.",
      },
    },
  },
};
