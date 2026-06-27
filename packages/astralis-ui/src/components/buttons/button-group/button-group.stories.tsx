import type { Meta, StoryObj } from "@storybook/react-vite";
import { Bold, Italic, Underline } from "lucide-react";
import { Button } from "../button";
import { Icon } from "../../icon";
import { ButtonGroup } from "./button-group";

/**
 * ButtonGroup lays out related buttons and shares `size`/`variant`/`colorScheme`/
 * `disabled` to them via context (each child can still override). With `attached`,
 * the buttons fuse into a single segmented control.
 */
const meta: Meta<typeof ButtonGroup> = {
  title: "Components/Buttons/ButtonGroup",
  component: ButtonGroup,
  tags: ["autodocs"],
  argTypes: {
    orientation: { control: { type: "inline-radio" }, options: ["horizontal", "vertical"] },
    attached: { control: { type: "boolean" } },
    spacing: { control: { type: "select" }, options: ["none", "sm", "md", "lg"] },
    size: { control: { type: "select" }, options: ["xs", "sm", "md", "lg", "xl"] },
    variant: { control: { type: "select" }, options: ["solid", "subtle", "surface", "outline", "text", "link"] },
    colorScheme: {
      control: { type: "select" },
      options: ["brand", "gray", "red", "orange", "yellow", "green", "teal", "blue", "cyan", "purple", "pink"],
    },
  },
};

export default meta;
type Story = StoryObj<typeof ButtonGroup>;

/** Spaced group — children inherit the group's shared props. */
export const Spaced: Story = {
  args: { variant: "outline", colorScheme: "gray" },
  render: (args) => (
    <ButtonGroup {...args}>
      <Button>Cut</Button>
      <Button>Copy</Button>
      <Button>Paste</Button>
    </ButtonGroup>
  ),
};

/** Attached — one segmented control with collapsed inner radii and merged borders. */
export const Attached: Story = {
  args: { attached: true, variant: "outline", colorScheme: "gray" },
  render: (args) => (
    <ButtonGroup {...args}>
      <Button>Day</Button>
      <Button>Week</Button>
      <Button>Month</Button>
    </ButtonGroup>
  ),
};

/** Attached icon-only toolbar (each button gets an `aria-label`). */
export const AttachedIcons: Story = {
  args: { attached: true, variant: "surface", colorScheme: "gray" },
  render: (args) => (
    <ButtonGroup {...args}>
      <Button aria-label="Bold" leftIcon={<Icon as={Bold} size="sm" />} />
      <Button aria-label="Italic" leftIcon={<Icon as={Italic} size="sm" />} />
      <Button aria-label="Underline" leftIcon={<Icon as={Underline} size="sm" />} />
    </ButtonGroup>
  ),
};

/** Vertical attached stack. */
export const Vertical: Story = {
  args: { attached: true, orientation: "vertical", variant: "outline", colorScheme: "gray" },
  render: (args) => (
    <ButtonGroup {...args}>
      <Button>Top</Button>
      <Button>Middle</Button>
      <Button>Bottom</Button>
    </ButtonGroup>
  ),
};

/** A child can override the shared props — here the primary action stays solid/brand. */
export const MixedActions: Story = {
  args: { variant: "subtle", colorScheme: "gray" },
  render: (args) => (
    <ButtonGroup {...args}>
      <Button>Cancel</Button>
      <Button variant="solid" colorScheme="brand">Save</Button>
    </ButtonGroup>
  ),
};
