import type { Meta, StoryObj } from "@storybook/react-vite";
import React from "react";
import { Input, InputGroup } from "./index";
import { Field } from "../field";
import { AstralisProvider } from "../../../theme";

const meta: Meta = {
  title: "Components/Data Entry/Input",
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Input is the base data-entry component. It supports four visual variants, three sizes, and sub-components for Password, Search, and TextArea. Use it inside a `Field` for labels, help text, and error messages.",
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

// ─── Variants ─────────────────────────────────────────────────────────────────

/** Four visual styles of the Input. */
export const Variants: Story = {
  render: () => (
    <div className="astralis-flex astralis-flex-col astralis-gap-4">
      <Field>
        <Field.Label>Outline (default)</Field.Label>
        <Input placeholder="Outline input" variant="outline" />
      </Field>
      <Field>
        <Field.Label>Filled</Field.Label>
        <Input placeholder="Filled input" variant="filled" />
      </Field>
      <Field>
        <Field.Label>Underline</Field.Label>
        <Input placeholder="Underline input" variant="underline" />
      </Field>
      <Field>
        <Field.Label>Unstyled</Field.Label>
        <Input placeholder="Unstyled input" variant="unstyled" />
      </Field>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "Four variants: `outline`, `filled`, `underline`, `unstyled`.",
      },
    },
  },
};

// ─── Sizes ────────────────────────────────────────────────────────────────────

export const Sizes: Story = {
  render: () => (
    <div className="astralis-flex astralis-flex-col astralis-gap-4">
      <Field>
        <Field.Label>Small</Field.Label>
        <Input placeholder="Small input" size="sm" />
      </Field>
      <Field>
        <Field.Label>Medium (default)</Field.Label>
        <Input placeholder="Medium input" size="md" />
      </Field>
      <Field>
        <Field.Label>Large</Field.Label>
        <Input placeholder="Large input" size="lg" />
      </Field>
    </div>
  ),
  parameters: {
    docs: {
      description: { story: "Three sizes: `sm`, `md`, `lg`." },
    },
  },
};

// ─── States ───────────────────────────────────────────────────────────────────

export const States: Story = {
  render: () => (
    <div className="astralis-flex astralis-flex-col astralis-gap-4">
      <Field>
        <Field.Label>Default</Field.Label>
        <Input placeholder="Normal state" />
      </Field>
      <Field disabled>
        <Field.Label>Disabled</Field.Label>
        <Input placeholder="Cannot interact" disabled />
      </Field>
      <Field invalid>
        <Field.Label>Invalid</Field.Label>
        <Input defaultValue="wrong value" />
        <Field.ErrorText>This field has an error.</Field.ErrorText>
      </Field>
      <Field>
        <Field.Label>Read-only</Field.Label>
        <Input defaultValue="Read only value" readOnly />
        <Field.HelpText>This value cannot be changed.</Field.HelpText>
      </Field>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "All input states: normal, disabled, invalid (error outline + error text), and read-only.",
      },
    },
  },
};

// ─── With prefix / suffix via InputGroup ─────────────────────────────────────

export const WithPrefixSuffix: Story = {
  render: () => (
    <div className="astralis-flex astralis-flex-col astralis-gap-4">
      <Field>
        <Field.Label>Email</Field.Label>
        <InputGroup
          prefix={
            <svg
              className="astralis-h-4 astralis-w-4"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
              <polyline points="22,6 12,13 2,6" />
            </svg>
          }
        >
          <Input placeholder="you@example.com" type="email" />
        </InputGroup>
      </Field>

      <Field>
        <Field.Label>Website</Field.Label>
        <InputGroup
          prefix={
            <span className="astralis-text-xs astralis-font-medium astralis-text-content-secondary">
              https://
            </span>
          }
          suffix={
            <span className="astralis-text-xs astralis-font-medium astralis-text-content-secondary">
              .com
            </span>
          }
        >
          <Input placeholder="yoursite" />
        </InputGroup>
      </Field>

      <Field>
        <Field.Label>Amount</Field.Label>
        <InputGroup
          prefix={
            <span className="astralis-text-sm astralis-font-medium astralis-text-content-secondary">
              $
            </span>
          }
          suffix={
            <span className="astralis-text-xs astralis-text-content-tertiary">
              USD
            </span>
          }
        >
          <Input placeholder="0.00" type="number" />
        </InputGroup>
      </Field>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Use `InputGroup` with `prefix` and/or `suffix` to add icons, text, or any element inside the input.",
      },
    },
  },
};

// ─── Password ─────────────────────────────────────────────────────────────────

export const Password: Story = {
  render: () => (
    <div className="astralis-flex astralis-flex-col astralis-gap-4">
      <Field required>
        <Field.Label>Password</Field.Label>
        <Input.Password placeholder="Enter your password" />
        <Field.HelpText>Must be at least 8 characters.</Field.HelpText>
      </Field>
      <Field invalid>
        <Field.Label>Confirm password</Field.Label>
        <Input.Password defaultValue="wrongp" />
        <Field.ErrorText>Passwords do not match.</Field.ErrorText>
      </Field>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "`Input.Password` adds a toggle button to show or hide the password. Works with Field context for labels and errors.",
      },
    },
  },
};

// ─── Search ───────────────────────────────────────────────────────────────────

