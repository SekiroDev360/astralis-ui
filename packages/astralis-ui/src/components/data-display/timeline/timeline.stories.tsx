import type { Meta, StoryObj } from "@storybook/react-vite";
import { Timeline } from "./index";
import { Badge } from "../badge";
import { AstralisProvider } from "../../../theme";

/* ------------------------------------------------------------------ */
/* Meta                                                                 */
/* ------------------------------------------------------------------ */

const meta: Meta<typeof Timeline> = {
  title: "Components/Data Display/Timeline",
  component: Timeline,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "Timeline is used to display a list of events in chronological order. " +
          "Built on the **Compound API** pattern — compose `<Timeline.Item>`, " +
          "`<Timeline.Connector>`, `<Timeline.Indicator>`, `<Timeline.Content>`, " +
          "`<Timeline.Title>` and `<Timeline.Description>` to build any timeline layout.",
      },
    },
  },
  decorators: [
    (Story) => (
      <AstralisProvider>
        <div className="astralis-p-6 astralis-max-w-xl">
          <Story />
        </div>
      </AstralisProvider>
    ),
  ],
};
export default meta;

type Story = StoryObj<typeof Timeline>;

/* ================================================================== */
/* Shared Icons                                                         */
/* ================================================================== */

function CheckIcon() {
  return (
    <svg
      viewBox="0 0 16 16"
      fill="currentColor"
      style={{ width: "0.75em", height: "0.75em" }}
    >
      <path d="M13.78 4.22a.75.75 0 0 1 0 1.06l-7.25 7.25a.75.75 0 0 1-1.06 0L2.22 9.28a.75.75 0 0 1 1.06-1.06L6 10.94l6.72-6.72a.75.75 0 0 1 1.06 0z" />
    </svg>
  );
}

function RocketIcon() {
  return (
    <svg
      viewBox="0 0 16 16"
      fill="currentColor"
      style={{ width: "0.75em", height: "0.75em" }}
    >
      <path d="M14.064 0h.186C15.216 0 16 .784 16 1.75v.186a8.752 8.752 0 0 1-2.564 6.186l-.458.459c-.314.314-.641.616-.979.904v3.207c0 .608-.315 1.172-.833 1.49l-2.774 1.707a.749.749 0 0 1-1.108-.433l-.785-3.139-2.202-2.202-3.139-.785a.749.749 0 0 1-.433-1.108l1.707-2.774c.318-.518.882-.833 1.49-.833H7.12c.288-.338.59-.665.904-.979l.459-.458A8.752 8.752 0 0 1 14.064 0zM8.938 3.623h-.002l-.458.458c-.76.76-1.437 1.598-2.02 2.5l1.553 1.553c.902-.583 1.74-1.26 2.499-2.02l.459-.458a7.25 7.25 0 0 0 2.127-5.127V.75a.25.25 0 0 0-.25-.25h-.186a7.25 7.25 0 0 0-5.128 2.123zM6.5 12.5l-1.5-1.5-.75.75 1.5 1.5.75-.75zm-3.75-3.75L1.5 10l.75.75 1.25-1.25-.75-.75z" />
    </svg>
  );
}

function BugIcon() {
  return (
    <svg
      viewBox="0 0 16 16"
      fill="currentColor"
      style={{ width: "0.75em", height: "0.75em" }}
    >
      <path d="M4.355 1.698a.5.5 0 1 0-.71.707l1.05 1.049c-.896.51-1.55 1.415-1.65 2.496H2a.5.5 0 0 0 0 1h1V7h-1a.5.5 0 0 0 0 1h1.044A4.002 4.002 0 0 0 7 11.965V14H6a.5.5 0 0 0 0 1h4a.5.5 0 0 0 0-1H9v-2.035A4.002 4.002 0 0 0 12.956 8H14a.5.5 0 0 0 0-1h-1V6.95h1a.5.5 0 0 0 0-1h-1.044c-.1-1.081-.755-1.986-1.652-2.496l1.05-1.049a.5.5 0 1 0-.708-.707l-1.355 1.356A3.973 3.973 0 0 0 8 2.5c-.51 0-.994.097-1.437.273L5.208 1.698zm.645 4.302a.5.5 0 0 0 0 1h6a.5.5 0 0 0 0-1H5z" />
    </svg>
  );
}

