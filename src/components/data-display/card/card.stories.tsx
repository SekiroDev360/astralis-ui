import type { Meta, StoryObj } from "@storybook/react-vite";
import { Card } from "./index";
import { AstralisProvider } from "../../../theme";

const meta: Meta<typeof Card> = {
  title: "Components/Data Display/Card",
  component: Card,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "Card is a flexible container for grouping related content. " +
          "Use `Card.Root` as the wrapper, with `Card.Header`, `Card.Body`, and `Card.Footer` sub-sections. " +
          "The `Card.Header` supports an `extra` slot for actions. Variants control the visual style; sizes control padding.",
      },
    },
  },
  decorators: [
    (Story) => (
      <AstralisProvider>
        <div className="astralis-p-6 astralis-max-w-3xl">
          <Story />
        </div>
      </AstralisProvider>
    ),
  ],
};
export default meta;
type Story = StoryObj<typeof Card>;

/* ── Default ────────────────────────────────────────────────────── */
export const Default: Story = {
  render: () => (
    <Card.Root className="astralis-max-w-sm">
      <Card.Header>
        <Card.Title>Getting Started</Card.Title>
        <Card.Description>
          Everything you need to build powerful UIs with Astralis.
        </Card.Description>
      </Card.Header>
      <Card.Body>
        <p className="astralis-text-sm astralis-text-content-secondary">
          Explore components, layouts, and design tokens. The library ships with
          full dark-mode support and a scalable Tailwind design system.
        </p>
      </Card.Body>
      <Card.Footer>
        <button className="astralis-text-sm astralis-font-medium astralis-text-primary-600 dark:astralis-text-primary-400 hover:astralis-underline">
          Read docs →
        </button>
      </Card.Footer>
    </Card.Root>
  ),
  parameters: {
    docs: {
      description: {
        story: "Default `elevated` variant card with Header, Body, and Footer.",
      },
    },
  },
};

/* ── Variants ────────────────────────────────────────────────────── */
export const Variants: Story = {
  render: () => (
    <div className="astralis-grid astralis-grid-cols-1 astralis-gap-4 md:astralis-grid-cols-2">
      {(["elevated", "outline", "filled", "unstyled"] as const).map((v) => (
        <Card.Root key={v} variant={v}>
          <Card.Header>
            <Card.Title className="astralis-capitalize">{v}</Card.Title>
            <Card.Description>variant="{v}"</Card.Description>
          </Card.Header>
          <Card.Body>
            <p className="astralis-text-sm astralis-text-content-secondary">
              Card body content goes here.
            </p>
          </Card.Body>
        </Card.Root>
      ))}
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Four variants: `elevated` (shadow + border), `outline` (border only), `filled` (sunken bg), `unstyled` (bare).",
      },
    },
  },
};

/* ── Sizes ────────────────────────────────────────────────────────── */
export const Sizes: Story = {
  render: () => (
    <div className="astralis-flex astralis-flex-col astralis-gap-4">
      {(["sm", "md", "lg"] as const).map((s) => (
        <Card.Root key={s} size={s} className="astralis-max-w-sm">
          <Card.Header>
            <Card.Title>Size: {s}</Card.Title>
            <Card.Description>size="{s}"</Card.Description>
          </Card.Header>
          <Card.Body>
            <p className="astralis-text-sm astralis-text-content-secondary">
              Padding and border-radius scale with size.
            </p>
          </Card.Body>
        </Card.Root>
      ))}
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "Three sizes (`sm`, `md`, `lg`) that scale padding and radius.",
      },
    },
  },
};

/* ── With Header Extra ───────────────────────────────────────────── */
export const WithHeaderExtra: Story = {
  render: () => (
    <Card.Root className="astralis-max-w-sm">
      <Card.Header
        extra={
          <button className="astralis-text-xs astralis-text-primary-600 dark:astralis-text-primary-400 hover:astralis-underline astralis-font-medium">
            View all
          </button>
        }
      >
        <Card.Title>Recent Activity</Card.Title>
        <Card.Description>Last 7 days</Card.Description>
      </Card.Header>
      <Card.Body>
        <ul className="astralis-flex astralis-flex-col astralis-gap-2">
          {["Deployed v2.1.0", "Fixed auth bug", "Added dark mode"].map(
            (item, i) => (
              <li
                key={i}
                className="astralis-flex astralis-items-center astralis-gap-2 astralis-text-sm astralis-text-content-secondary"
              >
                <span className="astralis-h-1.5 astralis-w-1.5 astralis-rounded-full astralis-bg-primary-500 astralis-shrink-0" />
                {item}
              </li>
            ),
          )}
        </ul>
      </Card.Body>
    </Card.Root>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Pass a `extra` prop to `Card.Header` to render a trailing action slot — the header gets a bottom border when `extra` is present.",
      },
    },
  },
};

