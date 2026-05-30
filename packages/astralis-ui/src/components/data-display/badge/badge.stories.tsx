import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { Badge, NotificationBadge, StatusBadge, Ribbon } from "./index";
import { AstralisProvider } from "../../../theme";

const meta: Meta<typeof Badge> = {
  title: "Components/Data Display/Badge",
  component: Badge,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "Badge is used to highlight an item's status or category. " +
          "Use `Badge` for inline text labels, `Badge.Notification` to wrap elements with a count/dot overlay, " +
          "`Badge.Status` for standalone status dots, and `Badge.Ribbon` for corner banners.",
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
type Story = StoryObj<typeof Badge>;

/* ── Variants ────────────────────────────────────────────────────── */
export const Variants: Story = {
  render: () => (
    <div className="astralis-flex astralis-flex-wrap astralis-gap-3">
      <Badge variant="neutral">Neutral</Badge>
      <Badge variant="primary">Primary</Badge>
      <Badge variant="success">Success</Badge>
      <Badge variant="warning">Warning</Badge>
      <Badge variant="danger">Danger</Badge>
      <Badge variant="info">Info</Badge>
      <Badge variant="solid">Solid</Badge>
      <Badge variant="outline">Outline</Badge>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "Eight variants. `solid` and `outline` use primary colour.",
      },
    },
  },
};

/* ── Sizes ────────────────────────────────────────────────────────── */
export const Sizes: Story = {
  render: () => (
    <div className="astralis-flex astralis-items-center astralis-gap-3">
      <Badge variant="primary" size="xs">
        XSmall
      </Badge>
      <Badge variant="primary" size="sm">
        Small
      </Badge>
      <Badge variant="primary" size="md">
        Medium
      </Badge>
      <Badge variant="primary" size="lg">
        Large
      </Badge>
    </div>
  ),
  parameters: {
    docs: {
      description: { story: "Four sizes: `xs`, `sm` (default), `md`, `lg`." },
    },
  },
};

/* ── With Icon ───────────────────────────────────────────────────── */
export const WithIcon: Story = {
  render: () => (
    <div className="astralis-flex astralis-flex-wrap astralis-gap-3">
      <Badge
        variant="success"
        icon={
          <svg
            viewBox="0 0 16 16"
            fill="currentColor"
            style={{ width: "0.75em", height: "0.75em" }}
          >
            <path d="M13.78 4.22a.75.75 0 0 1 0 1.06l-7.25 7.25a.75.75 0 0 1-1.06 0L2.22 9.28a.75.75 0 0 1 1.06-1.06L6 10.94l6.72-6.72a.75.75 0 0 1 1.06 0z" />
          </svg>
        }
      >
        Active
      </Badge>
      <Badge
        variant="warning"
        icon={
          <svg
            viewBox="0 0 16 16"
            fill="currentColor"
            style={{ width: "0.75em", height: "0.75em" }}
          >
            <path d="M8.22 1.754a.25.25 0 0 0-.44 0L1.698 13.132a.25.25 0 0 0 .22.368h12.164a.25.25 0 0 0 .22-.368L8.22 1.754zm-.97 7.746a.75.75 0 0 1 1.5 0v-2.5a.75.75 0 0 0-1.5 0v2.5zM9 11a1 1 0 1 1-2 0 1 1 0 0 1 2 0z" />
          </svg>
        }
      >
        Warning
      </Badge>
      <Badge
        variant="danger"
        icon={
          <svg
            viewBox="0 0 16 16"
            fill="currentColor"
            style={{ width: "0.75em", height: "0.75em" }}
          >
            <path d="M3.72 3.72a.75.75 0 0 1 1.06 0L8 6.94l3.22-3.22a.749.749 0 0 1 1.275.326.749.749 0 0 1-.215.734L9.06 8l3.22 3.22a.749.749 0 0 1-.326 1.275.749.749 0 0 1-.734-.215L8 9.06l-3.22 3.22a.751.751 0 0 1-1.042-.018.751.751 0 0 1-.018-1.042L6.94 8 3.72 4.78a.75.75 0 0 1 0-1.06z" />
          </svg>
        }
      >
        Error
      </Badge>
      <Badge
        variant="info"
        icon={
          <svg
            viewBox="0 0 16 16"
            fill="currentColor"
            style={{ width: "0.75em", height: "0.75em" }}
          >
            <path d="M8 1.5a6.5 6.5 0 1 0 0 13 6.5 6.5 0 0 0 0-13zM0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm6.5-.25A.75.75 0 0 1 7.25 7h1a.75.75 0 0 1 .75.75v2.75h.25a.75.75 0 0 1 0 1.5h-2a.75.75 0 0 1 0-1.5h.25v-2h-.25a.75.75 0 0 1-.75-.75zM8 6a1 1 0 1 1 0-2 1 1 0 0 1 0 2z" />
          </svg>
        }
      >
        Info
      </Badge>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Pass any React node to the `icon` prop — it renders before the label text.",
      },
    },
  },
};