function StarIcon() {
  return (
    <svg
      viewBox="0 0 16 16"
      fill="currentColor"
      style={{ width: "0.75em", height: "0.75em" }}
    >
      <path d="M8 .25a.75.75 0 0 1 .673.418l1.882 3.815 4.21.612a.75.75 0 0 1 .416 1.279l-3.046 2.97.719 4.192a.751.751 0 0 1-1.088.791L8 12.347l-3.766 1.98a.75.75 0 0 1-1.088-.79l.72-4.194L.818 6.374a.75.75 0 0 1 .416-1.28l4.21-.611L7.327.668A.75.75 0 0 1 8 .25z" />
    </svg>
  );
}

function AlertIcon() {
  return (
    <svg
      viewBox="0 0 16 16"
      fill="currentColor"
      style={{ width: "0.75em", height: "0.75em" }}
    >
      <path d="M8.22 1.754a.25.25 0 0 0-.44 0L1.698 13.132a.25.25 0 0 0 .22.368h12.164a.25.25 0 0 0 .22-.368L8.22 1.754zm-1.763-.707c.659-1.234 2.427-1.234 3.086 0l6.082 11.378A1.75 1.75 0 0 1 14.082 15H1.918a1.75 1.75 0 0 1-1.543-2.575L6.457 1.047zM9 11a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm-.25-5.25a.75.75 0 0 0-1.5 0v2.5a.75.75 0 0 0 1.5 0v-2.5z" />
    </svg>
  );
}

/* ================================================================== */
/* Stories                                                              */
/* ================================================================== */

/* ── Default ─────────────────────────────────────────────────────── */

export const Default: Story = {
  render: () => (
    <Timeline>
      <Timeline.Item>
        <Timeline.Connector>
          <Timeline.Indicator />
        </Timeline.Connector>
        <Timeline.Content>
          <Timeline.Title>Project kickoff</Timeline.Title>
          <Timeline.Description>
            Jan 10, 2024 — Repository created and team access granted.
          </Timeline.Description>
        </Timeline.Content>
      </Timeline.Item>

      <Timeline.Item>
        <Timeline.Connector>
          <Timeline.Indicator />
        </Timeline.Connector>
        <Timeline.Content>
          <Timeline.Title>First milestone reached</Timeline.Title>
          <Timeline.Description>
            Feb 2, 2024 — Core data model shipped to staging.
          </Timeline.Description>
        </Timeline.Content>
      </Timeline.Item>

      <Timeline.Item>
        <Timeline.Connector>
          <Timeline.Indicator />
        </Timeline.Connector>
        <Timeline.Content>
          <Timeline.Title>Public launch</Timeline.Title>
          <Timeline.Description>
            Mar 18, 2024 — v1.0 released to production.
          </Timeline.Description>
        </Timeline.Content>
      </Timeline.Item>
    </Timeline>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Basic vertical timeline. Compose `<Timeline.Connector>` + `<Timeline.Indicator>` inside each `<Timeline.Item>`.",
      },
    },
  },
};

/* ── Sizes ────────────────────────────────────────────────────────── */

