import type { Meta, StoryObj } from "@storybook/react-vite";
import React from "react";
import { Field } from "./index";
import { AstralisProvider } from "../../../theme";

const meta: Meta = {
  title: "Components/Data Entry/Field",
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Field is the context wrapper for any data-entry input. It handles label wiring, help text, error messages, and propagates `invalid`, `disabled`, and `required` state down to child inputs via context — no prop drilling needed.",
      },
    },
  },
  decorators: [
    (Story) => (
      <AstralisProvider>
        <div className="astralis-w-80 astralis-p-4">
          <Story />
        </div>
      </AstralisProvider>
    ),
  ],
};

export default meta;
type Story = StoryObj;

/** The simplest Field: label + a native input to show wiring. */
export const Basic: Story = {
  render: () => (
    <Field>
      <Field.Label>Full name</Field.Label>
      <input
        placeholder="John Doe"
        className="astralis-w-full astralis-rounded-lg astralis-border astralis-border-border-subtle astralis-bg-surface-base astralis-px-3 astralis-py-2 astralis-text-sm astralis-text-content-primary astralis-outline-none focus:astralis-border-primary-500 focus:astralis-ring-2 focus:astralis-ring-primary-200"
      />
    </Field>
  ),
  parameters: {
    docs: {
      description: {
        story: "Basic Field with a label auto-wired to the input via context.",
      },
    },
  },
};

/** Field with helper text underneath the input. */
export const WithHelpText: Story = {
  render: () => (
    <Field>
      <Field.Label>Email address</Field.Label>
      <input
        type="email"
        placeholder="you@example.com"
        className="astralis-w-full astralis-rounded-lg astralis-border astralis-border-border-subtle astralis-bg-surface-base astralis-px-3 astralis-py-2 astralis-text-sm astralis-text-content-primary astralis-outline-none focus:astralis-border-primary-500 focus:astralis-ring-2 focus:astralis-ring-primary-200"
      />
      <Field.HelpText>We'll never share your email with anyone.</Field.HelpText>
    </Field>
  ),
  parameters: {
    docs: {
      description: {
        story: "Use `Field.HelpText` to add a hint below the input.",
      },
    },
  },
};

/** Field marked as required — the asterisk is rendered automatically in the label. */
export const Required: Story = {
  render: () => (
    <Field required>
      <Field.Label>Username</Field.Label>
      <input
        placeholder="@yourhandle"
        className="astralis-w-full astralis-rounded-lg astralis-border astralis-border-border-subtle astralis-bg-surface-base astralis-px-3 astralis-py-2 astralis-text-sm astralis-text-content-primary astralis-outline-none focus:astralis-border-primary-500 focus:astralis-ring-2 focus:astralis-ring-primary-200"
      />
      <Field.HelpText>Your unique Astralis username.</Field.HelpText>
    </Field>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Pass `required` to `Field`. The `*` indicator is shown automatically inside `Field.Label` — no extra code needed.",
      },
    },
  },
};

/** Field in the invalid/error state showing an error message. */
export const Invalid: Story = {
  render: () => (
    <Field invalid>
      <Field.Label>Email address</Field.Label>
      <input
        type="email"
        defaultValue="not-an-email"
        className="astralis-w-full astralis-rounded-lg astralis-border astralis-border-error-500 astralis-bg-surface-base astralis-px-3 astralis-py-2 astralis-text-sm astralis-text-content-primary astralis-outline-none focus:astralis-ring-2 focus:astralis-ring-error-200"
      />
      <Field.ErrorText>Please enter a valid email address.</Field.ErrorText>
    </Field>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'Pass `invalid` to switch the field into error state. `Field.ErrorText` renders with `role="alert"` for screen readers.',
      },
    },
  },
};

/** Field with both help text and a conditional error message. */
export const WithErrorAndHelp: Story = {
  render: () => {
    const [value, setValue] = React.useState("");
    const isInvalid = value.length > 0 && value.length < 8;

    return (
      <Field invalid={isInvalid} required>
        <Field.Label>Password</Field.Label>
        <input
          type="password"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="••••••••"
          className={`astralis-w-full astralis-rounded-lg astralis-border astralis-bg-surface-base astralis-px-3 astralis-py-2 astralis-text-sm astralis-text-content-primary astralis-outline-none focus:astralis-ring-2 ${
            isInvalid
              ? "astralis-border-error-500 focus:astralis-ring-error-200"
              : "astralis-border-border-subtle focus:astralis-border-primary-500 focus:astralis-ring-primary-200"
          }`}
        />
        {isInvalid ? (
          <Field.ErrorText>
            Password must be at least 8 characters.
          </Field.ErrorText>
        ) : (
          <Field.HelpText>Must be at least 8 characters long.</Field.HelpText>
        )}
      </Field>
    );
  },
  parameters: {
    docs: {
      description: {
        story:
          "Example with reactive validation: error text appears when the input is too short. Start typing to see it switch.",
      },
    },
  },
};

/** Disabled Field — everything inside becomes non-interactive. */
export const Disabled: Story = {
  render: () => (
    <Field disabled>
      <Field.Label>Account email</Field.Label>
      <input
        type="email"
        defaultValue="locked@example.com"
        disabled
        className="astralis-w-full astralis-rounded-lg astralis-border astralis-border-border-subtle astralis-bg-surface-raised astralis-px-3 astralis-py-2 astralis-text-sm astralis-text-content-disabled astralis-outline-none astralis-cursor-not-allowed"
      />
      <Field.HelpText>This field cannot be changed.</Field.HelpText>
    </Field>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Pass `disabled` to the Field to propagate the disabled state down. The label text dims automatically.",
      },
    },
  },
};

/** A stacked form showing multiple fields together. */
export const FormExample: Story = {
  render: () => (
    <div className="astralis-flex astralis-flex-col astralis-gap-5">
      <Field required>
        <Field.Label>Full name</Field.Label>
        <input
          placeholder="Jane Doe"
          className="astralis-w-full astralis-rounded-lg astralis-border astralis-border-border-subtle astralis-bg-surface-base astralis-px-3 astralis-py-2 astralis-text-sm astralis-text-content-primary astralis-outline-none focus:astralis-border-primary-500 focus:astralis-ring-2 focus:astralis-ring-primary-200"
        />
      </Field>
      <Field required>
        <Field.Label>Email address</Field.Label>
        <input
          type="email"
          placeholder="jane@example.com"
          className="astralis-w-full astralis-rounded-lg astralis-border astralis-border-border-subtle astralis-bg-surface-base astralis-px-3 astralis-py-2 astralis-text-sm astralis-text-content-primary astralis-outline-none focus:astralis-border-primary-500 focus:astralis-ring-2 focus:astralis-ring-primary-200"
        />
        <Field.HelpText>Used for account notifications.</Field.HelpText>
      </Field>
      <Field invalid>
        <Field.Label>Phone number</Field.Label>
        <input
          type="tel"
          defaultValue="not-a-phone"
          className="astralis-w-full astralis-rounded-lg astralis-border astralis-border-error-500 astralis-bg-surface-base astralis-px-3 astralis-py-2 astralis-text-sm astralis-text-content-primary astralis-outline-none focus:astralis-ring-2 focus:astralis-ring-error-200"
        />
        <Field.ErrorText>Enter a valid phone number.</Field.ErrorText>
      </Field>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Multiple Field components stacked in a real form layout, mixing required, normal, and invalid states.",
      },
    },
  },
};