/* ── Hoverable ──────────────────────────────────────────────────── */
export const Hoverable: Story = {
  render: () => (
    <div className="astralis-flex astralis-gap-4 astralis-flex-wrap">
      {[
        {
          title: "Design System",
          desc: "Tokens, colours, and typography",
          icon: "🎨",
        },
        {
          title: "Components",
          desc: "50+ production-ready components",
          icon: "🧩",
        },
        {
          title: "Dark Mode",
          desc: "Full dark theme out of the box",
          icon: "🌙",
        },
      ].map((item) => (
        <Card.Root
          key={item.title}
          hoverable
          className="astralis-w-44 astralis-flex-shrink-0"
        >
          <Card.Body>
            <div className="astralis-text-3xl astralis-mb-3">{item.icon}</div>
            <Card.Title className="astralis-text-sm">{item.title}</Card.Title>
            <Card.Description className="astralis-text-xs astralis-mt-1">
              {item.desc}
            </Card.Description>
          </Card.Body>
        </Card.Root>
      ))}
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "`hoverable` adds a subtle lift and deeper shadow on hover — great for clickable feature cards.",
      },
    },
  },
};

/* ── Horizontal ──────────────────────────────────────────────────── */
export const Horizontal: Story = {
  render: () => (
    <Card.Root className="astralis-max-w-xl">
      <div className="astralis-flex astralis-gap-0">
        {/* Image slab */}
        <div
          className="astralis-w-36 astralis-shrink-0 astralis-rounded-l-xl astralis-overflow-hidden astralis-bg-gradient-to-br astralis-from-primary-500 astralis-to-purple-600 astralis-flex astralis-items-center astralis-justify-center"
          style={{ minHeight: 160 }}
        >
          <span className="astralis-text-5xl">☕</span>
        </div>
        {/* Content */}
        <div className="astralis-flex astralis-flex-col astralis-flex-1 astralis-min-w-0">
          <Card.Header>
            <Card.Title>The Perfect Latte</Card.Title>
            <Card.Description>by Astralis Coffee Co.</Card.Description>
          </Card.Header>
          <Card.Body>
            <p className="astralis-text-sm astralis-text-content-secondary">
              A smooth, velvety espresso-based drink topped with silky
              microfoamed milk. Crafted to perfection every single time.
            </p>
          </Card.Body>
          <Card.Footer>
            <span className="astralis-font-semibold astralis-text-primary-600 dark:astralis-text-primary-400">
              $4.90
            </span>
            <button className="astralis-ml-auto astralis-text-xs astralis-px-3 astralis-py-1.5 astralis-rounded-lg astralis-bg-primary-600 astralis-text-white hover:astralis-bg-primary-700 astralis-transition-colors">
              Order
            </button>
          </Card.Footer>
        </div>
      </div>
    </Card.Root>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Horizontal card layout — combine a coloured image slab with the sub-components for a media card.",
      },
    },
  },
};