export const Sizes: Story = {
  render: () => (
    <div className="astralis-flex astralis-flex-col astralis-gap-10">
      {(["sm", "md", "lg"] as const).map((size) => (
        <div key={size}>
          <p className="astralis-mb-3 astralis-text-xs astralis-font-semibold astralis-uppercase astralis-tracking-widest astralis-text-content-secondary">
            {size === "md" ? `${size} (default)` : size}
          </p>
          <Timeline size={size}>
            <Timeline.Item>
              <Timeline.Connector>
                <Timeline.Indicator />
              </Timeline.Connector>
              <Timeline.Content>
                <Timeline.Title>Design review</Timeline.Title>
                <Timeline.Description>
                  Wireframes approved by stakeholders.
                </Timeline.Description>
              </Timeline.Content>
            </Timeline.Item>
            <Timeline.Item>
              <Timeline.Connector>
                <Timeline.Indicator />
              </Timeline.Connector>
              <Timeline.Content>
                <Timeline.Title>Development sprint</Timeline.Title>
                <Timeline.Description>
                  Feature branch merged to main.
                </Timeline.Description>
              </Timeline.Content>
            </Timeline.Item>
            <Timeline.Item>
              <Timeline.Connector>
                <Timeline.Indicator />
              </Timeline.Connector>
              <Timeline.Content>
                <Timeline.Title>Release</Timeline.Title>
                <Timeline.Description>
                  Deployed to production cluster.
                </Timeline.Description>
              </Timeline.Content>
            </Timeline.Item>
          </Timeline>
        </div>
      ))}
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Use the `size` prop on the root to control indicator dot size and line weight: `sm`, `md` (default), `lg`.",
      },
    },
  },
};

/* ── Variants ─────────────────────────────────────────────────────── */

export const Variants: Story = {
  render: () => (
    <div className="astralis-flex astralis-flex-col astralis-gap-10">
      {(["subtle", "outline", "solid"] as const).map((variant) => (
        <div key={variant}>
          <p className="astralis-mb-3 astralis-text-xs astralis-font-semibold astralis-uppercase astralis-tracking-widest astralis-text-content-secondary">
            {variant}
            {variant === "subtle" ? " (default)" : ""}
          </p>
          <Timeline variant={variant}>
            <Timeline.Item>
              <Timeline.Connector>
                <Timeline.Indicator />
              </Timeline.Connector>
              <Timeline.Content>
                <Timeline.Title>Onboarding</Timeline.Title>
                <Timeline.Description>
                  Account created and verified.
                </Timeline.Description>
              </Timeline.Content>
            </Timeline.Item>
            <Timeline.Item>
              <Timeline.Connector>
                <Timeline.Indicator color="success" />
              </Timeline.Connector>
              <Timeline.Content>
                <Timeline.Title>Profile complete</Timeline.Title>
                <Timeline.Description>
                  All required fields filled in.
                </Timeline.Description>
              </Timeline.Content>
            </Timeline.Item>
            <Timeline.Item>
              <Timeline.Connector>
                <Timeline.Indicator color="warning" />
              </Timeline.Connector>
              <Timeline.Content>
                <Timeline.Title>Pending review</Timeline.Title>
                <Timeline.Description>
                  Awaiting admin approval before activation.
                </Timeline.Description>
              </Timeline.Content>
            </Timeline.Item>
          </Timeline>
        </div>
      ))}
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "`subtle` — muted filled dot (default). `outline` — ring-only dot. `solid` — vibrant filled dot.",
      },
    },
  },
};

/* ── Custom Color ─────────────────────────────────────────────────── */

