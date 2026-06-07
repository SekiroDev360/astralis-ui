import React from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { Pagination } from "./index";

/* ------------------------------------------------------------------ */
/* Meta                                                                 */
/* ------------------------------------------------------------------ */
const meta: Meta<typeof Pagination> = {
  title: "Components/Disclosure/Pagination",
  component: Pagination,
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: { type: "select" },
      options: ["solid", "outline", "subtle", "plain"],
      description: "Visual style applied to every page item",
    },
    size: {
      control: { type: "select" },
      options: ["xs", "sm", "md", "lg"],
      description: "Size of every page item and control button",
    },
    rounded: {
      control: { type: "select" },
      options: ["none", "sm", "md", "lg", "xl", "2xl", "full"],
      description: "Border-radius applied to every page item",
    },
    disabled: {
      control: { type: "boolean" },
      description: "Disables the entire pagination control",
    },
    totalPages: {
      control: { type: "number" },
      description: "Total number of pages",
    },
    defaultPage: {
      control: { type: "number" },
      description: "Initial page when uncontrolled",
    },
  },
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "A flexible compound pagination component with variants, sizes, rounded control, first/last jump buttons, sibling + boundary configuration, and full keyboard/screen-reader accessibility.",
      },
    },
  },
  decorators: [
    (Story) => (
      <div className="astralis-flex astralis-items-center astralis-justify-center astralis-p-4">
        <Story />
      </div>
    ),
  ],
};
export default meta;
type Story = StoryObj<typeof Pagination>;
/* ------------------------------------------------------------------ */
/* Helper: standard Pages layout                                        */
/* ------------------------------------------------------------------ */
const DefaultLayout = (
  args: Omit<React.ComponentProps<typeof Pagination>, "children">,
) => (
  <Pagination {...args}>
    <Pagination.List>
      <Pagination.Prev />
      <Pagination.Pages />
      <Pagination.Next />
    </Pagination.List>
  </Pagination>
);
/* ------------------------------------------------------------------ */
/* Variant Showcase                                                     */
/* ------------------------------------------------------------------ */
export const VariantShowcase: Story = {
  render: () => (
    <div className="astralis-flex astralis-flex-col astralis-gap-6">
      {(["solid", "outline", "subtle", "plain"] as const).map((variant) => (
        <div
          key={variant}
          className="astralis-flex astralis-flex-col astralis-gap-1.5"
        >
          <p className="astralis-text-sm astralis-font-semibold astralis-capitalize astralis-text-label-muted">
            {variant}
          </p>
          <DefaultLayout totalPages={10} defaultPage={5} variant={variant} />
        </div>
      ))}
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "All four variants side-by-side — solid (default), outline, subtle, and plain.",
      },
    },
  },
};
/* ------------------------------------------------------------------ */
/* Individual variants                                                  */
/* ------------------------------------------------------------------ */
export const Solid: Story = {
  render: (args) => <DefaultLayout {...args} />,
  args: {
    totalPages: 10,
    defaultPage: 5,
    variant: "solid",
  },
  parameters: {
    docs: {
      description: {
        story: "Solid variant — active page is filled with the brand colour.",
      },
    },
  },
};
export const Outline: Story = {
  render: (args) => <DefaultLayout {...args} />,
  args: {
    totalPages: 10,
    defaultPage: 5,
    variant: "outline",
  },
  parameters: {
    docs: {
      description: {
        story:
          "Outline variant — active page shows a brand-coloured border instead of a filled background.",
      },
    },
  },
};
export const Subtle: Story = {
  render: (args) => <DefaultLayout {...args} />,
  args: {
    totalPages: 10,
    defaultPage: 5,
    variant: "subtle",
  },
  parameters: {
    docs: {
      description: {
        story:
          "Subtle variant — active page uses the surface-subtle background with a base border.",
      },
    },
  },
};
export const Plain: Story = {
  render: (args) => <DefaultLayout {...args} />,
  args: {
    totalPages: 10,
    defaultPage: 5,
    variant: "plain",
  },
  parameters: {
    docs: {
      description: {
        story:
          "Plain variant — no backgrounds or borders; active page is indicated by brand colour and font weight only.",
      },
    },
  },
};
/* ------------------------------------------------------------------ */
/* Sizes                                                                */
/* ------------------------------------------------------------------ */
export const SizeShowcase: Story = {
  render: () => (
    <div className="astralis-flex astralis-flex-col astralis-gap-5">
      {(["xs", "sm", "md", "lg"] as const).map((size) => (
        <div
          key={size}
          className="astralis-flex astralis-flex-col astralis-gap-1.5"
        >
          <p className="astralis-text-sm astralis-font-semibold astralis-uppercase astralis-text-label-muted">
            {size}
          </p>
          <DefaultLayout totalPages={10} defaultPage={3} size={size} />
        </div>
      ))}
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "All four sizes — xs, sm, md (default), lg.",
      },
    },
  },
};
/* ------------------------------------------------------------------ */
/* Rounded                                                              */
/* ------------------------------------------------------------------ */
export const RoundedShowcase: Story = {
  render: () => (
    <div className="astralis-flex astralis-flex-col astralis-gap-5">
      {(["none", "sm", "md", "lg", "xl", "2xl", "full"] as const).map(
        (rounded) => (
          <div
            key={rounded}
            className="astralis-flex astralis-flex-col astralis-gap-1.5"
          >
            <p className="astralis-text-sm astralis-font-semibold astralis-text-label-muted">
              rounded=&quot;{rounded}&quot;
            </p>
            <DefaultLayout totalPages={7} defaultPage={4} rounded={rounded} />
          </div>
        ),
      )}
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "All rounded values — from none to full (pill).",
      },
    },
  },
};
/* ------------------------------------------------------------------ */
/* Disabled                                                             */
/* ------------------------------------------------------------------ */
export const Disabled: Story = {
  render: (args) => <DefaultLayout {...args} />,
  args: {
    totalPages: 10,
    defaultPage: 5,
    disabled: true,
  },
  parameters: {
    docs: {
      description: {
        story:
          "When disabled={true} the entire control is inert — all buttons are visually dimmed and non-interactive.",
      },
    },
  },
};
/* ------------------------------------------------------------------ */
/* First & Last buttons                                                 */
/* ------------------------------------------------------------------ */
export const WithFirstAndLast: Story = {
  render: (args) => (
    <Pagination {...args}>
      <Pagination.List>
        <Pagination.First />
        <Pagination.Prev />
        <Pagination.Pages />
        <Pagination.Next />
        <Pagination.Last />
      </Pagination.List>
    </Pagination>
  ),
  args: {
    totalPages: 20,
    defaultPage: 10,
  },
  parameters: {
    docs: {
      description: {
        story:
          "Adding Pagination.First and Pagination.Last gives dedicated jump-to-start and jump-to-end buttons. Each auto-disables at the boundary.",
      },
    },
  },
};
/* ------------------------------------------------------------------ */
/* Siblings                                                             */
/* ------------------------------------------------------------------ */
export const SiblingsShowcase: Story = {
  render: () => (
    <div className="astralis-flex astralis-flex-col astralis-gap-5">
      {[0, 1, 2, 3].map((siblings) => (
        <div
          key={siblings}
          className="astralis-flex astralis-flex-col astralis-gap-1.5"
        >
          <p className="astralis-text-sm astralis-font-semibold astralis-text-label-muted">
            siblings={siblings}
          </p>
          <Pagination totalPages={20} defaultPage={10}>
            <Pagination.List>
              <Pagination.Prev />
              <Pagination.Pages siblings={siblings} />
              <Pagination.Next />
            </Pagination.List>
          </Pagination>
        </div>
      ))}
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "The siblings prop controls how many page buttons appear on each side of the active page.",
      },
    },
  },
};
/* ------------------------------------------------------------------ */
/* Boundary Count                                                       */
/* ------------------------------------------------------------------ */
export const BoundaryCountShowcase: Story = {
  render: () => (
    <div className="astralis-flex astralis-flex-col astralis-gap-5">
      {[1, 2, 3].map((boundaryCount) => (
        <div
          key={boundaryCount}
          className="astralis-flex astralis-flex-col astralis-gap-1.5"
        >
          <p className="astralis-text-sm astralis-font-semibold astralis-text-label-muted">
            boundaryCount={boundaryCount}
          </p>
          <Pagination totalPages={20} defaultPage={10}>
            <Pagination.List>
              <Pagination.Prev />
              <Pagination.Pages boundaryCount={boundaryCount} />
              <Pagination.Next />
            </Pagination.List>
          </Pagination>
        </div>
      ))}
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "The boundaryCount prop controls how many pages are always pinned at the start and end of the range.",
      },
    },
  },
};
/* ------------------------------------------------------------------ */
/* Many Pages                                                           */
/* ------------------------------------------------------------------ */
export const ManyPages: Story = {
  render: (args) => <DefaultLayout {...args} />,
  args: {
    totalPages: 100,
    defaultPage: 50,
  },
  parameters: {
    docs: {
      description: {
        story:
          "100 pages with default siblings=1 and boundaryCount=1 showing the ellipsis logic at scale.",
      },
    },
  },
};
/* ------------------------------------------------------------------ */
/* Few Pages (no ellipsis)                                              */
/* ------------------------------------------------------------------ */
export const FewPages: Story = {
  render: (args) => <DefaultLayout {...args} />,
  args: {
    totalPages: 5,
    defaultPage: 3,
  },
  parameters: {
    docs: {
      description: {
        story:
          "When total pages fit within the window, ellipsis is omitted and all pages are shown directly.",
      },
    },
  },
};
/* ------------------------------------------------------------------ */
/* Custom Icons on Controls                                             */
/* ------------------------------------------------------------------ */
export const CustomControlIcons: Story = {
  render: (args) => (
    <Pagination {...args}>
      <Pagination.List>
        <Pagination.First
          icon={<span className="astralis-text-xs astralis-font-bold">«</span>}
        />
        <Pagination.Prev
          icon={<span className="astralis-text-xs astralis-font-bold">‹</span>}
        />
        <Pagination.Pages />
        <Pagination.Next
          icon={<span className="astralis-text-xs astralis-font-bold">›</span>}
        />
        <Pagination.Last
          icon={<span className="astralis-text-xs astralis-font-bold">»</span>}
        />
      </Pagination.List>
    </Pagination>
  ),
  args: {
    totalPages: 10,
    defaultPage: 5,
  },
  parameters: {
    docs: {
      description: {
        story:
          "Pass any ReactNode to the icon prop of Prev, Next, First, and Last to replace the default chevrons.",
      },
    },
  },
};
/* ------------------------------------------------------------------ */
/* Pill Rounded + Large (Design Highlight)                              */
/* ------------------------------------------------------------------ */
export const PillLarge: Story = {
  render: (args) => <DefaultLayout {...args} />,
  args: {
    totalPages: 10,
    defaultPage: 5,
    rounded: "full",
    size: "lg",
    variant: "solid",
  },
  parameters: {
    docs: {
      description: {
        story:
          'rounded="full" + size="lg" for a pill-shaped, prominent pagination bar.',
      },
    },
  },
};
/* ------------------------------------------------------------------ */
/* Compact (xs + plain + no first/last)                                 */
/* ------------------------------------------------------------------ */
export const Compact: Story = {
  render: (args) => <DefaultLayout {...args} />,
  args: {
    totalPages: 10,
    defaultPage: 3,
    size: "xs",
    variant: "plain",
    rounded: "sm",
  },
  parameters: {
    docs: {
      description: {
        story:
          "xs size with plain variant for a minimal, space-efficient pagination bar.",
      },
    },
  },
};
