import type { Meta, StoryObj } from "@storybook/react-vite";
import { Popover } from "./index";
import { useState } from "react";
import type { PopoverPlacement } from "./popover.types";
import { Button } from "../../buttons";

const meta: Meta<typeof Popover> = {
  title: "Components/Overlay/Popover",
  component: Popover,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: "Displays rich content in a portal, triggered by a button.",
      },
    },
  },
  argTypes: {
    open: {
      control: "boolean",
      description: "Controlled open state",
    },
    defaultOpen: {
      control: "boolean",
      description: "Initial open state (uncontrolled)",
    },
    trigger: {
      control: "radio",
      options: ["click", "hover"],
      description: "Event that triggers the popover",
    },
    onOpenChange: {
      action: "openChange",
    },
  },
};

export default meta;
type Story = StoryObj<typeof Popover>;

export const Default: Story = {
  render: (args) => (
    <div className="astralis-flex astralis-w-full astralis-justify-center astralis-p-10">
      <Popover {...args}>
        <Popover.Trigger>
          <Button variant="outline">Open Popover</Button>
        </Popover.Trigger>

        <Popover.Content>
          <div>
            <h2 className="astralis-text-content-primary astralis-text-lg astralis-font-bold">
              Popover Title
            </h2>
            <p className="astralis-text-content-secondary astralis-text-sm">
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Magni
              iste unde at dolorem beatae, id expedita dignissimos eius nemo
              ipsum.
            </p>
          </div>
        </Popover.Content>
      </Popover>
    </div>
  ),
};

export const TriggerTypes: Story = {
  render: () => {
    return (
      <div className="astralis-flex astralis-w-full astralis-justify-center astralis-p-10 astralis-gap-10">
        <Popover trigger="click">
          <Popover.Trigger>
            <Button variant="outline">Click Me</Button>
          </Popover.Trigger>
          <Popover.Content>
            <div>
              <h2 className="astralis-text-content-primary astralis-text-lg astralis-font-bold">
                Click Trigger
              </h2>
              <p className="astralis-text-content-secondary astralis-text-sm">
                This popover is triggered by clicking. Click again or outside to
                close.
              </p>
            </div>
          </Popover.Content>
        </Popover>

        <Popover trigger="hover">
          <Popover.Trigger>
            <Button variant="outline">Hover Me</Button>
          </Popover.Trigger>
          <Popover.Content>
            <div>
              <h2 className="astralis-text-content-primary astralis-text-lg astralis-font-bold">
                Hover Trigger
              </h2>
              <p className="astralis-text-content-secondary astralis-text-sm">
                This popover opens on hover and closes when you leave the
                trigger or the content.
              </p>
            </div>
          </Popover.Content>
        </Popover>
      </div>
    );
  },
};

export const Placements: Story = {
  render: () => {
    const placements: PopoverPlacement[] = [
      "top",
      "topLeft",
      "topRight",
      "bottom",
      "bottomLeft",
      "bottomRight",
      "left",
      "leftTop",
      "leftBottom",
      "right",
      "rightTop",
      "rightBottom",
    ];

    const [currentPlacement, setCurrentPlacement] =
      useState<PopoverPlacement>("top");
    const [open, setOpen] = useState(false);

    return (
      <div className="astralis-flex astralis-flex-col astralis-items-center astralis-gap-8 astralis-p-10">
        <div className="astralis-flex astralis-flex-wrap astralis-justify-center astralis-gap-2 astralis-max-w-2xl">
          {placements.map((placement) => (
            <Button
              key={placement}
              onClick={() => {
                setCurrentPlacement(placement);
                setOpen(true);
              }}
              size="xs"
              variant={currentPlacement === placement ? "primary" : "outline"}
            >
              {placement}
            </Button>
          ))}
        </div>

        <div className="astralis-mt-10 astralis-flex astralis-items-center astralis-justify-center">
          <Popover
            open={open}
            onOpenChange={setOpen}
            trigger="click" // Forcing click for this demo to make it easier to see placements
          >
            <Popover.Trigger>
              <Button size="lg" variant="outline">Target</Button>
            </Popover.Trigger>

            <Popover.Content side={currentPlacement}>
              <div className="astralis-text-sm astralis-text-center astralis-text-content-primary">
                <p>
                  extends from <strong>{currentPlacement}</strong>
                </p>
              </div>
            </Popover.Content>
          </Popover>
        </div>
      </div>
    );
  },
};