export const CustomColor: Story = {
  render: () => (
    <Timeline variant="solid" size="md">
      <Timeline.Item>
        <Timeline.Connector>
          <Timeline.Indicator color="success" />
        </Timeline.Connector>
        <Timeline.Content>
          <Timeline.Title>Build passed</Timeline.Title>
          <Timeline.Description>
            All 142 tests green — ready to merge.
          </Timeline.Description>
        </Timeline.Content>
      </Timeline.Item>
      <Timeline.Item>
        <Timeline.Connector>
          <Timeline.Indicator color="warning" />
        </Timeline.Connector>
        <Timeline.Content>
          <Timeline.Title>Deployment queued</Timeline.Title>
          <Timeline.Description>
            Waiting for approval from on-call engineer.
          </Timeline.Description>
        </Timeline.Content>
      </Timeline.Item>
      <Timeline.Item>
        <Timeline.Connector>
          <Timeline.Indicator color="danger" />
        </Timeline.Connector>
        <Timeline.Content>
          <Timeline.Title>Health check failed</Timeline.Title>
          <Timeline.Description>
            Pod restarted — container OOMed at 512 MB limit.
          </Timeline.Description>
        </Timeline.Content>
      </Timeline.Item>
      <Timeline.Item>
        <Timeline.Connector>
          <Timeline.Indicator color="neutral" />
        </Timeline.Connector>
        <Timeline.Content>
          <Timeline.Title>Rollback triggered</Timeline.Title>
          <Timeline.Description>
            Previous stable build re-deployed automatically.
          </Timeline.Description>
        </Timeline.Content>
      </Timeline.Item>
      <Timeline.Item>
        <Timeline.Connector>
          <Timeline.Indicator color="#8B5CF6" />
        </Timeline.Connector>
        <Timeline.Content>
          <Timeline.Title>Post-mortem scheduled</Timeline.Title>
          <Timeline.Description>
            Meeting room booked for Friday at 10:00 AM.
          </Timeline.Description>
        </Timeline.Content>
      </Timeline.Item>
    </Timeline>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Pass a semantic token (`success`, `warning`, `danger`, `neutral`) or any CSS hex/RGB colour to the `color` prop on `<Timeline.Indicator>`.",
      },
    },
  },
};

/* ── Custom Icon ──────────────────────────────────────────────────── */

export const CustomIcon: Story = {
  render: () => (
    <Timeline size="lg">
      <Timeline.Item>
        <Timeline.Connector>
          <Timeline.Indicator icon={<RocketIcon />} color="primary" />
        </Timeline.Connector>
        <Timeline.Content>
          <Timeline.Title>Product launched</Timeline.Title>
          <Timeline.Description>
            v2.0 shipped to 12,000 users with zero downtime.
          </Timeline.Description>
        </Timeline.Content>
      </Timeline.Item>
      <Timeline.Item>
        <Timeline.Connector>
          <Timeline.Indicator icon={<CheckIcon />} color="success" />
        </Timeline.Connector>
        <Timeline.Content>
          <Timeline.Title>Security audit passed</Timeline.Title>
          <Timeline.Description>
            No critical vulnerabilities found. Certificate renewed.
          </Timeline.Description>
        </Timeline.Content>
      </Timeline.Item>
      <Timeline.Item>
        <Timeline.Connector>
          <Timeline.Indicator icon={<BugIcon />} color="danger" />
        </Timeline.Connector>
        <Timeline.Content>
          <Timeline.Title>Critical bug reported</Timeline.Title>
          <Timeline.Description>
            Race condition on checkout — hotfix in progress.
          </Timeline.Description>
        </Timeline.Content>
      </Timeline.Item>
      <Timeline.Item>
        <Timeline.Connector>
          <Timeline.Indicator icon={<StarIcon />} color="#F59E0B" />
        </Timeline.Connector>
        <Timeline.Content>
          <Timeline.Title>Feature request shipped</Timeline.Title>
          <Timeline.Description>
            Dark mode — 3,400 votes on the product board.
          </Timeline.Description>
        </Timeline.Content>
      </Timeline.Item>
      <Timeline.Item>
        <Timeline.Connector>
          <Timeline.Indicator icon={<AlertIcon />} color="warning" />
        </Timeline.Connector>
        <Timeline.Content>
          <Timeline.Title>Deprecation notice</Timeline.Title>
          <Timeline.Description>
            Legacy REST API v1 retires on 1 July 2025.
          </Timeline.Description>
        </Timeline.Content>
      </Timeline.Item>
    </Timeline>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Pass any React node to the `icon` prop on `<Timeline.Indicator>` to render a custom icon inside a filled circle.",
      },
    },
  },
};

