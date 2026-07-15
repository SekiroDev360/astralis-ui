/**
 * Tier 0 of the Astralis Assistant: hand-curated answers matched in the
 * browser. Free, instant, and — because a human wrote them — often better
 * than a model's answer for the questions people actually ask.
 *
 * Growing this bank is the "promotion loop": when Tier 1 (the model) keeps
 * seeing the same question, its answer gets polished by hand and added here.
 *
 * Answers are markdown (the subset rendered by assistant/markdown.tsx:
 * paragraphs, `inline code`, ``` fences, [links](), **bold**, - lists).
 */

export interface Tier0Entry {
  id: string;
  /** Phrases a user might type — matched loosely, see match.ts. */
  aliases: string[];
  answer: string;
}

export const TIER0: Tier0Entry[] = [
  {
    // Bare identity questions ("what is astralis?") hit the brand-token
    // fast-path in match.ts — these aliases catch the wordier phrasings.
    // Every alias must keep ≥2 content tokens: "what is astralis" reduces to
    // just [astralis], which would match ANY question mentioning the library.
    id: "what-is",
    aliases: [
      "tell me about astralis",
      "explain astralis",
      "astralis overview",
      "introduction to astralis",
      "about this library",
    ],
    answer: `**Astralis UI** is a React 19 component library built on semantic design tokens — **62 components** that ship as precompiled CSS with zero build tooling required in your app.

What makes it different:

- **Runtime brand theming** — hand the provider one hex and a full palette is derived with OKLCH color math
- **First-class dark mode** — semantic tokens flip per theme, everything is dark-ready automatically
- **\`colorScheme\` everywhere** — eleven palettes through one CSS-variable accent channel
- **Responsive style props** — \`p={{ base: "4", md: "8" }}\` on every layout primitive

Start at the [Introduction](/docs) or jump to [Installation](/docs/installation).`,
  },
  {
    id: "install",
    aliases: [
      "how do i install astralis",
      "installation",
      "install the library",
      "add astralis to my project",
      "npm install",
      "getting started setup",
    ],
    answer: `Three steps — no build tooling needed:

\`\`\`bash
pnpm add astralis-ui   # or npm / yarn
\`\`\`

\`\`\`tsx
import { AstralisProvider } from "astralis-ui";
import "astralis-ui/styles.css"; // once, at your entry point

<AstralisProvider defaultTheme="system">
  {children}
</AstralisProvider>
\`\`\`

Requires React 19. Full framework recipes (Next.js, Vite): [Installation guide](/docs/installation).`,
  },
  {
    id: "brand-color",
    aliases: [
      "change the brand color",
      "custom brand color",
      "use my own color",
      "recolor the library",
      "set primary color",
      "brand theming",
    ],
    answer: `Hand the provider one hex and the whole library repaints at runtime — shades, hover states and a readable text color are derived with OKLCH color math:

\`\`\`tsx
<AstralisProvider tokens={{ brandColor: "#8b5cf6" }}>
  <App />
</AstralisProvider>
\`\`\`

No rebuild, no config file. Try it live on the [Theming page](/docs/theming).`,
  },
  {
    id: "dark-mode",
    aliases: [
      "dark mode",
      "enable dark theme",
      "toggle theme",
      "light and dark switch",
      "how does theming switch work",
    ],
    answer: `Dark mode is built in. The provider tracks the OS preference with \`defaultTheme="system"\` and persists the user's choice. To give users a control, drop in the ready-made [Theme Toggle](/docs/components/theme-toggle), or wire your own:

\`\`\`tsx
const { resolvedTheme, setTheme } = useTheme();
setTheme(resolvedTheme === "dark" ? "light" : "dark");
\`\`\`

Anything built from Astralis components is dark-ready automatically — components paint with semantic tokens that flip per theme. Details: [Theming](/docs/theming).`,
  },
  {
    id: "color-scheme",
    aliases: [
      "colorscheme prop",
      "what color schemes are available",
      "change component color",
      "make a button green",
      "available hues palettes",
    ],
    answer: `Every themeable component takes a \`colorScheme\` prop with eleven palettes:

\`brand\`, \`gray\`, \`red\`, \`orange\`, \`yellow\`, \`green\`, \`teal\`, \`blue\`, \`cyan\`, \`purple\`, \`pink\`

\`\`\`tsx
<Button colorScheme="teal">Confirm</Button>
<Badge colorScheme="green">Active</Badge>
\`\`\`

It works through a CSS-variable accent channel, so no per-hue CSS ships. How it works: [Theming](/docs/theming) · [Colors](/docs/colors).`,
  },
  {
    id: "responsive",
    aliases: [
      "responsive props",
      "breakpoints",
      "different styles on mobile",
      "media queries",
      "responsive design",
    ],
    answer: `Every style prop accepts a breakpoint map — mobile-first, resolved to precompiled classes with zero runtime cost:

\`\`\`tsx
<Box p={{ base: "4", md: "8" }} />
<Flex direction={{ base: "column", md: "row" }} />
\`\`\`

Breakpoints: \`sm\` 640px · \`md\` 768px · \`lg\` 1024px · \`xl\` 1280px. Full guide: [Responsive Props](/docs/responsive).`,
  },
  {
    id: "style-props",
    aliases: [
      "style props",
      "styling components",
      "padding margin props",
      "how do i style a box",
      "css in props",
    ],
    answer: `Layout primitives (Box, Flex, Stack, Grid…) expose the design scale as typed props:

\`\`\`tsx
<Box p="6" bg="subtle" rounded="xl" shadow="sm" maxW="md" />
\`\`\`

Values autocomplete in your editor and anything off-scale is a type error. Higher-level components (Button, Card…) are styled via \`variant\`/\`size\`/\`colorScheme\` instead. Guide: [Style Props](/docs/style-props).`,
  },
  {
    id: "styling-compat",
    aliases: [
      "use with tailwind",
      "does it work with tailwind",
      "tailwind conflict",
      "do i need tailwind",
      "tailwind setup required",
      "conflict with my styles",
      "css conflict",
      "will it clash with my css",
      "works with my styling setup",
    ],
    answer: `Astralis ships **precompiled CSS** — no plugins, no theme compiler, no build tooling required in your app.

It also coexists with whatever styling setup you already have (utility frameworks, CSS Modules, plain CSS): every internal class is namespaced under an \`astralis:\` prefix, so nothing can collide, and your own classes work in \`className\` on any component. Details: [Installation](/docs/installation).`,
  },
  {
    id: "components-list",
    aliases: [
      "what components are there",
      "list of components",
      "how many components",
      "does it have a datepicker",
      "available components",
    ],
    answer: `**62 components across 9 categories** — buttons, layout, typography, data entry (Input → Combobox), overlays (Modal, Drawer, Popover, Tooltip, Menu), data display (Table, Calendar, Avatar…), feedback (Toast, Alert, Progress, Skeleton, Spinner), navigation and disclosure.

Browse them all in the [component docs](/docs) — every page has live demos with source. (DatePicker is on the roadmap; Calendar already exists.)`,
  },
  {
    id: "override-tokens",
    aliases: [
      "override design tokens",
      "change border radius globally",
      "customize spacing",
      "custom fonts",
      "change default styles",
    ],
    answer: `Every token is a documented CSS variable — retune the system globally with plain CSS, no build step:

\`\`\`css
:root {
  --astralis-border-radius-lg: 0.75rem;
  --astralis-font-heading: "Fraunces", serif;
  --astralis-duration-moderate: 150ms;
}
\`\`\`

The full scale reference is on [Design Tokens](/docs/tokens); color overrides have a light/dark subtlety covered in [Theming](/docs/theming).`,
  },
  {
    id: "forms",
    aliases: [
      "form integration",
      "select in a form",
      "formdata submit",
      "native form support",
      "form validation labels",
    ],
    answer: `All inputs work with native forms — Select, MultiSelect and Combobox take a \`name\` prop and render hidden inputs, so \`FormData\` sees them like any native field.

For labels, help and error text, wrap controls in [Field](/docs/components/field) — it wires \`aria-describedby\` and ids automatically:

\`\`\`tsx
<Field required>
  <Field.Label>Email</Field.Label>
  <Input type="email" name="email" />
  <Field.ErrorText>Required</Field.ErrorText>
</Field>
\`\`\``,
  },
  {
    id: "escape-hatch",
    aliases: [
      "custom css",
      "classname override",
      "style outside the scale",
      "one-off styles",
      "escape hatch",
    ],
    answer: `Three levels, in order:

1. \`className\` — forwarded by every component; your classes merge last and win conflicts.
2. \`style\` — for truly dynamic one-off values.
3. Plain CSS — components render ordinary DOM elements, and every token is a CSS variable you can reference: \`var(--astralis-spacing-6)\`.

Full guidance: [Style Props → Escape hatches](/docs/style-props).`,
  },
  {
    id: "mcp",
    aliases: [
      "mcp server",
      "claude code integration",
      "cursor integration",
      "ai coding agent setup",
      "model context protocol",
    ],
    answer: `Astralis ships an MCP server so AI coding agents read the **current** docs instead of guessing:

\`\`\`bash
claude mcp add astralis -- npx -y astralis-mcp
\`\`\`

Or in any MCP client's config: \`{"command": "npx", "args": ["-y", "astralis-mcp"]}\`. Five tools: component docs with full props tables, guides, theming reference, and search. Browsing agents can also read [llms.txt](https://astralis-zeta.vercel.app/llms.txt).`,
  },
  {
    id: "accessibility",
    aliases: [
      "accessibility",
      "keyboard navigation",
      "screen reader support",
      "aria support",
      "a11y",
    ],
    answer: `Accessibility is built in: real semantic elements under the styling, APG keyboard patterns (roving focus in Menu/Tabs, full arrow-key grid in Calendar), focus management in overlays (trap + return-to-trigger), \`prefers-reduced-motion\` support, and Field-driven \`aria-describedby\` wiring.

Every interactive component's docs page has a **Keyboard** table documenting its exact key map — e.g. [Menu](/docs/components/menu#keyboard), [Combobox](/docs/components/combobox#keyboard).`,
  },
  {
    id: "bundle-size",
    aliases: [
      "bundle size",
      "tree shaking",
      "how big is the library",
      "performance impact",
      "does it ship everything",
    ],
    answer: `Importing one Button ships the Button — the package publishes one ES module per component with a \`sideEffects\` declaration, so bundlers tree-shake at file granularity.

The stylesheet is ~120 KB gzipped (all 62 components, both themes, all responsive variants — imported once). Runtime dependencies: four small ones; no Radix, no Floating UI, no animation library.`,
  },
  {
    id: "toast",
    aliases: [
      "show a toast",
      "toast notification",
      "snackbar",
      "success message popup",
      "notifications",
    ],
    answer: `Mount one \`<Toaster />\`, then call \`toast\` from anywhere — no context, no hooks:

\`\`\`tsx
import { Toaster, toast } from "astralis-ui";

// once, near the app root
<Toaster placement="bottom-right" />

// then from anywhere
toast.success("Saved");
toast.error("Something went wrong", {
  description: "Try again.",
});
\`\`\`

Timers pause on hover and resume with the time left. Full API: [Toast](/docs/components/toast).`,
  },
  {
    id: "nextjs-ssr",
    aliases: [
      "does it work with nextjs",
      "next js support",
      "server components rsc",
      "ssr support",
      "use with vite",
      "app router",
    ],
    answer: `Yes — Next.js (App Router included) and Vite are the two setups the docs cover directly; this docs site itself is Next.js.

Components are client components under the hood, but you import and render them from server components freely — Next handles the boundary. SSR output is stable (no flash of unstyled content; a tiny inline script applies the stored theme before first paint).

Framework recipes: [Installation](/docs/installation).`,
  },
  {
    id: "typescript",
    aliases: [
      "typescript support",
      "is it typed",
      "types included",
      "do i need types package",
      "autocomplete props",
    ],
    answer: `TypeScript-first — the package ships its own declarations (no \`@types/*\` needed). Every prop is typed against the design scale, so values autocomplete in your editor and anything off-scale is a compile error, not a silent no-op:

\`\`\`tsx
<Box p="6" shadow="sm" />   // ✓ autocompleted
<Box p="6.5" />             // ✗ type error
\`\`\``,
  },
  {
    id: "form-libraries",
    aliases: [
      "react hook form",
      "use with formik",
      "form library integration",
      "controlled inputs",
      "zod validation",
    ],
    answer: `All data-entry components work controlled (\`value\` + \`onChange\`) or uncontrolled (\`defaultValue\` + \`name\`), so form libraries integrate the standard way — with react-hook-form use \`Controller\` for composite widgets like Select:

\`\`\`tsx
<Controller
  name="role"
  control={control}
  render={({ field }) => (
    <Select value={field.value} onValueChange={field.onChange}>
      …
    </Select>
  )}
/>
\`\`\`

For labels and error display, wrap controls in [Field](/docs/components/field).`,
  },
  {
    id: "icons",
    aliases: [
      "icons",
      "which icon library",
      "lucide icons",
      "use my own icons",
      "icon component",
    ],
    answer: `Astralis bundles **zero icons** — bring your own set and pass it through the token-aware [Icon](/docs/components/icon) wrapper:

\`\`\`tsx
import { Sun } from "lucide-react";

<Icon as={Sun} size="md" color="muted" />
\`\`\`

Any icon component (Lucide, Heroicons, your own SVGs) works; \`size\` and \`color\` map to the design tokens, and icons are \`aria-hidden\` by default.`,
  },
  {
    id: "comparison",
    aliases: [
      "compare to chakra",
      "vs mui",
      "why astralis over shadcn",
      "difference from other libraries",
      "why should i use this",
    ],
    answer: `The short version: Astralis gives you Chakra-style DX (style props, \`colorScheme\`, compound components) **without runtime CSS-in-JS** — styling is precompiled CSS over semantic tokens, so there's no style computation in render and no build-tool requirements in your app.

Compared to copy-in kits (shadcn), Astralis is a versioned dependency: you get updates, and theming is a runtime token swap rather than editing generated source. Best way to judge: the [live demos](/docs) — every page renders the real components.`,
  },
  {
    id: "motion",
    aliases: [
      "animations",
      "reduced motion",
      "disable animations",
      "transition speed",
      "motion accessibility",
    ],
    answer: `Motion is token-driven and accessible by default: transitions use the duration tokens (overridable via CSS variables), and \`prefers-reduced-motion\` is respected library-wide — auto-playing Marquee and Carousel pause for those users automatically.

To retune globally:

\`\`\`css
:root {
  --astralis-duration-moderate: 150ms;
}
\`\`\`

Token reference: [Design Tokens](/docs/tokens).`,
  },
  {
    id: "support",
    aliases: [
      "report a bug",
      "contribute",
      "github issues",
      "feature request",
      "where to get help",
    ],
    answer: `The library is developed in the open at [github.com/SekiroDev360/astralis-ui](https://github.com/SekiroDev360/astralis-ui) — bug reports and feature requests are welcome as GitHub issues. Include a minimal reproduction and the library version (\`npm ls astralis-ui\`) and it gets fixed much faster.`,
  },
  {
    id: "license",
    aliases: [
      "license",
      "is it free",
      "open source",
      "can i use commercially",
      "mit",
    ],
    answer: `MIT licensed — free for commercial and personal use. The source is public at [github.com/SekiroDev360/astralis-ui](https://github.com/SekiroDev360/astralis-ui), and the package is on [npm](https://www.npmjs.com/package/astralis-ui).`,
  },
];