/* ── Notification Count ──────────────────────────────────────────── */
export const NotificationCount: Story = {
  render: () => (
    <div className="astralis-flex astralis-items-center astralis-gap-8">
      <NotificationBadge count={5}>
        <div className="astralis-h-10 astralis-w-10 astralis-rounded-lg astralis-bg-surface-raised astralis-border astralis-border-border-subtle astralis-flex astralis-items-center astralis-justify-center">
          <svg
            viewBox="0 0 16 16"
            fill="currentColor"
            className="astralis-h-5 astralis-w-5 astralis-text-content-secondary"
          >
            <path d="M8 16a2 2 0 0 0 1.985-1.75c.017-.137-.097-.25-.235-.25h-3.5c-.138 0-.252.113-.235.25A2 2 0 0 0 8 16zm.25-14.75v-.5a.75.75 0 0 0-1.5 0v.5A5.217 5.217 0 0 0 2.75 7v1l-1.5 2.25A.75.75 0 0 0 1.875 11.5h12.25a.75.75 0 0 0 .625-1.25L13.25 8V7A5.217 5.217 0 0 0 8.25 1.25z" />
          </svg>
        </div>
      </NotificationBadge>

      <NotificationBadge count={12}>
        <div className="astralis-h-10 astralis-w-10 astralis-rounded-lg astralis-bg-surface-raised astralis-border astralis-border-border-subtle astralis-flex astralis-items-center astralis-justify-center">
          <svg
            viewBox="0 0 16 16"
            fill="currentColor"
            className="astralis-h-5 astralis-w-5 astralis-text-content-secondary"
          >
            <path d="M0 1.75C0 .784.784 0 1.75 0h12.5C15.216 0 16 .784 16 1.75v9.5A1.75 1.75 0 0 1 14.25 13H8.06l-2.573 2.573A1.457 1.457 0 0 1 3 14.543V13H1.75A1.75 1.75 0 0 1 0 11.25Zm1.75-.25a.25.25 0 0 0-.25.25v9.5c0 .138.112.25.25.25h2a.75.75 0 0 1 .75.75v2.19l2.72-2.72a.749.749 0 0 1 .53-.22h6.5a.25.25 0 0 0 .25-.25v-9.5a.25.25 0 0 0-.25-.25Z" />
          </svg>
        </div>
      </NotificationBadge>

      <NotificationBadge count={128} overflowCount={99}>
        <div className="astralis-h-10 astralis-w-10 astralis-rounded-lg astralis-bg-surface-raised astralis-border astralis-border-border-subtle astralis-flex astralis-items-center astralis-justify-center">
          <svg
            viewBox="0 0 16 16"
            fill="currentColor"
            className="astralis-h-5 astralis-w-5 astralis-text-content-secondary"
          >
            <path d="M10.5 5a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0zm.061 3.073a4 4 0 1 0-5.123 0 6.004 6.004 0 0 0-3.431 5.142.75.75 0 0 0 1.498.07 4.5 4.5 0 0 1 8.99 0 .75.75 0 1 0 1.498-.07 6.005 6.005 0 0 0-3.432-5.142z" />
          </svg>
        </div>
      </NotificationBadge>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Wrap any element with `<NotificationBadge count={n}>`. Use `overflowCount` to cap the number (default 99 → shows `99+`).",
      },
    },
  },
};

/* ── Dot ─────────────────────────────────────────────────────────── */
export const Dot: Story = {
  render: () => (
    <div className="astralis-flex astralis-items-center astralis-gap-8">
      <NotificationBadge dot>
        <div className="astralis-h-10 astralis-w-10 astralis-rounded-lg astralis-bg-surface-raised astralis-border astralis-border-border-subtle astralis-flex astralis-items-center astralis-justify-center">
          <svg
            viewBox="0 0 16 16"
            fill="currentColor"
            className="astralis-h-5 astralis-w-5 astralis-text-content-secondary"
          >
            <path d="M8 16a2 2 0 0 0 1.985-1.75c.017-.137-.097-.25-.235-.25h-3.5c-.138 0-.252.113-.235.25A2 2 0 0 0 8 16zm.25-14.75v-.5a.75.75 0 0 0-1.5 0v.5A5.217 5.217 0 0 0 2.75 7v1l-1.5 2.25A.75.75 0 0 0 1.875 11.5h12.25a.75.75 0 0 0 .625-1.25L13.25 8V7A5.217 5.217 0 0 0 8.25 1.25z" />
          </svg>
        </div>
      </NotificationBadge>
      <NotificationBadge dot color="success">
        <button className="astralis-px-4 astralis-py-2 astralis-rounded-lg astralis-bg-surface-raised astralis-border astralis-border-border-subtle astralis-text-sm astralis-font-medium">
          Messages
        </button>
      </NotificationBadge>
      <NotificationBadge dot color="primary">
        <span className="astralis-text-sm astralis-font-medium astralis-text-content-primary">
          Blog
        </span>
      </NotificationBadge>
    </div>
  ),
  parameters: {
    docs: {
      description: { story: "Use `dot` for a simple red dot without a count." },
    },
  },
};

