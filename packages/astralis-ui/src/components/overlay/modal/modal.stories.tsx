import type { Meta, StoryObj } from "@storybook/react-vite";
import { Modal } from "./index";
import type { ModalProps } from "./modal.types";
import { useState } from "react";
import { Button } from "../../buttons";

/* ------------------------------------------------------------------ */
/* Meta                                                                 */
/* ------------------------------------------------------------------ */

const meta: Meta<ModalProps> = {
  title: "Components/Overlay/Modal",
  component: Modal,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component:
          "A dialog overlay component that traps focus, locks body scroll, and supports exit animations. Compose using Modal.Trigger, Modal.Overlay, Modal.Content, Modal.Header, Modal.Body, Modal.Footer, and Modal.CloseTrigger.",
      },
    },
  },
  decorators: [
    (Story) => (
      <div className="astralis-flex astralis-items-center astralis-justify-center">
        <Story />
      </div>
    ),
  ],
  argTypes: {
    size: { control: "select", options: ["xs", "sm", "md", "lg", "xl", "full"] },
    placement: { control: "select", options: ["top", "center", "bottom"] },
    motionPreset: { control: "select", options: ["scale", "slideInBottom", "none"] },
    scrollBehavior: { control: "select", options: ["inside", "outside"] },
    role: { control: "select", options: ["dialog", "alertdialog"] },
    closeOnEsc: { control: "boolean" },
    closeOnOverlayClick: { control: "boolean" },
    destroyOnClose: { control: "boolean" },
  },
};

export default meta;
type Story = StoryObj<ModalProps>;

/* ------------------------------------------------------------------ */
/* Shared wrapper                                                       */
/* ------------------------------------------------------------------ */

