import type { Meta, StoryObj } from "@storybook/react-vite";
import { Avatar, AvatarBadge, AvatarGroup } from "./index";
import { AstralisProvider } from "../../../theme";
import { Badge } from "../badge";

const meta: Meta<typeof Avatar> = {
  title: "Components/Data Display/Avatar",
  component: Avatar,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "Avatar represents a user with an image, initials, or icon fallback. " +
          "Use `Avatar.Group` for stacked groups and `Avatar.Badge` for status overlays.",
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
type Story = StoryObj<typeof Avatar>;

/* ── Default ─────────────────────────────────────────────────────── */
export const Default: Story = {
  render: () => <Avatar name="Alex Harper" />,
  parameters: {
    docs: {
      description: { story: "Basic avatar with initials derived from `name`." },
    },
  },
};

/* ── Sizes ───────────────────────────────────────────────────────── */
export const Sizes: Story = {
  render: () => (
    <div className="astralis-flex astralis-items-end astralis-gap-4">
      {(["xs", "sm", "md", "lg", "xl", "2xl"] as const).map((size) => (
        <div
          key={size}
          className="astralis-flex astralis-flex-col astralis-items-center astralis-gap-1"
        >
          <Avatar size={size} name="Alex Harper" />
          <span className="astralis-text-xs astralis-text-content-secondary">
            {size}
          </span>
        </div>
      ))}
    </div>
  ),
  parameters: {
    docs: { description: { story: "Six sizes from `xs` to `2xl`." } },
  },
};

/* ── Shape ───────────────────────────────────────────────────────── */
export const Shape: Story = {
  render: () => (
    <div className="astralis-flex astralis-items-center astralis-gap-6">
      <div className="astralis-flex astralis-flex-col astralis-items-center astralis-gap-2">
        <Avatar size="lg" name="John Mason" shape="rounded" />
        <span className="astralis-text-xs astralis-text-content-secondary">
          rounded (default)
        </span>
      </div>
      <div className="astralis-flex astralis-flex-col astralis-items-center astralis-gap-2">
        <Avatar size="lg" name="John Mason" shape="square" />
        <span className="astralis-text-xs astralis-text-content-secondary">
          square
        </span>
      </div>
      <div className="astralis-flex astralis-flex-col astralis-items-center astralis-gap-2">
        <Avatar
          size="lg"
          src="https://i.pravatar.cc/150?img=5"
          shape="square"
        />
        <span className="astralis-text-xs astralis-text-content-secondary">
          square + image
        </span>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          '`shape="rounded"` (default circle) or `shape="square"` (rounded rectangle).',
      },
    },
  },
};

/* ── Colors ──────────────────────────────────────────────────────── */
export const Colors: Story = {
  render: () => (
    <div className="astralis-flex astralis-flex-wrap astralis-gap-3">
      {(
        [
          "gray",
          "red",
          "orange",
          "green",
          "blue",
          "purple",
          "pink",
          "teal",
          "cyan",
        ] as const
      ).map((c) => (
        <div
          key={c}
          className="astralis-flex astralis-flex-col astralis-items-center astralis-gap-1"
        >
          <Avatar name="User Name" color={c} />
          <span className="astralis-text-[10px] astralis-text-content-secondary">
            {c}
          </span>
        </div>
      ))}
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Use `color` to set the initials background palette. By default the colour is derived deterministically from the `name`.",
      },
    },
  },
};

/* ── Fallback ────────────────────────────────────────────────────── */
export const Fallback: Story = {
  render: () => (
    <div className="astralis-flex astralis-items-end astralis-gap-4">
      <div className="astralis-flex astralis-flex-col astralis-items-center astralis-gap-1">
        <Avatar name="Alex Harper" />
        <span className="astralis-text-xs astralis-text-content-secondary">
          Initials
        </span>
      </div>
      <div className="astralis-flex astralis-flex-col astralis-items-center astralis-gap-1">
        <Avatar />
        <span className="astralis-text-xs astralis-text-content-secondary">
          Icon (default)
        </span>
      </div>
      <div className="astralis-flex astralis-flex-col astralis-items-center astralis-gap-1">
        <Avatar
          src="https://broken-url.example.com/img.jpg"
          name="Error User"
        />
        <span className="astralis-text-xs astralis-text-content-secondary">
          Broken image → initials
        </span>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "Fallback cascade: image → initials → generic person icon.",
      },
    },
  },
};

/* ── Ring ────────────────────────────────────────────────────────── */
export const Ring: Story = {
  render: () => (
    <div className="astralis-flex astralis-items-center astralis-gap-4 astralis-bg-primary-600 astralis-p-6 astralis-rounded-xl">
      {(["sm", "md", "lg", "xl"] as const).map((size) => (
        <Avatar key={size} size={size} name="Alex Harper" ring />
      ))}
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Add `ring` for a white ring border — useful on coloured backgrounds.",
      },
    },
  },
};

