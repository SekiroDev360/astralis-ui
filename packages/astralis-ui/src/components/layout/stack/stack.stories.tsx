import type { Meta, StoryObj } from "@storybook/react-vite";
import { Stack, HStack, VStack } from "./index";
import { AstralisProvider } from "../../../theme";

const meta: Meta<typeof Stack> = {
  title: "Components/Layout/Stack",
  component: Stack,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "`Stack` is a flex-based layout primitive for stacking children with consistent spacing. Use `VStack` for vertical layouts, `HStack` for horizontal, or `Stack` directly when you need to control direction dynamically. Props include `gap`, `align`, `justify`, `wrap` and a polymorphic `as`.",
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
type Story = StoryObj<typeof Stack>;

// ─── Shared helper ────────────────────────────────────────────────────────────

const Chip = ({ label }: { label: string }) => (
  <div className="astralis-bg-primary-100 astralis-text-primary-700 astralis-rounded-md astralis-px-4 astralis-py-3 astralis-text-sm astralis-font-medium astralis-whitespace-nowrap">
    {label}
  </div>
);

// ─── Vertical ─────────────────────────────────────────────────────────────────

/** VStack stacks children vertically with a uniform gap. */
export const Vertical: Story = {
  render: () => (
    <VStack gap={4} className="astralis-w-48">
      <Chip label="Item 1" />
      <Chip label="Item 2" />
      <Chip label="Item 3" />
    </VStack>
  ),
  parameters: {
    docs: {
      description: {
        story:
          '`VStack` is a `Stack` with `direction="col"` preset. Pass `gap` to control spacing between children.',
      },
    },
  },
};

// ─── Horizontal ───────────────────────────────────────────────────────────────

/** HStack aligns children side-by-side with a uniform gap. */
export const Horizontal: Story = {
  render: () => (
    <HStack gap={4} align="center">
      <Chip label="Item 1" />
      <Chip label="Item 2" />
      <Chip label="Item 3" />
    </HStack>
  ),
  parameters: {
    docs: {
      description: {
        story:
          '`HStack` is a `Stack` with `direction="row"` preset. Combine with `align` to control cross-axis alignment.',
      },
    },
  },
};

// ─── Directions ───────────────────────────────────────────────────────────────

/** All four flex directions available on Stack. */
export const Directions: Story = {
  render: () => (
    <VStack gap={8}>
      {(["col", "row", "col-reverse", "row-reverse"] as const).map((dir) => (
        <div key={dir}>
          <p className="astralis-text-xs astralis-text-content-tertiary astralis-mb-2 astralis-font-mono">
            direction=&quot;{dir}&quot;
          </p>
          <Stack direction={dir} gap={3} align="center">
            <Chip label="A" />
            <Chip label="B" />
            <Chip label="C" />
          </Stack>
        </div>
      ))}
    </VStack>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "The `direction` prop maps directly to `flex-direction`. All four CSS values are supported: `col`, `row`, `col-reverse`, `row-reverse`.",
      },
    },
  },
};

// ─── Alignment ────────────────────────────────────────────────────────────────

/** `align` controls cross-axis alignment (align-items). */
export const Alignment: Story = {
  render: () => (
    <VStack gap={6}>
      {(["start", "center", "end", "stretch"] as const).map((align) => (
        <div key={align}>
          <p className="astralis-text-xs astralis-text-content-tertiary astralis-mb-2 astralis-font-mono">
            align=&quot;{align}&quot;
          </p>
          <HStack
            gap={3}
            align={align}
            className="astralis-p-3 astralis-border astralis-border-border-subtle astralis-rounded-md astralis-h-20"
          >
            <Chip label="A" />
            <Chip label="B" />
            <Chip label="C" />
          </HStack>
        </div>
      ))}
    </VStack>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "`align` maps to `align-items`. The fixed-height container makes cross-axis positioning visible.",
      },
    },
  },
};

// ─── Justify ──────────────────────────────────────────────────────────────────

