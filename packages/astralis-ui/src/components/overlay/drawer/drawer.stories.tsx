import type { Meta, StoryObj } from "@storybook/react-vite";
import { Drawer } from "./index";
import type { DrawerProps } from "./drawer.types";
import { Button } from "../../buttons/button";
import { useState } from "react";

/* ------------------------------------------------------------------ */
/* Meta                                                                 */
/* ------------------------------------------------------------------ */

const meta: Meta<DrawerProps> = {
  title: "Components/Overlay/Drawer",
  component: Drawer,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component:
          "A panel that slides in from any edge of the screen. Compose using Drawer.Trigger, Drawer.Overlay, Drawer.Content, Drawer.Header, Drawer.Body, Drawer.Footer, Drawer.CloseTrigger, and Drawer.Description.",
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
    side: { control: "select", options: ["left", "right", "top", "bottom"] },
    size: { control: "select", options: ["xs", "sm", "md", "lg", "xl", "full"] },
    closeOnEsc: { control: "boolean" },
    closeOnOverlayClick: { control: "boolean" },
    destroyOnClose: { control: "boolean" },
    loading: { control: "boolean" },
  },
};

export default meta;
type Story = StoryObj<DrawerProps>;

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
      <Drawer {...args}>
        <Drawer.Trigger>
          <Button variant="outline">Open Drawer</Button>
        </Drawer.Trigger>
        <Drawer.Overlay />
        <Drawer.Content>
          <Drawer.Header>
            Default Drawer
            <Drawer.CloseTrigger />
          </Drawer.Header>
          <Drawer.Body>
            <p className="astralis-text-sm astralis-text-content-secondary">
              This is the default drawer. It slides in from the right and has a
              smooth slide-out animation when closed.
            </p>
          </Drawer.Body>
          <Drawer.Footer>
            <Button size="sm" variant="outline">Cancel</Button>
            <Button size="sm" variant="solid">Save</Button>
          </Drawer.Footer>
        </Drawer.Content>
      </Drawer>
    </Center>
  ),
  args: { side: "right", defaultOpen: false },
};

/* ------------------------------------------------------------------ */
/* Sizes                                                                */
/* ------------------------------------------------------------------ */

export const Sizes: Story = {
  render: () => {
    const sizes = ["xs", "sm", "md", "lg", "xl", "full"] as const;
    const [current, setCurrent] = useState<(typeof sizes)[number]>("md");
    const [open, setOpen] = useState(false);

    return (
      <Center>
        <div className="astralis-flex astralis-gap-3 astralis-flex-wrap astralis-justify-center">
          {sizes.map((s) => (
            <Button key={s} variant="outline" size="sm"
              onClick={() => { setCurrent(s); setOpen(true); }}>
              {s}
            </Button>
          ))}
        </div>
        <Drawer open={open} onOpenChange={setOpen} size={current} side="right">
          <Drawer.Overlay />
          <Drawer.Content>
            <Drawer.Header>
              Size — {current}
              <Drawer.CloseTrigger />
            </Drawer.Header>
            <Drawer.Body>
              <p className="astralis-text-sm astralis-text-content-secondary">
                Using size=&quot;{current}&quot;.
              </p>
            </Drawer.Body>
            <Drawer.Footer>
              <Button size="sm" variant="solid" onClick={() => setOpen(false)}>Close</Button>
            </Drawer.Footer>
          </Drawer.Content>
        </Drawer>
      </Center>
    );
  },
};

/* ------------------------------------------------------------------ */
/* All 4 Placements                                                     */
/* ------------------------------------------------------------------ */

export const Placement: Story = {
  render: () => {
    const sides = ["right", "left", "bottom", "top"] as const;
    const [current, setCurrent] = useState<(typeof sides)[number]>("right");
    const [open, setOpen] = useState(false);

    return (
      <Center>
        <div className="astralis-flex astralis-gap-3 astralis-flex-wrap astralis-justify-center">
          {sides.map((s) => (
            <Button key={s} variant="outline" size="sm"
              onClick={() => { setCurrent(s); setOpen(true); }}>
              {s}
            </Button>
          ))}
        </div>
        <Drawer open={open} onOpenChange={setOpen} side={current}>
          <Drawer.Overlay />
          <Drawer.Content>
            <Drawer.Header>
              {current.charAt(0).toUpperCase() + current.slice(1)} Drawer
              <Drawer.CloseTrigger />
            </Drawer.Header>
            <Drawer.Body>
              <p className="astralis-text-sm astralis-text-content-secondary">
                Slides in from the {current}.
              </p>
            </Drawer.Body>
          </Drawer.Content>
        </Drawer>
      </Center>
    );
  },
};

