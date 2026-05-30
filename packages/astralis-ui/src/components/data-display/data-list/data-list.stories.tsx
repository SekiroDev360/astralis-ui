import type { Meta, StoryObj } from "@storybook/react-vite";
import { DataList } from "./index";
import { AstralisProvider } from "../../../theme";
import { Badge } from "../badge";
import { Avatar } from "../avatar";

const meta: Meta<typeof DataList> = {
  title: "Components/Data Display/DataList",
  component: DataList,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "DataList displays a collection of label–value pairs. " +
          "Compose `<DataList.Item>`, `<DataList.Label>` and `<DataList.Value>` inside the root. " +
          "Control layout with `size`, `variant`, `orientation`, and `divided`.",
      },
    },
  },
  decorators: [
    (Story) => (
      <AstralisProvider>
        <div className="astralis-p-6 astralis-max-w-lg">
          <Story />
        </div>
      </AstralisProvider>
    ),
  ],
};
export default meta;
type Story = StoryObj<typeof DataList>;

/* Shared data */
const USER = {
  name: "Alex Harper",
  email: "alex@astralis.dev",
  role: "Engineering Lead",
  department: "Engineering",
  status: "active" as const,
  joined: "Jan 10, 2024",
  location: "Berlin, DE",
};

/* ── Default ──────────────────────────────────────────────────────── */
export const Default: Story = {
  render: () => (
    <DataList>
      <DataList.Item>
        <DataList.Label>Name</DataList.Label>
        <DataList.Value>{USER.name}</DataList.Value>
      </DataList.Item>
      <DataList.Item>
        <DataList.Label>Email</DataList.Label>
        <DataList.Value>{USER.email}</DataList.Value>
      </DataList.Item>
      <DataList.Item>
        <DataList.Label>Role</DataList.Label>
        <DataList.Value>{USER.role}</DataList.Value>
      </DataList.Item>
      <DataList.Item>
        <DataList.Label>Joined</DataList.Label>
        <DataList.Value>{USER.joined}</DataList.Value>
      </DataList.Item>
    </DataList>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Basic horizontal layout — label on the left, value on the right.",
      },
    },
  },
};

/* ── Sizes ────────────────────────────────────────────────────────── */
export const Sizes: Story = {
  render: () => (
    <div className="astralis-flex astralis-flex-col astralis-gap-8">
      {(["sm", "md", "lg"] as const).map((size) => (
        <div key={size}>
          <p className="astralis-text-xs astralis-font-semibold astralis-uppercase astralis-tracking-widest astralis-text-content-secondary astralis-mb-2">
            {size}
            {size === "md" ? " (default)" : ""}
          </p>
          <DataList size={size} variant="outline">
            <DataList.Item>
              <DataList.Label>Name</DataList.Label>
              <DataList.Value>{USER.name}</DataList.Value>
            </DataList.Item>
            <DataList.Item>
              <DataList.Label>Role</DataList.Label>
              <DataList.Value>{USER.role}</DataList.Value>
            </DataList.Item>
            <DataList.Item>
              <DataList.Label>Location</DataList.Label>
              <DataList.Value>{USER.location}</DataList.Value>
            </DataList.Item>
          </DataList>
        </div>
      ))}
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Three sizes control text size and vertical padding: `sm`, `md` (default), `lg`.",
      },
    },
  },
};

/* ── Variants ─────────────────────────────────────────────────────── */
export const Variants: Story = {
  render: () => (
    <div className="astralis-flex astralis-flex-col astralis-gap-8">
      {(["plain", "subtle", "outline"] as const).map((variant) => (
        <div key={variant}>
          <p className="astralis-text-xs astralis-font-semibold astralis-uppercase astralis-tracking-widest astralis-text-content-secondary astralis-mb-2">
            {variant}
            {variant === "plain" ? " (default)" : ""}
          </p>
          <DataList variant={variant} divided>
            <DataList.Item>
              <DataList.Label>Name</DataList.Label>
              <DataList.Value>{USER.name}</DataList.Value>
            </DataList.Item>
            <DataList.Item>
              <DataList.Label>Department</DataList.Label>
              <DataList.Value>{USER.department}</DataList.Value>
            </DataList.Item>
            <DataList.Item>
              <DataList.Label>Status</DataList.Label>
              <DataList.Value>
                <Badge variant="success" size="sm">
                  Active
                </Badge>
              </DataList.Value>
            </DataList.Item>
          </DataList>
        </div>
      ))}
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "`plain` — no chrome. `subtle` — light tinted card. `outline` — bordered card.",
      },
    },
  },
};

