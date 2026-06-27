import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";
import { Box } from "../../layout/box";
import { HStack, VStack } from "../../layout/stack";
import { Text } from "../../typography/text";
import { Steps } from "./index";

/**
 * Steps guides a user through a multi-step flow. It's a compound component:
 * `Steps.Root` owns the state and shares it via context; the parts compose freely.
 * Supports horizontal / vertical orientation, solid / subtle / dot variants, three
 * sizes, linear mode, an alternative (labels-below) layout, clickable indicators,
 * per-step content panels, and Prev/Next navigation.
 */
const meta: Meta<typeof Steps> = {
  title: "Components/Navigation/Steps",
  component: Steps,
  tags: ["autodocs"],
  argTypes: {
    orientation: { control: { type: "select" }, options: ["horizontal", "vertical"] },
    variant: { control: { type: "select" }, options: ["solid", "subtle", "dot"] },
    size: { control: { type: "select" }, options: ["sm", "md", "lg"] },
    linear: { control: { type: "boolean" } },
    labelPlacement: { control: { type: "select" }, options: ["inline", "bottom"] },
    clickable: { control: { type: "boolean" } },
  },
  parameters: {
    docs: { description: { component: "A multi-step progress / wizard navigator." } },
  },
};

export default meta;
type Story = StoryObj<typeof Steps>;

const STEPS = [
  { title: "Account", description: "Your details" },
  { title: "Company", description: "Org info" },
  { title: "Review", description: "Confirm & submit" },
];

const renderItems = () =>
  STEPS.map((s) => (
    <Steps.Item key={s.title}>
      <Steps.Indicator />
      <Steps.Title>{s.title}</Steps.Title>
      <Steps.Description>{s.description}</Steps.Description>
    </Steps.Item>
  ));

/** Interactive playground — adjust props in the Controls panel. */
export const Playground: Story = {
  args: { defaultStep: 1, orientation: "horizontal", variant: "solid", size: "md" },
  render: (args) => (
    <Box w="full" maxW="2xl">
      <Steps {...args}>
        <Steps.List>{renderItems()}</Steps.List>
      </Steps>
    </Box>
  ),
};

/** `variant` — solid (filled), subtle (outlined), and dot (minimal). */
export const Variants: Story = {
  render: () => (
    <VStack gap="10" w="full" maxW="2xl" alignItems="stretch">
      {(["solid", "subtle", "dot"] as const).map((v) => (
        <Box key={v}>
          <Text size="xs" color="subtle" fontFamily="mono" gutterBottom>variant="{v}"</Text>
          <Steps defaultStep={1} variant={v}>
            <Steps.List>{renderItems()}</Steps.List>
          </Steps>
        </Box>
      ))}
    </VStack>
  ),
};

/** `size` scales the indicator and typography together. */
export const Sizes: Story = {
  render: () => (
    <VStack gap="10" w="full" maxW="2xl" alignItems="stretch">
      {(["sm", "md", "lg"] as const).map((s) => (
        <Box key={s}>
          <Text size="xs" color="subtle" fontFamily="mono" gutterBottom>size="{s}"</Text>
          <Steps defaultStep={1} size={s}>
            <Steps.List>{renderItems()}</Steps.List>
          </Steps>
        </Box>
      ))}
    </VStack>
  ),
};

/** `labelPlacement="bottom"` centers the titles beneath the indicators. */
export const LabelPlacementBottom: Story = {
  render: () => (
    <Box w="full" maxW="2xl">
      <Steps defaultStep={1} labelPlacement="bottom">
        <Steps.List>{renderItems()}</Steps.List>
      </Steps>
    </Box>
  ),
};

/** Vertical orientation, with a connector running down the indicator column. */
export const Vertical: Story = {
  render: () => (
    <Steps defaultStep={1} orientation="vertical">
      <Steps.List>{renderItems()}</Steps.List>
    </Steps>
  ),
};

/** A step can be forced into the error status, or disabled. */
export const StatesAndErrors: Story = {
  render: () => (
    <Box w="full" maxW="2xl">
      <Steps defaultStep={2}>
        <Steps.List>
          <Steps.Item>
            <Steps.Indicator />
            <Steps.Title>Done</Steps.Title>
          </Steps.Item>
          <Steps.Item error>
            <Steps.Indicator />
            <Steps.Title>Payment</Steps.Title>
            <Steps.Description>Card declined</Steps.Description>
          </Steps.Item>
          <Steps.Item>
            <Steps.Indicator />
            <Steps.Title>Active</Steps.Title>
          </Steps.Item>
          <Steps.Item disabled>
            <Steps.Indicator />
            <Steps.Title>Locked</Steps.Title>
          </Steps.Item>
        </Steps.List>
      </Steps>
    </Box>
  ),
};

/** `clickable` turns each indicator into a button that jumps to its step. */
export const Clickable: Story = {
  render: () => {
    const [step, setStep] = useState(0);
    return (
      <VStack gap="5" w="full" maxW="2xl" alignItems="stretch">
        <Steps step={step} onStepChange={setStep} clickable>
          <Steps.List>{renderItems()}</Steps.List>
        </Steps>
        <Box bg="subtle" p="3" rounded="md">
          <Text size="sm">Active step: <Text as="span" weight="semibold">{step}</Text></Text>
        </Box>
      </VStack>
    );
  },
};

/** A full wizard — content panels per step plus Prev/Next navigation and a completed state. */
export const Wizard: Story = {
  render: () => {
    const [step, setStep] = useState(0);
    return (
      <Box w="full" maxW="2xl">
        <Steps step={step} onStepChange={setStep} count={STEPS.length} clickable>
          <Steps.List>{renderItems()}</Steps.List>

          <Box bg="subtle" rounded="lg" p="6" mt="6" minH="28">
            {STEPS.map((s, i) => (
              <Steps.Content key={s.title} index={i}>
                <Text size="lg" weight="semibold" gutterBottom>{s.title}</Text>
                <Text color="muted">This is the content for the “{s.title}” step.</Text>
              </Steps.Content>
            ))}
            <Steps.Completed>
              <Text size="lg" weight="semibold" color="success" gutterBottom>All steps complete 🎉</Text>
              <Text color="muted">You can now submit the form.</Text>
            </Steps.Completed>
          </Box>

          <HStack gap="3" mt="6">
            <Steps.Prev />
            <Steps.Next>{step >= STEPS.length - 1 ? "Finish" : "Next"}</Steps.Next>
          </HStack>
        </Steps>
      </Box>
    );
  },
};
