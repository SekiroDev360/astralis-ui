# Astralis UI

React 19 component library built on semantic design tokens — precompiled CSS,
runtime brand theming, first-class dark mode and responsive props.
**62 components across 9 categories.**

**📖 Docs & live demos:** https://astralis-zeta.vercel.app
**📦 npm:** https://www.npmjs.com/package/astralis-ui

```bash
pnpm add astralis-ui
```

```tsx
import { AstralisProvider, Button } from "astralis-ui";
import "astralis-ui/styles.css";

<AstralisProvider defaultTheme="system" tokens={{ brandColor: "#8b5cf6" }}>
  <Button colorScheme="teal">Hello</Button>
</AstralisProvider>;
```

## Highlights

- **Zero build step** — one precompiled stylesheet, no Tailwind/PostCSS setup
  in your app; internals are prefixed so they can't collide with your own CSS.
- **Runtime brand theming** — one hex in, a full OKLCH-derived palette out:
  shades, hover states and a readable contrast color, computed at runtime.
- **`colorScheme` everywhere** — eleven palettes through one CSS-variable
  accent channel, with no per-hue CSS shipped.
- **Responsive props** — `p={{ base: "4", md: "8" }}` on every layout
  primitive, resolved to precompiled classes with zero runtime cost.
- **Verified CSS** — a build gate proves every class the components can emit
  exists in the shipped stylesheet; styling breakage fails the build.
- **Agent-ready docs** — [`/llms.txt`](https://astralis-zeta.vercel.app/llms.txt),
  per-page markdown endpoints, and an MCP server.

## Monorepo layout

| Package | What it is |
| --- | --- |
| [`packages/astralis-ui`](packages/astralis-ui) | The component library (published to npm) |
| [`packages/astralis-docs`](packages/astralis-docs) | The documentation site — Next.js + MDX, live demos ([astralis-zeta.vercel.app](https://astralis-zeta.vercel.app)) |
| [`packages/astralis-playground`](packages/astralis-playground) | Vite sandbox for local development |
| [`packages/astralis-mcp`](packages/astralis-mcp) | MCP server exposing the docs to AI coding tools |

## Development

Requires Node 20+ and [pnpm](https://pnpm.io).

```bash
pnpm install
pnpm build:ui      # build the library (JS + types + CSS with coverage gate)
pnpm dev:docs      # docs site on localhost:3000
pnpm dev           # playground on localhost:5173
pnpm dev:ui        # library Storybook
```

The library ships precompiled CSS, so after changing component styles or
tokens, rebuild with `pnpm build:ui` — the build fails loudly if any emitted
class is missing from the compiled stylesheet.

## License

MIT © Paul Andrew
