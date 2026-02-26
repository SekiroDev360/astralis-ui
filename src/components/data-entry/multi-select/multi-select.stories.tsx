import type { Meta, StoryObj } from "@storybook/react-vite";
import React from "react";
import { MultiSelect } from "./index";
import { Field } from "../field";
import { AstralisProvider } from "../../../theme";
import type { MultiSelectOptionOrGroup } from "./multi-select.types";

const meta: Meta = {
  title: "Components/Data Entry/MultiSelect",
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "MultiSelect lets users pick multiple values from a searchable dropdown. Selected items appear as removable tags inside the trigger. Backspace removes the last tag when the search box is empty.",
      },
    },
  },
  decorators: [
    (Story) => (
      <AstralisProvider>
        <div className="astralis-p-6 astralis-min-h-72 astralis-w-96">
          <Story />
        </div>
      </AstralisProvider>
    ),
  ],
};

export default meta;
type Story = StoryObj;

// ── Shared option sets ─────────────────────────────────────────────────────────

const skills: MultiSelectOptionOrGroup[] = [
  { value: "react", label: "React" },
  { value: "vue", label: "Vue" },
  { value: "angular", label: "Angular" },
  { value: "svelte", label: "Svelte" },
  { value: "nextjs", label: "Next.js" },
  { value: "typescript", label: "TypeScript" },
  { value: "tailwind", label: "Tailwind CSS" },
  { value: "graphql", label: "GraphQL" },
];

const techStack: MultiSelectOptionOrGroup[] = [
  {
    group: "Frontend",
    options: [
      { value: "react", label: "React" },
      { value: "vue", label: "Vue" },
      { value: "svelte", label: "Svelte" },
      { value: "angular", label: "Angular" },
    ],
  },
  {
    group: "Backend",
    options: [
      { value: "node", label: "Node.js" },
      { value: "django", label: "Django" },
      { value: "laravel", label: "Laravel" },
      { value: "rails", label: "Ruby on Rails" },
    ],
  },
  {
    group: "Database",
    options: [
      { value: "postgres", label: "PostgreSQL" },
      { value: "mongo", label: "MongoDB" },
      { value: "mysql", label: "MySQL" },
      { value: "redis", label: "Redis", disabled: true },
    ],
  },
];

// ─── Basic ────────────────────────────────────────────────────────────────────

export const Basic: Story = {
  render: () => {
    const [val, setVal] = React.useState<Array<string | number>>([]);
    return (
      <div className="astralis-flex astralis-flex-col astralis-gap-3">
        <MultiSelect
          options={skills}
          value={val}
          onChange={setVal}
          placeholder="Pick your skills…"
        />
        {val.length > 0 && (
          <p className="astralis-text-sm astralis-text-content-secondary">
            Selected: {val.join(", ")}
          </p>
        )}
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story:
          "Basic controlled MultiSelect. Type to filter, click to select, click again (or press ×) to deselect.",
      },
    },
  },
};

// ─── With pre-selection ───────────────────────────────────────────────────────

export const PreSelected: Story = {
  render: () => {
    const [val, setVal] = React.useState<Array<string | number>>([
      "react",
      "typescript",
      "tailwind",
    ]);
    return (
      <MultiSelect
        options={skills}
        value={val}
        onChange={setVal}
        clearable
        placeholder="Pick your skills…"
      />
    );
  },
  parameters: {
    docs: {
      description: {
        story: "Pre-selected values with `clearable` to remove all at once.",
      },
    },
  },
};

// ─── Sizes ────────────────────────────────────────────────────────────────────