/* ── Pending ──────────────────────────────────────────────────────── */

export const Pending: Story = {
  render: () => (
    <Timeline pending="Awaiting QA sign-off…">
      <Timeline.Item>
        <Timeline.Connector>
          <Timeline.Indicator color="success" icon={<CheckIcon />} />
        </Timeline.Connector>
        <Timeline.Content>
          <Timeline.Title>Feature branch merged</Timeline.Title>
          <Timeline.Description>
            PR #482 merged to main by Alex.
          </Timeline.Description>
        </Timeline.Content>
      </Timeline.Item>
      <Timeline.Item>
        <Timeline.Connector>
          <Timeline.Indicator color="success" icon={<CheckIcon />} />
        </Timeline.Connector>
        <Timeline.Content>
          <Timeline.Title>CI pipeline passed</Timeline.Title>
          <Timeline.Description>
            All 204 tests green in 1m 43s.
          </Timeline.Description>
        </Timeline.Content>
      </Timeline.Item>
      <Timeline.Item>
        <Timeline.Connector>
          <Timeline.Indicator color="success" icon={<CheckIcon />} />
        </Timeline.Connector>
        <Timeline.Content>
          <Timeline.Title>Deployed to staging</Timeline.Title>
          <Timeline.Description>
            Staging environment updated and health checks pass.
          </Timeline.Description>
        </Timeline.Content>
      </Timeline.Item>
    </Timeline>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Add `pending` to the root to append a spinning indicator as the final item. Pass a string to customise the label.",
      },
    },
  },
};

/* ── Alternating Content ──────────────────────────────────────────── */

export const Alternating: Story = {
  render: () => (
    <div className="astralis-max-w-2xl">
      <Timeline>
        {/* Odd items go right (default), even items go left */}
        <Timeline.Item>
          <Timeline.Connector>
            <Timeline.Indicator color="primary" />
          </Timeline.Connector>
          <Timeline.Content>
            <Timeline.Title>Project kickoff</Timeline.Title>
            <Timeline.Description>
              Stakeholder alignment meeting held.
            </Timeline.Description>
          </Timeline.Content>
        </Timeline.Item>

        <Timeline.Item placement="left">
          <Timeline.Content>
            <Timeline.Title>Q1 planning</Timeline.Title>
            <Timeline.Description>
              Roadmap finalised across 4 squads.
            </Timeline.Description>
          </Timeline.Content>
          <Timeline.Connector>
            <Timeline.Indicator color="success" />
          </Timeline.Connector>
        </Timeline.Item>

        <Timeline.Item>
          <Timeline.Connector>
            <Timeline.Indicator color="warning" />
          </Timeline.Connector>
          <Timeline.Content>
            <Timeline.Title>Beta release</Timeline.Title>
            <Timeline.Description>
              Closed beta launched to 200 early adopters.
            </Timeline.Description>
          </Timeline.Content>
        </Timeline.Item>

        <Timeline.Item placement="left">
          <Timeline.Content>
            <Timeline.Title>User research</Timeline.Title>
            <Timeline.Description>
              80 interviews completed, insights synthesised.
            </Timeline.Description>
          </Timeline.Content>
          <Timeline.Connector>
            <Timeline.Indicator color="neutral" />
          </Timeline.Connector>
        </Timeline.Item>

        <Timeline.Item>
          <Timeline.Connector>
            <Timeline.Indicator color="success" icon={<RocketIcon />} />
          </Timeline.Connector>
          <Timeline.Content>
            <Timeline.Title>General availability</Timeline.Title>
            <Timeline.Description>
              v1.0 open to the public — 10k sign-ups on day one.
            </Timeline.Description>
          </Timeline.Content>
        </Timeline.Item>
      </Timeline>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'Set `placement="left"` on individual `<Timeline.Item>` elements to flip content to the left side of the connector, creating an alternating layout.',
      },
    },
  },
};