function Center({ children }: { children: React.ReactNode }) {
  return (
    <div className="astralis-flex astralis-w-full astralis-min-h-[200px] astralis-justify-center astralis-items-center astralis-p-10">
      {children}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Default                                                              */
/* ------------------------------------------------------------------ */

export const Default: Story = {
  render: (args) => (
    <Center>
      <Modal {...args}>
        <Modal.Trigger>
          <Button variant="outline">Open Modal</Button>
        </Modal.Trigger>
        <Modal.Overlay />
        <Modal.Content>
          <Modal.Header>
            Modal Title
            <Modal.CloseTrigger />
          </Modal.Header>
          <Modal.Body>
            <p className="astralis-text-sm astralis-text-content-secondary">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod
              tempor incididunt ut labore et dolore magna aliqua.
            </p>
          </Modal.Body>
          <Modal.Footer>
            <Button size="sm" variant="outline">Cancel</Button>
            <Button size="sm" variant="solid">Save changes</Button>
          </Modal.Footer>
        </Modal.Content>
      </Modal>
    </Center>
  ),
  args: { defaultOpen: false },
};

/* ------------------------------------------------------------------ */
/* Sizes                                                                */
/* ------------------------------------------------------------------ */

export const Sizes: Story = {
  render: () => {
    const sizes = ["xs", "sm", "md", "lg", "xl", "full"] as const;
    const [currentSize, setCurrentSize] = useState<(typeof sizes)[number]>("md");
    const [open, setOpen] = useState(false);

    return (
      <Center>
        <div className="astralis-flex astralis-gap-3 astralis-flex-wrap astralis-justify-center">
          {sizes.map((size) => (
            <Button
              key={size}
              variant="outline"
              size="sm"
              onClick={() => { setCurrentSize(size); setOpen(true); }}
            >
              {size}
            </Button>
          ))}
        </div>
        <Modal open={open} onOpenChange={setOpen} size={currentSize}>
          <Modal.Overlay />
          <Modal.Content>
            <Modal.Header>
              {currentSize === "full" ? "Full Screen" : `Size — ${currentSize}`}
              <Modal.CloseTrigger />
            </Modal.Header>
            <Modal.Body>
              <p className="astralis-text-sm astralis-text-content-secondary">
                This modal is using size=&quot;{currentSize}&quot;.
              </p>
            </Modal.Body>
            <Modal.Footer>
              <Button size="sm" variant="solid" onClick={() => setOpen(false)}>Close</Button>
            </Modal.Footer>
          </Modal.Content>
        </Modal>
      </Center>
    );
  },
};

/* ------------------------------------------------------------------ */
/* Placement                                                            */
/* ------------------------------------------------------------------ */

export const Placement: Story = {
  render: () => {
    const placements = ["top", "center", "bottom"] as const;
    const [current, setCurrent] = useState<(typeof placements)[number]>("center");
    const [open, setOpen] = useState(false);

    return (
      <Center>
        <div className="astralis-flex astralis-gap-3 astralis-flex-wrap astralis-justify-center">
          {placements.map((p) => (
            <Button
              key={p}
              variant="outline"
              size="sm"
              onClick={() => { setCurrent(p); setOpen(true); }}
            >
              {p}
            </Button>
          ))}
        </div>
        <Modal open={open} onOpenChange={setOpen} placement={current}>
          <Modal.Overlay />
          <Modal.Content>
            <Modal.Header>
              Placement — {current}
              <Modal.CloseTrigger />
            </Modal.Header>
            <Modal.Body>
              <p className="astralis-text-sm astralis-text-content-secondary">
                This modal is positioned at the {current}.
              </p>
            </Modal.Body>
            <Modal.Footer>
              <Button size="sm" variant="solid" onClick={() => setOpen(false)}>Close</Button>
            </Modal.Footer>
          </Modal.Content>
        </Modal>
      </Center>
    );
  },
};

/* ------------------------------------------------------------------ */
/* Motion Presets                                                       */
/* ------------------------------------------------------------------ */

export const MotionPresets: Story = {
  render: () => {
    const presets = ["scale", "slideInBottom", "none"] as const;
    const [current, setCurrent] = useState<(typeof presets)[number]>("scale");
    const [open, setOpen] = useState(false);

    return (
      <Center>
        <div className="astralis-flex astralis-gap-3 astralis-flex-wrap astralis-justify-center">
          {presets.map((p) => (
            <Button
              key={p}
              variant="outline"
              size="sm"
              onClick={() => { setCurrent(p); setOpen(true); }}
            >
              {p}
            </Button>
          ))}
        </div>
        <Modal open={open} onOpenChange={setOpen} motionPreset={current}>
          <Modal.Overlay />
          <Modal.Content>
            <Modal.Header>
              motionPreset=&quot;{current}&quot;
              <Modal.CloseTrigger />
            </Modal.Header>
            <Modal.Body>
              <p className="astralis-text-sm astralis-text-content-secondary">
                Open and close this modal to see the &quot;{current}&quot; animation.
              </p>
            </Modal.Body>
            <Modal.Footer>
              <Button size="sm" variant="solid" onClick={() => setOpen(false)}>Close</Button>
            </Modal.Footer>
          </Modal.Content>
        </Modal>
      </Center>
    );
  },
  parameters: {
    docs: {
      description: {
        story: "Three motion presets: `scale` (default), `slideInBottom`, and `none`. Exit animation mirrors the enter animation.",
      },
    },
  },
};

/* ------------------------------------------------------------------ */
/* Scroll Behavior — Inside                                             */
/* ------------------------------------------------------------------ */

export const ScrollBehaviorInside: Story = {
  render: (args) => (
    <Center>
      <Modal {...args}>
        <Modal.Trigger>
          <Button variant="outline">Open (scroll inside)</Button>
        </Modal.Trigger>
        <Modal.Overlay />
        <Modal.Content>
          <Modal.Header>
            Long Content List
            <Modal.CloseTrigger />
          </Modal.Header>
          <Modal.Body>
            {Array.from({ length: 20 }, (_, i) => (
              <p key={i} className="astralis-text-sm astralis-text-content-secondary astralis-py-2 astralis-border-b astralis-border-subtle">
                List item {i + 1} — this content scrolls inside the modal body while the header and footer stay visible.
              </p>
            ))}
          </Modal.Body>
          <Modal.Footer>
            <Button size="sm" variant="outline">Cancel</Button>
            <Button size="sm" variant="solid">Confirm</Button>
          </Modal.Footer>
        </Modal.Content>
      </Modal>
    </Center>
  ),
  args: { scrollBehavior: "inside", size: "md" },
  parameters: {
    docs: {
      description: {
        story: "`scrollBehavior=\"inside\"` — only Modal.Body scrolls. The Header and Footer stay sticky at the top and bottom of the panel.",
      },
    },
  },
};

/* ------------------------------------------------------------------ */
/* Destructive Confirmation (alertdialog)                               */
/* ------------------------------------------------------------------ */

export const DestructiveAction: Story = {
  render: () => {
    const [open, setOpen] = useState(false);
    const [deleted, setDeleted] = useState(false);

    return (
      <Center>
        {deleted ? (
          <p className="astralis-text-sm astralis-text-content-secondary">Account deleted.</p>
        ) : (
          <Button variant="outline" onClick={() => setOpen(true)}>
            Delete Account
          </Button>
        )}
        <Modal
          open={open}
          onOpenChange={setOpen}
          role="alertdialog"
          closeOnOverlayClick={false}
          size="sm"
        >
          <Modal.Overlay />
          <Modal.Content>
            <Modal.Header>
              Delete Account
              <Modal.CloseTrigger />
            </Modal.Header>
            <Modal.Body>
              <p className="astralis-text-sm astralis-text-content-secondary">
                Are you sure? This action <strong>cannot be undone</strong>.
                All of your data will be permanently deleted.
              </p>
            </Modal.Body>
            <Modal.Footer>
              <Button size="sm" variant="outline" onClick={() => setOpen(false)}>
                Cancel
              </Button>
              <Button
                size="sm"
                variant="solid"
                onClick={() => { setOpen(false); setDeleted(true); }}
              >
                Yes, delete
              </Button>
            </Modal.Footer>
          </Modal.Content>
        </Modal>
      </Center>
    );
  },
  parameters: {
    docs: {
      description: {
        story:
          "`role=\"alertdialog\"` is the correct ARIA role for confirmations that require a user response. `closeOnOverlayClick={false}` prevents accidental dismissal.",
      },
    },
  },
};

/* ------------------------------------------------------------------ */
/* Form Modal                                                           */
/* ------------------------------------------------------------------ */

export const FormModal: Story = {
  render: () => {
    const [open, setOpen] = useState(false);

    return (
      <Center>
        <Button variant="outline" onClick={() => setOpen(true)}>
          Edit Profile
        </Button>
        <Modal open={open} onOpenChange={setOpen} scrollBehavior="inside">
          <Modal.Overlay />
          <Modal.Content>
            <Modal.Header>
              Edit Profile
              <Modal.CloseTrigger />
            </Modal.Header>
            <Modal.Body>
              <form className="astralis-flex astralis-flex-col astralis-gap-4">
                {[
                  { label: "Display Name", type: "text", placeholder: "John Doe" },
                  { label: "Email", type: "email", placeholder: "john@example.com" },
                  { label: "Bio", type: "textarea", placeholder: "Tell us about yourself…" },
                ].map(({ label, type, placeholder }) => (
                  <div key={label} className="astralis-flex astralis-flex-col astralis-gap-1.5">
                    <label className="astralis-text-sm astralis-font-medium astralis-text-label-base">
                      {label}
                    </label>
                    {type === "textarea" ? (
                      <textarea
                        rows={3}
                        placeholder={placeholder}
                        className="astralis-w-full astralis-rounded-lg astralis-border astralis-border-subtle astralis-bg-surface-base astralis-px-3 astralis-py-2 astralis-text-sm astralis-text-content-primary astralis-outline-none focus:astralis-ring-2 focus:astralis-ring-brand-600 focus:astralis-ring-offset-2 astralis-resize-none"
                      />
                    ) : (
                      <input
                        type={type}
                        placeholder={placeholder}
                        className="astralis-w-full astralis-rounded-lg astralis-border astralis-border-subtle astralis-bg-surface-base astralis-px-3 astralis-py-2 astralis-text-sm astralis-text-content-primary astralis-outline-none focus:astralis-ring-2 focus:astralis-ring-brand-600 focus:astralis-ring-offset-2"
                      />
                    )}
                  </div>
                ))}
              </form>
            </Modal.Body>
            <Modal.Footer>
              <Button size="sm" variant="outline" onClick={() => setOpen(false)}>
                Cancel
              </Button>
              <Button size="sm" variant="solid" onClick={() => setOpen(false)}>
                Save changes
              </Button>
            </Modal.Footer>
          </Modal.Content>
        </Modal>
      </Center>
    );
  },
  parameters: {
    docs: {
      description: {
        story: "Form inside a modal with `scrollBehavior=\"inside\"` so the form scrolls while the action footer stays fixed.",
      },
    },
  },
};

/* ------------------------------------------------------------------ */
/* Close on Esc disabled                                                */
/* ------------------------------------------------------------------ */

export const CloseOnEscDisabled: Story = {
  render: (args) => (
    <Center>
      <Modal {...args}>
        <Modal.Trigger>
          <Button variant="outline">Open (Esc disabled)</Button>
        </Modal.Trigger>
        <Modal.Overlay />
        <Modal.Content>
          <Modal.Header>
            Escape is disabled
            <Modal.CloseTrigger />
          </Modal.Header>
          <Modal.Body>
            <p className="astralis-text-sm astralis-text-content-secondary">
              Pressing <kbd className="astralis-bg-surface-raised astralis-px-1.5 astralis-py-0.5 astralis-rounded astralis-text-xs astralis-font-mono">Esc</kbd> will not close this modal. Use the ✕ button or the footer action.
            </p>
          </Modal.Body>
          <Modal.Footer>
            <Button size="sm" variant="solid">Done</Button>
          </Modal.Footer>
        </Modal.Content>
      </Modal>
    </Center>
  ),
  args: { closeOnEsc: false, size: "sm" },
};

/* ------------------------------------------------------------------ */
/* Close on Overlay Click disabled                                      */
/* ------------------------------------------------------------------ */

export const CloseOnOverlayClickDisabled: Story = {
  render: (args) => (
    <Center>
      <Modal {...args}>
        <Modal.Trigger>
          <Button variant="outline">Open (overlay click disabled)</Button>
        </Modal.Trigger>
        <Modal.Overlay />
        <Modal.Content>
          <Modal.Header>
            Click outside won&apos;t close
            <Modal.CloseTrigger />
          </Modal.Header>
          <Modal.Body>
            <p className="astralis-text-sm astralis-text-content-secondary">
              Clicking the backdrop overlay will not close this modal.
            </p>
          </Modal.Body>
          <Modal.Footer>
            <Button size="sm" variant="solid">Done</Button>
          </Modal.Footer>
        </Modal.Content>
      </Modal>
    </Center>
  ),
  args: { closeOnOverlayClick: false, size: "sm" },
};

/* ------------------------------------------------------------------ */
/* No Overlay                                                           */
/* ------------------------------------------------------------------ */

export const NoOverlay: Story = {
  render: (args) => (
    <Center>
      <Modal {...args}>
        <Modal.Trigger>
          <Button variant="outline">Open (no backdrop)</Button>
        </Modal.Trigger>
        {/* No Modal.Overlay rendered */}
        <Modal.Content>
          <Modal.Header>
            No backdrop
            <Modal.CloseTrigger />
          </Modal.Header>
          <Modal.Body>
            <p className="astralis-text-sm astralis-text-content-secondary">
              This modal has no backdrop overlay — the page behind is fully visible.
            </p>
          </Modal.Body>
          <Modal.Footer>
            <Button size="sm" variant="solid">Close</Button>
          </Modal.Footer>
        </Modal.Content>
      </Modal>
    </Center>
  ),
  args: { size: "sm" },
  parameters: {
    docs: {
      description: {
        story: "Simply omit `<Modal.Overlay />` to render a modal with no dimmed backdrop.",
      },
    },
  },
};

/* ------------------------------------------------------------------ */
/* afterOpenChange callback                                             */
/* ------------------------------------------------------------------ */

export const AfterOpenChange: Story = {
  render: () => {
    const [open, setOpen] = useState(false);
    const [log, setLog] = useState<string[]>([]);

    return (
      <Center>
        <div className="astralis-flex astralis-flex-col astralis-items-center astralis-gap-4 astralis-w-full astralis-max-w-xs">
          <Button variant="outline" onClick={() => setOpen(true)}>Open Modal</Button>
          <ul className="astralis-w-full astralis-text-xs astralis-text-content-secondary astralis-space-y-1">
            {log.map((entry, i) => <li key={i} className="astralis-font-mono">{entry}</li>)}
          </ul>
        </div>
        <Modal
          open={open}
          onOpenChange={setOpen}
          afterOpenChange={(isOpen: boolean) =>
            setLog((l) => [
              ...l,
              `[${new Date().toLocaleTimeString()}] afterOpenChange(${isOpen}) — animation complete`,
            ])
          }
          size="sm"
        >
          <Modal.Overlay />
          <Modal.Content>
            <Modal.Header>
              afterOpenChange demo
              <Modal.CloseTrigger />
            </Modal.Header>
            <Modal.Body>
              <p className="astralis-text-sm astralis-text-content-secondary">
                Open and close to see the callback log below.
              </p>
            </Modal.Body>
            <Modal.Footer>
              <Button size="sm" variant="solid" onClick={() => setOpen(false)}>Close</Button>
            </Modal.Footer>
          </Modal.Content>
        </Modal>
      </Center>
    );
  },
  parameters: {
    docs: {
      description: {
        story: "`afterOpenChange` fires after the open/close animation completes, not when the open state changes.",
      },
    },
  },
};
