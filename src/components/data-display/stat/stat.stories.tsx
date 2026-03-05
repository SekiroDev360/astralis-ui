import type { Meta, StoryObj } from "@storybook/react-vite";
import { Stat } from "./index";
import { AstralisProvider } from "../../../theme";

const meta: Meta<typeof Stat> = {
  title: "Components/Data Display/Stat",
  component: Stat,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "Stat displays a key metric with a label, numeric value, and optional supporting elements. " +
          "Compose `Stat.Label`, `Stat.Value`, `Stat.Trend`, `Stat.Progress`, `Stat.Icon`, `Stat.HelpText`, and `Stat.Countdown`.",
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
type Story = StoryObj<typeof Stat>;

/* ── Default ─────────────────────────────────────────────────────── */
export const Default: Story = {
  render: () => (
    <Stat>
      <Stat.Label>Total Revenue</Stat.Label>
      <Stat.Value>$48,295</Stat.Value>
      <Stat.HelpText>All time earnings</Stat.HelpText>
    </Stat>
  ),
  parameters: {
    docs: { description: { story: "Basic stat: label → value → help text." } },
  },
};

/* ── Format Options ──────────────────────────────────────────────── */
export const FormatOptions: Story = {
  render: () => (
    <div className="astralis-flex astralis-flex-wrap astralis-gap-8">
      <Stat>
        <Stat.Label>Revenue</Stat.Label>
        <Stat.Value>
          {new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: "USD",
          }).format(48295.5)}
        </Stat.Value>
        <Stat.HelpText>Currency (USD)</Stat.HelpText>
      </Stat>
      <Stat>
        <Stat.Label>Conversion Rate</Stat.Label>
        <Stat.Value>
          {new Intl.NumberFormat("en-US", {
            style: "percent",
            maximumFractionDigits: 1,
          }).format(0.0312)}
        </Stat.Value>
        <Stat.HelpText>Percent format</Stat.HelpText>
      </Stat>
      <Stat>
        <Stat.Label>Active Users</Stat.Label>
        <Stat.Value>
          {new Intl.NumberFormat("en-US", { notation: "compact" }).format(
            124500,
          )}
        </Stat.Value>
        <Stat.HelpText>Compact notation</Stat.HelpText>
      </Stat>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Use `Intl.NumberFormat` inside `Stat.Value` for currency, percent, or compact formatting.",
      },
    },
  },
};

/* ── Trend ───────────────────────────────────────────────────────── */
export const Trend: Story = {
  render: () => (
    <div className="astralis-flex astralis-flex-wrap astralis-gap-8">
      <Stat>
        <Stat.Label>Monthly Revenue</Stat.Label>
        <Stat.Value>$12,840</Stat.Value>
        <Stat.Trend type="increase" value={14.5} />
      </Stat>
      <Stat>
        <Stat.Label>Bounce Rate</Stat.Label>
        <Stat.Value>38.2%</Stat.Value>
        <Stat.Trend type="decrease" value={3.1} />
      </Stat>
      <Stat>
        <Stat.Label>Avg. Session</Stat.Label>
        <Stat.Value>4m 12s</Stat.Value>
        <Stat.Trend type="neutral" formatted="No change" />
      </Stat>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          '`<Stat.Trend type="increase|decrease|neutral" value={14.5}>` shows a coloured arrow pill with the percentage.',
      },
    },
  },
};

/* ── Info Tip ────────────────────────────────────────────────────── */
export const InfoTip: Story = {
  render: () => (
    <div className="astralis-flex astralis-flex-wrap astralis-gap-8">
      <Stat>
        <Stat.Label info="Total revenue including all closed deals this month.">
          Revenue
        </Stat.Label>
        <Stat.Value>$48,295</Stat.Value>
        <Stat.Trend type="increase" value={8.2} />
      </Stat>
      <Stat>
        <Stat.Label info="Number of unique paying customers.">
          Customers
        </Stat.Label>
        <Stat.Value>1,842</Stat.Value>
        <Stat.Trend type="increase" value={4.1} />
      </Stat>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Pass `info` to `Stat.Label` to show a hover tooltip (? circle) with contextual detail.",
      },
    },
  },
};

