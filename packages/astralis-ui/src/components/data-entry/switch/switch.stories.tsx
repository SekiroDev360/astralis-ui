import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";
import type { FormEvent } from "react";
import { Switch } from "./index";
import { Field } from "../field";
import { Box } from "../../layout/box";
import { VStack, HStack } from "../../layout/stack";
import { Text } from "../../typography/text";
import { Button } from "../../buttons/button";
import { Separator } from "../../layout/separator";
import { Fragment } from "react";
import { COLOR_SCHEMES } from "../../../const/color-schemes";

const meta: Meta = {
  title: "Components/Data Entry/Switch",
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "Switch is a toggle control for binary on/off states. It renders `<input type='checkbox' role='switch'>` under the hood, so it's fully keyboard-navigable and screen-reader friendly. `colorScheme` sets the \"on\" hue.",
      },
    },
  },
};

export default meta;
type Story = StoryObj;

/** A basic controlled switch with a dynamic label. */
export const Basic: Story = {
  render: () => {
    const [on, setOn] = useState(false);
    return (
      <Switch checked={on} onChange={(e) => setOn(e.target.checked)}>
        {on ? "Enabled" : "Disabled"}
      </Switch>
    );
  },
};

/** Three sizes: `sm`, `md`, `lg`. */
export const Sizes: Story = {
  render: () => (
    <VStack gap="4" alignItems="start">
      <Switch size="sm" defaultChecked>Small</Switch>
      <Switch size="md" defaultChecked>Medium (default)</Switch>
      <Switch size="lg" defaultChecked>Large</Switch>
    </VStack>
  ),
};

/** All switch states: off, on, disabled, invalid, read-only. */
export const States: Story = {
  render: () => (
    <VStack gap="4" alignItems="start">
      <Switch>Off</Switch>
      <Switch defaultChecked>On</Switch>
      <Switch disabled>Disabled off</Switch>
      <Switch disabled defaultChecked>Disabled on</Switch>
      <Switch invalid>Invalid off</Switch>
      <Switch invalid defaultChecked>Invalid on</Switch>
      <Switch readOnly>Read-only off</Switch>
      <Switch readOnly defaultChecked>Read-only on</Switch>
    </VStack>
  ),
};

/** `colorScheme` sets the "on" hue via the accent channel. */
export const Colors: Story = {
  render: () => (
    <HStack gap="4" wrap="wrap">
      {COLOR_SCHEMES.map((c) => (
        <Switch key={c} colorScheme={c} defaultChecked>{c}</Switch>
      ))}
    </HStack>
  ),
};

/** Switch without a visible label — always provide `aria-label`. */
export const NoLabel: Story = {
  render: () => {
    const [on, setOn] = useState(true);
    return <Switch checked={on} onChange={(e) => setOn(e.target.checked)} aria-label="Toggle notifications" />;
  },
};

/** A settings panel pattern — Switch alongside descriptive text. */
export const SettingsList: Story = {
  render: () => {
    const [settings, setSettings] = useState({
      notifications: true,
      marketing: false,
      darkMode: false,
      twoFactor: true,
    });

    const toggle = (key: keyof typeof settings) =>
      setSettings((s) => ({ ...s, [key]: !s[key] }));

    const items = [
      { key: "notifications" as const, label: "Push notifications", desc: "Receive alerts for important activity" },
      { key: "marketing" as const, label: "Marketing emails", desc: "News, updates, and promotions" },
      { key: "darkMode" as const, label: "Dark mode", desc: "Switch the interface to dark theme" },
      { key: "twoFactor" as const, label: "Two-factor auth", desc: "Extra security for your account" },
    ];

    return (
      <VStack alignItems="stretch" w="80">
        {items.map((item, i) => (
          <Fragment key={item.key}>
            {i > 0 && <Separator />}
            <HStack justifyContent="between" gap="4" py="3">
              <Box>
                <Text size="sm" weight="medium">{item.label}</Text>
                <Text size="xs" color="muted">{item.desc}</Text>
              </Box>
              <Switch checked={settings[item.key]} onChange={() => toggle(item.key)} aria-label={item.label} />
            </HStack>
          </Fragment>
        ))}
      </VStack>
    );
  },
};

/** Switch inside a `Field` for a label above and help text below. */
export const InField: Story = {
  render: () => {
    const [on, setOn] = useState(false);
    return (
      <Field>
        <Field.Label>Public profile</Field.Label>
        <Switch checked={on} onChange={(e) => setOn(e.target.checked)}>
          {on ? "Everyone can see your profile" : "Only you can see your profile"}
        </Switch>
        <Field.HelpText>You can change this setting at any time.</Field.HelpText>
      </Field>
    );
  },
};

/** Switch inside a Field with error validation on submit. */
export const InForm: Story = {
  render: () => {
    const [agreed, setAgreed] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const isInvalid = submitted && !agreed;

    const handleSubmit = (e: FormEvent) => {
      e.preventDefault();
      setSubmitted(true);
    };

    return (
      <form onSubmit={handleSubmit}>
        <VStack gap="4" alignItems="stretch" w="72">
          <Field invalid={isInvalid}>
            <Switch checked={agreed} invalid={isInvalid} onChange={(e) => setAgreed(e.target.checked)}>
              I agree to receive updates
            </Switch>
            {isInvalid && <Field.ErrorText>You must opt in to continue.</Field.ErrorText>}
          </Field>
          <Button type="submit">{submitted && agreed ? "✓ Submitted!" : "Submit"}</Button>
        </VStack>
      </form>
    );
  },
};
