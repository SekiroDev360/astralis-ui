import type { Meta, StoryObj } from "@storybook/react-vite";
import React from "react";
import { Radio } from "./index";
import { Field } from "../field";
import { AstralisProvider } from "../../../theme";

const meta: Meta = {
  title: "Components/Data Entry/Radio",
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Radio lets users select exactly one option from a set. Use `Radio.Group` to manage the selection state and automatically wire up the `name` attribute for proper browser behavior.",
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
    const [val, setVal] = React.useState("monthly");
    return (
      <Radio.Group value={val} onChange={setVal}>
        <Radio value="monthly">Monthly</Radio>
        <Radio value="annual">Annual</Radio>
      </Radio.Group>
    );
  },
  parameters: {
    docs: {
      description: {
        story: "A basic controlled Radio.Group with two options.",
      },
    },
  },
};

// ─── Sizes ────────────────────────────────────────────────────────────────────

export const Sizes: Story = {
  render: () => (
    <div className="astralis-flex astralis-flex-col astralis-gap-4">
      <Radio.Group defaultValue="sm">
        <Radio value="sm" size="sm">
          Small radio
        </Radio>
      </Radio.Group>
      <Radio.Group defaultValue="md">
        <Radio value="md" size="md">
          Medium radio (default)
        </Radio>
      </Radio.Group>
      <Radio.Group defaultValue="lg">
        <Radio value="lg" size="lg">
          Large radio
        </Radio>
      </Radio.Group>
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
      <Radio value="a" name="states">
        Unchecked
      </Radio>
      <Radio value="b" name="states" defaultChecked>
        Checked
      </Radio>
      <Radio value="c" name="states" disabled>
        Disabled unchecked
      </Radio>
      <Radio value="d" name="states" disabled defaultChecked>
        Disabled checked
      </Radio>
      <Radio value="e" name="states" invalid>
        Invalid
      </Radio>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "All Radio states: unchecked, checked, disabled, and invalid.",
      },
    },
  },
};

// ─── Group Vertical ───────────────────────────────────────────────────────────

export const GroupVertical: Story = {
  render: () => {
    const [plan, setPlan] = React.useState("pro");
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
  parameters: {
    docs: {
      description: {
        story:
          "Vertical `Radio.Group` (default orientation) with Field for label and helper text.",
      },
    },
  },
};

// ─── Group Horizontal ─────────────────────────────────────────────────────────

export const GroupHorizontal: Story = {
  render: () => {
    const [size, setSize] = React.useState("md");
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
  parameters: {
    docs: {
      description: {
        story: 'Use `orientation="horizontal"` for side-by-side radios.',
      },
    },
  },
};

// ─── Group Disabled ───────────────────────────────────────────────────────────

export const GroupDisabled: Story = {
  render: () => (
    <Radio.Group defaultValue="standard" disabled>
      <Radio value="standard">Standard shipping</Radio>
      <Radio value="express">Express shipping</Radio>
      <Radio value="overnight">Overnight shipping</Radio>
    </Radio.Group>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Pass `disabled` to `Radio.Group` to disable all options at once.",
      },
    },
  },
};

// ─── Card-style radios ────────────────────────────────────────────────────────

export const CardStyle: Story = {
  render: () => {
    const [selected, setSelected] = React.useState("monthly");
    const plans = [
      {
        value: "monthly",
        label: "Monthly",
        price: "$12/mo",
        desc: "Billed monthly",
      },
      {
        value: "annual",
        label: "Annual",
        price: "$8/mo",
        desc: "Billed $96/yr — save 33%",
      },
    ];
    return (
      <Radio.Group value={selected} onChange={setSelected}>
        <div className="astralis-flex astralis-flex-col astralis-gap-3 astralis-w-72">
          {plans.map((plan) => (
            <label
              key={plan.value}
              className={[
                "astralis-flex astralis-items-start astralis-gap-3 astralis-p-4 astralis-rounded-xl astralis-border astralis-cursor-pointer astralis-transition-all",
                selected === plan.value
                  ? "astralis-border-primary-500 astralis-bg-primary-50"
                  : "astralis-border-border-subtle astralis-bg-surface-base hover:astralis-border-border-strong",
              ].join(" ")}
            >
              <Radio value={plan.value} className="astralis-mt-0.5" />
              <div>
                <p className="astralis-text-sm astralis-font-medium astralis-text-content-primary">
                  {plan.label}
                  <span className="astralis-ml-2 astralis-font-semibold astralis-text-primary-600">
                    {plan.price}
                  </span>
                </p>
                <p className="astralis-text-xs astralis-text-content-secondary">
                  {plan.desc}
                </p>
              </div>
            </label>
          ))}
        </div>
      </Radio.Group>
    );
  },
  parameters: {
    docs: {
      description: {
        story:
          "Custom card-style layout wrapping Radio inside a styled label — shows how the component is fully composable.",
      },
    },
  },
};

// ─── In a form ────────────────────────────────────────────────────────────────

export const InForm: Story = {
  render: () => {
    const [role, setRole] = React.useState("");
    const [submitted, setSubmitted] = React.useState(false);
    const isInvalid = submitted && !role;

    return (
      <form
        onSubmit={(e) => {
          e.preventDefault();
          setSubmitted(true);
        }}
        className="astralis-flex astralis-flex-col astralis-gap-4 astralis-w-64"
      >
        <Field invalid={isInvalid}>
          <Field.Label>Your role</Field.Label>
          <Radio.Group value={role} onChange={setRole}>
            <Radio value="designer">Designer</Radio>
            <Radio value="engineer">Engineer</Radio>
            <Radio value="manager">Manager</Radio>
            <Radio value="other">Other</Radio>
          </Radio.Group>
          {isInvalid && (
            <Field.ErrorText>Please select a role.</Field.ErrorText>
          )}
        </Field>
        <button
          type="submit"
          className="astralis-h-10 astralis-rounded-lg astralis-bg-primary-600 astralis-text-sm astralis-font-medium astralis-text-white hover:astralis-bg-primary-700 astralis-transition-colors"
        >
          {role && !isInvalid ? `Submit as ${role}` : "Submit"}
        </button>
      </form>
    );
  },
  parameters: {
    docs: {
      description: {
        story:
          "Radio.Group inside a Field showing error validation on submit when no selection is made.",
      },
    },
  },
};
