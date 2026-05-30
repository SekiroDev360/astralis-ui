import type { Meta, StoryObj } from "@storybook/react-vite";
import {
  Plus,
  Loader2,
  Check,
  X,
  Menu,
  Search,
  ChevronDown,
  Home,
  Settings,
  User,
} from "lucide-react";
import { AstralisProvider } from "../../theme";
import Icon from "./icon";

const meta: Meta<typeof Icon> = {
  title: "Components/Icons/Icon",
  component: Icon,
  tags: ["autodocs"],
  argTypes: {
    name: {
      control: { type: "select" },
      options: [
        "Plus",
        "Loader2",
        "Check",
        "X",
        "Menu",
        "Search",
        "ChevronDown",
        "Home",
        "Settings",
        "User",
      ],
    },
    size: {
      control: { type: "select" },
      options: ["xs", "sm", "md", "lg", "xl", 32],
    },
    strokeWidth: { control: { type: "range", min: 1, max: 4, step: 0.5 } },
  },
  decorators: [
    (Story) => (
      <AstralisProvider>
        <div className="astralis-p-8 astralis-bg-white dark:astralis-bg-secondary-900">
          <Story />
        </div>
      </AstralisProvider>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof Icon>;

export const Showcase: Story = {
  render: () => (
    <div className="astralis-space-y-8">
      <div>
        <h3 className="astralis-text-lg astralis-font-semibold astralis-mb-4">
          Available Sizes
        </h3>
        <div className="astralis-flex astralis-items-end astralis-gap-6">
          <div className="astralis-text-center">
            <Icon name="Home" size="xs" />
            <p className="astralis-mt-1 astralis-text-xs">xs (16px)</p>
          </div>
          <div className="astralis-text-center">
            <Icon name="Home" size="sm" />
            <p className="astralis-mt-1 astralis-text-xs">sm (20px)</p>
          </div>
          <div className="astralis-text-center">
            <Icon name="Home" size="md" />
            <p className="astralis-mt-1 astralis-text-xs">md (24px)</p>
          </div>
          <div className="astralis-text-center">
            <Icon name="Home" size="lg" />
            <p className="astralis-mt-1 astralis-text-xs">lg (32px)</p>
          </div>
          <div className="astralis-text-center">
            <Icon name="Home" size="xl" />
            <p className="astralis-mt-1 astralis-text-xs">xl (40px)</p>
          </div>
        </div>
      </div>

      <div>
        <h3 className="astralis-text-lg astralis-font-semibold astralis-mb-4">
          Common Icons
        </h3>
        <div className="astralis-grid astralis-grid-cols-6 astralis-gap-6">
          {[
            Plus,
            Check,
            X,
            Menu,
            Search,
            ChevronDown,
            Home,
            Settings,
            User,
            Loader2,
          ].map((LucideIcon) => (
            <div key={LucideIcon.displayName} className="astralis-text-center">
              <LucideIcon size={28} className="astralis-mx-auto astralis-mb-2" />
              <p className="astralis-text-xs astralis-text-secondary-600">
                {LucideIcon.displayName?.replace("Icon", "")}
              </p>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h3 className="astralis-text-lg astralis-font-semibold astralis-mb-4">
          Usage with Wrapper
        </h3>
        <div className="astralis-flex astralis-items-center astralis-gap-4 astralis-p-4 astralis-bg-secondary-50 astralis-rounded-lg">
          <Icon name="Search" size="lg" className="astralis-text-primary-600" />
          <code className="astralis-text-sm">
            &lt;Icon name=&quot;Search&quot; size=&quot;lg&quot; /&gt;
          </code>
        </div>
      </div>
    </div>
  ),
};

export const Spinner: Story = {
  args: {
    name: "Loader2",
    size: "md",
    className: "astralis-animate-spin",
  },
};