/* ── With Avatar ─────────────────────────────────────────────────── */
export const WithAvatar: Story = {
  render: () => (
    <div className="astralis-flex astralis-gap-4 astralis-flex-wrap">
      {[
        {
          name: "Sophie Durand",
          role: "Design Lead",
          initials: "SD",
          color: "astralis-bg-pink-500",
        },
        {
          name: "Alex Chen",
          role: "Engineering",
          initials: "AC",
          color: "astralis-bg-blue-500",
        },
        {
          name: "Jordan Kim",
          role: "Product",
          initials: "JK",
          color: "astralis-bg-green-500",
        },
      ].map((user) => (
        <Card.Root key={user.name} className="astralis-w-52">
          <Card.Body>
            <div className="astralis-flex astralis-flex-col astralis-items-center astralis-gap-3 astralis-text-center">
              <div
                className={`astralis-h-14 astralis-w-14 astralis-rounded-full astralis-flex astralis-items-center astralis-justify-center astralis-text-white astralis-font-bold astralis-text-lg ${user.color}`}
              >
                {user.initials}
              </div>
              <div>
                <Card.Title className="astralis-text-sm">
                  {user.name}
                </Card.Title>
                <Card.Description className="astralis-text-xs">
                  {user.role}
                </Card.Description>
              </div>
              <button className="astralis-w-full astralis-text-xs astralis-py-1.5 astralis-rounded-lg astralis-border astralis-border-border-subtle astralis-text-content-secondary hover:astralis-bg-surface-sunken astralis-transition-colors">
                View Profile
              </button>
            </div>
          </Card.Body>
        </Card.Root>
      ))}
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Profile cards using avatar initials with Card.Body and custom layout.",
      },
    },
  },
};

/* ── Stats Card ──────────────────────────────────────────────────── */
export const StatsCard: Story = {
  render: () => (
    <div className="astralis-grid astralis-grid-cols-1 astralis-gap-4 sm:astralis-grid-cols-3">
      {[
        {
          label: "Total Users",
          value: "24,521",
          change: "+12.4%",
          positive: true,
          icon: "👤",
        },
        {
          label: "Monthly Revenue",
          value: "$48,392",
          change: "+5.8%",
          positive: true,
          icon: "💰",
        },
        {
          label: "Churn Rate",
          value: "2.1%",
          change: "+0.4%",
          positive: false,
          icon: "📉",
        },
      ].map((stat) => (
        <Card.Root key={stat.label}>
          <Card.Body>
            <div className="astralis-flex astralis-items-start astralis-justify-between">
              <div>
                <p className="astralis-text-xs astralis-font-medium astralis-text-content-secondary astralis-uppercase astralis-tracking-wider">
                  {stat.label}
                </p>
                <p className="astralis-text-2xl astralis-font-bold astralis-text-content-primary astralis-mt-1">
                  {stat.value}
                </p>
              </div>
              <div className="astralis-text-2xl">{stat.icon}</div>
            </div>
            <p
              className={`astralis-text-xs astralis-font-medium astralis-mt-3 ${
                stat.positive
                  ? "astralis-text-green-600 dark:astralis-text-green-400"
                  : "astralis-text-red-600 dark:astralis-text-red-400"
              }`}
            >
              {stat.change} from last month
            </p>
          </Card.Body>
        </Card.Root>
      ))}
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Stats dashboard cards with a metric value, icon, and trend indicator.",
      },
    },
  },
};

/* ── Inner Card ──────────────────────────────────────────────────── */
export const InnerCard: Story = {
  render: () => (
    <Card.Root className="astralis-max-w-md">
      <Card.Header
        extra={
          <span className="astralis-text-xs astralis-px-2 astralis-py-0.5 astralis-rounded-full astralis-bg-green-100 astralis-text-green-700 dark:astralis-bg-green-900/30 dark:astralis-text-green-400 astralis-font-medium">
            Active
          </span>
        }
      >
        <Card.Title>Infrastructure</Card.Title>
        <Card.Description>Production cluster</Card.Description>
      </Card.Header>
      <Card.Body>
        <div className="astralis-flex astralis-flex-col astralis-gap-3">
          {[
            { name: "Web Server", status: "🟢", uptime: "99.97%" },
            { name: "Database", status: "🟢", uptime: "99.99%" },
            { name: "Cache Layer", status: "🟡", uptime: "98.41%" },
          ].map((service) => (
            <Card.Root key={service.name} variant="filled" size="sm">
              <Card.Body>
                <div className="astralis-flex astralis-items-center astralis-justify-between">
                  <span className="astralis-flex astralis-items-center astralis-gap-2 astralis-text-sm astralis-font-medium astralis-text-content-primary">
                    {service.status} {service.name}
                  </span>
                  <span className="astralis-text-xs astralis-text-content-secondary">
                    Uptime: {service.uptime}
                  </span>
                </div>
              </Card.Body>
            </Card.Root>
          ))}
        </div>
      </Card.Body>
    </Card.Root>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'Cards can be nested — use `variant="filled" size="sm"` for inner cards within a parent card body.',
      },
    },
  },
};