/* ── Value Unit ──────────────────────────────────────────────────── */
export const ValueUnit: Story = {
  render: () => (
    <div className="astralis-flex astralis-flex-wrap astralis-gap-8">
      <Stat>
        <Stat.Label>Revenue</Stat.Label>
        <Stat.Value prefix="$">48,295</Stat.Value>
      </Stat>
      <Stat>
        <Stat.Label>Completion</Stat.Label>
        <Stat.Value suffix="%">87.4</Stat.Value>
      </Stat>
      <Stat>
        <Stat.Label>Latency</Stat.Label>
        <Stat.Value suffix="ms">142</Stat.Value>
      </Stat>
      <Stat>
        <Stat.Label>Temperature</Stat.Label>
        <Stat.Value suffix="°C">22.5</Stat.Value>
      </Stat>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "`prefix` and `suffix` render muted unit slots flanking the main value.",
      },
    },
  },
};

/* ── Progress Bar ────────────────────────────────────────────────── */
export const ProgressBar: Story = {
  render: () => (
    <div className="astralis-flex astralis-flex-col astralis-gap-6 astralis-max-w-sm">
      <Stat>
        <Stat.Label>Storage Used</Stat.Label>
        <Stat.Value suffix="GB">
          7.4{" "}
          <span className="astralis-text-base astralis-text-content-secondary astralis-font-medium">
            / 20 GB
          </span>
        </Stat.Value>
        <Stat.Progress value={37} colorScheme="primary" />
      </Stat>
      <Stat>
        <Stat.Label>CPU Usage</Stat.Label>
        <Stat.Value suffix="%">82</Stat.Value>
        <Stat.Progress value={82} colorScheme="warning" />
      </Stat>
      <Stat>
        <Stat.Label>Goal Progress</Stat.Label>
        <Stat.Value suffix="%">64</Stat.Value>
        <Stat.Progress value={64} colorScheme="success" />
      </Stat>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "`<Stat.Progress value={0–100} colorScheme>` shows a thin animated progress bar below the value.",
      },
    },
  },
};

/* ── With Icon ───────────────────────────────────────────────────── */
export const WithIcon: Story = {
  render: () => (
    <div className="astralis-flex astralis-flex-wrap astralis-gap-6">
      {[
        {
          label: "Revenue",
          value: "$48,295",
          trend: 14.5 as number,
          colorScheme: "success" as const,
          icon: (
            <svg
              viewBox="0 0 16 16"
              fill="currentColor"
              className="astralis-h-5 astralis-w-5"
            >
              <path d="M4 10.781c.148 1.667 1.513 2.85 3.591 3.003V15h1.043v-1.216c2.27-.179 3.678-1.438 3.678-3.3 0-1.59-.947-2.51-2.956-3.028l-.722-.187V3.467c1.122.11 1.879.714 2.07 1.616h1.47c-.166-1.6-1.54-2.748-3.54-2.875V1H7.591v1.233c-1.939.23-3.27 1.472-3.27 3.156 0 1.454.966 2.483 2.661 2.917l.61.162v4.031c-1.149-.17-1.94-.8-2.131-1.718H4zm3.391-3.836c-1.043-.263-1.6-.825-1.6-1.616 0-.944.704-1.641 1.8-1.828v3.495l-.2-.051zm1.591 1.872c1.287.323 1.852.859 1.852 1.769 0 1.097-.826 1.828-2.2 1.939V8.73l.348.087z" />
            </svg>
          ),
        },
        {
          label: "Users",
          value: "1,842",
          trend: 4.1 as number,
          colorScheme: "primary" as const,
          icon: (
            <svg
              viewBox="0 0 16 16"
              fill="currentColor"
              className="astralis-h-5 astralis-w-5"
            >
              <path d="M7 14s-1 0-1-1 1-4 5-4 5 3 5 4-1 1-1 1H7zm4-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm-5.784 6A2.238 2.238 0 0 1 5 13c0-1.355.68-2.75 1.936-3.72A6.325 6.325 0 0 0 5 9c-4 0-5 3-5 4s1 1 1 1h4.216zM4.5 8a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5z" />
            </svg>
          ),
        },
        {
          label: "Uptime",
          value: "99.98%",
          trend: -0.01 as number,
          colorScheme: "danger" as const,
          icon: (
            <svg
              viewBox="0 0 16 16"
              fill="currentColor"
              className="astralis-h-5 astralis-w-5"
            >
              <path d="M8 16a6 6 0 1 0 0-12A6 6 0 0 0 8 16zm.25-9.75v4a.75.75 0 0 1-1.5 0v-4a.75.75 0 0 1 1.5 0zM9 12.5a1 1 0 1 1-2 0 1 1 0 0 1 2 0z" />
            </svg>
          ),
        },
      ].map((item) => (
        <div
          key={item.label}
          className="astralis-flex astralis-items-start astralis-gap-3"
        >
          <Stat.Icon colorScheme={item.colorScheme}>{item.icon}</Stat.Icon>
          <Stat>
            <Stat.Label>{item.label}</Stat.Label>
            <Stat.Value>{item.value}</Stat.Value>
            <Stat.Trend
              type={item.trend >= 0 ? "increase" : "decrease"}
              value={Math.abs(item.trend)}
            />
          </Stat>
        </div>
      ))}
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "`<Stat.Icon colorScheme>` renders a coloured circle beside the stat.",
      },
    },
  },
};