/* ── Image ───────────────────────────────────────────────────────── */
export const WithImage: Story = {
  render: () => (
    <div className="astralis-flex astralis-gap-4">
      {[3, 5, 8, 12, 20].map((n) => (
        <Avatar
          key={n}
          size="lg"
          src={`https://i.pravatar.cc/150?img=${n}`}
          name={`User ${n}`}
        />
      ))}
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Avatar with a photo URL. Falls back to initials if the image fails to load.",
      },
    },
  },
};

/* ── Status Badge ────────────────────────────────────────────────── */
export const StatusBadge: Story = {
  render: () => (
    <div className="astralis-flex astralis-gap-6">
      {(["online", "away", "busy", "offline"] as const).map((status) => (
        <div
          key={status}
          className="astralis-flex astralis-flex-col astralis-items-center astralis-gap-2"
        >
          <div className="astralis-relative astralis-inline-flex">
            <Avatar
              size="lg"
              name="Alex Harper"
              src={`https://i.pravatar.cc/150?img=3`}
            />
            <AvatarBadge status={status} />
          </div>
          <span className="astralis-text-xs astralis-text-content-secondary">
            {status}
          </span>
        </div>
      ))}
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Wrap `<Avatar>` in a `relative` container and add `<AvatarBadge status>` for online presence indicators.",
      },
    },
  },
};

/* ── Group ───────────────────────────────────────────────────────── */
export const Group: Story = {
  render: () => (
    <div className="astralis-flex astralis-flex-col astralis-gap-6">
      <div>
        <p className="astralis-text-xs astralis-text-content-secondary astralis-mb-2 astralis-font-semibold astralis-uppercase astralis-tracking-wide">
          Default (stacking: start)
        </p>
        <AvatarGroup>
          <Avatar name="Alex Harper" color="blue" />
          <Avatar name="Samira Jones" color="purple" />
          <Avatar name="Michael Chen" color="green" />
          <Avatar name="Dana Scully" color="orange" />
        </AvatarGroup>
      </div>
      <div>
        <p className="astralis-text-xs astralis-text-content-secondary astralis-mb-2 astralis-font-semibold astralis-uppercase astralis-tracking-wide">
          With max + overflow (max=3)
        </p>
        <AvatarGroup max={3}>
          <Avatar name="Alex Harper" color="blue" />
          <Avatar name="Samira Jones" color="purple" />
          <Avatar name="Michael Chen" color="green" />
          <Avatar name="Dana Scully" color="orange" />
          <Avatar name="James Kirk" color="red" />
          <Avatar name="Priya Patel" color="teal" />
        </AvatarGroup>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "`<AvatarGroup>` overlaps avatars with a negative spacing. Use `max` to cap visible avatars and show `+N`.",
      },
    },
  },
};

/* ── Persona ─────────────────────────────────────────────────────── */
export const Persona: Story = {
  render: () => (
    <div className="astralis-flex astralis-flex-col astralis-gap-4">
      {[
        {
          name: "Alex Harper",
          role: "Engineering Lead",
          src: "https://i.pravatar.cc/150?img=3",
          badge: "success" as const,
        },
        {
          name: "Samira Jones",
          role: "Product Manager",
          src: "https://i.pravatar.cc/150?img=5",
          badge: "neutral" as const,
        },
        {
          name: "Michael Chen",
          role: "UX Designer",
          src: "https://i.pravatar.cc/150?img=8",
          badge: "warning" as const,
        },
      ].map((user) => (
        <div
          key={user.name}
          className="astralis-flex astralis-items-center astralis-gap-3"
        >
          <div className="astralis-relative astralis-inline-flex">
            <Avatar size="md" src={user.src} name={user.name} />
            <AvatarBadge
              status={
                user.badge === "success"
                  ? "online"
                  : user.badge === "warning"
                    ? "away"
                    : "offline"
              }
            />
          </div>
          <div>
            <p className="astralis-text-sm astralis-font-semibold astralis-text-content-primary">
              {user.name}
            </p>
            <p className="astralis-text-xs astralis-text-content-secondary">
              {user.role}
            </p>
          </div>
          <Badge variant={user.badge} size="sm" className="astralis-ml-auto">
            {user.badge === "success"
              ? "Active"
              : user.badge === "warning"
                ? "Away"
                : "Offline"}
          </Badge>
        </div>
      ))}
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Compose `Avatar`, `AvatarBadge`, and `Badge` to build a user persona list.",
      },
    },
  },
};
