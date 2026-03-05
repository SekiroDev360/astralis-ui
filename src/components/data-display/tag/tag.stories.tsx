import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { Tag } from "./index";
import { AstralisProvider } from "../../../theme";
import { Avatar } from "../avatar";

const meta: Meta<typeof Tag> = {
  title: "Components/Data Display/Tag",
  component: Tag,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "Tag is used for categorizing or labeling content. " +
          "Use `Tag.Checkable` and `Tag.Group` to create selectable filter galleries.",
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
type Story = StoryObj<typeof Tag>;

/* ── Default ─────────────────────────────────────────────────────── */
export const Default: Story = {
  render: () => <Tag>Sample Tag</Tag>,
  parameters: { docs: { description: { story: "Basic subtle tag." } } },
};

/* ── Variants ────────────────────────────────────────────────────── */
export const Variants: Story = {
  render: () => (
    <div className="astralis-flex astralis-gap-4">
      <Tag variant="subtle" colorScheme="primary">
        Subtle
      </Tag>
      <Tag variant="solid" colorScheme="primary">
        Solid
      </Tag>
      <Tag variant="outline" colorScheme="primary">
        Outline
      </Tag>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "Three variants: subtle (default), solid, and outline.",
      },
    },
  },
};

/* ── Sizes ───────────────────────────────────────────────────────── */
export const Sizes: Story = {
  render: () => (
    <div className="astralis-flex astralis-items-end astralis-gap-4">
      <Tag size="sm">Small</Tag>
      <Tag size="md">Medium</Tag>
      <Tag size="lg">Large</Tag>
    </div>
  ),
  parameters: {
    docs: {
      description: { story: "Available in `sm`, `md` (default), and `lg`." },
    },
  },
};

/* ── Colors ──────────────────────────────────────────────────────── */
export const Colors: Story = {
  render: () => (
    <div className="astralis-flex astralis-flex-wrap astralis-gap-8">
      {/* Semantic */}
      <div className="astralis-flex astralis-flex-col astralis-gap-2">
        <p className="astralis-text-xs astralis-font-semibold astralis-text-content-secondary">
          Semantic
        </p>
        <div className="astralis-flex astralis-flex-wrap astralis-gap-2">
          <Tag colorScheme="primary">v1.2.0</Tag>
          <Tag colorScheme="success">Approved</Tag>
          <Tag colorScheme="warning">Pending</Tag>
          <Tag colorScheme="danger">Rejected</Tag>
          <Tag colorScheme="neutral">Draft</Tag>
        </div>
      </div>
      {/* Generic */}
      <div className="astralis-flex astralis-flex-col astralis-gap-2">
        <p className="astralis-text-xs astralis-font-semibold astralis-text-content-secondary">
          Palette
        </p>
        <div className="astralis-flex astralis-flex-wrap astralis-gap-2">
          {(
            [
              "blue",
              "green",
              "red",
              "yellow",
              "purple",
              "cyan",
              "pink",
              "orange",
              "teal",
              "gray",
            ] as const
          ).map((c) => (
            <Tag key={c} colorScheme={c} variant="subtle">
              {c}
            </Tag>
          ))}
        </div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "Supports semantic intent colors and generic palette colors.",
      },
    },
  },
};