/** `justify` controls main-axis distribution (justify-content). */
export const Justify: Story = {
  render: () => (
    <VStack gap={6}>
      {(["start", "center", "end", "between", "around", "evenly"] as const).map(
        (justify) => (
          <div key={justify}>
            <p className="astralis-text-xs astralis-text-content-tertiary astralis-mb-2 astralis-font-mono">
              justify=&quot;{justify}&quot;
            </p>
            <HStack
              gap={3}
              justify={justify}
              className="astralis-p-3 astralis-border astralis-border-border-subtle astralis-rounded-md"
            >
              <Chip label="A" />
              <Chip label="B" />
              <Chip label="C" />
            </HStack>
          </div>
        ),
      )}
    </VStack>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "`justify` maps to `justify-content`. Useful shorthands: `between` = `space-between`, `around` = `space-around`, `evenly` = `space-evenly`.",
      },
    },
  },
};

// ─── Wrap ─────────────────────────────────────────────────────────────────────

/** `wrap` lets children wrap onto new lines when they overflow. */
export const Wrap: Story = {
  render: () => (
    <HStack gap={3} wrap="wrap" className="astralis-max-w-xs">
      {Array.from({ length: 8 }, (_, i) => (
        <Chip key={i} label={`Item ${i + 1}`} />
      ))}
    </HStack>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'Set `wrap="wrap"` to allow children to flow onto multiple lines when the container is too narrow to fit them all.',
      },
    },
  },
};

// ─── Real World ───────────────────────────────────────────────────────────────

/** A typical user card built entirely with Stack primitives. */
export const RealWorld: Story = {
  render: () => (
    <VStack
      gap={0}
      className="astralis-w-80 astralis-rounded-xl astralis-border astralis-border-border-subtle astralis-bg-surface-raised astralis-shadow-sm astralis-overflow-hidden"
    >
      {/* Header */}
      <HStack
        gap={3}
        align="center"
        className="astralis-px-4 astralis-py-4 astralis-border-b astralis-border-border-subtle"
      >
        <div className="astralis-h-10 astralis-w-10 astralis-rounded-full astralis-bg-primary-100 astralis-flex astralis-items-center astralis-justify-center astralis-shrink-0">
          <span className="astralis-text-sm astralis-font-semibold astralis-text-primary-700">
            JD
          </span>
        </div>
        <VStack gap={0}>
          <span className="astralis-text-sm astralis-font-semibold astralis-text-content-primary">
            Jane Doe
          </span>
          <span className="astralis-text-xs astralis-text-content-tertiary">
            Product Designer
          </span>
        </VStack>
      </HStack>

      {/* Body */}
      <VStack gap={2} className="astralis-px-4 astralis-py-4">
        <p className="astralis-text-sm astralis-text-content-secondary">
          Passionate about crafting pixel-perfect interfaces and scalable design
          systems that developers actually enjoy using.
        </p>
        <HStack gap={2} wrap="wrap">
          {["Design Systems", "Figma", "React"].map((tag) => (
            <span
              key={tag}
              className="astralis-text-xs astralis-bg-surface-sunken astralis-text-content-secondary astralis-rounded-full astralis-px-3 astralis-py-1 astralis-border astralis-border-border-subtle"
            >
              {tag}
            </span>
          ))}
        </HStack>
      </VStack>

      {/* Footer */}
      <HStack
        gap={2}
        justify="end"
        className="astralis-px-4 astralis-py-3 astralis-border-t astralis-border-border-subtle astralis-bg-surface-sunken"
      >
        <button className="astralis-text-xs astralis-font-medium astralis-text-content-secondary astralis-px-3 astralis-py-1.5 astralis-rounded-md astralis-border astralis-border-border-subtle hover:astralis-bg-surface-raised astralis-transition-colors">
          Message
        </button>
        <button className="astralis-text-xs astralis-font-medium astralis-text-white astralis-bg-primary-600 astralis-px-3 astralis-py-1.5 astralis-rounded-md hover:astralis-bg-primary-700 astralis-transition-colors">
          Follow
        </button>
      </HStack>
    </VStack>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "A user profile card composed entirely from `VStack` and `HStack`. The header, body text area and footer are each independent stacks — no custom flex CSS needed.",
      },
    },
  },
};
