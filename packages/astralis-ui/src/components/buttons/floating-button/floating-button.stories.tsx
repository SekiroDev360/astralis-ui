import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";
import { FloatingButton } from "./floating-button";
import { FLOATING_BUTTON_OFFSETS, FLOATING_BUTTON_PLACEMENTS } from "./floating-button.styles";
import type { FloatingButtonPosition } from "./floating-button.types";
import { Text } from "../../typography/text";
import { Box } from "../../layout/box";

const meta: Meta<typeof FloatingButton> = {
  title: "Components/Buttons/FloatingButton",
  component: FloatingButton,
  tags: ["autodocs"],
  parameters: {
    // Fixed positioning is relative to the viewport, so the canvas needs room.
    layout: "fullscreen",
  },
  argTypes: {
    placement: {
      control: { type: "select" },
      options: FLOATING_BUTTON_PLACEMENTS,
      description: "Corner the button rests in until it is dragged",
    },
    offset: {
      control: { type: "select" },
      options: FLOATING_BUTTON_OFFSETS,
      description: "Distance from the viewport edges at rest",
    },
    draggable: {
      control: { type: "boolean" },
      description: "Allow repositioning by dragging",
    },
    variant: {
      control: { type: "select" },
      options: ["solid", "subtle", "surface", "outline", "text", "link"],
      description: "The visual style variant of the underlying Button",
    },
    colorScheme: {
      control: { type: "select" },
      options: ["brand", "gray", "red", "orange", "yellow", "green", "teal", "blue", "cyan", "purple", "pink"],
      description: "Hue the underlying Button paints with",
    },
    size: {
      control: { type: "select" },
      options: ["xs", "sm", "md", "lg", "xl"],
      description: "The size of the button",
    },
    edgePadding: {
      control: { type: "number" },
      description: "Clearance kept between the button and the viewport edges",
    },
    dragThreshold: {
      control: { type: "number" },
      description: "Pointer travel (px) before a press counts as a drag rather than a click",
    },
  },
};

export default meta;
type Story = StoryObj<typeof FloatingButton>;

/** A page tall enough to show that the button stays put while the page scrolls. */
const Page = ({ children }: { children?: React.ReactNode }) => (
  <Box padding="8" className="astralis:min-h-screen astralis:bg-surface-subtle">
    <Text weight="medium">Drag the button anywhere.</Text>
    <Text size="sm" color="muted">
      A short press still clicks; only movement past the threshold repositions it. With the button
      focused, arrow keys nudge it (hold Shift for 1px steps).
    </Text>
    {children}
  </Box>
);

export const Default: Story = {
  args: { children: "Chat", "aria-label": "Open chat" },
  render: (args) => (
    <Page>
      <FloatingButton {...args} />
    </Page>
  ),
};

/** Icon-only: Button gives it a square frame, `rounded="full"` makes it a circle. */
export const IconOnly: Story = {
  args: { "aria-label": "Add", size: "lg" },
  render: (args) => (
    <Page>
      <FloatingButton {...args}>+</FloatingButton>
    </Page>
  ),
};

/** Every corner, each with its own hue so you can tell them apart. */
export const Placements: Story = {
  render: () => (
    <Page>
      {FLOATING_BUTTON_PLACEMENTS.map((placement, index) => (
        <FloatingButton
          key={placement}
          placement={placement}
          colorScheme={(["brand", "teal", "purple", "pink"] as const)[index]}
          aria-label={placement}
        >
          {placement}
        </FloatingButton>
      ))}
    </Page>
  ),
};

/** `draggable={false}` pins it — useful when the position is part of the design. */
export const Fixed: Story = {
  args: { draggable: false, children: "Fixed", "aria-label": "Fixed helper" },
  render: (args) => (
    <Page>
      <FloatingButton {...args} />
    </Page>
  ),
};

/**
 * Controlled: you own the position. `onPositionCommit` fires once when a drag
 * ends, which is the hook to persist to storage rather than every frame.
 */
export const Controlled: Story = {
  render: () => {
    const [position, setPosition] = useState<FloatingButtonPosition | null>(null);
    const [committed, setCommitted] = useState<FloatingButtonPosition | null>(null);
    return (
      <Page>
        <Box marginTop="4">
          <Text size="sm">
            live: {position ? `${Math.round(position.x)}, ${Math.round(position.y)}` : "at rest"}
          </Text>
          <Text size="sm" color="muted">
            committed: {committed ? `${Math.round(committed.x)}, ${Math.round(committed.y)}` : "—"}
          </Text>
        </Box>
        <FloatingButton
          position={position}
          onPositionChange={setPosition}
          onPositionCommit={setCommitted}
          aria-label="Drag me"
        >
          Drag me
        </FloatingButton>
      </Page>
    );
  },
};