/* ── Content Before (timestamp left) ─────────────────────────────── */

export const ContentBefore: Story = {
  render: () => (
    <Timeline>
      {(
        [
          {
            date: "Jan 10",
            time: "09:00",
            title: "Repository created",
            desc: "Monorepo bootstrapped with pnpm workspaces.",
          },
          {
            date: "Jan 24",
            time: "14:30",
            title: "First commit merged",
            desc: "Initial scaffolding approved after design review.",
          },
          {
            date: "Feb 07",
            time: "11:00",
            title: "Alpha shipped",
            desc: "Internal alpha deployed to the pre-production cluster.",
          },
          {
            date: "Feb 28",
            time: "16:45",
            title: "Public beta",
            desc: "Waitlist opened — 2,400 users signed up in 48 hours.",
          },
          {
            date: "Mar 18",
            time: "10:00",
            title: "v1.0 release",
            desc: "General availability announcement published on the blog.",
          },
        ] as const
      ).map((event) => (
        <Timeline.Item key={event.title}>
          {/* Timestamp lives to the LEFT of the connector */}
          <div className="astralis-w-20 astralis-shrink-0 astralis-text-right">
            <p className="astralis-text-xs astralis-font-semibold astralis-text-content-primary astralis-leading-snug">
              {event.date}
            </p>
            <p className="astralis-text-xs astralis-text-content-secondary">
              {event.time}
            </p>
          </div>
          <Timeline.Connector>
            <Timeline.Indicator />
          </Timeline.Connector>
          <Timeline.Content>
            <Timeline.Title>{event.title}</Timeline.Title>
            <Timeline.Description>{event.desc}</Timeline.Description>
          </Timeline.Content>
        </Timeline.Item>
      ))}
    </Timeline>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Place any element *before* `<Timeline.Connector>` inside `<Timeline.Item>` to show content (e.g. timestamps) to the left of the indicator line.",
      },
    },
  },
};

/* ── Horizontal ───────────────────────────────────────────────────── */

export const Horizontal: Story = {
  decorators: [
    (Story) => (
      <AstralisProvider>
        <div className="astralis-p-6 astralis-max-w-3xl">
          <Story />
        </div>
      </AstralisProvider>
    ),
  ],
  render: () => (
    <Timeline orientation="horizontal">
      {(
        [
          { label: "Order placed", color: "success" },
          { label: "Processing", color: "primary" },
          { label: "Shipped", color: "primary" },
          { label: "Out for delivery", color: "warning" },
          { label: "Delivered", color: "neutral" },
        ] as const
      ).map((step, i) => (
        <Timeline.Item key={step.label}>
          <Timeline.Connector>
            <Timeline.Indicator color={step.color} />
          </Timeline.Connector>
          <Timeline.Content className="astralis-pt-3 astralis-pb-0 astralis-text-center astralis-items-center">
            <Timeline.Title>{step.label}</Timeline.Title>
            {i === 0 && (
              <Timeline.Description>Mar 5 · 08:12 AM</Timeline.Description>
            )}
          </Timeline.Content>
        </Timeline.Item>
      ))}
    </Timeline>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'Set `orientation="horizontal"` on the root. The connector line runs left-to-right — great for order/progress trackers.',
      },
    },
  },
};

/* ── Composition (Activity Feed) ──────────────────────────────────── */

