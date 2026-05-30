import type { Meta, StoryObj } from "@storybook/react-vite";
import { Button } from "./button";
import { AstralisProvider } from "../../../theme";

const meta: Meta<typeof Button> = {
  title: "Components/Buttons/Button",
  component: Button,
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: { type: "select" },
      options: ["primary", "secondary", "outline", "ghost", "danger"],
      description: "The visual style variant of the button",
    },
    size: {
      control: { type: "select" },
      options: ["xs", "sm", "md", "lg", "xl"],
      description: "The size of the button",
    },
    disabled: {
      control: { type: "boolean" },
      description: "Whether the button is disabled",
    },
    loading: {
      control: { type: "boolean" },
      description: "Whether the button shows a loading state",
    },
    onClick: {
      action: "clicked",
      description: "Callback when the button is clicked",
    },
    children: {
      control: { type: "text" },
      description: "Button content",
    },
    fullWidth: {
      control: { type: "boolean" },
      description: "Whether the button spans the full width of its container",
    },
  },
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "A versatile button component with multiple variants, sizes, and states.",
      },
    },
  },
  decorators: [
    (Story) => (
      <AstralisProvider>
        <div style={{ padding: "2rem" }}>
          <Story />
        </div>
      </AstralisProvider>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof Button>;

// Variant Showcase
export const VariantShowcase: Story = {
  render: () => (
    <div className="astralis-space-y-4">
      <div>
        <p className="astralis-mb-2 astralis-font-semibold">Variants</p>

        <div className="astralis-flex astralis-space-x-4">
          <Button variant="primary">Primary</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="outline">Outline</Button>
          <Button variant="ghost">Ghost</Button>
          <Button variant="danger">Danger</Button>
        </div>
      </div>

      <div>
        <p className="astralis-mb-2 astralis-font-semibold">
          Disabled and Loading State
        </p>

        <div className="astralis-flex astralis-space-x-4">
          <Button variant="primary" disabled>
            Disabled
          </Button>
          <Button variant="primary" loading>
            Loading
          </Button>
        </div>
      </div>

      <div>
        <p className="astralis-font-semibold">Size</p>

        <div className="-astralis-mt-2 astralis-flex astralis-items-center astralis-space-x-4">
          <Button variant="primary" size="xs">
            Extra Small
          </Button>
          <Button variant="primary" size="sm">
            Small
          </Button>
          <Button variant="primary" size="md">
            Medium
          </Button>
          <Button variant="primary" size="lg">
            Large
          </Button>
          <Button variant="primary" size="xl">
            Extra Large
          </Button>
        </div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Showcase of all button variants, sizes, and states in one view.",
      },
    },
  },
};

// Primary Button
export const Primary: Story = {
  args: {
    children: 'Primary Button',
    variant: 'primary',
  },
  parameters: {
    docs: {
      description: {
        story: 'Primary button variant for main actions.',
      },
    },
  },
};

// Secondary Button
export const Secondary: Story = {
  args: {
    children: 'Secondary Button',
    variant: 'secondary',
  },
  parameters: {
    docs: {
      description: {
        story: 'Secondary button variant for less prominent actions.',
      },
    },
  },
};

// Outline Button
export const Outline: Story = {
  args: {
    children: 'Outline Button',
    variant: 'outline',
  },
  parameters: {
    docs: {
      description: {
        story: 'Outline button variant for subtle actions.',
      },
    },
  },
};

// Ghost Button
export const Ghost: Story = {
  args: {
    children: 'Ghost Button',
    variant: 'ghost',
  },
  parameters: {
    docs: {
      description: {
        story: 'Ghost button variant for minimal interface actions.',
      },
    },
  },
};

// Danger Button
export const Danger: Story = {
  args: {
    children: 'Danger Button',
    variant: 'danger',
  },
  parameters: {
    docs: {
      description: {
        story: 'Danger button variant for destructive actions.',
      },
    },
  },
};

// Sizes
export const ExtraSmall: Story = {
  args: {
    children: "Extra Small Button",
    size: "xs",
  },
  parameters: {
    docs: {
      description: {
        story: "Extra small size button for compact interfaces.",
      },
    },
  },
};

export const Small: Story = {
  args: {
    children: "Small Button",
    size: "sm",
  },
  parameters: {
    docs: {
      description: {
        story: "Small size button for compact interfaces.",
      },
    },
  },
};

export const Medium: Story = {
  args: {
    children: "Medium Button",
    size: "md",
  },
  parameters: {
    docs: {
      description: {
        story: "Medium size button (default).",
      },
    },
  },
};

export const Large: Story = {
  args: {
    children: "Large Button",
    size: "lg",
  },
  parameters: {
    docs: {
      description: {
        story: "Large size button for prominent actions.",
      },
    },
  },
};

export const ExtraLarge: Story = {
  args: {
    children: "Extra Large Button",
    size: "xl",
  },
  parameters: {
    docs: {
      description: {
        story: "Extra large size button for prominent actions.",
      },
    },
  },
};

// States
export const Disabled: Story = {
  args: {
    children: 'Disabled Button',
    disabled: true,
  },
  parameters: {
    docs: {
      description: {
        story: 'Disabled button state for unavailable actions.',
      },
    },
  },
};

export const Loading: Story = {
  args: {
    children: 'Loading Button',
    loading: true,
  },
  parameters: {
    docs: {
      description: {
        story: 'Loading button state for asynchronous actions.',
      },
    },
  },
};

// Interactive Examples
const plusIcon = (
  <svg
    className="astralis-w-4 astralis-h-4"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M12 6v6m0 0v6m0-6h6m-6 0H6"
    />
  </svg>
);

const arrowRightIcon = (
  <svg
    className="astralis-w-4 astralis-h-4"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M14 5l7 7m0 0l-7 7m7-7H3"
    />
  </svg>
);

export const LeftIcon: Story = {
  args: {
    children: 'Add Item',
    variant: 'primary',
    leftIcon: plusIcon,
  },
  parameters: {
    docs: {
      description: {
        story: 'Button with an integrated leftIcon prop.',
      },
    },
  },
};

export const RightIcon: Story = {
  args: {
    children: 'Next Step',
    variant: 'outline',
    rightIcon: arrowRightIcon,
  },
  parameters: {
    docs: {
      description: {
        story: 'Button with an integrated rightIcon prop.',
      },
    },
  },
};

export const IconOnly: Story = {
  args: {
    variant: 'secondary',
    leftIcon: plusIcon,
  },
  parameters: {
    docs: {
      description: {
        story: 'Icon-only button demonstrating dynamic square sizing when children are absent.',
      },
    },
  },
};

export const FullWidth: Story = {
  args: {
    children: 'Block Action Button',
    variant: 'primary',
    fullWidth: true,
  },
  parameters: {
    docs: {
      description: {
        story: 'Full-width button layout for block level alignment.',
      },
    },
  },
};