import type { Meta, StoryObj } from "@storybook/react-vite";
import { Modal } from "./index";
import { useState } from "react";
import { Button } from "../../buttons";

const meta: Meta<typeof Modal> = {
  title: "Components/Overlay/Modal",
  component: Modal,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component: "Used to display a modal dialog box",
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
    onOpenChange: {
      action: "openChange",
    },
  },
};

export default meta;

type Story = StoryObj<typeof Modal>;

export const Default: Story = {
  args: {
    defaultOpen: false,
  },
  render: (args) => (
    <div className="astralis-flex astralis-w-full astralis-justify-center astralis-p-10">
      <Modal {...args}>
        <Modal.Trigger>
          <Button variant="outline">Open Modal</Button>
        </Modal.Trigger>

        <Modal.Overlay />

        <Modal.Content>
          <Modal.Header>Modal Title</Modal.Header>

          <div className="astralis-p-4 astralis-flex-1">
            <p className="astralis-text-sm astralis-text-content-secondary">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </p>
          </div>

          <Modal.Footer>
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
          </Modal.Footer>
        </Modal.Content>
      </Modal>
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

        <Modal open={open} onOpenChange={setOpen} size={currentSize}>
          <Modal.Overlay />
          <Modal.Content>
            <Modal.Header>
              {currentSize === "full"
                ? "Full Screen"
                : `${currentSize.toUpperCase()} Size`}{" "}
              Modal
            </Modal.Header>

            <div className="astralis-p-4 astralis-flex-1">
              <p className="astralis-text-sm astralis-text-content-secondary">
                This modal is using the{" "}
                <code className="astralis-bg-surface-raised astralis-p-1 astralis-rounded">
                  {currentSize}
                </code>{" "}
                size.
              </p>
            </div>

            <Modal.Footer>
              <Button
                onClick={() => setOpen(false)}
                size="sm"
                variant="primary"
              >
                Close
              </Button>
            </Modal.Footer>
          </Modal.Content>
        </Modal>
      </div>
    );
  },
};

export const Placement: Story = {
  render: () => {
    const placements = ["top", "center", "bottom"] as const;
    const [currentPlacement, setCurrentPlacement] =
      useState<(typeof placements)[number]>("center");
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

        <Modal open={open} onOpenChange={setOpen} placement={currentPlacement}>
          <Modal.Overlay />
          <Modal.Content>
            <Modal.Header>
              {currentPlacement.charAt(0).toUpperCase() +
                currentPlacement.slice(1)}{" "}
              Modal
            </Modal.Header>

            <div className="astralis-p-4 astralis-flex-1">
              <p className="astralis-text-sm astralis-text-content-secondary">
                This modal is positioned at the {currentPlacement}.
              </p>
            </div>

            <Modal.Footer>
              <Button
                onClick={() => setOpen(false)}
                size="sm"
                variant="primary"
              >
                Close
              </Button>
            </Modal.Footer>
          </Modal.Content>
        </Modal>
      </div>
    );
  },
};
