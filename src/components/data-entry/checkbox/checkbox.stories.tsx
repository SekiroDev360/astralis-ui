import type { Meta, StoryObj } from "@storybook/react-vite";
import React from "react";
import { Checkbox } from "./index";
import { Field } from "../field";
import { AstralisProvider } from "../../../theme";

const meta: Meta = {
  title: "Components/Data Entry/Checkbox",
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Checkbox lets users select one or more options. Use `Checkbox.Group` to manage a collection of checkboxes with shared state. Supports `indeterminate` state for partial selections.",
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
    const [checked, setChecked] = React.useState(false);
    return (
      <Checkbox
        checked={checked}
        onChange={(e) => setChecked(e.target.checked)}
      >
        Accept terms and conditions
      </Checkbox>
    );
  },
  parameters: {
    docs: {
      description: { story: "A single controlled checkbox with a label." },
    },
  },
};

// ─── Sizes ────────────────────────────────────────────────────────────────────

export const Sizes: Story = {
  render: () => (
    <div className="astralis-flex astralis-flex-col astralis-gap-3">
      <Checkbox size="sm" defaultChecked>
        Small checkbox
      </Checkbox>
      <Checkbox size="md" defaultChecked>
        Medium checkbox (default)
      </Checkbox>
      <Checkbox size="lg" defaultChecked>
        Large checkbox
      </Checkbox>
    </div>
  ),
  parameters: {
    docs: { description: { story: "Three sizes: `sm`, `md`, `lg`." } },
  },
};

// ─── States ───────────────────────────────────────────────────────────────────

export const States: Story = {
  render: () => (
    <div className="astralis-flex astralis-flex-col astralis-gap-3">
      <Checkbox>Unchecked</Checkbox>
      <Checkbox defaultChecked>Checked</Checkbox>
      <Checkbox indeterminate>Indeterminate</Checkbox>
      <Checkbox disabled>Disabled unchecked</Checkbox>
      <Checkbox disabled defaultChecked>
        Disabled checked
      </Checkbox>
      <Checkbox invalid>Invalid</Checkbox>
      <Checkbox readOnly>Read-only unchecked</Checkbox>
      <Checkbox readOnly defaultChecked>
        Read-only checked
      </Checkbox>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "All checkbox states: unchecked, checked, indeterminate (partial selection), disabled, and invalid.",
      },
    },
  },
};

// ─── Group (vertical) ─────────────────────────────────────────────────────────

export const Group: Story = {
  render: () => {
    const [selected, setSelected] = React.useState<string[]>(["react"]);
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
  parameters: {
    docs: {
      description: {
        story:
          "`Checkbox.Group` manages the selection state. Works with `Field` for labels and helper text.",
      },
    },
  },
};

// ─── Group (horizontal) ───────────────────────────────────────────────────────

export const GroupHorizontal: Story = {
  render: () => {
    const [selected, setSelected] = React.useState<string[]>(["email"]);
    return (
      <Field>
        <Field.Label>Notification channels</Field.Label>
        <Checkbox.Group
          value={selected}
          onChange={setSelected}
          orientation="horizontal"
        >
          <Checkbox value="email">Email</Checkbox>
          <Checkbox value="sms">SMS</Checkbox>
          <Checkbox value="push">Push</Checkbox>
          <Checkbox value="slack">Slack</Checkbox>
        </Checkbox.Group>
      </Field>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Use `orientation="horizontal"` to lay out checkboxes in a row.',
      },
    },
  },
};

// ─── Group disabled ───────────────────────────────────────────────────────────

export const GroupDisabled: Story = {
  render: () => (
    <Checkbox.Group defaultValue={["a"]} disabled>
      <Checkbox value="a">Option A (pre-selected)</Checkbox>
      <Checkbox value="b">Option B</Checkbox>
      <Checkbox value="c">Option C</Checkbox>
    </Checkbox.Group>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Pass `disabled` to `Checkbox.Group` to disable all items at once.",
      },
    },
  },
};

// ─── Select All (indeterminate parent) ────────────────────────────────────────

export const SelectAll: Story = {
  render: () => {
    const options = ["Inbox", "Sent", "Drafts", "Trash"];
    const [selected, setSelected] = React.useState<string[]>(["Inbox"]);

    const allChecked = selected.length === options.length;
    const isIndeterminate = selected.length > 0 && !allChecked;

    const toggleAll = () => {
      setSelected(allChecked ? [] : options);
    };

    return (
      <div className="astralis-flex astralis-flex-col astralis-gap-2.5">
        <Checkbox
          checked={allChecked}
          indeterminate={isIndeterminate}
          onChange={toggleAll}
        >
          <span className="astralis-font-medium">Select all folders</span>
        </Checkbox>

        <div className="astralis-ml-6 astralis-flex astralis-flex-col astralis-gap-2">
          <Checkbox.Group value={selected} onChange={setSelected}>
            {options.map((opt) => (
              <Checkbox key={opt} value={opt}>
                {opt}
              </Checkbox>
            ))}
          </Checkbox.Group>
        </div>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story:
          "Classic 'Select all' pattern — parent shows `indeterminate` when some (but not all) children are checked.",
      },
    },
  },
};

// ─── In a form ────────────────────────────────────────────────────────────────

export const InForm: Story = {
  render: () => {
    const [agreed, setAgreed] = React.useState(false);
    const [submitted, setSubmitted] = React.useState(false);

    return (
      <form
        onSubmit={(e) => {
          e.preventDefault();
          setSubmitted(true);
        }}
        className="astralis-flex astralis-flex-col astralis-gap-4 astralis-w-72"
      >
        <Field invalid={submitted && !agreed}>
          <Checkbox
            checked={agreed}
            invalid={submitted && !agreed}
            onChange={(e) => setAgreed(e.target.checked)}
          >
            I agree to the{" "}
            <span className="astralis-text-primary-600 astralis-underline astralis-cursor-pointer">
              Terms of Service
            </span>
          </Checkbox>
          {submitted && !agreed && (
            <Field.ErrorText>
              You must accept the terms to continue.
            </Field.ErrorText>
          )}
        </Field>

        <button
          type="submit"
          className="astralis-h-10 astralis-rounded-lg astralis-bg-primary-600 astralis-text-sm astralis-font-medium astralis-text-white hover:astralis-bg-primary-700 astralis-transition-colors"
        >
          {submitted && agreed ? "✓ Submitted!" : "Submit"}
        </button>
      </form>
    );
  },
  parameters: {
    docs: {
      description: {
        story:
          "Checkbox combined with Field for error state — shows error message if user submits without agreeing.",
      },
    },
  },
};
