import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";
import type { FormEvent } from "react";
import { Mail, DollarSign } from "lucide-react";
import { Input, InputGroup } from "./index";
import { Field } from "../field";
import { Box } from "../../layout/box";
import { VStack } from "../../layout/stack";
import { Text } from "../../typography/text";
import { Icon } from "../../icon";
import { Button } from "../../buttons/button";

const meta: Meta = {
  title: "Components/Data Entry/Input",
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "Input is the base data-entry component. It supports four visual variants, three sizes, and sub-components for Password, Search, and TextArea. Use it inside a `Field` for labels, help text, and error messages.",
      },
    },
  },
};

export default meta;
type Story = StoryObj;

/** Four visual styles: `outline`, `filled`, `underline`, `unstyled`. */
export const Variants: Story = {
  render: () => (
    <VStack gap="4" alignItems="stretch">
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
    </VStack>
  ),
};

/** Three sizes: `sm`, `md`, `lg`. */
export const Sizes: Story = {
  render: () => (
    <VStack gap="4" alignItems="stretch">
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
    </VStack>
  ),
};

/** Normal, disabled, invalid, and read-only states. */
export const States: Story = {
  render: () => (
    <VStack gap="4" alignItems="stretch">
      <Field>
        <Field.Label>Default</Field.Label>
        <Input placeholder="Normal state" />
      </Field>
      <Field disabled>
        <Field.Label>Disabled</Field.Label>
        <Input placeholder="Cannot interact" />
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
    </VStack>
  ),
};

/** `InputGroup` adds `prefix`/`suffix` slots for icons or text. */
export const WithPrefixSuffix: Story = {
  render: () => (
    <VStack gap="4" alignItems="stretch">
      <Field>
        <Field.Label>Email</Field.Label>
        <InputGroup prefix={<Icon as={Mail} size="sm" />}>
          <Input placeholder="you@example.com" type="email" />
        </InputGroup>
      </Field>

      <Field>
        <Field.Label>Website</Field.Label>
        <InputGroup
          prefix={<Text size="xs" weight="medium" color="muted">https://</Text>}
          suffix={<Text size="xs" weight="medium" color="muted">.com</Text>}
        >
          <Input placeholder="yoursite" />
        </InputGroup>
      </Field>

      <Field>
        <Field.Label>Amount</Field.Label>
        <InputGroup
          prefix={<Icon as={DollarSign} size="sm" />}
          suffix={<Text size="xs" color="subtle">USD</Text>}
        >
          <Input placeholder="0.00" type="number" />
        </InputGroup>
      </Field>
    </VStack>
  ),
};

/** `Input.Password` adds a show/hide toggle. */
export const Password: Story = {
  render: () => (
    <VStack gap="4" alignItems="stretch">
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
    </VStack>
  ),
};

/** `Input.Search` has a built-in icon and fires `onSearch` on Enter or button click. */
export const Search: Story = {
  render: () => {
    const [result, setResult] = useState("");
    return (
      <VStack gap="4" alignItems="stretch">
        <Field>
          <Field.Label>Search (press Enter)</Field.Label>
          <Input.Search placeholder="Search anything..." onSearch={setResult} />
        </Field>
        <Field>
          <Field.Label>Search with button</Field.Label>
          <Input.Search placeholder="Search anything..." showSearchButton onSearch={setResult} />
        </Field>
        {result && (
          <Text size="xs" color="muted">
            Searched: <Text as="span" weight="semibold" color="base">{result}</Text>
          </Text>
        )}
      </VStack>
    );
  },
};

/** `Input.TextArea` supports `showCount` with optional `maxLength`. */
export const TextArea: Story = {
  render: () => {
    const [val, setVal] = useState("");
    return (
      <VStack gap="4" alignItems="stretch">
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
      </VStack>
    );
  },
};

/** A reactive form combining Field, Input, Input.Password, InputGroup, and Input.TextArea. */
export const FullFormExample: Story = {
  render: () => {
    const [submitted, setSubmitted] = useState(false);
    const [form, setForm] = useState({ name: "", email: "", password: "", bio: "" });
    const [errors, setErrors] = useState<Record<string, string>>({});

    const validate = () => {
      const e: Record<string, string> = {};
      if (!form.name) e.name = "Name is required.";
      if (!form.email.includes("@")) e.email = "Enter a valid email.";
      if (form.password.length < 8) e.password = "Password must be at least 8 characters.";
      return e;
    };

    const handleSubmit = (e: FormEvent) => {
      e.preventDefault();
      const errs = validate();
      if (Object.keys(errs).length > 0) setErrors(errs);
      else {
        setErrors({});
        setSubmitted(true);
      }
    };

    if (submitted) {
      return (
        <Box py="6">
          <Text align="center" weight="medium" color="success">✓ Form submitted!</Text>
        </Box>
      );
    }

    return (
      <form onSubmit={handleSubmit}>
        <VStack gap="4" alignItems="stretch">
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
            <InputGroup prefix={<Icon as={Mail} size="sm" />}>
              <Input
                type="email"
                value={form.email}
                onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                placeholder="jane@example.com"
              />
            </InputGroup>
            {errors.email && <Field.ErrorText>{errors.email}</Field.ErrorText>}
          </Field>

          <Field invalid={!!errors.password} required>
            <Field.Label>Password</Field.Label>
            <Input.Password
              value={form.password}
              onChange={(e) => setForm((f) => ({ ...f, password: e.target.value }))}
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

          <Button type="submit" fullWidth>Submit</Button>
        </VStack>
      </form>
    );
  },
};