/* ── Orientation ──────────────────────────────────────────────────── */
export const Orientation: Story = {
  render: () => (
    <div className="astralis-flex astralis-flex-col astralis-gap-8">
      <div>
        <p className="astralis-text-xs astralis-font-semibold astralis-uppercase astralis-tracking-widest astralis-text-content-secondary astralis-mb-2">
          horizontal (default)
        </p>
        <DataList variant="outline">
          <DataList.Item>
            <DataList.Label>Name</DataList.Label>
            <DataList.Value>{USER.name}</DataList.Value>
          </DataList.Item>
          <DataList.Item>
            <DataList.Label>Email</DataList.Label>
            <DataList.Value>{USER.email}</DataList.Value>
          </DataList.Item>
          <DataList.Item>
            <DataList.Label>Location</DataList.Label>
            <DataList.Value>{USER.location}</DataList.Value>
          </DataList.Item>
        </DataList>
      </div>

      <div>
        <p className="astralis-text-xs astralis-font-semibold astralis-uppercase astralis-tracking-widest astralis-text-content-secondary astralis-mb-2">
          vertical — label above value
        </p>
        <DataList orientation="vertical" variant="outline">
          <DataList.Item>
            <DataList.Label>Name</DataList.Label>
            <DataList.Value>{USER.name}</DataList.Value>
          </DataList.Item>
          <DataList.Item>
            <DataList.Label>Email</DataList.Label>
            <DataList.Value>{USER.email}</DataList.Value>
          </DataList.Item>
          <DataList.Item>
            <DataList.Label>Location</DataList.Label>
            <DataList.Value>{USER.location}</DataList.Value>
          </DataList.Item>
        </DataList>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          '`orientation="horizontal"` (default) puts label left, value right. `"vertical"` stacks label above value.',
      },
    },
  },
};

/* ── Divided ─────────────────────────────────────────────────────── */
export const Divided: Story = {
  render: () => (
    <DataList divided>
      <DataList.Item>
        <DataList.Label>Name</DataList.Label>
        <DataList.Value>{USER.name}</DataList.Value>
      </DataList.Item>
      <DataList.Item>
        <DataList.Label>Email</DataList.Label>
        <DataList.Value>{USER.email}</DataList.Value>
      </DataList.Item>
      <DataList.Item>
        <DataList.Label>Role</DataList.Label>
        <DataList.Value>{USER.role}</DataList.Value>
      </DataList.Item>
      <DataList.Item>
        <DataList.Label>Department</DataList.Label>
        <DataList.Value>{USER.department}</DataList.Value>
      </DataList.Item>
      <DataList.Item>
        <DataList.Label>Joined</DataList.Label>
        <DataList.Value>{USER.joined}</DataList.Value>
      </DataList.Item>
    </DataList>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Add `divided` to the root to show a horizontal rule between each item.",
      },
    },
  },
};

/* ── Info Tip ─────────────────────────────────────────────────────── */
export const InfoTip: Story = {
  render: () => (
    <DataList variant="subtle" divided>
      <DataList.Item>
        <DataList.Label info="The full legal name as it appears on official documents.">
          Full name
        </DataList.Label>
        <DataList.Value>{USER.name}</DataList.Value>
      </DataList.Item>
      <DataList.Item>
        <DataList.Label info="Used for login and notifications.">
          Email
        </DataList.Label>
        <DataList.Value>{USER.email}</DataList.Value>
      </DataList.Item>
      <DataList.Item>
        <DataList.Label info="Billing tier determines feature access.">
          Plan
        </DataList.Label>
        <DataList.Value>
          <Badge variant="solid" size="sm">
            Pro
          </Badge>
        </DataList.Value>
      </DataList.Item>
      <DataList.Item>
        <DataList.Label info="Date the account was first activated.">
          Member since
        </DataList.Label>
        <DataList.Value>{USER.joined}</DataList.Value>
      </DataList.Item>
    </DataList>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Pass a string to the `info` prop on `<DataList.Label>` to show a hover tooltip.",
      },
    },
  },
};

/* ── Composition (User Profile Card) ─────────────────────────────── */
export const Composition: Story = {
  render: () => (
    <div
      className="astralis-rounded-xl astralis-border astralis-border-border-subtle astralis-bg-surface-base astralis-shadow-sm astralis-overflow-hidden"
      style={{ maxWidth: 440 }}
    >
      {/* Header */}
      <div className="astralis-flex astralis-items-center astralis-gap-4 astralis-px-5 astralis-py-4 astralis-border-b astralis-border-border-subtle">
        <Avatar
          size="lg"
          name={USER.name}
          src="https://i.pravatar.cc/150?img=3"
        />
        <div>
          <p className="astralis-text-base astralis-font-bold astralis-text-content-primary">
            {USER.name}
          </p>
          <p className="astralis-text-sm astralis-text-content-secondary">
            {USER.role}
          </p>
        </div>
        <Badge variant="success" size="sm" className="astralis-ml-auto">
          Active
        </Badge>
      </div>

      {/* Data */}
      <div className="astralis-px-5 astralis-py-2">
        <DataList divided>
          <DataList.Item>
            <DataList.Label>Email</DataList.Label>
            <DataList.Value>{USER.email}</DataList.Value>
          </DataList.Item>
          <DataList.Item>
            <DataList.Label>Department</DataList.Label>
            <DataList.Value>{USER.department}</DataList.Value>
          </DataList.Item>
          <DataList.Item>
            <DataList.Label>Location</DataList.Label>
            <DataList.Value>{USER.location}</DataList.Value>
          </DataList.Item>
          <DataList.Item>
            <DataList.Label>Member since</DataList.Label>
            <DataList.Value>{USER.joined}</DataList.Value>
          </DataList.Item>
          <DataList.Item>
            <DataList.Label>Plan</DataList.Label>
            <DataList.Value>
              <Badge variant="solid" size="sm">
                Pro
              </Badge>
            </DataList.Value>
          </DataList.Item>
        </DataList>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "User profile card combining `Avatar`, `Badge`, and `DataList` into a real-world composition.",
      },
    },
  },
};
