// src/theme/Theme.stories.tsx
import type { Meta, StoryObj } from "@storybook/react-vite";
import { AstralisProvider, useTheme } from "./provider";
import { Button } from "../components";

const ThemeDemo = () => {
  const { theme, setTheme, resolvedTheme } = useTheme();

  return (
    <div className="astralis-bg-surface-base astralis-min-h-screen astralis-p-8 astralis-space-y-8">

      {/* Theme Controls */}
      <div className="astralis-bg-surface-raised astralis-border astralis-border-border astralis-rounded-xl astralis-p-6 astralis-shadow-sm">
        <h2 className="astralis-text-xl astralis-font-bold astralis-text-content-primary astralis-mb-1">
          Theme Controls
        </h2>
        <p className="astralis-text-content-secondary astralis-text-sm astralis-mb-6">
          Toggle between light, dark, and system themes.
        </p>

        <div className="astralis-flex astralis-gap-3 astralis-mb-6 astralis-flex-wrap">
          <Button
            variant={theme === "light" ? "primary" : "outline"}
            onClick={() => setTheme("light")}
            size="sm"
          >
            Light
          </Button>
          <Button
            variant={theme === "dark" ? "primary" : "outline"}
            onClick={() => setTheme("dark")}
            size="sm"
          >
            Dark
          </Button>
          <Button
            variant={theme === "system" ? "primary" : "outline"}
            onClick={() => setTheme("system")}
            size="sm"
          >
            System
          </Button>
        </div>

        <div className="astralis-bg-surface-overlay astralis-border astralis-border-border-subtle astralis-rounded-lg astralis-p-4">
          <p className="astralis-text-content-secondary astralis-text-sm">
            Selected:{" "}
            <span className="astralis-text-content-primary astralis-font-semibold">
              {theme}
            </span>
            {"  ·  "}
            Resolved:{" "}
            <span className="astralis-text-content-primary astralis-font-semibold">
              {resolvedTheme}
            </span>
          </p>
        </div>
      </div>

      {/* Color Palette */}
      <div className="astralis-bg-surface-raised astralis-border astralis-border-border astralis-rounded-xl astralis-p-6 astralis-shadow-sm">
        <h3 className="astralis-text-lg astralis-font-semibold astralis-text-content-primary astralis-mb-1">
          Brand Palette
        </h3>
        <p className="astralis-text-content-secondary astralis-text-sm astralis-mb-4">
          Primary purple scale — raw palette tokens.
        </p>
        <div className="astralis-grid astralis-grid-cols-5 astralis-gap-2">
          {[50, 100, 200, 300, 400, 500, 600, 700, 800, 900].map((shade) => (
            <div key={shade} className="astralis-space-y-1">
              <div
                className={`astralis-h-12 astralis-rounded-lg astralis-bg-primary-${shade}`}
              />
              <p className="astralis-text-content-tertiary astralis-text-xs astralis-text-center">
                {shade}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Semantic Surface Tokens */}
      <div className="astralis-bg-surface-raised astralis-border astralis-border-border astralis-rounded-xl astralis-p-6 astralis-shadow-sm">
        <h3 className="astralis-text-lg astralis-font-semibold astralis-text-content-primary astralis-mb-1">
          Semantic Surfaces
        </h3>
        <p className="astralis-text-content-secondary astralis-text-sm astralis-mb-4">
          These automatically adapt to light and dark mode.
        </p>
        <div className="astralis-grid astralis-grid-cols-2 astralis-gap-3">
          {[
            { label: "surface-base", className: "astralis-bg-surface-base" },
            { label: "surface-raised", className: "astralis-bg-surface-raised" },
            { label: "surface-overlay", className: "astralis-bg-surface-overlay" },
            { label: "surface-sunken", className: "astralis-bg-surface-sunken" },
          ].map(({ label, className }) => (
            <div
              key={label}
              className={`${className} astralis-border astralis-border-border astralis-rounded-lg astralis-p-4`}
            >
              <p className="astralis-text-content-primary astralis-text-sm astralis-font-medium">
                {label}
              </p>
              <p className="astralis-text-content-tertiary astralis-text-xs astralis-mt-1">
                bg-{label}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Semantic Content / Text Tokens */}
      <div className="astralis-bg-surface-raised astralis-border astralis-border-border astralis-rounded-xl astralis-p-6 astralis-shadow-sm">
        <h3 className="astralis-text-lg astralis-font-semibold astralis-text-content-primary astralis-mb-1">
          Semantic Content
        </h3>
        <p className="astralis-text-content-secondary astralis-text-sm astralis-mb-4">
          Text color tokens that flip automatically.
        </p>
        <div className="astralis-space-y-3">
          <p className="astralis-text-content-primary astralis-text-base astralis-font-medium">
            content-primary — Main headings and body
          </p>
          <p className="astralis-text-content-secondary astralis-text-base">
            content-secondary — Supporting text and labels
          </p>
          <p className="astralis-text-content-tertiary astralis-text-base">
            content-tertiary — Placeholders and hints
          </p>
          <p className="astralis-text-content-disabled astralis-text-base">
            content-disabled — Disabled states
          </p>
          <div className="astralis-bg-primary-600 astralis-rounded-lg astralis-p-3 astralis-inline-block">
            <p className="astralis-text-content-inverse astralis-text-base astralis-font-medium">
              content-inverse — Text on brand backgrounds
            </p>
          </div>
        </div>
      </div>

      {/* Status Colors */}
      <div className="astralis-bg-surface-raised astralis-border astralis-border-border astralis-rounded-xl astralis-p-6 astralis-shadow-sm">
        <h3 className="astralis-text-lg astralis-font-semibold astralis-text-content-primary astralis-mb-1">
          Status Colors
        </h3>
        <p className="astralis-text-content-secondary astralis-text-sm astralis-mb-4">
          Semantic status — success, warning, error.
        </p>
        <div className="astralis-grid astralis-grid-cols-3 astralis-gap-3">
          <div className="astralis-bg-success-100 astralis-border astralis-border-success-300 astralis-rounded-lg astralis-p-4">
            <p className="astralis-text-success-700 astralis-font-semibold astralis-text-sm">
              Success
            </p>
            <p className="astralis-text-success-600 astralis-text-xs astralis-mt-1">
              Operation completed
            </p>
          </div>
          <div className="astralis-bg-warning-100 astralis-border astralis-border-warning-300 astralis-rounded-lg astralis-p-4">
            <p className="astralis-text-warning-700 astralis-font-semibold astralis-text-sm">
              Warning
            </p>
            <p className="astralis-text-warning-600 astralis-text-xs astralis-mt-1">
              Needs attention
            </p>
          </div>
          <div className="astralis-bg-error-100 astralis-border astralis-border-error-300 astralis-rounded-lg astralis-p-4">
            <p className="astralis-text-error-700 astralis-font-semibold astralis-text-sm">
              Error
            </p>
            <p className="astralis-text-error-600 astralis-text-xs astralis-mt-1">
              Something went wrong
            </p>
          </div>
        </div>
      </div>

      {/* Token Override Demo */}
      <div className="astralis-bg-surface-raised astralis-border astralis-border-border astralis-rounded-xl astralis-p-6 astralis-shadow-sm">
        <h3 className="astralis-text-lg astralis-font-semibold astralis-text-content-primary astralis-mb-1">
          Token Override
        </h3>
        <p className="astralis-text-content-secondary astralis-text-sm astralis-mb-4">
          Consumers can override the brand color via the{" "}
          <code className="astralis-text-primary-600 astralis-bg-surface-overlay astralis-px-1 astralis-rounded astralis-text-xs">
            tokens
          </code>{" "}
          prop on{" "}
          <code className="astralis-text-primary-600 astralis-bg-surface-overlay astralis-px-1 astralis-rounded astralis-text-xs">
            AstralisProvider
          </code>
          .
        </p>
        <AstralisProvider tokens={{ primaryColor: "#e11d48" }}>
          <div className="astralis-flex astralis-gap-3">
            <Button variant="primary" size="sm">
              Overridden Primary
            </Button>
            <Button variant="outline" size="sm">
              Outline
            </Button>
          </div>
        </AstralisProvider>
      </div>
    </div>
  );
};

const meta: Meta<typeof ThemeDemo> = {
  title: "Theme/Theme Demo",
  component: ThemeDemo,
  decorators: [
    (Story) => (
      <AstralisProvider>
        <Story />
      </AstralisProvider>
    ),
  ],
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component:
          "Interactive theme demo showcasing the Astralis design token system — brand palette, semantic surfaces, content tokens, and runtime overrides.",
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof ThemeDemo>;

export const Default: Story = {};

export const ForcedLight: Story = {
  decorators: [
    (Story) => (
      <AstralisProvider defaultTheme="light">
        <Story />
      </AstralisProvider>
    ),
  ],
};

export const ForcedDark: Story = {
  decorators: [
    (Story) => (
      <AstralisProvider defaultTheme="dark">
        <Story />
      </AstralisProvider>
    ),
  ],
};