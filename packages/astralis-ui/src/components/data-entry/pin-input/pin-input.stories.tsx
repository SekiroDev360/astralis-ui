import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";
import type { FormEvent } from "react";
import { PinInput } from "./index";
import { Field } from "../field";
import { VStack } from "../../layout/stack";
import { Text } from "../../typography/text";
import { Button } from "../../buttons/button";

const meta: Meta = {
  title: "Components/Data Entry/PinInput",
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "PinInput renders N individual character boxes commonly used for OTP codes, PINs, and verification flows. Features: auto-advance on entry, backspace-to-previous, arrow-key navigation, paste distribution, `onComplete` callback, and numeric / alpha / alphanumeric validation.",
      },
    },
  },
};

export default meta;
type Story = StoryObj;

/** A basic 4-box numeric PinInput. */
export const Basic: Story = {
  render: () => {
    const [val, setVal] = useState("");
    return (
      <VStack gap="3" alignItems="start">
        <PinInput value={val} onChange={setVal} />
        <Text size="sm" color="muted">
          Value: <Text as="span" fontFamily="mono">{val || "—"}</Text>
        </Text>
      </VStack>
    );
  },
};

/** `length={6}` for a standard OTP; `onComplete` fires when all boxes are filled. */
export const OTP: Story = {
  render: () => {
    const [val, setVal] = useState("");
    const [done, setDone] = useState(false);
    return (
      <VStack gap="3" alignItems="start">
        <PinInput
          length={6}
          value={val}
          onChange={(v) => {
            setVal(v);
            setDone(false);
          }}
          onComplete={() => setDone(true)}
        />
        {done && <Text size="sm" weight="medium" color="success">✓ Code verified: {val}</Text>}
      </VStack>
    );
  },
};

/** Three sizes: `sm`, `md`, `lg`. */
export const Sizes: Story = {
  render: () => (
    <VStack gap="4" alignItems="start">
      <PinInput size="sm" defaultValue="1234" />
      <PinInput size="md" defaultValue="1234" />
      <PinInput size="lg" defaultValue="1234" />
    </VStack>
  ),
};

/** Two variants: `outline` and `filled`. */
export const Variants: Story = {
  render: () => (
    <VStack gap="4" alignItems="start">
      <PinInput variant="outline" defaultValue="1234" />
      <PinInput variant="filled" defaultValue="1234" />
    </VStack>
  ),
};

/** Empty, pre-filled, disabled, and invalid states. */
export const States: Story = {
  render: () => (
    <VStack gap="4" alignItems="start">
      <PinInput placeholder="·" />
      <PinInput defaultValue="1234" />
      <PinInput disabled defaultValue="1234" />
      <PinInput invalid defaultValue="1234" />
    </VStack>
  ),
};

/** `mask` renders characters as bullets — ideal for PINs. */
export const Masked: Story = {
  render: () => {
    const [val, setVal] = useState("");
    return (
      <VStack gap="3" alignItems="start">
        <PinInput mask value={val} onChange={setVal} length={6} placeholder="·" />
        <Text size="sm" color="muted">
          Raw: <Text as="span" fontFamily="mono">{val || "—"}</Text>
        </Text>
      </VStack>
    );
  },
};

/** `type="alphanumeric"` accepts letters and numbers — invite codes, license keys. */
export const Alphanumeric: Story = {
  render: () => {
    const [val, setVal] = useState("");
    return (
      <VStack gap="3" alignItems="start">
        <PinInput type="alphanumeric" length={6} value={val} onChange={setVal} placeholder="·" />
        <Text size="sm" color="muted">
          Code: <Text as="span" fontFamily="mono">{val || "—"}</Text>
        </Text>
      </VStack>
    );
  },
};

/** PinInput inside a `Field` with label and help text. */
export const InField: Story = {
  render: () => {
    const [val, setVal] = useState("");
    return (
      <Field>
        <Field.Label>Verification code</Field.Label>
        <PinInput length={6} value={val} onChange={setVal} />
        <Field.HelpText>Enter the 6-digit code sent to your email.</Field.HelpText>
      </Field>
    );
  },
};

/** Full OTP form flow — error shown if submitted before all 6 boxes are filled. */
export const InForm: Story = {
  render: () => {
    const [code, setCode] = useState("");
    const [submitted, setSubmitted] = useState(false);
    const isInvalid = submitted && code.length < 6;

    const handleSubmit = (e: FormEvent) => {
      e.preventDefault();
      setSubmitted(true);
    };

    return (
      <form onSubmit={handleSubmit}>
        <VStack gap="4" alignItems="start">
          <Field invalid={isInvalid}>
            <Field.Label>One-time code</Field.Label>
            <PinInput
              length={6}
              value={code}
              onChange={(v) => {
                setCode(v);
                setSubmitted(false);
              }}
              invalid={isInvalid}
            />
            {isInvalid && <Field.ErrorText>Please enter the complete 6-digit code.</Field.ErrorText>}
            {submitted && !isInvalid && (
              <Text size="sm" weight="medium" color="success">✓ Code accepted!</Text>
            )}
          </Field>
          <Button type="submit">Verify</Button>
        </VStack>
      </form>
    );
  },
};
