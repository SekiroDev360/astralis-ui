import type { Meta, StoryObj } from "@storybook/react-vite";
import { Steps } from "./index";
import Icon from "../../icon/icon";
import { useState } from "react";

const meta: Meta<typeof Steps> = {
  title: "Components/Navigation/Steps",
  component: Steps,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof Steps>;

export const Basic: Story = {
  args: {
    defaultValue: 0,
  },
  render: (args) => (
    <div className="astralis-w-full astralis-flex astralis-justify-center">
      <Steps {...args}>
        <Steps.List>
          <Steps.Item>
            <Steps.Indicator />
            <Steps.Content>
              <Steps.Title>Finished</Steps.Title>
              <Steps.Description>This is a description.</Steps.Description>
            </Steps.Content>
          </Steps.Item>

          <Steps.Item>
            <Steps.Indicator />
            <Steps.Content>
              <Steps.Title>In Progress</Steps.Title>
              <Steps.Description>This is a description.</Steps.Description>
            </Steps.Content>
          </Steps.Item>

          <Steps.Item>
            <Steps.Indicator />
            <Steps.Content>
              <Steps.Title>Waiting</Steps.Title>
              <Steps.Description>This is a description.</Steps.Description>
            </Steps.Content>
          </Steps.Item>
        </Steps.List>
      </Steps>
    </div>
  ),
};

export const Vertical: Story = {
  args: {
    defaultValue: 1,
    orientation: "vertical",
  },
  render: (args) => (
    <div className="astralis-h-[200px] astralis-w-full astralis-flex astralis-justify-center">
      <Steps {...args}>
        <Steps.List>
          <Steps.Item>
            <Steps.Indicator />
            <Steps.Content>
              <Steps.Title>Finished</Steps.Title>
              <Steps.Description>This is a description.</Steps.Description>
            </Steps.Content>
          </Steps.Item>

          <Steps.Item>
            <Steps.Indicator />
            <Steps.Content>
              <Steps.Title>In Progress</Steps.Title>
              <Steps.Description>This is a description.</Steps.Description>
            </Steps.Content>
          </Steps.Item>

          <Steps.Item>
            <Steps.Indicator />
            <Steps.Content>
              <Steps.Title>Waiting</Steps.Title>
              <Steps.Description>This is a description.</Steps.Description>
            </Steps.Content>
          </Steps.Item>
        </Steps.List>
      </Steps>
    </div>
  ),
};

export const WithIcons: Story = {
  args: {
    defaultValue: 1,
  },
  render: (args) => (
    <div className="astralis-w-full astralis-flex astralis-justify-center">
      <Steps {...args}>
        <Steps.List>
          <Steps.Item>
            <Steps.Indicator>
              <Icon name="User" size="sm" />
            </Steps.Indicator>
            <Steps.Content>
              <Steps.Title>Login</Steps.Title>
              <Steps.Description>Login to your account.</Steps.Description>
            </Steps.Content>
          </Steps.Item>

          <Steps.Item>
            <Steps.Indicator>
              <Icon name="CreditCard" size="sm" />
            </Steps.Indicator>
            <Steps.Content>
              <Steps.Title>Verification</Steps.Title>
              <Steps.Description>
                Verify your payment details.
              </Steps.Description>
            </Steps.Content>
          </Steps.Item>

          <Steps.Item>
            <Steps.Indicator>
              <Icon name="Smile" size="sm" />
            </Steps.Indicator>
            <Steps.Content>
              <Steps.Title>Done</Steps.Title>
              <Steps.Description>You are all set!</Steps.Description>
            </Steps.Content>
          </Steps.Item>
        </Steps.List>
      </Steps>
    </div>
  ),
};

export const ErrorStatus: Story = {
  args: {
    defaultValue: 1,
  },
  render: (args) => (
    <div className="astralis-w-full astralis-flex astralis-justify-center">
      <Steps {...args}>
        <Steps.List>
          <Steps.Item status="finish">
            <Steps.Indicator />
            <Steps.Content>
              <Steps.Title>Finished</Steps.Title>
              <Steps.Description>This step is finished.</Steps.Description>
            </Steps.Content>
          </Steps.Item>

          <Steps.Item status="error">
            <Steps.Indicator />
            <Steps.Content>
              <Steps.Title>Error</Steps.Title>
              <Steps.Description>Something went wrong.</Steps.Description>
            </Steps.Content>
          </Steps.Item>

          <Steps.Item status="wait">
            <Steps.Indicator />
            <Steps.Content>
              <Steps.Title>Waiting</Steps.Title>
              <Steps.Description>This step is waiting.</Steps.Description>
            </Steps.Content>
          </Steps.Item>
        </Steps.List>
      </Steps>
    </div>
  ),
};

export const SmallSize: Story = {
  args: {
    defaultValue: 1,
    size: "small",
  },
  render: (args) => (
    <div className="astralis-w-full astralis-flex astralis-justify-center">
      <Steps {...args}>
        <Steps.List>
          <Steps.Item>
            <Steps.Indicator />
            <Steps.Content>
              <Steps.Title>Finished</Steps.Title>
              <Steps.Description>This is a description.</Steps.Description>
            </Steps.Content>
          </Steps.Item>

          <Steps.Item>
            <Steps.Indicator />
            <Steps.Content>
              <Steps.Title>In Progress</Steps.Title>
              <Steps.Description>This is a description.</Steps.Description>
            </Steps.Content>
          </Steps.Item>

          <Steps.Item>
            <Steps.Indicator />
            <Steps.Content>
              <Steps.Title>Waiting</Steps.Title>
              <Steps.Description>This is a description.</Steps.Description>
            </Steps.Content>
          </Steps.Item>
        </Steps.List>
      </Steps>
    </div>
  ),
};

export const Clickable: Story = {
  render: () => {
    const [current, setCurrent] = useState(0);

    return (
      <div className="astralis-w-full astralis-flex astralis-flex-col astralis-justify-center">
        <Steps value={current} onValueChange={setCurrent} clickable>
          <Steps.List>
            {["First", "Second", "Third"].map((title, index) => (
              <Steps.Item key={index}>
                <Steps.Indicator />
                <Steps.Content>
                  <Steps.Title>Step {index + 1}</Steps.Title>
                  <Steps.Description>{title} description</Steps.Description>
                </Steps.Content>
              </Steps.Item>
            ))}
          </Steps.List>
        </Steps>

        <div className="astralis-mt-8 astralis-border astralis-border-border-subtle astralis-p-4 astralis-rounded-md astralis-bg-surface-base">
          Content of Step {current + 1}
        </div>
      </div>
    );
  },
};