/* ── Status ──────────────────────────────────────────────────────── */
export const StatusDots: Story = {
  render: () => (
    <div className="astralis-flex astralis-flex-col astralis-gap-2">
      <StatusBadge status="success" label="Deployed successfully" />
      <StatusBadge status="processing" label="Build in progress" />
      <StatusBadge status="warning" label="High memory usage" />
      <StatusBadge status="error" label="Health check failed" />
      <StatusBadge status="default" label="Idle" />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "`<StatusBadge>` shows a coloured dot + text label. The `processing` status pulses.",
      },
    },
  },
};

/* ── Dynamic ─────────────────────────────────────────────────────── */
export const Dynamic: Story = {
  render: () => {
    const [count, setCount] = useState(3);
    return (
      <div className="astralis-flex astralis-flex-col astralis-items-center astralis-gap-4">
        <NotificationBadge count={count} showZero>
          <div className="astralis-h-12 astralis-w-12 astralis-rounded-xl astralis-bg-primary-100 dark:astralis-bg-primary-900 astralis-flex astralis-items-center astralis-justify-center">
            <svg
              viewBox="0 0 16 16"
              fill="currentColor"
              className="astralis-h-6 astralis-w-6 astralis-text-primary-600 dark:astralis-text-primary-300"
            >
              <path d="M8 16a2 2 0 0 0 1.985-1.75c.017-.137-.097-.25-.235-.25h-3.5c-.138 0-.252.113-.235.25A2 2 0 0 0 8 16zm.25-14.75v-.5a.75.75 0 0 0-1.5 0v.5A5.217 5.217 0 0 0 2.75 7v1l-1.5 2.25A.75.75 0 0 0 1.875 11.5h12.25a.75.75 0 0 0 .625-1.25L13.25 8V7A5.217 5.217 0 0 0 8.25 1.25z" />
            </svg>
          </div>
        </NotificationBadge>
        <div className="astralis-flex astralis-items-center astralis-gap-3">
          <button
            onClick={() => setCount((c) => Math.max(0, c - 1))}
            className="astralis-h-8 astralis-w-8 astralis-rounded astralis-border astralis-border-border-subtle astralis-text-lg astralis-font-bold astralis-text-content-secondary hover:astralis-bg-surface-raised"
          >
            −
          </button>
          <span className="astralis-text-sm astralis-font-medium astralis-w-6 astralis-text-center">
            {count}
          </span>
          <button
            onClick={() => setCount((c) => c + 1)}
            className="astralis-h-8 astralis-w-8 astralis-rounded astralis-border astralis-border-border-subtle astralis-text-lg astralis-font-bold astralis-text-content-secondary hover:astralis-bg-surface-raised"
          >
            +
          </button>
        </div>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story:
          "Badge count is reactive. `showZero` keeps the badge visible when count is 0.",
      },
    },
  },
};

/* ── Ribbon ──────────────────────────────────────────────────────── */
export const RibbonStory: Story = {
  name: "Ribbon",
  render: () => (
    <div className="astralis-flex astralis-gap-6">
      {(["primary", "success", "warning", "danger"] as const).map((color) => (
        <Ribbon
          key={color}
          text={color.charAt(0).toUpperCase() + color.slice(1)}
          color={color}
        >
          <div className="astralis-w-36 astralis-h-24 astralis-rounded-xl astralis-border astralis-border-border-subtle astralis-bg-surface-raised astralis-flex astralis-items-center astralis-justify-center astralis-text-xs astralis-text-content-secondary">
            Card content
          </div>
        </Ribbon>
      ))}
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          '`<Ribbon text="…">` wraps any element and adds a diagonal corner banner.',
      },
    },
  },
};

/* ── Colorful ────────────────────────────────────────────────────── */
export const Colorful: Story = {
  render: () => (
    <div className="astralis-flex astralis-flex-wrap astralis-gap-3">
      {(
        [
          "#EF4444",
          "#F97316",
          "#EAB308",
          "#22C55E",
          "#06B6D4",
          "#3B82F6",
          "#8B5CF6",
          "#EC4899",
        ] as const
      ).map((hex) => (
        <Badge key={hex} style={{ backgroundColor: hex, color: "#fff" }}>
          {hex}
        </Badge>
      ))}
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Override badge colours using inline `style` for fully custom hex colours.",
      },
    },
  },
};
