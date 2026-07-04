import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";
import { Field } from "./index";
import { Input } from "../input";
import { VStack } from "../../layout/stack";

const meta: Meta = {
  title: "Components/Data Entry/Field",
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "Field is the context wrapper for any data-entry input. It handles label wiring, help text, error messages, and propagates `invalid`, `disabled`, and `required` state down to child inputs via context — no prop drilling needed.",
      },
    },
  },
};

export default meta;
type Story = StoryObj;

/** The simplest Field: label auto-wired to the input via context. */
export const Basic: Story = {
  render: () => (
    <Field>
      <Field.Label>Full name</Field.Label>
      <Input placeholder="John Doe" />
    </Field>
  ),
};

/** Field with helper text underneath the input. */
export const WithHelpText: Story = {
  render: () => (
    <Field>
      <Field.Label>Email address</Field.Label>
      <Input type="email" placeholder="you@example.com" />
      <Field.HelpText>We'll never share your email with anyone.</Field.HelpText>
    </Field>
  ),
};

/** Field marked as required — the asterisk renders automatically in the label. */
export const Required: Story = {
  render: () => (
    <Field required>
      <Field.Label>Username</Field.Label>
      <Input placeholder="@yourhandle" />
      <Field.HelpText>Your unique Astralis username.</Field.HelpText>
    </Field>
  ),
};

/** Field in the invalid/error state. The input picks up `invalid` from context. */
export const Invalid: Story = {
  render: () => (
    <Field invalid>
      <Field.Label>Email address</Field.Label>
      <Input type="email" defaultValue="not-an-email" />
      <Field.ErrorText>Please enter a valid email address.</Field.ErrorText>
    </Field>
  ),
};

/** Reactive validation — error text appears when the value is too short. */
export const WithErrorAndHelp: Story = {
  render: () => {
    const [value, setValue] = useState("");
    const isInvalid = value.length > 0 && value.length < 8;

    return (
      <Field invalid={isInvalid} required>
        <Field.Label>Password</Field.Label>
        <Input
          type="password"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="••••••••"
        />
        {isInvalid ? (
          <Field.ErrorText>Password must be at least 8 characters.</Field.ErrorText>
        ) : (
          <Field.HelpText>Must be at least 8 characters long.</Field.HelpText>
        )}
      </Field>
    );
  },
};

/** Disabled Field — everything inside becomes non-interactive and dims. */
export const Disabled: Story = {
  render: () => (
    <Field disabled>
      <Field.Label>Account email</Field.Label>
      <Input type="email" defaultValue="locked@example.com" />
      <Field.HelpText>This field cannot be changed.</Field.HelpText>
    </Field>
  ),
};

/** A stacked form mixing required, normal, and invalid fields. */
export const FormExample: Story = {
  render: () => (
    <VStack gap="5" alignItems="stretch">
      <Field required>
        <Field.Label>Full name</Field.Label>
        <Input placeholder="Jane Doe" />
      </Field>
      <Field required>
        <Field.Label>Email address</Field.Label>
        <Input type="email" placeholder="jane@example.com" />
        <Field.HelpText>Used for account notifications.</Field.HelpText>
      </Field>
      <Field invalid>
        <Field.Label>Phone number</Field.Label>
        <Input type="tel" defaultValue="not-a-phone" />
        <Field.ErrorText>Enter a valid phone number.</Field.ErrorText>
      </Field>
    </VStack>
  ),
};