/* ------------------------------------------------------------------ */
/* Custom Width / Height                                                */
/* ------------------------------------------------------------------ */

export const CustomWidth: Story = {
  render: () => {
    const [open, setOpen] = useState(false);

    return (
      <Center>
        <Button variant="outline" onClick={() => setOpen(true)}>
          Open (custom width: 45%)
        </Button>
        <Drawer open={open} onOpenChange={setOpen} side="right" width="45%">
          <Drawer.Overlay />
          <Drawer.Content>
            <Drawer.Header>
              Custom Width (45%)
              <Drawer.CloseTrigger />
            </Drawer.Header>
            <Drawer.Body>
              <p className="astralis-text-sm astralis-text-content-secondary">
                This drawer uses <code className="astralis-bg-surface-raised astralis-px-1 astralis-rounded">width=&quot;45%&quot;</code>{" "}
                instead of a named size, giving you precise CSS control.
              </p>
            </Drawer.Body>
          </Drawer.Content>
        </Drawer>
      </Center>
    );
  },
  parameters: {
    docs: {
      description: {
        story: "Pass `width` (for left/right drawers) or `height` (for top/bottom drawers) with any CSS value to override the named `size`.",
      },
    },
  },
};

/* ------------------------------------------------------------------ */
/* With Navigation Menu                                                 */
/* ------------------------------------------------------------------ */

export const WithNavigationMenu: Story = {
  render: () => {
    const [open, setOpen] = useState(false);
    const navItems = [
      { label: "Dashboard", icon: "🏠" },
      { label: "Projects", icon: "📁" },
      { label: "Team", icon: "👥" },
      { label: "Analytics", icon: "📊" },
      { label: "Settings", icon: "⚙️" },
    ];

    return (
      <Center>
        <Button variant="outline" onClick={() => setOpen(true)}>
          ☰ Open Navigation
        </Button>
        <Drawer open={open} onOpenChange={setOpen} side="left" size="xs">
          <Drawer.Overlay />
          <Drawer.Content>
            <Drawer.Header>
              My App
              <Drawer.CloseTrigger />
            </Drawer.Header>
            <Drawer.Body>
              <nav className="astralis-flex astralis-flex-col astralis-gap-1">
                {navItems.map(({ label, icon }) => (
                  <button
                    key={label}
                    type="button"
                    onClick={() => setOpen(false)}
                    className="astralis-flex astralis-items-center astralis-gap-3 astralis-px-3 astralis-py-2.5 astralis-rounded-lg astralis-text-sm astralis-text-content-primary hover:astralis-bg-surface-muted astralis-transition-colors astralis-text-left astralis-cursor-pointer astralis-w-full"
                  >
                    <span>{icon}</span>
                    {label}
                  </button>
                ))}
              </nav>
            </Drawer.Body>
          </Drawer.Content>
        </Drawer>
      </Center>
    );
  },
  parameters: {
    docs: {
      description: {
        story: "A left-side navigation drawer — a common pattern for mobile and sidebar navigation.",
      },
    },
  },
};

/* ------------------------------------------------------------------ */
/* With Form                                                            */
/* ------------------------------------------------------------------ */

