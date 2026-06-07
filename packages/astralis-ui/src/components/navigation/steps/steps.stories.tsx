import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";
import { Steps } from "./index";
import { Button } from "../../buttons/button/button";

const meta: Meta<typeof Steps> = {
  title: "Components/Navigation/Steps",
  component: Steps,
  tags: ["autodocs"],
  argTypes: {
    orientation: {
      control: { type: "select" },
      options: ["horizontal", "vertical"],
      description: "Layout direction of the step items",
    },
    variant: {
      control: { type: "select" },
      options: ["solid", "subtle", "dot"],
      description: "Visual variant of the indicator circles or dots",
    },
    size: {
      control: { type: "select" },
      options: ["sm", "md", "lg"],
      description: "Size of the step indicator circle and typography",
    },
    linear: {
      control: { type: "boolean" },
      description: "If true, enforces sequential completion of steps",
    },
    alternativeLabel: {
      control: { type: "boolean" },
      description:
        "Places label text below the step indicator (horizontal only)",
    },
  },
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Steps indicate progress through a multi-step process. Supports horizontal and vertical orientations, sizes, label positions, solid, subtle, and progress dot variations.",
      },
    },
  },
  decorators: [
    (Story) => (
      <div className="astralis-w-full astralis-flex astralis-justify-center astralis-items-center">
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof Steps>;

export const Default: Story = {
  args: {
    defaultValue: 0,
    orientation: "horizontal",
    variant: "solid",
    size: "md",
    linear: false,
    alternativeLabel: false,
  },
  render: (args) => (
    <Steps {...args}>
      <Steps.List>
        <Steps.Item>
          <Steps.Indicator />
          <Steps.Panel>
            <Steps.Title>Account Info</Steps.Title>
            <Steps.Description>Required details</Steps.Description>
          </Steps.Panel>
          <Steps.Separator />
        </Steps.Item>

        <Steps.Item>
          <Steps.Indicator />
          <Steps.Panel>
            <Steps.Title>Company Details</Steps.Title>
            <Steps.Description>Corporate information</Steps.Description>
          </Steps.Panel>
          <Steps.Separator />
        </Steps.Item>

        <Steps.Item>
          <Steps.Indicator />
          <Steps.Panel>
            <Steps.Title>Done</Steps.Title>
            <Steps.Description>Confirmation screen</Steps.Description>
          </Steps.Panel>
          <Steps.Separator />
        </Steps.Item>
      </Steps.List>
    </Steps>
  ),
};

export const Clickable: Story = {
  render: () => {
    const [step, setStep] = useState(0);

    return (
      <div className="astralis-space-y-6 astralis-w-full">
        <Steps value={step} onValueChange={setStep}>
          <Steps.List>
            <Steps.Item>
              <Steps.Trigger>
                <Steps.Indicator />
                <Steps.Panel>
                  <Steps.Title>Step 1</Steps.Title>
                  <Steps.Description>Clickable trigger</Steps.Description>
                </Steps.Panel>
              </Steps.Trigger>
              <Steps.Separator />
            </Steps.Item>

            <Steps.Item>
              <Steps.Trigger>
                <Steps.Indicator />
                <Steps.Panel>
                  <Steps.Title>Step 2</Steps.Title>
                  <Steps.Description>Click to jump</Steps.Description>
                </Steps.Panel>
              </Steps.Trigger>
              <Steps.Separator />
            </Steps.Item>

            <Steps.Item>
              <Steps.Trigger>
                <Steps.Indicator />
                <Steps.Panel>
                  <Steps.Title>Step 3</Steps.Title>
                  <Steps.Description>Finished state</Steps.Description>
                </Steps.Panel>
              </Steps.Trigger>
              <Steps.Separator />
            </Steps.Item>
          </Steps.List>
        </Steps>

        <div className="astralis-p-4 astralis-bg-surface-subtle astralis-rounded-lg astralis-border astralis-border-base astralis-text-sm">
          Active Index: <span className="astralis-font-semibold">{step}</span>
        </div>
      </div>
    );
  },
};

export const VariantShowcase: Story = {
  render: () => (
    <div className="astralis-space-y-10 astralis-w-full">
      <p className="astralis-mb-4 astralis-text-sm astralis-font-semibold astralis-text-label-base">
        Solid Variant (Default)
      </p>
      <Steps defaultValue={1} variant="solid">
        <Steps.List>
          <Steps.Item>
            <Steps.Indicator />
            <Steps.Panel>
              <Steps.Title>Completed</Steps.Title>
            </Steps.Panel>
            <Steps.Separator />
          </Steps.Item>
          <Steps.Item>
            <Steps.Indicator />
            <Steps.Panel>
              <Steps.Title>Active</Steps.Title>
            </Steps.Panel>
            <Steps.Separator />
          </Steps.Item>
          <Steps.Item>
            <Steps.Indicator />
            <Steps.Panel>
              <Steps.Title>Upcoming</Steps.Title>
            </Steps.Panel>
            <Steps.Separator />
          </Steps.Item>
        </Steps.List>
      </Steps>

      <p className="astralis-mb-4 astralis-text-sm astralis-font-semibold astralis-text-label-base">
        Subtle Variant (Outline Indicators)
      </p>
      <Steps defaultValue={1} variant="subtle">
        <Steps.List>
          <Steps.Item>
            <Steps.Indicator />
            <Steps.Panel>
              <Steps.Title>Completed</Steps.Title>
            </Steps.Panel>
            <Steps.Separator />
          </Steps.Item>
          <Steps.Item>
            <Steps.Indicator />
            <Steps.Panel>
              <Steps.Title>Active</Steps.Title>
            </Steps.Panel>
            <Steps.Separator />
          </Steps.Item>
          <Steps.Item>
            <Steps.Indicator />
            <Steps.Panel>
              <Steps.Title>Upcoming</Steps.Title>
            </Steps.Panel>
            <Steps.Separator />
          </Steps.Item>
        </Steps.List>
      </Steps>

      <p className="astralis-mb-4 astralis-text-sm astralis-font-semibold astralis-text-label-base">
        Dot Variant (Clean Progress Dots)
      </p>
      <Steps defaultValue={1} variant="dot">
        <Steps.List>
          <Steps.Item>
            <Steps.Indicator />
            <Steps.Panel>
              <Steps.Title>Completed</Steps.Title>
            </Steps.Panel>
            <Steps.Separator />
          </Steps.Item>
          <Steps.Item>
            <Steps.Indicator />
            <Steps.Panel>
              <Steps.Title>Active</Steps.Title>
            </Steps.Panel>
            <Steps.Separator />
          </Steps.Item>
          <Steps.Item>
            <Steps.Indicator />
            <Steps.Panel>
              <Steps.Title>Upcoming</Steps.Title>
            </Steps.Panel>
            <Steps.Separator />
          </Steps.Item>
        </Steps.List>
      </Steps>
    </div>
  ),
};

export const SizesShowcase: Story = {
  render: () => (
    <div className="astralis-space-y-10 astralis-w-full">
      <p className="astralis-mb-4 astralis-text-sm astralis-font-semibold astralis-text-label-base">
        Small (sm)
      </p>
      <Steps defaultValue={1} size="sm">
        <Steps.List>
          <Steps.Item>
            <Steps.Indicator />
            <Steps.Panel>
              <Steps.Title>Step A</Steps.Title>
            </Steps.Panel>
            <Steps.Separator />
          </Steps.Item>
          <Steps.Item>
            <Steps.Indicator />
            <Steps.Panel>
              <Steps.Title>Step B</Steps.Title>
            </Steps.Panel>
            <Steps.Separator />
          </Steps.Item>
        </Steps.List>
      </Steps>

      <p className="astralis-mb-4 astralis-text-sm astralis-font-semibold astralis-text-label-base">
        Medium (md)
      </p>
      <Steps defaultValue={1} size="md">
        <Steps.List>
          <Steps.Item>
            <Steps.Indicator />
            <Steps.Panel>
              <Steps.Title>Step A</Steps.Title>
            </Steps.Panel>
            <Steps.Separator />
          </Steps.Item>
          <Steps.Item>
            <Steps.Indicator />
            <Steps.Panel>
              <Steps.Title>Step B</Steps.Title>
            </Steps.Panel>
            <Steps.Separator />
          </Steps.Item>
        </Steps.List>
      </Steps>

      <p className="astralis-mb-4 astralis-text-sm astralis-font-semibold astralis-text-label-base">
        Large (lg)
      </p>
      <Steps defaultValue={1} size="lg">
        <Steps.List>
          <Steps.Item>
            <Steps.Indicator />
            <Steps.Panel>
              <Steps.Title>Step A</Steps.Title>
            </Steps.Panel>
            <Steps.Separator />
          </Steps.Item>
          <Steps.Item>
            <Steps.Indicator />
            <Steps.Panel>
              <Steps.Title>Step B</Steps.Title>
            </Steps.Panel>
            <Steps.Separator />
          </Steps.Item>
        </Steps.List>
      </Steps>
    </div>
  ),
};

export const AlternativeLabel: Story = {
  render: () => (
    <Steps defaultValue={1} alternativeLabel>
      <Steps.List>
        <Steps.Item>
          <Steps.Indicator />
          <Steps.Panel>
            <Steps.Title>Account Settings</Steps.Title>
            <Steps.Description>Credentials & Info</Steps.Description>
          </Steps.Panel>
          <Steps.Separator />
        </Steps.Item>

        <Steps.Item>
          <Steps.Indicator />
          <Steps.Panel>
            <Steps.Title>Payment Setup</Steps.Title>
            <Steps.Description>Cards & Address</Steps.Description>
          </Steps.Panel>
          <Steps.Separator />
        </Steps.Item>

        <Steps.Item>
          <Steps.Indicator />
          <Steps.Panel>
            <Steps.Title>Complete Registration</Steps.Title>
            <Steps.Description>Activate Profile</Steps.Description>
          </Steps.Panel>
          <Steps.Separator />
        </Steps.Item>
      </Steps.List>
    </Steps>
  ),
};

export const VerticalOrientation: Story = {
  render: () => (
    <Steps defaultValue={1} orientation="vertical">
      <Steps.List>
        <Steps.Item>
          <Steps.Indicator />
          <Steps.Panel>
            <Steps.Title>Initialize Project</Steps.Title>
            <Steps.Description>
              Create lockfiles and templates
            </Steps.Description>
          </Steps.Panel>
          <Steps.Separator />
        </Steps.Item>

        <Steps.Item>
          <Steps.Indicator />
          <Steps.Panel>
            <Steps.Title>Configure Styles</Steps.Title>
            <Steps.Description>Setup custom Tailwind classes</Steps.Description>
          </Steps.Panel>
          <Steps.Separator />
        </Steps.Item>

        <Steps.Item>
          <Steps.Indicator />
          <Steps.Panel>
            <Steps.Title>Verify Build</Steps.Title>
            <Steps.Description>Compile source assets</Steps.Description>
          </Steps.Panel>
          <Steps.Separator />
        </Steps.Item>
      </Steps.List>
    </Steps>
  ),
};