/* ── Start / End Elements ────────────────────────────────────────── */
export const WithElements: Story = {
  render: () => (
    <div className="astralis-flex astralis-flex-wrap astralis-gap-4">
      <Tag
        startElement={
          <svg
            viewBox="0 0 16 16"
            fill="currentColor"
            className="astralis-h-3 astralis-w-3"
          >
            <path
              fillRule="evenodd"
              d="M8 1.5a6.5 6.5 0 1 0 0 13 6.5 6.5 0 0 0 0-13zM0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm6.5-.25A.75.75 0 0 1 7.25 7h1a.75.75 0 0 1 .75.75v2.75h.25a.75.75 0 0 1 0 1.5h-2a.75.75 0 0 1 0-1.5h.25v-2h-.25a.75.75 0 0 1-.75-.75zM8 6a1 1 0 1 1 0-2 1 1 0 0 1 0 2z"
            />
          </svg>
        }
      >
        Information
      </Tag>
      <Tag
        colorScheme="success"
        endElement={
          <svg
            viewBox="0 0 16 16"
            fill="currentColor"
            className="astralis-h-3 astralis-w-3"
          >
            <path d="M13.78 4.22a.75.75 0 0 1 0 1.06l-7.25 7.25a.75.75 0 0 1-1.06 0L2.22 9.28a.75.75 0 0 1 1.06-1.06L6 10.94l6.72-6.72a.75.75 0 0 1 1.06 0z" />
          </svg>
        }
      >
        Verified
      </Tag>
      <Tag
        size="lg"
        colorScheme="blue"
        startElement={
          <Avatar size="xs" src="https://i.pravatar.cc/150?img=5" name="User" />
        }
      >
        Alex Harper
      </Tag>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "Use `startElement` or `endElement` to inject icons or avatars.",
      },
    },
  },
};

/* ── Closable ────────────────────────────────────────────────────── */
export const Closable: Story = {
  render: () => {
    const [tags, setTags] = useState([
      "React",
      "TypeScript",
      "Tailwind",
      "Next.js",
    ]);
    return (
      <div className="astralis-flex astralis-flex-wrap astralis-gap-2">
        {tags.map((tag) => (
          <Tag
            key={tag}
            closable
            colorScheme="primary"
            variant="solid"
            onClose={() => setTags(tags.filter((t) => t !== tag))}
          >
            {tag}
          </Tag>
        ))}
        {tags.length === 0 && (
          <span className="astralis-text-sm astralis-text-content-secondary">
            All removed
          </span>
        )}
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: "Add `closable` and `onClose` to allow removing tags.",
      },
    },
  },
};

/* ── Overflow ────────────────────────────────────────────────────── */
export const Overflow: Story = {
  render: () => (
    <div className="astralis-w-48">
      <Tag colorScheme="warning">
        This is a very long tag label that will be truncated with an ellipsis
      </Tag>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Tag labels automatically truncate with an ellipsis if they exceed the container width.",
      },
    },
  },
};

/* ── Checkable ───────────────────────────────────────────────────── */
export const CheckableTag: Story = {
  render: () => {
    const [checked, setChecked] = useState(false);
    return (
      <Tag.Checkable checked={checked} onChange={setChecked}>
        {checked ? "Online" : "Offline"}
      </Tag.Checkable>
    );
  },
  parameters: {
    docs: {
      description: { story: "`Tag.Checkable` acts as a togglable button." },
    },
  },
};

/* ── Checkable Group ─────────────────────────────────────────────── */
export const CheckableGroup: Story = {
  render: () => {
    const [valSingle, setValSingle] = useState<(string | number)[]>(["design"]);
    const [valMulti, setValMulti] = useState<(string | number)[]>(["js", "ts"]);

    const options = [
      { label: "JavaScript", value: "js" },
      { label: "TypeScript", value: "ts" },
      { label: "Design", value: "design" },
      { label: "DevOps", value: "devops" },
    ];

    return (
      <div className="astralis-flex astralis-flex-col astralis-gap-8">
        <div>
          <p className="astralis-text-sm astralis-font-medium astralis-mb-2">
            Single Select Filter
          </p>
          <Tag.Group
            value={valSingle}
            onChange={setValSingle}
            options={options}
          />
        </div>
        <div>
          <p className="astralis-text-sm astralis-font-medium astralis-mb-2">
            Multi-Select Filter (multiple=true)
          </p>
          <Tag.Group
            multiple
            value={valMulti}
            onChange={setValMulti}
            options={options}
          />
        </div>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story:
          "`Tag.Group` manages state for an array of checkable tags. Supports `multiple` selection.",
      },
    },
  },
};
