import type { Meta, StoryObj } from "@storybook/react-vite";
import React from "react";
import { Switch } from "./index";
import { Field } from "../field";
import { AstralisProvider } from "../../../theme";

const meta: Meta = {
  title: "Components/Data Entry/Switch",
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Switch is a toggle control for binary on/off states. It renders a `<input type='checkbox' role='switch'>` under the hood, so it's fully keyboard-navigable and screen-reader friendly.",
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
    const [on, setOn] = React.useState(false);
    return (
      <Switch checked={on} onChange={(e) => setOn(e.target.checked)}>
        {on ? "Enabled" : "Disabled"}
      </Switch>
    );
  },
  parameters: {
    docs: {
      description: { story: "A basic controlled switch with a dynamic label." },
    },
  },
};

// ─── Sizes ────────────────────────────────────────────────────────────────────

export const Sizes: Story = {
  render: () => (
    <div className="astralis-flex astralis-flex-col astralis-gap-4">
      <Switch size="sm" defaultChecked>
        Small
      </Switch>
      <Switch size="md" defaultChecked>
        Medium (default)
      </Switch>
      <Switch size="lg" defaultChecked>
        Large
      </Switch>
    </div>
  ),
  parameters: {
    docs: { description: { story: "Three sizes: `sm`, `md`, `lg`." } },
  },
};

// ─── States ───────────────────────────────────────────────────────────────────

export const States: Story = {
  render: () => (
    <div className="astralis-flex astralis-flex-col astralis-gap-4">
      <Switch>Off</Switch>
      <Switch defaultChecked>On</Switch>
      <Switch disabled>Disabled off</Switch>
      <Switch disabled defaultChecked>
        Disabled on
      </Switch>
      <Switch invalid>Invalid off</Switch>
      <Switch invalid defaultChecked>
        Invalid on
      </Switch>
      <Switch readOnly>Read-only off</Switch>
      <Switch readOnly defaultChecked>
        Read-only on
      </Switch>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "All switch states: off, on, disabled, and invalid.",
      },
    },
  },
};

// ─── Without label ────────────────────────────────────────────────────────────

export const NoLabel: Story = {
  render: () => {
    const [on, setOn] = React.useState(true);
    return (
      <Switch
        checked={on}
        onChange={(e) => setOn(e.target.checked)}
        aria-label="Toggle notifications"
      />
    );
  },
  parameters: {
    docs: {
      description: {
        story:
          "Switch without a visible label. Always provide `aria-label` for accessibility.",
      },
    },
  },
};

// ─── Settings list ────────────────────────────────────────────────────────────

export const SettingsList: Story = {
  render: () => {
    const [settings, setSettings] = React.useState({
      notifications: true,
      marketing: false,
      darkMode: false,
      twoFactor: true,
    });

    const toggle = (key: keyof typeof settings) =>
      setSettings((s) => ({ ...s, [key]: !s[key] }));

    const items = [
      {
        key: "notifications" as const,
        label: "Push notifications",
        desc: "Receive alerts for important activity",
      },
      {
        key: "marketing" as const,
        label: "Marketing emails",
        desc: "News, updates, and promotions",
      },
      {
        key: "darkMode" as const,
        label: "Dark mode",
        desc: "Switch the interface to dark theme",
      },
      {
        key: "twoFactor" as const,
        label: "Two-factor auth",
        desc: "Extra security for your account",
      },
    ];

    return (
      <div className="astralis-w-80 astralis-flex astralis-flex-col astralis-divide-y astralis-divide-border-subtle">
        {items.map((item) => (
          <div
            key={item.key}
            className="astralis-flex astralis-items-center astralis-justify-between astralis-gap-4 astralis-py-3"
          >
            <div>
              <p className="astralis-text-sm astralis-font-medium astralis-text-content-primary">
                {item.label}
              </p>
              <p className="astralis-text-xs astralis-text-content-secondary">
                {item.desc}
              </p>
            </div>
            <Switch
              checked={settings[item.key]}
              onChange={() => toggle(item.key)}
              aria-label={item.label}
            />
          </div>
        ))}
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story:
          "A settings panel pattern — Switch without label text, using `aria-label` for accessibility, placed alongside descriptive text.",
      },
    },
  },
};

// ─── In a Field ───────────────────────────────────────────────────────────────

export const InField: Story = {
  render: () => {
    const [on, setOn] = React.useState(false);
    return (
      <Field>
        <Field.Label>Public profile</Field.Label>
        <Switch checked={on} onChange={(e) => setOn(e.target.checked)}>
          {on
            ? "Everyone can see your profile"
            : "Only you can see your profile"}
        </Switch>
        <Field.HelpText>
          You can change this setting at any time.
        </Field.HelpText>
      </Field>
    );
  },
  parameters: {
    docs: {
      description: {
        story: "Switch inside a `Field` for a label above and help text below.",
      },
    },
  },
};

// ─── In a form ────────────────────────────────────────────────────────────────

export const InForm: Story = {
  render: () => {
    const [agreed, setAgreed] = React.useState(false);
    const [submitted, setSubmitted] = React.useState(false);
    const isInvalid = submitted && !agreed;

    return (
      <form
        onSubmit={(e) => {
          e.preventDefault();
          setSubmitted(true);
        }}
        className="astralis-flex astralis-flex-col astralis-gap-4 astralis-w-72"
      >
        <Field invalid={isInvalid}>
          <Switch
            checked={agreed}
            invalid={isInvalid}
            onChange={(e) => setAgreed(e.target.checked)}
          >
            I agree to receive updates
          </Switch>
          {isInvalid && (
            <Field.ErrorText>You must opt in to continue.</Field.ErrorText>
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
          "Switch inside a Field with Field.ErrorText — shows error when submitted without toggling on.",
      },
    },
  },
};
