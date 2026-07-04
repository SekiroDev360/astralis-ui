import type { Meta, StoryObj } from "@storybook/react-vite";
import { Tooltip } from "./index";
import { Button } from "../../buttons/button";
import { HStack } from "../../layout/stack";

/**
 * Tooltip shows supplementary text on hover or focus after a short delay. It's
 * non-interactive (`role="tooltip"`, wired via `aria-describedby`), dismisses on
 * Escape, and flips to stay in view.
 */
const meta: Meta<typeof Tooltip> = {
  title: "Components/Overlay/Tooltip",
  component: Tooltip,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Tooltip>;

/** Hover or focus the trigger. */
export const Basic: Story = {
  render: () => (
    <Tooltip>
      <Tooltip.Trigger><Button variant="outline" colorScheme="gray">Hover me</Button></Tooltip.Trigger>
      <Tooltip.Content withArrow>Add to library</Tooltip.Content>
    </Tooltip>
  ),
};

/** Placement via `side`. */
export const Sides: Story = {
  render: () => (
    <HStack gap="3">
      {(["top", "right", "bottom", "left"] as const).map((side) => (
        <Tooltip key={side} side={side}>
          <Tooltip.Trigger><Button variant="outline" colorScheme="gray">{side}</Button></Tooltip.Trigger>
          <Tooltip.Content withArrow>Tooltip on {side}</Tooltip.Content>
        </Tooltip>
      ))}
    </HStack>
  ),
};

/** Tune the hover `delay` (ms). */
export const Delays: Story = {
  render: () => (
    <HStack gap="3">
      {[0, 300, 700].map((delay) => (
        <Tooltip key={delay} delay={delay}>
          <Tooltip.Trigger><Button variant="outline" colorScheme="gray">{delay}ms</Button></Tooltip.Trigger>
          <Tooltip.Content>Shown after {delay}ms</Tooltip.Content>
        </Tooltip>
      ))}
    </HStack>
  ),
};