export const Sizes: Story = {
  render: () => (
    <div className="astralis-flex astralis-flex-col astralis-gap-4">
      <MultiSelect options={skills} size="sm" defaultValue={["react", "vue"]} />
      <MultiSelect options={skills} size="md" defaultValue={["react", "vue"]} />
      <MultiSelect options={skills} size="lg" defaultValue={["react", "vue"]} />
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
      <MultiSelect
        options={skills}
        variant="outline"
        defaultValue={["react"]}
        placeholder="Outline"
      />
      <MultiSelect
        options={skills}
        variant="filled"
        defaultValue={["react"]}
        placeholder="Filled"
      />
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
      <MultiSelect options={skills} placeholder="Default" />
      <MultiSelect options={skills} disabled defaultValue={["react", "vue"]} />
      <MultiSelect options={skills} invalid placeholder="Invalid" />
    </div>
  ),
  parameters: {
    docs: { description: { story: "Default, disabled, and invalid states." } },
  },
};

// ─── Max selection ────────────────────────────────────────────────────────────

export const MaxSelection: Story = {
  render: () => {
    const [val, setVal] = React.useState<Array<string | number>>(["react"]);
    return (
      <div className="astralis-flex astralis-flex-col astralis-gap-3">
        <MultiSelect
          options={skills}
          value={val}
          onChange={setVal}
          max={3}
          clearable
          placeholder="Pick up to 3 skills…"
        />
        <p className="astralis-text-sm astralis-text-content-secondary">
          {val.length}/3 selected
        </p>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story:
          "`max={3}` — once 3 items are selected, remaining options are disabled and a notice is shown.",
      },
    },
  },
};

// ─── Option groups ────────────────────────────────────────────────────────────

export const OptionGroups: Story = {
  render: () => {
    const [val, setVal] = React.useState<Array<string | number>>([]);
    return (
      <MultiSelect
        options={techStack}
        value={val}
        onChange={setVal}
        clearable
        placeholder="Select technologies…"
      />
    );
  },
  parameters: {
    docs: {
      description: {
        story:
          "Options organized into labeled groups. Disabled options are shown but unclickable (Redis).",
      },
    },
  },
};

// ─── In a Field ───────────────────────────────────────────────────────────────

export const InField: Story = {
  render: () => {
    const [val, setVal] = React.useState<Array<string | number>>([]);
    return (
      <Field>
        <Field.Label>Tech stack</Field.Label>
        <MultiSelect
          options={techStack}
          value={val}
          onChange={setVal}
          clearable
          placeholder="Select technologies…"
        />
        <Field.HelpText>Choose all technologies your team uses.</Field.HelpText>
      </Field>
    );
  },
  parameters: {
    docs: {
      description: {
        story: "MultiSelect inside a `Field` with label and help text.",
      },
    },
  },
};

// ─── In a form ────────────────────────────────────────────────────────────────

export const InForm: Story = {
  render: () => {
    const [tags, setTags] = React.useState<Array<string | number>>([]);
    const [submitted, setSubmitted] = React.useState(false);
    const isInvalid = submitted && tags.length === 0;

    return (
      <form
        onSubmit={(e) => {
          e.preventDefault();
          setSubmitted(true);
        }}
        className="astralis-flex astralis-flex-col astralis-gap-4"
      >
        <Field invalid={isInvalid} required>
          <Field.Label>Skills</Field.Label>
          <MultiSelect
            options={skills}
            value={tags}
            onChange={(v) => {
              setTags(v);
              setSubmitted(false);
            }}
            invalid={isInvalid}
            clearable
            placeholder="Select at least one skill…"
          />
          {isInvalid && (
            <Field.ErrorText>Please select at least one skill.</Field.ErrorText>
          )}
        </Field>

        <button
          type="submit"
          className="astralis-h-10 astralis-rounded-lg astralis-bg-primary-600 astralis-text-sm astralis-font-medium astralis-text-white hover:astralis-bg-primary-700 astralis-transition-colors"
        >
          {submitted && tags.length > 0
            ? `✓ Saved ${tags.length} skill(s)`
            : "Save"}
        </button>
      </form>
    );
  },
  parameters: {
    docs: {
      description: {
        story:
          "Form validation — error shown if submitted without selecting any option.",
      },
    },
  },
};
