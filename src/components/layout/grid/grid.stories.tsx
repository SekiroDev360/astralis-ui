import type { Meta, StoryObj } from "@storybook/react-vite";
import { Grid, GridItem } from "./index";
import { AstralisProvider } from "../../../theme";

const meta: Meta<typeof Grid> = {
  title: "Components/Layout/Grid",
  component: Grid,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "`Grid` is a CSS-grid layout primitive. Set `cols` (1–12) to define columns and `gap` for gutters. Use `Grid.Item` (or `GridItem`) to control how individual children span columns and rows via `colSpan`, `rowSpan`, `colStart` and `rowStart`.",
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
type Story = StoryObj<typeof Grid>;

// ─── Shared helpers ───────────────────────────────────────────────────────────

const Cell = ({
  children,
  highlight,
}: {
  children?: React.ReactNode;
  highlight?: boolean;
}) => (
  <div
    className={[
      "astralis-rounded-md astralis-px-4 astralis-py-6 astralis-text-sm astralis-font-medium astralis-text-center",
      highlight
        ? "astralis-bg-primary-100 astralis-text-primary-700"
        : "astralis-bg-surface-raised astralis-text-content-secondary astralis-border astralis-border-border-subtle",
    ].join(" ")}
  >
    {children}
  </div>
);

// ─── Basic Columns ────────────────────────────────────────────────────────────

/** A simple 3-column equal grid. */
export const BasicColumns: Story = {
  render: () => (
    <Grid cols={3} gap={4}>
      {Array.from({ length: 9 }, (_, i) => (
        <Cell key={i}>Col {i + 1}</Cell>
      ))}
    </Grid>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Set `cols` to any number 1–12. Each child automatically fills one column. Gap is controlled by the `gap` prop.",
      },
    },
  },
};

// ─── Column Variants ──────────────────────────────────────────────────────────

/** All supported column counts from 1 to 12. */
export const ColumnVariants: Story = {
  render: () => (
    <div className="astralis-flex astralis-flex-col astralis-gap-8">
      {([1, 2, 3, 4, 6, 12] as const).map((cols) => (
        <div key={cols}>
          <p className="astralis-text-xs astralis-text-content-tertiary astralis-mb-2 astralis-font-mono">
            cols={cols}
          </p>
          <Grid cols={cols} gap={2}>
            {Array.from({ length: cols }, (_, i) => (
              <Cell key={i}>{i + 1}</Cell>
            ))}
          </Grid>
        </div>
      ))}
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Common column counts. The grid adjusts dynamically — no custom CSS needed for any column count from 1 to 12.",
      },
    },
  },
};

// ─── Spanning ─────────────────────────────────────────────────────────────────

/** Grid.Item lets children span multiple columns. */
export const Spanning: Story = {
  render: () => (
    <Grid cols={4} gap={4}>
      <GridItem colSpan={2}>
        <Cell highlight>colSpan=2</Cell>
      </GridItem>
      <Cell>1</Cell>
      <Cell>1</Cell>
      <Cell>1</Cell>
      <GridItem colSpan={3}>
        <Cell highlight>colSpan=3</Cell>
      </GridItem>
      <Cell>1</Cell>
      <GridItem colSpan={4}>
        <Cell highlight>colSpan=4 (full row)</Cell>
      </GridItem>
    </Grid>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Wrap a child in `Grid.Item` (or `GridItem`) and set `colSpan` to make it span multiple columns. Mix spanned and normal cells freely.",
      },
    },
  },
};

// ─── Page Layout ──────────────────────────────────────────────────────────────

/** A realistic 12-column page layout: sidebar + main content + footer. */
export const PageLayout: Story = {
  render: () => (
    <Grid cols={12} gap={4}>
      {/* Top bar */}
      <GridItem colSpan={12}>
        <div className="astralis-rounded-md astralis-px-4 astralis-py-3 astralis-bg-primary-600 astralis-text-white astralis-text-sm astralis-font-semibold">
          Header / Navigation (12 cols)
        </div>
      </GridItem>

      {/* Sidebar */}
      <GridItem colSpan={3}>
        <div className="astralis-rounded-md astralis-px-4 astralis-py-6 astralis-bg-surface-raised astralis-border astralis-border-border-subtle astralis-text-sm astralis-text-content-secondary astralis-min-h-40 astralis-flex astralis-items-center astralis-justify-center">
          Sidebar (3 cols)
        </div>
      </GridItem>

      {/* Main */}
      <GridItem colSpan={9}>
        <div className="astralis-rounded-md astralis-px-4 astralis-py-6 astralis-bg-primary-50 astralis-border astralis-border-primary-200 astralis-text-sm astralis-font-medium astralis-text-primary-700 astralis-min-h-40 astralis-flex astralis-items-center astralis-justify-center">
          Main content (9 cols)
        </div>
      </GridItem>

      {/* Footer */}
      <GridItem colSpan={12}>
        <div className="astralis-rounded-md astralis-px-4 astralis-py-3 astralis-bg-surface-sunken astralis-border astralis-border-border-subtle astralis-text-xs astralis-text-content-tertiary astralis-text-center">
          Footer (12 cols)
        </div>
      </GridItem>
    </Grid>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Classic 12-column page structure: full-width header, 3-col sidebar + 9-col main, full-width footer. All built with `Grid` and `Grid.Item colSpan`.",
      },
    },
  },
};

// ─── Card Grid ────────────────────────────────────────────────────────────────

/** A 3-column card grid — a common dashboard or product listing pattern. */
export const CardGrid: Story = {
  render: () => {
    const cards = [
      {
        title: "Design System",
        body: "A unified library of reusable components and tokens.",
        badge: "Active",
      },
      {
        title: "Analytics",
        body: "Track engagement, retention and conversion at a glance.",
        badge: "Beta",
      },
      {
        title: "Integrations",
        body: "Connect your favourite tools in just a few clicks.",
        badge: "Active",
      },
      {
        title: "Notifications",
        body: "Stay on top of every event with smart digests.",
        badge: "New",
      },
      {
        title: "Access Control",
        body: "Granular roles and permissions for every team.",
        badge: "Active",
      },
      {
        title: "Audit Log",
        body: "A tamper-proof record of every action in the system.",
        badge: "Active",
      },
    ];

    return (
      <Grid cols={3} gap={4}>
        {cards.map((card) => (
          <div
            key={card.title}
            className="astralis-flex astralis-flex-col astralis-gap-2 astralis-p-4 astralis-rounded-xl astralis-border astralis-border-border-subtle astralis-bg-surface-raised"
          >
            <div className="astralis-flex astralis-items-center astralis-justify-between">
              <p className="astralis-text-sm astralis-font-semibold astralis-text-content-primary">
                {card.title}
              </p>
              <span
                className={[
                  "astralis-text-xs astralis-font-medium astralis-px-2 astralis-py-0.5 astralis-rounded-full",
                  card.badge === "New"
                    ? "astralis-bg-success-100 astralis-text-success-700"
                    : card.badge === "Beta"
                      ? "astralis-bg-warning-100 astralis-text-warning-700"
                      : "astralis-bg-primary-100 astralis-text-primary-700",
                ].join(" ")}
              >
                {card.badge}
              </span>
            </div>
            <p className="astralis-text-xs astralis-text-content-secondary astralis-leading-relaxed">
              {card.body}
            </p>
          </div>
        ))}
      </Grid>
    );
  },
  parameters: {
    docs: {
      description: {
        story:
          "A 3-column card grid — one of the most common dashboard patterns. Each card is a plain `div` inside the grid; no `GridItem` needed when children should be equal-width.",
      },
    },
  },
};