export const Composition: Story = {
  render: () => {
    const events = [
      {
        id: 1,
        actor: "alex@astralis.dev",
        initials: "AH",
        action: "merged pull request",
        target: "feat/dark-mode",
        detail: "3 files changed, +248 −12",
        time: "2 min ago",
        color: "success" as const,
        icon: <CheckIcon />,
        badge: { label: "merged", variant: "success" as const },
      },
      {
        id: 2,
        actor: "ci@github.com",
        initials: "CI",
        action: "deployment started",
        target: "production (us-east-1)",
        detail: "Image: astralis-ui:sha-8f3d2a1",
        time: "3 min ago",
        color: "primary" as const,
        icon: <RocketIcon />,
        badge: { label: "in progress", variant: "info" as const },
      },
      {
        id: 3,
        actor: "samira@astralis.dev",
        initials: "SJ",
        action: "flagged an issue",
        target: "Component token mismatch",
        detail: "Badge sizing tokens not aligned with new scale.",
        time: "18 min ago",
        color: "warning" as const,
        icon: <AlertIcon />,
        badge: { label: "open", variant: "warning" as const },
      },
      {
        id: 4,
        actor: "dana@astralis.dev",
        initials: "DS",
        action: "closed bug",
        target: "Tooltip z-index regression",
        detail: "Fixed by bumping stacking context in portal root.",
        time: "1 hr ago",
        color: "danger" as const,
        icon: <BugIcon />,
        badge: { label: "closed", variant: "neutral" as const },
      },
      {
        id: 5,
        actor: "priya@astralis.dev",
        initials: "PP",
        action: "published release",
        target: "astralis-ui@2.4.0",
        detail: "Timeline, Table, MultiSelect — see changelog.",
        time: "2 hr ago",
        color: "#8B5CF6" as const,
        icon: <StarIcon />,
        badge: { label: "published", variant: "neutral" as const },
      },
    ];

    return (
      <div
        className="astralis-rounded-xl astralis-border astralis-border-border-subtle astralis-bg-surface-base astralis-p-5 astralis-shadow-sm"
        style={{ maxWidth: 520 }}
      >
        <div className="astralis-mb-5 astralis-flex astralis-items-center astralis-justify-between">
          <h3 className="astralis-text-sm astralis-font-bold astralis-text-content-primary">
            Activity feed
          </h3>
          <Badge variant="neutral" size="sm">
            Live
          </Badge>
        </div>

        <Timeline size="md">
          {events.map((ev) => (
            <Timeline.Item key={ev.id}>
              <Timeline.Connector>
                <Timeline.Indicator icon={ev.icon} color={ev.color} />
              </Timeline.Connector>
              <Timeline.Content>
                <div className="astralis-flex astralis-flex-wrap astralis-items-center astralis-gap-x-1.5 astralis-gap-y-0.5">
                  {/* Avatar chip */}
                  <span className="astralis-inline-flex astralis-h-5 astralis-w-5 astralis-items-center astralis-justify-center astralis-rounded-full astralis-bg-primary-100 astralis-text-primary-700 dark:astralis-bg-primary-900 dark:astralis-text-primary-300 astralis-text-[9px] astralis-font-bold astralis-shrink-0">
                    {ev.initials}
                  </span>
                  <span className="astralis-text-xs astralis-font-medium astralis-text-content-primary">
                    {ev.actor}
                  </span>
                  <span className="astralis-text-xs astralis-text-content-secondary">
                    {ev.action}
                  </span>
                  <code className="astralis-text-xs astralis-font-mono astralis-rounded astralis-bg-surface-raised astralis-px-1 astralis-py-0.5 astralis-text-content-primary">
                    {ev.target}
                  </code>
                  <Badge variant={ev.badge.variant} size="sm">
                    {ev.badge.label}
                  </Badge>
                </div>
                <Timeline.Description>{ev.detail}</Timeline.Description>
                <p className="astralis-text-[11px] astralis-text-content-tertiary astralis-mt-0.5">
                  {ev.time}
                </p>
              </Timeline.Content>
            </Timeline.Item>
          ))}
        </Timeline>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story:
          "Real-world composition: an activity feed card mixing custom icons, semantic colours, `<Badge>` components, and avatar chips inside `<Timeline.Content>`.",
      },
    },
  },
};
