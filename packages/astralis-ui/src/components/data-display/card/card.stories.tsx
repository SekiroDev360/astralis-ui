import type { Meta, StoryObj } from "@storybook/react-vite";
import { Card } from "./index";
import { Button } from "../../buttons/button";
import { Badge } from "../badge";
import { Box } from "../../layout/box";
import { HStack, VStack } from "../../layout/stack";
import { Text } from "../../typography/text";

/**
 * Card groups related content. `Card.Root` is the wrapper with `Card.Header`
 * (+ optional `extra` slot), `Card.Title`, `Card.Description`, `Card.Body`, and
 * `Card.Footer`. `variant` sets the surface treatment; `size` scales padding/radius.
 */
const meta: Meta<typeof Card> = {
  title: "Components/Data Display/Card",
  component: Card,
  tags: ["autodocs"],
  argTypes: {
    variant: { control: { type: "select" }, options: ["elevated", "outline", "filled", "unstyled"] },
    size: { control: { type: "select" }, options: ["sm", "md", "lg"] },
    hoverable: { control: { type: "boolean" } },
  },
};

export default meta;
type Story = StoryObj<typeof Card>;

export const Default: Story = {
  render: () => (
    <Box style={{ maxWidth: 360 }}>
      <Card.Root>
        <Card.Header>
          <Card.Title>Getting Started</Card.Title>
          <Card.Description>Everything you need to build with Astralis.</Card.Description>
        </Card.Header>
        <Card.Body>
          <Text size="sm" color="muted">
            Explore components, layouts, and design tokens — precompiled CSS with a scalable token system.
          </Text>
        </Card.Body>
        <Card.Footer>
          <Button as="a" href="#" variant="link">Read docs →</Button>
        </Card.Footer>
      </Card.Root>
    </Box>
  ),
};

export const Variants: Story = {
  render: () => (
    <Box style={{ maxWidth: 640 }}>
      <HStack gap="4" wrap="wrap">
        {(["elevated", "outline", "filled", "unstyled"] as const).map((v) => (
          <Box key={v} style={{ width: 280 }}>
            <Card.Root variant={v}>
              <Card.Header>
                <Card.Title>{v}</Card.Title>
                <Card.Description>variant="{v}"</Card.Description>
              </Card.Header>
              <Card.Body><Text size="sm" color="muted">Card body content.</Text></Card.Body>
            </Card.Root>
          </Box>
        ))}
      </HStack>
    </Box>
  ),
};

export const Sizes: Story = {
  render: () => (
    <VStack gap="4" alignItems="start">
      {(["sm", "md", "lg"] as const).map((s) => (
        <Box key={s} style={{ width: 340 }}>
          <Card.Root size={s}>
            <Card.Header>
              <Card.Title>Size: {s}</Card.Title>
              <Card.Description>Padding and radius scale with size.</Card.Description>
            </Card.Header>
            <Card.Body><Text size="sm" color="muted">Body content.</Text></Card.Body>
          </Card.Root>
        </Box>
      ))}
    </VStack>
  ),
};

/** The header `extra` slot renders a trailing action and adds a divider. */
export const WithHeaderExtra: Story = {
  render: () => (
    <Box style={{ maxWidth: 360 }}>
      <Card.Root>
        <Card.Header extra={<Badge colorScheme="green">Active</Badge>}>
          <Card.Title>Production cluster</Card.Title>
          <Card.Description>us-east-1</Card.Description>
        </Card.Header>
        <Card.Body><Text size="sm" color="muted">All services operational.</Text></Card.Body>
      </Card.Root>
    </Box>
  ),
};

/** `hoverable` adds a lift on hover — good for clickable cards. */
export const Hoverable: Story = {
  render: () => (
    <HStack gap="4">
      {["Design System", "Components", "Dark Mode"].map((title) => (
        <Box key={title} style={{ width: 180 }}>
          <Card.Root hoverable>
            <Card.Body>
              <Card.Title>{title}</Card.Title>
              <Card.Description>Click to explore.</Card.Description>
            </Card.Body>
          </Card.Root>
        </Box>
      ))}
    </HStack>
  ),
};
