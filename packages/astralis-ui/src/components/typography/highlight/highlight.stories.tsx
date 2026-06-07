import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { Highlight } from "./highlight";

const meta: Meta<typeof Highlight> = {
  title: "Components/Typography/Highlight",
  component: Highlight,
  tags: ["autodocs"],
  argTypes: {
    color: {
      control: { type: "select" },
      options: ["warning", "error", "success", "info", "muted", "subtle"],
      description: "The semantic theme color state for the highlight mark.",
    },
    ignoreCase: {
      control: { type: "boolean" },
      description: "If true, matching is case-insensitive.",
    },
    matchAll: {
      control: { type: "boolean" },
      description:
        "If true, matches all instances of the query. If false, matches only the first.",
    },
    exactMatch: {
      control: { type: "boolean" },
      description: "If true, matches only whole words.",
    },
  },
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
        <div className="astralis-flex astralis-items-center astralis-justify-center">
          <Story />
        </div>
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
          "Pass a `query` string — matching substrings are highlighted with warning-colored semantic tokens by default.",
      },
    },
  },
};
/* ── Colors ───────────────────────────────────────────────────────── */
export const Colors: Story = {
  render: () => (
    <div className="astralis-flex astralis-flex-col astralis-gap-4 astralis-text-base">
      <div>
        <p className="astralis-text-xs astralis-text-content-secondary astralis-mb-1">
          color = &quot;warning&quot; (default)
        </p>
        <Highlight query="warning" color="warning">
          This is a warning alert text.
        </Highlight>
      </div>
      <div>
        <p className="astralis-text-xs astralis-text-content-secondary astralis-mb-1">
          color = &quot;error&quot;
        </p>
        <Highlight query="error" color="error">
          This is an error alert text.
        </Highlight>
      </div>
      <div>
        <p className="astralis-text-xs astralis-text-content-secondary astralis-mb-1">
          color = &quot;success&quot;
        </p>
        <Highlight query="success" color="success">
          This is a success alert text.
        </Highlight>
      </div>
      <div>
        <p className="astralis-text-xs astralis-text-content-secondary astralis-mb-1">
          color = &quot;info&quot;
        </p>
        <Highlight query="info" color="info">
          This is an info alert text.
        </Highlight>
      </div>
      <div>
        <p className="astralis-text-xs astralis-text-content-secondary astralis-mb-1">
          color = &quot;muted&quot;
        </p>
        <Highlight query="muted" color="muted">
          This is a muted alert text.
        </Highlight>
      </div>
      <div>
        <p className="astralis-text-xs astralis-text-content-secondary astralis-mb-1">
          color = &quot;subtle&quot;
        </p>
        <Highlight query="subtle" color="subtle">
          This is a subtle alert text.
        </Highlight>
      </div>
    </div>
  ),
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
          "Use the `styles` prop to fully customize the `<mark>` element's inline style appearance.",
      },
    },
  },
};
/* ── Case Sensitivity ────────────────────────────────────────────── */
export const CaseSensitivity: Story = {
  render: () => (
    <div className="astralis-flex astralis-flex-col astralis-gap-4 astralis-text-base">
      <div>
        <p className="astralis-text-xs astralis-text-content-secondary astralis-mb-1">
          ignoreCase = true (default matches React, REACT, and react)
        </p>
        <Highlight query="REACT" ignoreCase={true}>
          React is a JavaScript library for building user interfaces. Learning
          REACT is fun!
        </Highlight>
      </div>
      <div>
        <p className="astralis-text-xs astralis-text-content-secondary astralis-mb-1">
          ignoreCase = false (only matches case-exact 'REACT')
        </p>
        <Highlight query="REACT" ignoreCase={false}>
          React is a JavaScript library for building user interfaces. Learning
          REACT is fun!
        </Highlight>
      </div>
    </div>
  ),
};
/* ── Exact Matching ────────────────────────────────────────────────── */
export const ExactMatching: Story = {
  render: () => (
    <div className="astralis-flex astralis-flex-col astralis-gap-4 astralis-text-base">
      <div>
        <p className="astralis-text-xs astralis-text-content-secondary astralis-mb-1">
          exactMatch = false (matches 'spot' inside spotlight)
        </p>
        <Highlight query="spot" exactMatch={false}>
          Let's spotlight the search term or find a spot on the map.
        </Highlight>
      </div>
      <div>
        <p className="astralis-text-xs astralis-text-content-secondary astralis-mb-1">
          exactMatch = true (only matches standalone 'spot')
        </p>
        <Highlight query="spot" exactMatch={true}>
          Let's spotlight the search term or find a spot on the map.
        </Highlight>
      </div>
    </div>
  ),
};
/* ── Match All ─────────────────────────────────────────────────────── */
export const MatchAll: Story = {
  render: () => (
    <div className="astralis-flex astralis-flex-col astralis-gap-4 astralis-text-base">
      <div>
        <p className="astralis-text-xs astralis-text-content-secondary astralis-mb-1">
          matchAll = true (default highlights all matches)
        </p>
        <Highlight query="design" matchAll={true}>
          Good design is obvious. Great design is transparent.
        </Highlight>
      </div>
      <div>
        <p className="astralis-text-xs astralis-text-content-secondary astralis-mb-1">
          matchAll = false (only highlights the first match)
        </p>
        <Highlight query="design" matchAll={false}>
          Good design is obvious. Great design is transparent.
        </Highlight>
      </div>
    </div>
  ),
};
/* ── Live Search Query ────────────────────────────────────────────── */
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
            className="astralis-border astralis-border-subtle astralis-rounded astralis-px-2 astralis-py-1 astralis-text-sm astralis-focus:outline-none"
            placeholder="Type to search…"
          />
        </div>
        <ul className="astralis-flex astralis-flex-col astralis-gap-1">
          {ITEMS.filter((item) =>
            item.toLowerCase().includes(query.toLowerCase()),
          ).map((item) => (
            <li
              key={item}
              className="astralis-px-3 astralis-py-2 astralis-rounded astralis-text-sm astralis-bg-surface-raised astralis-border astralis-border-subtle"
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
