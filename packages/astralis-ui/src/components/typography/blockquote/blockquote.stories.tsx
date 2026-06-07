import type { Meta, StoryObj } from "@storybook/react-vite";
import {
  BlockquoteRoot,
  BlockquoteContent,
  BlockquoteCaption,
  BlockquoteIcon,
} from "./index";

const meta: Meta = {
  title: "Components/Typography/Blockquote",
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Blockquote is used to quote text content from an external source. " +
          "Compose `Blockquote.Root`, `Blockquote.Content`, `Blockquote.Caption`, and `Blockquote.Icon` " +
          "to build rich testimonial and pull-quote layouts.",
      },
    },
  },
  decorators: [
    (Story) => (
      <div className="astralis-flex astralis-items-center astralis-justify-center">
        <div className="astralis-p-6 astralis-w-[560px]">
          <Story />
        </div>
      </div>
    ),
  ],
};
export default meta;
type Story = StoryObj;

/* ── Default ──────────────────────────────────────────────────────── */
export const Default: Story = {
  render: () => (
    <BlockquoteRoot>
      <BlockquoteContent>
        The only way to do great work is to love what you do. If you haven't
        found it yet, keep looking. Don't settle.
      </BlockquoteContent>
    </BlockquoteRoot>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Default Blockquote with `subtle` variant and `gray` color scheme.",
      },
    },
  },
};

/* ── With Cite ───────────────────────────────────────────────────── */
export const WithCite: Story = {
  render: () => (
    <BlockquoteRoot>
      <BlockquoteContent cite="https://en.wikipedia.org/wiki/Steve_Jobs">
        Innovation distinguishes between a leader and a follower.
      </BlockquoteContent>
      <BlockquoteCaption>
        — <cite>Steve Jobs</cite>
      </BlockquoteCaption>
    </BlockquoteRoot>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Add `Blockquote.Caption` with a `<cite>` element to attribute the quote source.",
      },
    },
  },
};

/* ── Variants ────────────────────────────────────────────────────── */
export const Variants: Story = {
  render: () => (
    <div className="astralis-flex astralis-flex-col astralis-gap-4">
      {(["subtle", "solid", "plain"] as const).map((variant) => (
        <BlockquoteRoot key={variant} variant={variant} colorScheme="brand">
          <BlockquoteContent>
            Design is not just what it looks like and feels like. Design is how
            it works.
          </BlockquoteContent>
          <BlockquoteCaption>
            — <cite>Steve Jobs</cite> · variant=&ldquo;{variant}&rdquo;
          </BlockquoteCaption>
        </BlockquoteRoot>
      ))}
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "`subtle` — left border with tinted background. `solid` — filled coloured bg. `plain` — no border or bg.",
      },
    },
  },
};

/* ── Color Schemes ───────────────────────────────────────────────── */
export const ColorSchemes: Story = {
  render: () => (
    <div className="astralis-flex astralis-flex-col astralis-gap-4">
      {(["gray", "brand", "success", "warning", "danger", "info"] as const).map(
        (colorScheme) => (
          <BlockquoteRoot key={colorScheme} colorScheme={colorScheme}>
            <BlockquoteContent>
              Be the change you wish to see in the world.
            </BlockquoteContent>
            <BlockquoteCaption>
              — <cite>Mahatma Gandhi</cite> · colorScheme=&ldquo;{colorScheme}
              &rdquo;
            </BlockquoteCaption>
          </BlockquoteRoot>
        ),
      )}
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Six color schemes available: `gray`, `brand`, `success`, `warning`, `danger`, `info`.",
      },
    },
  },
};

/* ── Justify ─────────────────────────────────────────────────────── */
export const Justify: Story = {
  render: () => (
    <div className="astralis-flex astralis-flex-col astralis-gap-4">
      {(["start", "center", "end"] as const).map((justify) => (
        <BlockquoteRoot key={justify} justify={justify} colorScheme="brand">
          <BlockquoteContent>
            In the middle of difficulty lies opportunity.
          </BlockquoteContent>
          <BlockquoteCaption>
            — <cite>Albert Einstein</cite> · justify=&ldquo;{justify}&rdquo;
          </BlockquoteCaption>
        </BlockquoteRoot>
      ))}
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Control alignment with `justify`: `start` (default), `center`, or `end`.",
      },
    },
  },
};

/* ── With Icon ───────────────────────────────────────────────────── */
export const WithIcon: Story = {
  render: () => (
    <BlockquoteRoot colorScheme="brand" variant="subtle">
      <BlockquoteIcon />
      <BlockquoteContent>
        The best way to predict the future is to invent it.
      </BlockquoteContent>
      <BlockquoteCaption>
        — <cite>Alan Kay</cite>
      </BlockquoteCaption>
    </BlockquoteRoot>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Add `Blockquote.Icon` before the content for a decorative double-quote mark. Pass custom children to use a custom icon.",
      },
    },
  },
};

/* ── Testimonial ─────────────────────────────────────────────────── */
export const Testimonial: Story = {
  render: () => (
    <div className="astralis-flex astralis-flex-col astralis-gap-4">
      {[
        {
          quote:
            "The design system has saved us hundreds of hours. The component quality is exceptional.",
          author: "Sarah Chen",
          role: "Lead Designer, Acme Corp",
          color: "brand" as const,
        },
        {
          quote:
            "We shipped our product three times faster using this library. Highly recommended.",
          author: "Marcos Oliveira",
          role: "CTO, StartupXYZ",
          color: "success" as const,
        },
        {
          quote:
            "Accessibility is built-in from the ground up. That alone makes it worth using.",
          author: "Priya Nair",
          role: "Principal Engineer, Fintech Ltd",
          color: "info" as const,
        },
      ].map(({ quote, author, role, color }) => (
        <BlockquoteRoot key={author} colorScheme={color} variant="subtle">
          <BlockquoteIcon />
          <BlockquoteContent>{quote}</BlockquoteContent>
          <BlockquoteCaption>
            <span className="astralis-font-semibold">{author}</span>
            <span className="astralis-mx-1">·</span>
            <span>{role}</span>
          </BlockquoteCaption>
        </BlockquoteRoot>
      ))}
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Real-world testimonial layout using icon, content, and caption composition.",
      },
    },
  },
};
