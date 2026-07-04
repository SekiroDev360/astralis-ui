import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";
import type { FormEvent } from "react";
import { MultiSelect } from "./index";
import { Field } from "../field";
import { VStack } from "../../layout/stack";
import { Text } from "../../typography/text";
import { Button } from "../../buttons/button";
import type { MultiSelectOptionOrGroup } from "./multi-select.types";

const meta: Meta = {
  title: "Components/Data Entry/MultiSelect",
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "MultiSelect lets users pick multiple values from a searchable dropdown. Selected items appear as removable tags inside the trigger; `colorScheme` tints the tags, focus ring, and highlighted options. Backspace removes the last tag when the search box is empty.",
      },
    },
  },
};

export default meta;
type Story = StoryObj;

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
  { group: "Frontend", options: [
    { value: "react", label: "React" },
    { value: "vue", label: "Vue" },
    { value: "svelte", label: "Svelte" },
    { value: "angular", label: "Angular" },
  ] },
  { group: "Backend", options: [
    { value: "node", label: "Node.js" },
    { value: "django", label: "Django" },
    { value: "laravel", label: "Laravel" },
    { value: "rails", label: "Ruby on Rails" },
  ] },
  { group: "Database", options: [
    { value: "postgres", label: "PostgreSQL" },
    { value: "mongo", label: "MongoDB" },
    { value: "mysql", label: "MySQL" },
    { value: "redis", label: "Redis", disabled: true },
  ] },
];

/** Basic controlled MultiSelect — type to filter, click to toggle. */
export const Basic: Story = {
  render: () => {
    const [val, setVal] = useState<Array<string | number>>([]);
    return (
      <VStack gap="3" alignItems="stretch">
        <MultiSelect options={skills} value={val} onChange={setVal} placeholder="Pick your skills…" />
        {val.length > 0 && <Text size="sm" color="muted">Selected: {val.join(", ")}</Text>}
      </VStack>
    );
  },
};

/** Pre-selected values with `clearable`. */
export const PreSelected: Story = {
  render: () => {
    const [val, setVal] = useState<Array<string | number>>(["react", "typescript", "tailwind"]);
    return <MultiSelect options={skills} value={val} onChange={setVal} clearable placeholder="Pick your skills…" />;
  },
};

/** Three sizes: `sm`, `md`, `lg`. */
export const Sizes: Story = {
  render: () => (
    <VStack gap="4" alignItems="stretch">
      <MultiSelect options={skills} size="sm" defaultValue={["react", "vue"]} />
      <MultiSelect options={skills} size="md" defaultValue={["react", "vue"]} />
      <MultiSelect options={skills} size="lg" defaultValue={["react", "vue"]} />
    </VStack>
  ),
};

/** Two variants: `outline` and `filled`. */
export const Variants: Story = {
  render: () => (
    <VStack gap="4" alignItems="stretch">
      <MultiSelect options={skills} variant="outline" defaultValue={["react"]} placeholder="Outline" />
      <MultiSelect options={skills} variant="filled" defaultValue={["react"]} placeholder="Filled" />
    </VStack>
  ),
};

/** Default, disabled, and invalid states. */
export const States: Story = {
  render: () => (
    <VStack gap="4" alignItems="stretch">
      <MultiSelect options={skills} placeholder="Default" />
      <MultiSelect options={skills} disabled defaultValue={["react", "vue"]} />
      <MultiSelect options={skills} invalid placeholder="Invalid" />
    </VStack>
  ),
};

/** `colorScheme` tints the tags, focus ring, and highlighted options. */
export const Colors: Story = {
  render: () => (
    <VStack gap="4" alignItems="stretch">
      <MultiSelect options={skills} colorScheme="brand" defaultValue={["react", "vue"]} />
      <MultiSelect options={skills} colorScheme="green" defaultValue={["angular", "svelte"]} />
      <MultiSelect options={skills} colorScheme="purple" defaultValue={["nextjs", "graphql"]} />
    </VStack>
  ),
};

/** `max={3}` — once the limit is hit, remaining options disable and a notice shows. */
export const MaxSelection: Story = {
  render: () => {
    const [val, setVal] = useState<Array<string | number>>(["react"]);
    return (
      <VStack gap="3" alignItems="stretch">
        <MultiSelect options={skills} value={val} onChange={setVal} max={3} clearable placeholder="Pick up to 3 skills…" />
        <Text size="sm" color="muted">{val.length}/3 selected</Text>
      </VStack>
    );
  },
};

/** Options organised into labelled groups; disabled options are shown but unclickable. */
export const OptionGroups: Story = {
  render: () => {
    const [val, setVal] = useState<Array<string | number>>([]);
    return <MultiSelect options={techStack} value={val} onChange={setVal} clearable placeholder="Select technologies…" />;
  },
};

/** MultiSelect inside a `Field` with label and help text. */
export const InField: Story = {
  render: () => {
    const [val, setVal] = useState<Array<string | number>>([]);
    return (
      <Field>
        <Field.Label>Tech stack</Field.Label>
        <MultiSelect options={techStack} value={val} onChange={setVal} clearable placeholder="Select technologies…" />
        <Field.HelpText>Choose all technologies your team uses.</Field.HelpText>
      </Field>
    );
  },
};

/** Form validation — error shown if submitted with no selection. */
export const InForm: Story = {
  render: () => {
    const [tags, setTags] = useState<Array<string | number>>([]);
    const [submitted, setSubmitted] = useState(false);
    const isInvalid = submitted && tags.length === 0;

    const handleSubmit = (e: FormEvent) => {
      e.preventDefault();
      setSubmitted(true);
    };

    return (
      <form onSubmit={handleSubmit}>
        <VStack gap="4" alignItems="stretch">
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
            {isInvalid && <Field.ErrorText>Please select at least one skill.</Field.ErrorText>}
          </Field>
          <Button type="submit">{submitted && tags.length > 0 ? `✓ Saved ${tags.length} skill(s)` : "Save"}</Button>
        </VStack>
      </form>
    );
  },
};
