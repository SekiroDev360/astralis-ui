import type { Meta, StoryObj } from "@storybook/react-vite";
import { Plus, ArrowRight } from "lucide-react";
import { Button } from "./button";
import { Icon } from "../../icon";

const meta: Meta<typeof Button> = {
  title: "Components/Buttons/Button",
  component: Button,
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: { type: "select" },
      options: ["solid", "subtle", "surface", "outline", "text", "link"],
      description: "The visual style variant of the button",
    },
    colorScheme: {
      control: { type: "select" },
      options: ["brand", "gray", "red", "orange", "yellow", "green", "teal", "blue", "cyan", "purple", "pink"],
      description: "Hue the variant paints with (use `gray` for a neutral button)",
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
          <Button variant="surface">Surface</Button>
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

const plusIcon = <Icon as={Plus} size="xs" />;
const arrowRightIcon = <Icon as={ArrowRight} size="xs" />;

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

export const AsLink: Story = {
  render: () => (
    <div className="astralis:flex astralis:items-center astralis:gap-4">
      <Button as="a" href="https://example.com" target="_blank" rel="noreferrer" variant="solid">
        Anchor as Button
      </Button>
      <Button as="a" href="https://example.com" variant="link" rightIcon={arrowRightIcon}>
        Read the docs
      </Button>
      <Button as="a" href="https://example.com" variant="outline" disabled>
        Disabled Link
      </Button>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Button is polymorphic via the `as` prop. Rendering as an `<a>` forwards `href`/`target`; `disabled` becomes `aria-disabled` + removal from the tab order, since anchors have no native disabled state.",
      },
    },
  },
};

const SCHEMES = ["brand", "gray", "red", "orange", "yellow", "green", "teal", "blue", "cyan", "purple", "pink"] as const;

/** `colorScheme` recolours any variant to a semantic hue — `gray` is the neutral default look. */
export const ColorSchemes: Story = {
  render: () => (
    <div className="astralis:space-y-3">
      {(["solid", "subtle", "surface", "outline"] as const).map((v) => (
        <div key={v} className="astralis:flex astralis:flex-wrap astralis:items-center astralis:gap-2">
          <span className="astralis:w-16 astralis:text-sm astralis:font-mono astralis:text-label-muted">{v}</span>
          {SCHEMES.map((c) => (
            <Button key={c} variant={v} colorScheme={c} size="sm">
              {c}
            </Button>
          ))}
        </div>
      ))}
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Every variant follows `colorScheme`. Use it for semantic actions — `colorScheme=\"red\"` for destructive, `\"green\"` for confirm — and `\"gray\"` for a neutral button.",
      },
    },
  },
};

/** `surface` is the bordered sibling of `subtle` — tinted fill plus a matching border. */
export const Surface: Story = {
  args: {
    children: "Surface Button",
    variant: "surface",
  },
};

/** Semantic intents: destructive and confirm actions read instantly via hue. */
export const SemanticActions: Story = {
  render: () => (
    <div className="astralis:flex astralis:items-center astralis:gap-4">
      <Button colorScheme="red">Delete</Button>
      <Button colorScheme="red" variant="outline">Delete</Button>
      <Button colorScheme="green">Confirm</Button>
      <Button colorScheme="gray" variant="subtle">Cancel</Button>
    </div>
  ),
};

/** `loadingText` swaps the label while loading instead of just prepending a spinner. */
export const LoadingText: Story = {
  args: {
    children: "Save changes",
    loadingText: "Saving…",
    loading: true,
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
