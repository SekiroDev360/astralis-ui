import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";
import type { FormEvent } from "react";
import { Checkbox } from "./index";
import { Field } from "../field";
import { Box } from "../../layout/box";
import { VStack, HStack } from "../../layout/stack";
import { Text } from "../../typography/text";
import { Button } from "../../buttons/button";
import { COLOR_SCHEMES } from "../../../const/color-schemes";

const meta: Meta = {
  title: "Components/Data Entry/Checkbox",
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "Checkbox lets users select one or more options. Use `Checkbox.Group` to manage a collection with shared state. Supports an `indeterminate` state for partial selections and `colorScheme` for the checked hue.",
      },
    },
  },
};

export default meta;
type Story = StoryObj;

/** A single controlled checkbox with a label. */
export const Basic: Story = {
  render: () => {
    const [checked, setChecked] = useState(false);
    return (
      <Checkbox checked={checked} onChange={(e) => setChecked(e.target.checked)}>
        Accept terms and conditions
      </Checkbox>
    );
  },
};

/** Three sizes: `sm`, `md`, `lg`. */
export const Sizes: Story = {
  render: () => (
    <VStack gap="3" alignItems="start">
      <Checkbox size="sm" defaultChecked>Small checkbox</Checkbox>
      <Checkbox size="md" defaultChecked>Medium checkbox (default)</Checkbox>
      <Checkbox size="lg" defaultChecked>Large checkbox</Checkbox>
    </VStack>
  ),
};

/** All states: unchecked, checked, indeterminate, disabled, invalid, read-only. */
export const States: Story = {
  render: () => (
    <VStack gap="3" alignItems="start">
      <Checkbox>Unchecked</Checkbox>
      <Checkbox defaultChecked>Checked</Checkbox>
      <Checkbox indeterminate>Indeterminate</Checkbox>
      <Checkbox disabled>Disabled unchecked</Checkbox>
      <Checkbox disabled defaultChecked>Disabled checked</Checkbox>
      <Checkbox invalid>Invalid</Checkbox>
      <Checkbox readOnly>Read-only unchecked</Checkbox>
      <Checkbox readOnly defaultChecked>Read-only checked</Checkbox>
    </VStack>
  ),
};

/** `colorScheme` sets the checked hue via the accent channel. */
export const Colors: Story = {
  render: () => (
    <HStack gap="4" wrap="wrap">
      {COLOR_SCHEMES.map((c) => (
        <Checkbox key={c} colorScheme={c} defaultChecked>
          {c}
        </Checkbox>
      ))}
    </HStack>
  ),
};

/** `Checkbox.Group` manages the selection state and works with `Field`. */
export const Group: Story = {
  render: () => {
    const [selected, setSelected] = useState<string[]>(["react"]);
    return (
      <Field>
        <Field.Label>Favourite frameworks</Field.Label>
        <Checkbox.Group value={selected} onChange={setSelected}>
          <Checkbox value="react">React</Checkbox>
          <Checkbox value="vue">Vue</Checkbox>
          <Checkbox value="svelte">Svelte</Checkbox>
          <Checkbox value="solid">Solid</Checkbox>
        </Checkbox.Group>
        <Field.HelpText>
          Selected: {selected.length > 0 ? selected.join(", ") : "none"}
        </Field.HelpText>
      </Field>
    );
  },
};

/** `orientation="horizontal"` lays checkboxes out in a row. */
export const GroupHorizontal: Story = {
  render: () => {
    const [selected, setSelected] = useState<string[]>(["email"]);
    return (
      <Field>
        <Field.Label>Notification channels</Field.Label>
        <Checkbox.Group value={selected} onChange={setSelected} orientation="horizontal" colorScheme="green">
          <Checkbox value="email">Email</Checkbox>
          <Checkbox value="sms">SMS</Checkbox>
          <Checkbox value="push">Push</Checkbox>
          <Checkbox value="slack">Slack</Checkbox>
        </Checkbox.Group>
      </Field>
    );
  },
};

/** Pass `disabled` to `Checkbox.Group` to disable all items at once. */
export const GroupDisabled: Story = {
  render: () => (
    <Checkbox.Group defaultValue={["a"]} disabled>
      <Checkbox value="a">Option A (pre-selected)</Checkbox>
      <Checkbox value="b">Option B</Checkbox>
      <Checkbox value="c">Option C</Checkbox>
    </Checkbox.Group>
  ),
};

/** Classic "select all" — the parent shows `indeterminate` when some children are checked. */
export const SelectAll: Story = {
  render: () => {
    const options = ["Inbox", "Sent", "Drafts", "Trash"];
    const [selected, setSelected] = useState<string[]>(["Inbox"]);

    const allChecked = selected.length === options.length;
    const isIndeterminate = selected.length > 0 && !allChecked;

    return (
      <VStack gap="2.5" alignItems="start">
        <Checkbox
          checked={allChecked}
          indeterminate={isIndeterminate}
          onChange={() => setSelected(allChecked ? [] : options)}
        >
          <Text as="span" weight="medium">Select all folders</Text>
        </Checkbox>

        <Box pl="6">
          <Checkbox.Group value={selected} onChange={setSelected}>
            {options.map((opt) => (
              <Checkbox key={opt} value={opt}>{opt}</Checkbox>
            ))}
          </Checkbox.Group>
        </Box>
      </VStack>
    );
  },
};

/** Checkbox + Field for an error state on submit. */
export const InForm: Story = {
  render: () => {
    const [agreed, setAgreed] = useState(false);
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = (e: FormEvent) => {
      e.preventDefault();
      setSubmitted(true);
    };

    return (
      <form onSubmit={handleSubmit}>
        <VStack gap="4" alignItems="stretch" w="72">
          <Field invalid={submitted && !agreed}>
            <Checkbox
              checked={agreed}
              invalid={submitted && !agreed}
              onChange={(e) => setAgreed(e.target.checked)}
            >
              I agree to the <Text as="span" weight="medium">Terms of Service</Text>
            </Checkbox>
            {submitted && !agreed && (
              <Field.ErrorText>You must accept the terms to continue.</Field.ErrorText>
            )}
          </Field>
          <Button type="submit">{submitted && agreed ? "✓ Submitted!" : "Submit"}</Button>
        </VStack>
      </form>
    );
  },
};
