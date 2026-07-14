# Astralis UI

React 19 component library built on semantic design tokens — precompiled CSS,
runtime brand theming, first-class dark mode and responsive props on every
layout primitive. **62 components across 9 categories.**

**Docs & live demos:** https://astralis-zeta.vercel.app

## Why Astralis

- **Zero build step.** The library ships precompiled CSS — import one
  stylesheet and every component works. Your app never runs plugins,
  preprocessors or a theme compiler. Internals are prefixed (`astralis:*`),
  so it coexists with whatever styling setup you already have, without
  collisions.
- **Runtime theming.** Hand the provider a single brand color and the full
  shade scale, hover states and a readable contrast color are derived at
  runtime with OKLCH color math:

  ```tsx
  <AstralisProvider tokens={{ brandColor: "#8b5cf6" }}>
  ```

- **One accent channel, eleven hues.** Every themeable component takes a
  `colorScheme` prop backed by CSS-variable indirection — any component
  recolors to any palette without per-hue CSS.
- **Responsive props.** Layout and typography accept breakpoint maps —
  `p={{ base: "4", md: "8" }}` — resolved to precompiled classes, zero
  runtime style computation.
- **Verified CSS.** A build gate asserts that every class the components can
  emit exists in the shipped stylesheet — silent styling breakage is a build
  failure, not a runtime surprise.
- **Light dependencies.** Four small runtime deps; no Radix, no Floating UI,
  no animation library. Behavior lives in ~5 small in-house hooks.

## Install

```bash
pnpm add astralis-ui   # or npm / yarn
```

Requires React 19.

## Setup

```tsx
import { AstralisProvider } from "astralis-ui";
import "astralis-ui/styles.css"; // once, at your entry point

export function App({ children }) {
  return <AstralisProvider defaultTheme="system">{children}</AstralisProvider>;
}
```

## Use

```tsx
import { Button, Card, Field, Input, VStack } from "astralis-ui";

<Card>
  <Card.Header>
    <Card.Title>Create account</Card.Title>
  </Card.Header>
  <Card.Body>
    <VStack gap="4" alignItems="stretch">
      <Field required>
        <Field.Label>Email</Field.Label>
        <Input type="email" placeholder="you@example.com" />
      </Field>
      <Button colorScheme="blue" fullWidth>Sign up</Button>
    </VStack>
  </Card.Body>
</Card>;
```

- [Installation guide](https://astralis-zeta.vercel.app/docs/installation)
- [Quick start](https://astralis-zeta.vercel.app/docs/quick-start)
- [Theming](https://astralis-zeta.vercel.app/docs/theming)
- [All 62 components](https://astralis-zeta.vercel.app/docs)

## For AI agents

The docs are machine-readable: [`/llms.txt`](https://astralis-zeta.vercel.app/llms.txt)
indexes every page, and each page is available as plain markdown (e.g.
[`/docs/components/button.md`](https://astralis-zeta.vercel.app/docs/components/button.md))
with full demo source included.

## License

MIT © Paul Andrew
