import type { Meta, StoryObj } from "@storybook/react-vite";
import { Drawer } from "./index";
import { Button } from "../../buttons/button";
import { useState } from "react";

const meta: Meta<typeof Drawer> = {
  title: "Components/Overlay/Drawer",
  component: Drawer,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component:
          "Used to render a content that slides in from the side of the screen.",
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
    side: {
      control: "select",
      options: ["left", "right", "top", "bottom"],
      description: "Side from which the drawer appears",
    },
    onOpenChange: {
      action: "openChange",
    },
  },
};

export default meta;
type Story = StoryObj<typeof Drawer>;

export const Default: Story = {
  args: {
    defaultOpen: false,
    side: "right",
  },
  render: (args) => (
    <div className="astralis-flex astralis-w-full astralis-justify-center astralis-p-10">
      <Drawer {...args}>
        <Drawer.Trigger>
          <Button variant="outline">Open Drawer</Button>
        </Drawer.Trigger>

        <Drawer.Overlay />

        <Drawer.Content>
          <Drawer.Header>Default Drawer</Drawer.Header>

          <div className="astralis-h-full astralis-w-full astralis-max-w-md astralis-p-6 astralis-flex astralis-flex-col">
            <div className="astralis-flex-1">
              <p className="astralis-text-sm">
                This drawer manages its own open state.
              </p>
            </div>
          </div>

          <Drawer.Footer>
            <Button
              size="sm"
              variant="outline"
              onClick={() => args.onOpenChange?.(false)}
            >
              Cancel
            </Button>
            <Button size="sm" variant="primary">
              Save
            </Button>
          </Drawer.Footer>
        </Drawer.Content>
      </Drawer>
    </div>
  ),
};

export const Sizes: Story = {
  render: () => {
    const sizes = ["xs", "sm", "md", "lg", "xl", "full"] as const;
    const [currentSize, setCurrentSize] =
      useState<(typeof sizes)[number]>("md");
    const [open, setOpen] = useState(false);

    return (
      <div className="astralis-flex astralis-w-full astralis-justify-center astralis-gap-4 astralis-p-10 astralis-flex-wrap">
        {sizes.map((size) => (
          <Button
            variant="outline"
            key={size}
            onClick={() => {
              setCurrentSize(size);
              setOpen(true);
            }}
          >
            Open ({size})
          </Button>
        ))}

        <Drawer
          open={open}
          onOpenChange={setOpen}
          size={currentSize}
          side="right"
        >
          <Drawer.Overlay />
          <Drawer.Content>
            <Drawer.Header>
              {currentSize === "full"
                ? "Full Screen"
                : `${currentSize.toUpperCase()} Size`}{" "}
              Drawer
            </Drawer.Header>

            <div className="astralis-h-full astralis-w-full astralis-p-6 astralis-flex astralis-flex-col">
              <div className="astralis-flex-1">
                <p className="astralis-text-sm astralis-text-content-secondary">
                  This drawer is using the{" "}
                  <code className="astralis-bg-surface-raised astralis-p-1 astralis-rounded">
                    {currentSize}
                  </code>{" "}
                  size.
                </p>
              </div>
            </div>

            <Drawer.Footer>
              <Drawer.Close>
                <Button size="sm" variant="primary">
                  Close
                </Button>
              </Drawer.Close>
            </Drawer.Footer>
          </Drawer.Content>
        </Drawer>
      </div>
    );
  },
};

export const Placement: Story = {
  render: () => {
    const placements = ["top", "right", "bottom", "left"] as const;
    const [currentPlacement, setCurrentPlacement] =
      useState<(typeof placements)[number]>("right");
    const [open, setOpen] = useState(false);

    return (
      <div className="astralis-flex astralis-w-full astralis-justify-center astralis-gap-4 astralis-p-10 astralis-flex-wrap">
        {placements.map((placement) => (
          <Button
            variant="outline"
            key={placement}
            onClick={() => {
              setCurrentPlacement(placement);
              setOpen(true);
            }}
          >
            Open ({placement})
          </Button>
        ))}

        <Drawer open={open} onOpenChange={setOpen} side={currentPlacement}>
          <Drawer.Overlay />

          <Drawer.Content>
            <Drawer.Header>
              {currentPlacement.charAt(0).toUpperCase() +
                currentPlacement.slice(1)}{" "}
              Drawer
            </Drawer.Header>

            <div className="astralis-h-full astralis-w-full astralis-p-6 astralis-flex astralis-flex-col">
              <div className="astralis-flex-1">
                <p className="astralis-text-sm astralis-text-content-secondary">
                  This drawer slides in from the {currentPlacement}.
                </p>
              </div>
            </div>

            <Drawer.Footer>
              <Drawer.Close>
                <Button size="sm" variant="primary">Close</Button>
              </Drawer.Close>
            </Drawer.Footer>
          </Drawer.Content>
        </Drawer>
      </div>
    );
  },
};
