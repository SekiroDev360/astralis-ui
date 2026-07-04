import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";
import type { FormEvent } from "react";
import { Select } from "./index";
import { Field } from "../field";
import { Box } from "../../layout/box";
import { VStack } from "../../layout/stack";
import { Text } from "../../typography/text";
import { Button } from "../../buttons/button";
import type { SelectOptionOrGroup } from "./select.types";

const meta: Meta = {
  title: "Components/Data Entry/Select",
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "Select is a custom dropdown built on a portal so it escapes scroll containers and `overflow: hidden` parents. It supports search, clearable, option groups, `colorScheme`, and full keyboard navigation (↑↓ to move, Enter to select, Esc to close).",
      },
    },
  },
};

export default meta;
type Story = StoryObj;

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
  { group: "Frontend", options: [
    { value: "react", label: "React" },
    { value: "vue", label: "Vue" },
    { value: "svelte", label: "Svelte" },
  ] },
  { group: "Backend", options: [
    { value: "node", label: "Node.js" },
    { value: "django", label: "Django" },
    { value: "laravel", label: "Laravel" },
  ] },
  { group: "Mobile", options: [
    { value: "rn", label: "React Native" },
    { value: "flutter", label: "Flutter" },
    { value: "swift", label: "Swift (disabled)", disabled: true },
  ] },
];

/** Basic controlled Select with a list of options. */
export const Basic: Story = {
  render: () => {
    const [val, setVal] = useState<string | number | null>(null);
    return (
      <Box w="64">
        <Select options={fruits} value={val} onChange={setVal} placeholder="Pick a fruit" />
        {val && <Box mt="2"><Text size="sm" color="muted">Selected: {val}</Text></Box>}
      </Box>
    );
  },
};

/** Three sizes: `sm`, `md`, `lg`. */
export const Sizes: Story = {
  render: () => (
    <VStack gap="3" alignItems="stretch" w="64">
      <Select options={fruits} size="sm" placeholder="Small" />
      <Select options={fruits} size="md" placeholder="Medium (default)" />
      <Select options={fruits} size="lg" placeholder="Large" />
    </VStack>
  ),
};

/** Two variants: `outline` and `filled`. */
export const Variants: Story = {
  render: () => (
    <VStack gap="3" alignItems="stretch" w="64">
      <Select options={fruits} variant="outline" placeholder="Outline (default)" />
      <Select options={fruits} variant="filled" placeholder="Filled" />
    </VStack>
  ),
};

/** All states: default, pre-selected, disabled, invalid, loading. */
export const States: Story = {
  render: () => (
    <VStack gap="3" alignItems="stretch" w="64">
      <Select options={fruits} placeholder="Default" />
      <Select options={fruits} defaultValue="banana" placeholder="Pre-selected" />
      <Select options={fruits} disabled placeholder="Disabled" />
      <Select options={fruits} invalid placeholder="Invalid" />
      <Select options={fruits} loading placeholder="Loading…" />
    </VStack>
  ),
};

/** `colorScheme` tints the focus ring and the selected-option highlight. */
export const Colors: Story = {
  render: () => (
    <VStack gap="3" alignItems="stretch" w="64">
      <Select options={fruits} colorScheme="brand" defaultValue="apple" />
      <Select options={fruits} colorScheme="green" defaultValue="banana" />
      <Select options={fruits} colorScheme="purple" defaultValue="cherry" />
      <Select options={fruits} colorScheme="red" defaultValue="elderberry" />
    </VStack>
  ),
};

/** `clearable` shows an × when a value is selected. */
export const Clearable: Story = {
  render: () => {
    const [val, setVal] = useState<string | number | null>("cherry");
    return (
      <Box w="64">
        <Select options={fruits} value={val} onChange={setVal} clearable placeholder="Pick a fruit" />
        <Box mt="2"><Text size="sm" color="muted">Value: {val ?? "null"}</Text></Box>
      </Box>
    );
  },
};

/** `searchable` renders a live filter input inside the dropdown. */
export const Searchable: Story = {
  render: () => {
    const [val, setVal] = useState<string | number | null>(null);
    return (
      <Box w="72">
        <Select options={countries} value={val} onChange={setVal} searchable clearable placeholder="Search a country…" />
      </Box>
    );
  },
};

/** Option groups render labelled sections; disabled options are shown but unclickable. */
export const OptionGroups: Story = {
  render: () => {
    const [val, setVal] = useState<string | number | null>(null);
    return (
      <Box w="64">
        <Select options={grouped} value={val} onChange={setVal} placeholder="Pick a technology" />
      </Box>
    );
  },
};

/** Search filters across all groups simultaneously. */
export const SearchableGroups: Story = {
  render: () => {
    const [val, setVal] = useState<string | number | null>(null);
    return (
      <Box w="64">
        <Select options={grouped} value={val} onChange={setVal} searchable clearable placeholder="Search technologies…" />
      </Box>
    );
  },
};

/** Select inside a `Field` — label auto-wires to the trigger. */
export const InField: Story = {
  render: () => {
    const [val, setVal] = useState<string | number | null>(null);
    return (
      <Box w="72">
        <Field>
          <Field.Label>Country of residence</Field.Label>
          <Select options={countries} value={val} onChange={setVal} searchable clearable placeholder="Select a country" />
          <Field.HelpText>This will be used for billing purposes.</Field.HelpText>
        </Field>
      </Box>
    );
  },
};

/** Required Select with error validation on submit. */
export const InForm: Story = {
  render: () => {
    const [role, setRole] = useState<string | number | null>(null);
    const [submitted, setSubmitted] = useState(false);
    const isInvalid = submitted && !role;

    const roleOptions: SelectOptionOrGroup[] = [
      { value: "designer", label: "Designer" },
      { value: "engineer", label: "Engineer" },
      { value: "pm", label: "Product Manager" },
      { value: "other", label: "Other" },
    ];

    const handleSubmit = (e: FormEvent) => {
      e.preventDefault();
      setSubmitted(true);
    };

    return (
      <form onSubmit={handleSubmit}>
        <VStack gap="4" alignItems="stretch" w="72">
          <Field invalid={isInvalid} required>
            <Field.Label>Your role</Field.Label>
            <Select options={roleOptions} value={role} onChange={setRole} invalid={isInvalid} placeholder="Select your role" />
            {isInvalid && <Field.ErrorText>Please select a role to continue.</Field.ErrorText>}
          </Field>
          <Button type="submit">{submitted && role ? `✓ Submitted as ${role}` : "Submit"}</Button>
        </VStack>
      </form>
    );
  },
};
