import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";
import type { FormEvent } from "react";
import { Radio } from "./index";
import { Field } from "../field";
import { Box } from "../../layout/box";
import { VStack, HStack } from "../../layout/stack";
import { Text } from "../../typography/text";
import { Button } from "../../buttons/button";
import { COLOR_SCHEMES } from "../../../const/color-schemes";

const meta: Meta = {
  title: "Components/Data Entry/Radio",
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "Radio lets users select exactly one option from a set. Use `Radio.Group` to manage the selection state and automatically wire up the `name` attribute for proper browser behaviour.",
      },
    },
  },
};

export default meta;
type Story = StoryObj;

/** A basic controlled Radio.Group with two options. */
export const Basic: Story = {
  render: () => {
    const [val, setVal] = useState("monthly");
    return (
      <Radio.Group value={val} onChange={setVal}>
        <Radio value="monthly">Monthly</Radio>
        <Radio value="annual">Annual</Radio>
      </Radio.Group>
    );
  },
};

/** Three sizes: `sm`, `md`, `lg`. */
export const Sizes: Story = {
  render: () => (
    <VStack gap="4" alignItems="start">
      <Radio.Group defaultValue="sm"><Radio value="sm" size="sm">Small radio</Radio></Radio.Group>
      <Radio.Group defaultValue="md"><Radio value="md" size="md">Medium radio (default)</Radio></Radio.Group>
      <Radio.Group defaultValue="lg"><Radio value="lg" size="lg">Large radio</Radio></Radio.Group>
    </VStack>
  ),
};

/** All Radio states. */
export const States: Story = {
  render: () => (
    <VStack gap="3" alignItems="start">
      <Radio value="a" name="states">Unchecked</Radio>
      <Radio value="b" name="states" defaultChecked>Checked</Radio>
      <Radio value="c" name="states" disabled>Disabled unchecked</Radio>
      <Radio value="d" name="states" disabled defaultChecked>Disabled checked</Radio>
      <Radio value="e" name="states" invalid>Invalid</Radio>
      <Radio value="f" name="states" readOnly>Read-only unchecked</Radio>
      <Radio value="g" name="states" readOnly defaultChecked>Read-only checked</Radio>
    </VStack>
  ),
};

/** `colorScheme` sets the selected hue via the accent channel. */
export const Colors: Story = {
  render: () => (
    <HStack gap="4" wrap="wrap">
      {COLOR_SCHEMES.map((c) => (
        <Radio key={c} name={`color-${c}`} colorScheme={c} defaultChecked>
          {c}
        </Radio>
      ))}
    </HStack>
  ),
};

/** Vertical group (default) with Field for label and helper text. */
export const GroupVertical: Story = {
  render: () => {
    const [plan, setPlan] = useState("pro");
    return (
      <Field>
        <Field.Label>Select a plan</Field.Label>
        <Radio.Group value={plan} onChange={setPlan}>
          <Radio value="free">Free — Up to 3 projects</Radio>
          <Radio value="pro">Pro — Unlimited projects</Radio>
          <Radio value="team">Team — Collaboration features</Radio>
          <Radio value="enterprise">Enterprise — Custom pricing</Radio>
        </Radio.Group>
        <Field.HelpText>Selected: {plan}</Field.HelpText>
      </Field>
    );
  },
};

/** `orientation="horizontal"` for side-by-side radios. */
export const GroupHorizontal: Story = {
  render: () => {
    const [size, setSize] = useState("md");
    return (
      <Field>
        <Field.Label>T-shirt size</Field.Label>
        <Radio.Group value={size} onChange={setSize} orientation="horizontal">
          <Radio value="xs">XS</Radio>
          <Radio value="sm">SM</Radio>
          <Radio value="md">MD</Radio>
          <Radio value="lg">LG</Radio>
          <Radio value="xl">XL</Radio>
        </Radio.Group>
      </Field>
    );
  },
};

/** Pass `disabled` to `Radio.Group` to disable all options at once. */
export const GroupDisabled: Story = {
  render: () => (
    <Radio.Group defaultValue="standard" disabled>
      <Radio value="standard">Standard shipping</Radio>
      <Radio value="express">Express shipping</Radio>
      <Radio value="overnight">Overnight shipping</Radio>
    </Radio.Group>
  ),
};

/** Custom card-style layout wrapping Radio inside styled Boxes — fully composable. */
export const CardStyle: Story = {
  render: () => {
    const [selected, setSelected] = useState("monthly");
    const plans = [
      { value: "monthly", label: "Monthly", price: "$12/mo", desc: "Billed monthly" },
      { value: "annual", label: "Annual", price: "$8/mo", desc: "Billed $96/yr — save 33%" },
    ];
    return (
      <Radio.Group value={selected} onChange={setSelected}>
        <VStack gap="3" alignItems="stretch" w="72">
          {plans.map((plan) => {
            const active = selected === plan.value;
            return (
              <Box
                key={plan.value}
                as="label"
                display="flex"
                p="4"
                rounded="xl"
                border="normal"
                borderColor={active ? "emphasized" : "subtle"}
                bg={active ? "muted" : "base"}
              >
                <HStack gap="3" alignItems="start">
                  <Radio value={plan.value} />
                  <Box>
                    <Text size="sm" weight="medium">
                      {plan.label}{" "}
                      <Text as="span" weight="semibold">{plan.price}</Text>
                    </Text>
                    <Text size="xs" color="muted">{plan.desc}</Text>
                  </Box>
                </HStack>
              </Box>
            );
          })}
        </VStack>
      </Radio.Group>
    );
  },
};

/** Radio.Group inside a Field with error validation on submit. */
export const InForm: Story = {
  render: () => {
    const [role, setRole] = useState("");
    const [submitted, setSubmitted] = useState(false);
    const isInvalid = submitted && !role;

    const handleSubmit = (e: FormEvent) => {
      e.preventDefault();
      setSubmitted(true);
    };

    return (
      <form onSubmit={handleSubmit}>
        <VStack gap="4" alignItems="stretch" w="64">
          <Field invalid={isInvalid}>
            <Field.Label>Your role</Field.Label>
            <Radio.Group value={role} onChange={setRole}>
              <Radio value="designer">Designer</Radio>
              <Radio value="engineer">Engineer</Radio>
              <Radio value="manager">Manager</Radio>
              <Radio value="other">Other</Radio>
            </Radio.Group>
            {isInvalid && <Field.ErrorText>Please select a role.</Field.ErrorText>}
          </Field>
          <Button type="submit">{role && !isInvalid ? `Submit as ${role}` : "Submit"}</Button>
        </VStack>
      </form>
    );
  },
};