export const Search: Story = {
  render: () => {
    const [result, setResult] = React.useState("");
    return (
      <div className="astralis-flex astralis-flex-col astralis-gap-4">
        <Field>
          <Field.Label>Search (press Enter)</Field.Label>
          <Input.Search
            placeholder="Search anything..."
            onSearch={(v) => setResult(v)}
          />
        </Field>
        <Field>
          <Field.Label>Search with button</Field.Label>
          <Input.Search
            placeholder="Search anything..."
            showSearchButton
            onSearch={(v) => setResult(v)}
          />
        </Field>
        {result && (
          <p className="astralis-text-xs astralis-text-content-secondary">
            Searched: <strong>{result}</strong>
          </p>
        )}
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story:
          "`Input.Search` has a built-in search icon and fires `onSearch` on Enter. Add `showSearchButton` to show an attached button.",
      },
    },
  },
};

// ─── TextArea ─────────────────────────────────────────────────────────────────

export const TextArea: Story = {
  render: () => {
    const [val, setVal] = React.useState("");
    return (
      <div className="astralis-flex astralis-flex-col astralis-gap-4">
        <Field>
          <Field.Label>Bio</Field.Label>
          <Input.TextArea placeholder="Tell us about yourself..." />
          <Field.HelpText>Max 200 characters.</Field.HelpText>
        </Field>
        <Field required>
          <Field.Label>Description (with counter)</Field.Label>
          <Input.TextArea
            placeholder="Write something..."
            maxLength={200}
            showCount
            value={val}
            onChange={(e) => setVal(e.target.value)}
          />
        </Field>
        <Field invalid>
          <Field.Label>Invalid textarea</Field.Label>
          <Input.TextArea defaultValue="Bad content here." />
          <Field.ErrorText>This content is not allowed.</Field.ErrorText>
        </Field>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story:
          "`Input.TextArea` supports `showCount` with optional `maxLength`, and integrates with Field for labels and errors.",
      },
    },
  },
};

// ─── Complete form example ────────────────────────────────────────────────────

export const FullFormExample: Story = {
  render: () => {
    const [submitted, setSubmitted] = React.useState(false);
    const [form, setForm] = React.useState({
      name: "",
      email: "",
      password: "",
      bio: "",
    });
    const [errors, setErrors] = React.useState<Record<string, string>>({});

    const validate = () => {
      const e: Record<string, string> = {};
      if (!form.name) e.name = "Name is required.";
      if (!form.email.includes("@")) e.email = "Enter a valid email.";
      if (form.password.length < 8)
        e.password = "Password must be at least 8 characters.";
      return e;
    };

    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      const errs = validate();
      if (Object.keys(errs).length > 0) {
        setErrors(errs);
      } else {
        setErrors({});
        setSubmitted(true);
      }
    };

    if (submitted) {
      return (
        <div className="astralis-text-center astralis-py-6">
          <p className="astralis-text-success-600 astralis-font-medium">
            ✓ Form submitted!
          </p>
        </div>
      );
    }

    return (
      <form
        onSubmit={handleSubmit}
        className="astralis-flex astralis-flex-col astralis-gap-4"
      >
        <Field invalid={!!errors.name} required>
          <Field.Label>Full name</Field.Label>
          <Input
            value={form.name}
            onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
            placeholder="Jane Doe"
          />
          {errors.name && <Field.ErrorText>{errors.name}</Field.ErrorText>}
        </Field>

        <Field invalid={!!errors.email} required>
          <Field.Label>Email address</Field.Label>
          <InputGroup
            prefix={
              <svg
                className="astralis-h-4 astralis-w-4"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                <polyline points="22,6 12,13 2,6" />
              </svg>
            }
          >
            <Input
              type="email"
              value={form.email}
              onChange={(e) =>
                setForm((f) => ({ ...f, email: e.target.value }))
              }
              placeholder="jane@example.com"
            />
          </InputGroup>
          {errors.email && <Field.ErrorText>{errors.email}</Field.ErrorText>}
        </Field>

        <Field invalid={!!errors.password} required>
          <Field.Label>Password</Field.Label>
          <Input.Password
            value={form.password}
            onChange={(e) =>
              setForm((f) => ({ ...f, password: e.target.value }))
            }
            placeholder="••••••••"
          />
          {errors.password ? (
            <Field.ErrorText>{errors.password}</Field.ErrorText>
          ) : (
            <Field.HelpText>Min 8 characters.</Field.HelpText>
          )}
        </Field>

        <Field>
          <Field.Label>Bio</Field.Label>
          <Input.TextArea
            value={form.bio}
            onChange={(e) => setForm((f) => ({ ...f, bio: e.target.value }))}
            placeholder="Tell us about yourself..."
            maxLength={200}
            showCount
            rows={3}
          />
        </Field>

        <button
          type="submit"
          className="astralis-mt-2 astralis-h-10 astralis-w-full astralis-rounded-lg astralis-bg-primary-600 astralis-text-sm astralis-font-medium astralis-text-white hover:astralis-bg-primary-700 astralis-transition-colors"
        >
          Submit
        </button>
      </form>
    );
  },
  parameters: {
    docs: {
      description: {
        story:
          "A fully reactive form combining Field, Input, Input.Password, InputGroup, and Input.TextArea — with inline validation on submit.",
      },
    },
  },
};
