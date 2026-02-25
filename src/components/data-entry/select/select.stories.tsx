import type { Meta, StoryObj } from "@storybook/react-vite";
import React from "react";
import { Select } from "./index";
import { Field } from "../field";
import { AstralisProvider } from "../../../theme";
import type { SelectOptionOrGroup } from "./select.types";

const meta: Meta = {
  title: "Components/Data Entry/Select",
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Select is a custom dropdown built on a portal so it escapes scroll containers and `overflow: hidden` parents. It supports search, clearable, option groups, and full keyboard navigation (↑↓ to move, Enter to select, Esc to close).",
      },
    },
  },
  decorators: [
    (Story) => (
      <AstralisProvider>
        <div className="astralis-p-6 astralis-min-h-64">
          <Story />
        </div>
      </AstralisProvider>
    ),
  ],
};

export default meta;
type Story = StoryObj;

// ── Shared option sets ─────────────────────────────────────────────────────────

const fruits: SelectOptionOrGroup[] = [
  { value: "apple", label: "Apple" },
  { value: "banana", label: "Banana" },
  { value: "cherry", label: "Cherry" },
  { value: "dragonfruit", label: "Dragon fruit" },
  { value: "elderberry", label: "Elderberry" },
];

const countries: SelectOptionOrGroup[] = [
  { value: "ng", label: "🇳🇬 Nigeria" },
  { value: "us", label: "🇺🇸 United States" },
  { value: "gb", label: "🇬🇧 United Kingdom" },
  { value: "de", label: "🇩🇪 Germany" },
  { value: "fr", label: "🇫🇷 France" },
  { value: "jp", label: "🇯🇵 Japan" },
  { value: "br", label: "🇧🇷 Brazil" },
  { value: "ca", label: "🇨🇦 Canada" },
];

const grouped: SelectOptionOrGroup[] = [
  {
    group: "Frontend",
    options: [
      { value: "react", label: "React" },
      { value: "vue", label: "Vue" },
      { value: "svelte", label: "Svelte" },
    ],
  },
  {
    group: "Backend",
    options: [
      { value: "node", label: "Node.js" },
      { value: "django", label: "Django" },
      { value: "laravel", label: "Laravel" },
    ],
  },
  {
    group: "Mobile",
    options: [
      { value: "rn", label: "React Native" },
      { value: "flutter", label: "Flutter" },
      { value: "swift", label: "Swift (disabled)", disabled: true },
    ],
  },
];

// ─── Basic ────────────────────────────────────────────────────────────────────

export const Basic: Story = {
  render: () => {
    const [val, setVal] = React.useState<string | number | null>(null);
    return (
      <div className="astralis-w-64">
        <Select
          options={fruits}
          value={val}
          onChange={setVal}
          placeholder="Pick a fruit"
        />
        {val && (
          <p className="astralis-mt-2 astralis-text-sm astralis-text-content-secondary">
            Selected: {val}
          </p>
        )}
      </div>
    );
  },
  parameters: {
    docs: {
      description: { story: "Basic controlled Select with a list of options." },
    },
  },
};

// ─── Sizes ────────────────────────────────────────────────────────────────────

export const Sizes: Story = {
  render: () => (
    <div className="astralis-flex astralis-flex-col astralis-gap-3 astralis-w-64">
      <Select options={fruits} size="sm" placeholder="Small" />
      <Select options={fruits} size="md" placeholder="Medium (default)" />
      <Select options={fruits} size="lg" placeholder="Large" />
    </div>
  ),
  parameters: {
    docs: { description: { story: "Three sizes: `sm`, `md`, `lg`." } },
  },
};

// ─── Variants ─────────────────────────────────────────────────────────────────

export const Variants: Story = {
  render: () => (
    <div className="astralis-flex astralis-flex-col astralis-gap-3 astralis-w-64">
      <Select
        options={fruits}
        variant="outline"
        placeholder="Outline (default)"
      />
      <Select options={fruits} variant="filled" placeholder="Filled" />
    </div>
  ),
  parameters: {
    docs: { description: { story: "Two variants: `outline` and `filled`." } },
  },
};

// ─── States ───────────────────────────────────────────────────────────────────

export const States: Story = {
  render: () => (
    <div className="astralis-flex astralis-flex-col astralis-gap-3 astralis-w-64">
      <Select options={fruits} placeholder="Default" />
      <Select
        options={fruits}
        defaultValue="banana"
        placeholder="Pre-selected"
      />
      <Select options={fruits} disabled placeholder="Disabled" />
      <Select options={fruits} invalid placeholder="Invalid" />
      <Select options={fruits} loading placeholder="Loading…" />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "All states: default, pre-selected, disabled, invalid, and loading.",
      },
    },
  },
};

