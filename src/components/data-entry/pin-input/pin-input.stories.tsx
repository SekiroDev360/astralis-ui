import type { Meta, StoryObj } from "@storybook/react-vite";
import React from "react";
import { PinInput } from "./index";
import { Field } from "../field";
import { AstralisProvider } from "../../../theme";

const meta: Meta = {
  title: "Components/Data Entry/PinInput",
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "PinInput renders N individual character boxes commonly used for OTP codes, PINs, and verification flows. Features: auto-advance on entry, backspace-to-previous, arrow key navigation, paste distribution, `onComplete` callback, and numeric / alpha / alphanumeric validation.",
      },
    },
  },
  decorators: [
    (Story) => (
      <AstralisProvider>
        <div className="astralis-p-6">
          <Story />
        </div>
      </AstralisProvider>
    ),
  ],
};

export default meta;
type Story = StoryObj;

// ─── Basic ────────────────────────────────────────────────────────────────────

export const Basic: Story = {
  render: () => {
    const [val, setVal] = React.useState("");
    return (
      <div className="astralis-flex astralis-flex-col astralis-gap-3">
        <PinInput value={val} onChange={setVal} />
        <p className="astralis-text-sm astralis-text-content-secondary">
          Value: <span className="astralis-font-mono">{val || "—"}</span>
        </p>
      </div>
    );
  },
  parameters: {
    docs: {
      description: { story: "A basic 4-box numeric PinInput." },
    },
  },
};

// ─── 6-digit OTP ──────────────────────────────────────────────────────────────

export const OTP: Story = {
  render: () => {
    const [val, setVal] = React.useState("");
    const [done, setDone] = React.useState(false);

    return (
      <div className="astralis-flex astralis-flex-col astralis-gap-3">
        <PinInput
          length={6}
          value={val}
          onChange={(v) => {
            setVal(v);
            setDone(false);
          }}
          onComplete={() => setDone(true)}
        />
        {done && (
          <p className="astralis-text-sm astralis-font-medium astralis-text-success-600">
            ✓ Code verified: {val}
          </p>
        )}
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story:
          "`length={6}` for a standard 6-digit OTP. `onComplete` fires when all boxes are filled.",
      },
    },
  },
};

// ─── Sizes ────────────────────────────────────────────────────────────────────

export const Sizes: Story = {
  render: () => (
    <div className="astralis-flex astralis-flex-col astralis-gap-4">
      <PinInput size="sm" defaultValue="1234" />
      <PinInput size="md" defaultValue="1234" />
      <PinInput size="lg" defaultValue="1234" />
    </div>
  ),
  parameters: {
    docs: { description: { story: "Three sizes: `sm`, `md`, `lg`." } },
  },
};

// ─── Variants ─────────────────────────────────────────────────────────────────

export const Variants: Story = {
  render: () => (
    <div className="astralis-flex astralis-flex-col astralis-gap-4">
      <PinInput variant="outline" defaultValue="1234" />
      <PinInput variant="filled" defaultValue="1234" />
    </div>
  ),
  parameters: {
    docs: { description: { story: "Two variants: `outline` and `filled`." } },
  },
};

// ─── States ───────────────────────────────────────────────────────────────────

export const States: Story = {
  render: () => (
    <div className="astralis-flex astralis-flex-col astralis-gap-4">
      <PinInput placeholder="·" />
      <PinInput defaultValue="1234" />
      <PinInput disabled defaultValue="1234" />
      <PinInput invalid defaultValue="1234" />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "Empty, pre-filled, disabled, and invalid states.",
      },
    },
  },
};

// ─── Masked ───────────────────────────────────────────────────────────────────

export const Masked: Story = {
  render: () => {
    const [val, setVal] = React.useState("");
    return (
      <div className="astralis-flex astralis-flex-col astralis-gap-3">
        <PinInput
          mask
          value={val}
          onChange={setVal}
          length={6}
          placeholder="·"
        />
        <p className="astralis-text-sm astralis-text-content-secondary">
          Raw: <span className="astralis-font-mono">{val || "—"}</span>
        </p>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story:
          "Pass `mask` to render characters as bullets — ideal for PINs where the user shouldn't see what they typed.",
      },
    },
  },
};

// ─── Alphanumeric ─────────────────────────────────────────────────────────────

export const Alphanumeric: Story = {
  render: () => {
    const [val, setVal] = React.useState("");
    return (
      <div className="astralis-flex astralis-flex-col astralis-gap-3">
        <PinInput
          type="alphanumeric"
          length={6}
          value={val}
          onChange={setVal}
          placeholder="·"
        />
        <p className="astralis-text-sm astralis-text-content-secondary">
          Code: <span className="astralis-font-mono">{val || "—"}</span>
        </p>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story:
          '`type="alphanumeric"` accepts letters and numbers — useful for invite codes and license keys.',
      },
    },
  },
};

// ─── In a Field ───────────────────────────────────────────────────────────────

export const InField: Story = {
  render: () => {
    const [val, setVal] = React.useState("");
    return (
      <Field>
        <Field.Label>Verification code</Field.Label>
        <PinInput
          length={6}
          value={val}
          onChange={setVal}
          onComplete={(v) => console.log("OTP complete:", v)}
        />
        <Field.HelpText>
          Enter the 6-digit code sent to your email.
        </Field.HelpText>
      </Field>
    );
  },
  parameters: {
    docs: {
      description: {
        story: "PinInput inside a `Field` with label and help text.",
      },
    },
  },
};

// ─── In a form ────────────────────────────────────────────────────────────────

export const InForm: Story = {
  render: () => {
    const [code, setCode] = React.useState("");
    const [submitted, setSubmitted] = React.useState(false);
    const isInvalid = submitted && code.length < 6;

    return (
      <form
        onSubmit={(e) => {
          e.preventDefault();
          setSubmitted(true);
        }}
        className="astralis-flex astralis-flex-col astralis-items-start astralis-gap-4"
      >
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
          {isInvalid && (
            <Field.ErrorText>
              Please enter the complete 6-digit code.
            </Field.ErrorText>
          )}
          {submitted && !isInvalid && (
            <p className="astralis-text-sm astralis-font-medium astralis-text-success-600">
              ✓ Code accepted!
            </p>
          )}
        </Field>

        <button
          type="submit"
          className="astralis-h-10 astralis-px-6 astralis-rounded-lg astralis-bg-primary-600 astralis-text-sm astralis-font-medium astralis-text-white hover:astralis-bg-primary-700 astralis-transition-colors"
        >
          Verify
        </button>
      </form>
    );
  },
  parameters: {
    docs: {
      description: {
        story:
          "Full OTP form flow — error shown if submitted before all 6 boxes are filled.",
      },
    },
  },
};
