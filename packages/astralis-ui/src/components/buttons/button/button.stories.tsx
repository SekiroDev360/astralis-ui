import type { Meta, StoryObj } from "@storybook/react-vite";
import { Button } from "./button";
import { Icon } from "../../icon";

const meta: Meta<typeof Button> = {
  title: "Components/Buttons/Button",
  component: Button,
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: { type: "select" },
      options: ["solid", "subtle", "outline", "text", "link"],
      description: "The visual style variant of the button",
    },
    size: {
      control: { type: "select" },
      options: ["xs", "sm", "md", "lg", "xl"],
      description: "The size of the button",
    },
    rounded: {
      control: { type: "select" },
      options: ["none", "sm", "md", "lg", "xl", "2xl", "full"],
      description: "Border-radius scale of the button",
    },
    loaderPlacement: {
      control: { type: "select" },
      options: ["start", "end"],
      description: "Where the loader icon appears relative to the button label",
    },
    loader: {
      control: false,
      description: "Custom loader node — replaces the built-in spinner when loading is true",
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
    docs: {
      description: {
        component:
          "A versatile button component with multiple variants, sizes, and states.",
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Button>;

// Variant Showcase
export const VariantShowcase: Story = {
  render: () => (
    <div className="astralis:space-y-4">
      <div>
        <p className="astralis:mb-2 astralis:font-semibold">Variants</p>

        <div className="astralis:flex astralis:space-x-4">
          <Button variant="solid">Solid</Button>
          <Button variant="subtle">Subtle</Button>
          <Button variant="outline">Outline</Button>
          <Button variant="text">Text</Button>
          <Button variant="link">Link</Button>
        </div>
      </div>

      <div>
        <p className="astralis:mb-2 astralis:font-semibold">
          Disabled and Loading State
        </p>

        <div className="astralis:flex astralis:space-x-4">
          <Button variant="solid" disabled>
            Disabled
          </Button>
          <Button variant="solid" loading>
            Loading
          </Button>
        </div>
      </div>

      <div>
        <p className="astralis:font-semibold">Size</p>

        <div className="astralis:-mt-2 astralis:flex astralis:items-center astralis:space-x-4">
          <Button variant="solid" size="xs">
            Extra Small
          </Button>
          <Button variant="solid" size="sm">
            Small
          </Button>
          <Button variant="solid" size="md">
            Medium
          </Button>
          <Button variant="solid" size="lg">
            Large
          </Button>
          <Button variant="solid" size="xl">
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

// Solid Button
export const Solid: Story = {
  args: {
    children: 'Solid Button',
    variant: 'solid',
  },
  parameters: {
    docs: {
      description: {
        story: 'Solid button variant for main actions.',
      },
    },
  },
};

// Subtle Button
export const Subtle: Story = {
  args: {
    children: 'Subtle Button',
    variant: 'subtle',
  },
  parameters: {
    docs: {
      description: {
        story: 'Subtle button variant for less prominent actions.',
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

// Text Button
export const Text: Story = {
  args: {
    children: 'Text Button',
    variant: 'text',
  },
  parameters: {
    docs: {
      description: {
        story: 'Text button variant for minimal interface actions.',
      },
    },
  },
};

// Link Button
export const Link: Story = {
  args: {
    children: 'Link Button',
    variant: 'link',
  },
  parameters: {
    docs: {
      description: {
        story: 'Link button variant that acts like a hyperlink.',
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

const plusIcon = <Icon name="Plus" size="xs" />;
const arrowRightIcon = <Icon name="ArrowRight" size="xs" />;

export const LeftIcon: Story = {
  args: {
    children: 'Add Item',
    variant: 'solid',
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
    variant: 'subtle',
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
    variant: 'solid',
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

export const LoaderPlacement: Story = {
  render: () => (
    <div className="astralis:flex astralis:items-center astralis:gap-4">
      <Button loading loaderPlacement="start">Saving...</Button>
      <Button loading loaderPlacement="end">Uploading...</Button>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'Controls whether the loader icon appears before or after the button label via the loaderPlacement prop.',
      },
    },
  },
};

export const Rounded: Story = {
  render: () => (
    <div className="astralis:flex astralis:items-center astralis:flex-wrap astralis:gap-4">
      <Button rounded="none">Rounded None</Button>
      <Button rounded="sm">Rounded Small</Button>
      <Button rounded="md">Rounded Medium</Button>
      <Button rounded="lg">Rounded Large</Button>
      <Button rounded="xl">Rounded XL</Button>
      <Button rounded="2xl">Rounded 2XL</Button>
      <Button rounded="full">Rounded Full</Button>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'The rounded prop controls the border-radius of the button, independent of its size.',
      },
    },
  },
};

export const CustomLoader: Story = {
  render: () => (
    <div className="astralis:flex astralis:items-center astralis:gap-4">
      <Button
        loading
        loader={
          <svg
            className="astralis:h-4 astralis:w-4 astralis:animate-spin"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
        }
      >
        Processing
      </Button>
      <Button
        loading
        loaderPlacement="end"
        loader={
          <svg
            className="astralis:h-4 astralis:w-4 astralis:animate-spin"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
        }
      >
        Uploading
      </Button>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'Pass any ReactNode to the loader prop to replace the built-in spinner with a custom loading indicator.',
      },
    },
  },
};