// ─── Clearable ────────────────────────────────────────────────────────────────

export const Clearable: Story = {
  render: () => {
    const [val, setVal] = React.useState<string | number | null>("cherry");
    return (
      <div className="astralis-w-64">
        <Select
          options={fruits}
          value={val}
          onChange={setVal}
          clearable
          placeholder="Pick a fruit"
        />
        <p className="astralis-mt-2 astralis-text-sm astralis-text-content-secondary">
          Value: {val ?? "null"}
        </p>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story:
          "Pass `clearable` to show an × icon when a value is selected. Clicking it fires `onChange(null)`.",
      },
    },
  },
};

// ─── Searchable ───────────────────────────────────────────────────────────────

export const Searchable: Story = {
  render: () => {
    const [val, setVal] = React.useState<string | number | null>(null);
    return (
      <div className="astralis-w-72">
        <Select
          options={countries}
          value={val}
          onChange={setVal}
          searchable
          clearable
          placeholder="Search a country…"
        />
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story:
          "Pass `searchable` to render a live filter input inside the dropdown. Works well for long lists.",
      },
    },
  },
};

// ─── Option groups ────────────────────────────────────────────────────────────

export const OptionGroups: Story = {
  render: () => {
    const [val, setVal] = React.useState<string | number | null>(null);
    return (
      <div className="astralis-w-64">
        <Select
          options={grouped}
          value={val}
          onChange={setVal}
          placeholder="Pick a technology"
        />
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story:
          "Pass objects with a `group` key alongside `options` to render labeled sections. Disabled options are shown but unclickable.",
      },
    },
  },
};

// ─── Searchable + Groups ──────────────────────────────────────────────────────

export const SearchableGroups: Story = {
  render: () => {
    const [val, setVal] = React.useState<string | number | null>(null);
    return (
      <div className="astralis-w-64">
        <Select
          options={grouped}
          value={val}
          onChange={setVal}
          searchable
          clearable
          placeholder="Search technologies…"
        />
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: "Search filters across all groups simultaneously.",
      },
    },
  },
};

// ─── In a field ───────────────────────────────────────────────────────────────

export const InField: Story = {
  render: () => {
    const [val, setVal] = React.useState<string | number | null>(null);
    return (
      <div className="astralis-w-72">
        <Field>
          <Field.Label>Country of residence</Field.Label>
          <Select
            options={countries}
            value={val}
            onChange={setVal}
            searchable
            clearable
            placeholder="Select a country"
          />
          <Field.HelpText>
            This will be used for billing purposes.
          </Field.HelpText>
        </Field>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story:
          "Select inside a `Field` — label auto-wires `htmlFor` to the Select's trigger.",
      },
    },
  },
};

// ─── In a form ────────────────────────────────────────────────────────────────

export const InForm: Story = {
  render: () => {
    const [role, setRole] = React.useState<string | number | null>(null);
    const [submitted, setSubmitted] = React.useState(false);
    const isInvalid = submitted && !role;

    const roleOptions: SelectOptionOrGroup[] = [
      { value: "designer", label: "Designer" },
      { value: "engineer", label: "Engineer" },
      { value: "pm", label: "Product Manager" },
      { value: "other", label: "Other" },
    ];

    return (
      <form
        onSubmit={(e) => {
          e.preventDefault();
          setSubmitted(true);
        }}
        className="astralis-flex astralis-flex-col astralis-gap-4 astralis-w-72"
      >
        <Field invalid={isInvalid} required>
          <Field.Label>Your role</Field.Label>
          <Select
            options={roleOptions}
            value={role}
            onChange={setRole}
            invalid={isInvalid}
            placeholder="Select your role"
          />
          {isInvalid && (
            <Field.ErrorText>Please select a role to continue.</Field.ErrorText>
          )}
        </Field>

        <button
          type="submit"
          className="astralis-h-10 astralis-rounded-lg astralis-bg-primary-600 astralis-text-sm astralis-font-medium astralis-text-white hover:astralis-bg-primary-700 astralis-transition-colors"
        >
          {submitted && role ? `✓ Submitted as ${role}` : "Submit"}
        </button>
      </form>
    );
  },
  parameters: {
    docs: {
      description: {
        story:
          "Required Select with error validation — error shows when submitted without a selection.",
      },
    },
  },
};