/* ── Countdown ───────────────────────────────────────────────────── */
export const Countdown: Story = {
  render: () => {
    const in2Hours = new Date(Date.now() + 2 * 60 * 60 * 1000);
    const in5Min = new Date(Date.now() + 5 * 60 * 1000);
    return (
      <div className="astralis-flex astralis-flex-wrap astralis-gap-10">
        <Stat.Countdown label="Sale ends in" targetDate={in2Hours} />
        <Stat.Countdown label="Session expires" targetDate={in5Min} />
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story:
          "`<Stat.Countdown targetDate>` shows a live counting-down timer (HH:MM:SS or MM:SS).",
      },
    },
  },
};

/* ── Sizes ───────────────────────────────────────────────────────── */
export const Sizes: Story = {
  render: () => (
    <div className="astralis-flex astralis-flex-wrap astralis-gap-10">
      {(["sm", "md", "lg"] as const).map((size) => (
        <Stat key={size} size={size}>
          <Stat.Label>Revenue{size === "md" ? " (default)" : ""}</Stat.Label>
          <Stat.Value prefix="$">48,295</Stat.Value>
          <Stat.Trend type="increase" value={14.5} />
        </Stat>
      ))}
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "Three sizes (`sm`, `md`, `lg`) scale label and value text.",
      },
    },
  },
};

/* ── In Card (Dashboard) ─────────────────────────────────────────── */
export const InCard: Story = {
  render: () => (
    <div className="astralis-grid astralis-grid-cols-2 astralis-gap-4 astralis-max-w-2xl">
      {[
        {
          label: "Total Revenue",
          value: "$48,295",
          trend: 14.5,
          type: "increase" as const,
          progress: 72,
          colorScheme: "success" as const,
          help: "vs $42,213 last month",
        },
        {
          label: "Active Users",
          value: "1,842",
          trend: 4.1,
          type: "increase" as const,
          progress: 55,
          colorScheme: "primary" as const,
          help: "↑ 73 from last week",
        },
        {
          label: "Bounce Rate",
          value: "38.2%",
          trend: 3.1,
          type: "decrease" as const,
          progress: 38,
          colorScheme: "warning" as const,
          help: "Target: below 35%",
        },
        {
          label: "Avg. Order",
          value: "$126",
          trend: 2.8,
          type: "increase" as const,
          progress: 63,
          colorScheme: "success" as const,
          help: "Across 382 orders",
        },
      ].map((item) => (
        <div
          key={item.label}
          className="astralis-rounded-xl astralis-border astralis-border-border-subtle astralis-bg-surface-raised astralis-p-5 astralis-flex astralis-flex-col astralis-gap-3"
        >
          <Stat>
            <Stat.Label>{item.label}</Stat.Label>
            <Stat.Value>{item.value}</Stat.Value>
            <div className="astralis-flex astralis-items-center astralis-gap-2">
              <Stat.Trend type={item.type} value={item.trend} />
              <Stat.HelpText>{item.help}</Stat.HelpText>
            </div>
          </Stat>
          <Stat.Progress value={item.progress} colorScheme={item.colorScheme} />
        </div>
      ))}
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Dashboard card grid combining Label, Value, Trend, HelpText, and Progress in a real-world layout.",
      },
    },
  },
};
