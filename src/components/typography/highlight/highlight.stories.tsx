import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { Highlight } from "./highlight";
import { AstralisProvider } from "../../../theme";

const meta: Meta<typeof Highlight> = {
  title: "Components/Typography/Highlight",
  component: Highlight,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Highlight is used to spotlight, emphasize, and accentuate substrings within text. " +
          "Pass a `query` string (or array of strings) and the matching portions will be wrapped in a `<mark>` element.",
      },
    },
  },
  decorators: [
    (Story) => (
      <AstralisProvider>
        <div className="astralis-p-6 astralis-max-w-lg">
          <Story />
        </div>
      </AstralisProvider>
    ),
  ],
};
export default meta;
type Story = StoryObj<typeof Highlight>;

/* ── Default ──────────────────────────────────────────────────────── */
export const Default: Story = {
  args: {
    query: "design system",
    children: "The design system helps teams build consistent UIs faster.",
  },
  parameters: {
    docs: {
      description: {
        story:
          "Pass a `query` string — matching substrings are highlighted with a yellow tint by default.",
      },
    },
  },
};

/* ── Multiple Queries ────────────────────────────────────────────── */
export const Multiple: Story = {
  render: () => (
    <div className="astralis-flex astralis-flex-col astralis-gap-3 astralis-text-base astralis-leading-relaxed">
      <Highlight query={["spotlight", "emphasize", "accentuate"]}>
        With the Highlight component, you can spotlight, emphasize and
        accentuate important words in your text.
      </Highlight>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Pass an array of strings to `query` to highlight multiple substrings at once.",
      },
    },
  },
};

/* ── Custom Style ────────────────────────────────────────────────── */
export const CustomStyle: Story = {
  render: () => (
    <div className="astralis-flex astralis-flex-col astralis-gap-4 astralis-text-base astralis-leading-relaxed">
      <Highlight
        query="React"
        styles={{
          backgroundColor: "rgba(99, 102, 241, 0.2)",
          borderRadius: "4px",
          padding: "0 3px",
          color: "rgb(67, 56, 202)",
          fontWeight: 600,
        }}
      >
        React makes it painless to create interactive UIs.
      </Highlight>
      <Highlight
        query="components"
        styles={{
          backgroundColor: "rgba(16, 185, 129, 0.15)",
          borderRadius: "4px",
          padding: "0 3px",
          color: "rgb(4, 120, 87)",
          borderBottom: "2px solid rgb(16, 185, 129)",
        }}
      >
        Build encapsulated components that manage their own state.
      </Highlight>
      <Highlight
        query="data"
        styles={{
          backgroundColor: "rgba(239, 68, 68, 0.15)",
          borderRadius: "4px",
          padding: "0 3px",
          color: "rgb(185, 28, 28)",
          fontStyle: "italic",
        }}
      >
        Pass data through your app using props and state.
      </Highlight>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Use the `styles` prop to fully customize the `<mark>` element's appearance.",
      },
    },
  },
};

/* ── Search Query ────────────────────────────────────────────────── */
export const SearchQuery: Story = {
  render: () => {
    const ITEMS = [
      "Spotlight bulb",
      "Spot cleaner",
      "Spot ceiling",
      "Desk lamp",
      "Floor spotlight",
      "Neon strip light",
    ];

    const [query, setQuery] = useState("spot");

    return (
      <div className="astralis-flex astralis-flex-col astralis-gap-4">
        <div className="astralis-flex astralis-items-center astralis-gap-2">
          <label className="astralis-text-sm astralis-font-medium astralis-text-content-secondary">
            Search:
          </label>
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="astralis-border astralis-border-border-subtle astralis-rounded astralis-px-2 astralis-py-1 astralis-text-sm astralis-focus:outline-none"
            placeholder="Type to search…"
          />
        </div>
        <ul className="astralis-flex astralis-flex-col astralis-gap-1">
          {ITEMS.filter((item) =>
            item.toLowerCase().includes(query.toLowerCase()),
          ).map((item) => (
            <li
              key={item}
              className="astralis-px-3 astralis-py-2 astralis-rounded astralis-text-sm astralis-bg-surface-raised astralis-border astralis-border-border-subtle"
            >
              <Highlight query={query}>{item}</Highlight>
            </li>
          ))}
        </ul>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story:
          "Live search filtering with matching terms highlighted — a real-world pattern.",
      },
    },
  },
};

/* ── Case Insensitive ────────────────────────────────────────────── */
export const CaseInsensitive: Story = {
  render: () => (
    <div className="astralis-flex astralis-flex-col astralis-gap-2 astralis-text-base">
      <p className="astralis-text-xs astralis-text-content-secondary astralis-mb-2">
        query=&quot;REACT&quot; — matches regardless of case
      </p>
      <Highlight query="REACT">
        React is a JavaScript library for building user interfaces. Using React,
        you can create reusable UI components.
      </Highlight>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Matching is always case-insensitive — `REACT`, `react`, and `React` are all treated the same.",
      },
    },
  },
};