export const WithForm: Story = {
  render: () => {
    const [open, setOpen] = useState(false);

    return (
      <Center>
        <Button variant="outline" onClick={() => setOpen(true)}>
          Create New Item
        </Button>
        <Drawer open={open} onOpenChange={setOpen} side="right">
          <Drawer.Overlay />
          <Drawer.Content>
            <Drawer.Header>
              Create New Item
              <Drawer.CloseTrigger />
            </Drawer.Header>
            <Drawer.Description>
              Fill in the details below to create a new item.
            </Drawer.Description>
            <Drawer.Body>
              <form className="astralis-flex astralis-flex-col astralis-gap-4">
                {[
                  { label: "Name", type: "text", placeholder: "Item name" },
                  { label: "Category", type: "text", placeholder: "e.g. Design" },
                  { label: "Description", type: "textarea", placeholder: "Describe this item…" },
                ].map(({ label, type, placeholder }) => (
                  <div key={label} className="astralis-flex astralis-flex-col astralis-gap-1.5">
                    <label className="astralis-text-sm astralis-font-medium astralis-text-label-base">{label}</label>
                    {type === "textarea" ? (
                      <textarea
                        rows={4}
                        placeholder={placeholder}
                        className="astralis-w-full astralis-rounded-lg astralis-border astralis-border-subtle astralis-bg-surface-base astralis-px-3 astralis-py-2 astralis-text-sm astralis-text-content-primary astralis-outline-none focus:astralis-ring-2 focus:astralis-ring-brand-600 astralis-resize-none"
                      />
                    ) : (
                      <input
                        type={type}
                        placeholder={placeholder}
                        className="astralis-w-full astralis-rounded-lg astralis-border astralis-border-subtle astralis-bg-surface-base astralis-px-3 astralis-py-2 astralis-text-sm astralis-text-content-primary astralis-outline-none focus:astralis-ring-2 focus:astralis-ring-brand-600"
                      />
                    )}
                  </div>
                ))}
              </form>
            </Drawer.Body>
            <Drawer.Footer>
              <Button size="sm" variant="outline" onClick={() => setOpen(false)}>Cancel</Button>
              <Button size="sm" variant="solid" onClick={() => setOpen(false)}>Create</Button>
            </Drawer.Footer>
          </Drawer.Content>
        </Drawer>
      </Center>
    );
  },
  parameters: {
    docs: {
      description: {
        story: "Drawer with a form, Drawer.Description, and a sticky footer — uses Drawer.Body for the scrollable form area.",
      },
    },
  },
};

/* ------------------------------------------------------------------ */
/* Loading State                                                        */
/* ------------------------------------------------------------------ */

export const Loading: Story = {
  render: () => {
    const [open, setOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const handleOpen = () => {
      setIsLoading(true);
      setOpen(true);
      setTimeout(() => setIsLoading(false), 2000);
    };

    return (
      <Center>
        <Button variant="outline" onClick={handleOpen}>
          Open (2s skeleton)
        </Button>
        <Drawer open={open} onOpenChange={setOpen} loading={isLoading}>
          <Drawer.Overlay />
          <Drawer.Content>
            <Drawer.Header>
              User Profile
              <Drawer.CloseTrigger />
            </Drawer.Header>
            <Drawer.Body>
              <p className="astralis-text-sm astralis-text-content-secondary">
                Content loaded successfully!
              </p>
            </Drawer.Body>
          </Drawer.Content>
        </Drawer>
      </Center>
    );
  },
  parameters: {
    docs: {
      description: {
        story: "`loading={true}` renders a skeleton placeholder while async content is fetching. The real children render once `loading` becomes `false`.",
      },
    },
  },
};

/* ------------------------------------------------------------------ */
/* Close on Esc Disabled                                                */
/* ------------------------------------------------------------------ */

export const CloseOnEscDisabled: Story = {
  render: (args) => (
    <Center>
      <Drawer {...args}>
        <Drawer.Trigger>
          <Button variant="outline">Open (Esc disabled)</Button>
        </Drawer.Trigger>
        <Drawer.Overlay />
        <Drawer.Content>
          <Drawer.Header>
            Escape disabled
            <Drawer.CloseTrigger />
          </Drawer.Header>
          <Drawer.Body>
            <p className="astralis-text-sm astralis-text-content-secondary">
              Pressing <kbd className="astralis-bg-surface-raised astralis-px-1.5 astralis-py-0.5 astralis-rounded astralis-text-xs astralis-font-mono">Esc</kbd> will not close this drawer.
            </p>
          </Drawer.Body>
        </Drawer.Content>
      </Drawer>
    </Center>
  ),
  args: { closeOnEsc: false, size: "sm" },
};

/* ------------------------------------------------------------------ */
/* Close on Overlay Click Disabled                                      */
/* ------------------------------------------------------------------ */

export const CloseOnOverlayClickDisabled: Story = {
  render: (args) => (
    <Center>
      <Drawer {...args}>
        <Drawer.Trigger>
          <Button variant="outline">Open (overlay click disabled)</Button>
        </Drawer.Trigger>
        <Drawer.Overlay />
        <Drawer.Content>
          <Drawer.Header>
            Overlay click disabled
            <Drawer.CloseTrigger />
          </Drawer.Header>
          <Drawer.Body>
            <p className="astralis-text-sm astralis-text-content-secondary">
              Clicking the backdrop overlay will not close this drawer.
            </p>
          </Drawer.Body>
        </Drawer.Content>
      </Drawer>
    </Center>
  ),
  args: { closeOnOverlayClick: false, size: "sm" },
};
