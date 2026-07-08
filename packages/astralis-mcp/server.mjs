#!/usr/bin/env node
/**
 * Astralis UI MCP server — gives AI coding agents current component APIs
 * instead of hallucinated ones. Static-data design (the Mantine approach):
 * everything is read from the docs sources on disk, no site or network
 * needed. Tools: list_components, get_component, search_docs, get_theming.
 *
 * Run: `node packages/astralis-mcp/server.mjs` or register in an MCP client:
 *   { "command": "node", "args": ["<repo>/packages/astralis-mcp/server.mjs"] }
 */
import { readFileSync, readdirSync, existsSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..", "..");
const DOCS_DIR = join(ROOT, "packages", "astralis-docs", "src", "app", "docs", "components");
const DEMOS_DIR = join(ROOT, "packages", "astralis-docs", "src", "components", "demos");
const NAV_FILE = join(ROOT, "packages", "astralis-docs", "src", "lib", "navigation.ts");
const TOKENS_DIR = join(ROOT, "packages", "astralis-ui", "src", "theme", "tokens");

/* ---------- data (same transforms as the docs site's .md endpoints) ---------- */

function sectionOf() {
  // slug -> section title, parsed from the sidebar navigation source.
  const nav = readFileSync(NAV_FILE, "utf8");
  const map = new Map();
  let section = "Components";
  for (const line of nav.split("\n")) {
    const sec = line.match(/title:\s*"([^"]+)",\s*$/);
    if (sec) section = sec[1];
    const item = line.match(/href:\s*"\/docs\/components\/([a-z0-9-]+)"/);
    if (item) map.set(item[1], section);
  }
  return map;
}

function listComponents() {
  const sections = sectionOf();
  const out = [];
  for (const dir of readdirSync(DOCS_DIR, { withFileTypes: true })) {
    if (!dir.isDirectory()) continue;
    const mdx = join(DOCS_DIR, dir.name, "page.mdx");
    if (!existsSync(mdx)) continue;
    const raw = readFileSync(mdx, "utf8");
    out.push({
      slug: dir.name,
      title: raw.match(/title:\s*"([^"]+)"/)?.[1] ?? dir.name,
      description: raw.match(/description:\s*"([^"]+)"/)?.[1] ?? "",
      section: sections.get(dir.name) ?? "Components",
    });
  }
  return out.sort((a, b) => a.section.localeCompare(b.section) || a.slug.localeCompare(b.slug));
}

function componentMarkdown(slug) {
  if (!/^[a-z0-9-]+$/.test(slug)) return null;
  const mdx = join(DOCS_DIR, slug, "page.mdx");
  if (!existsSync(mdx)) return null;
  let md = readFileSync(mdx, "utf8");
  md = md.replace(/^export const metadata = \{[\s\S]*?\};\s*/m, "");
  md = md.replace(/<ComponentPreview\s+name="([a-z0-9-]+)"[^/]*\/>/g, (_, name) => {
    for (const dir of readdirSync(DEMOS_DIR, { withFileTypes: true })) {
      if (!dir.isDirectory()) continue;
      const demo = join(DEMOS_DIR, dir.name, `${name}.tsx`);
      if (existsSync(demo)) return "```tsx\n" + readFileSync(demo, "utf8").trim() + "\n```";
    }
    return `*(interactive demo: ${name})*`;
  });
  return md.trim();
}

/* ---------- server ---------- */

const server = new McpServer({ name: "astralis-ui", version: "0.1.0" });

server.tool(
  "list_components",
  "List every Astralis UI component with its docs slug, one-line description and category.",
  {},
  async () => ({
    content: [{ type: "text", text: JSON.stringify(listComponents(), null, 2) }],
  }),
);

server.tool(
  "get_component",
  "Full documentation for one component as markdown: usage, props table, keyboard/accessibility notes, and complete runnable demo source code. Use the slug from list_components.",
  { slug: z.string().describe("Component docs slug, e.g. 'button', 'number-input'") },
  async ({ slug }) => {
    const md = componentMarkdown(slug);
    return md
      ? { content: [{ type: "text", text: md }] }
      : { content: [{ type: "text", text: `Unknown component "${slug}". Call list_components for valid slugs.` }], isError: true };
  },
);

server.tool(
  "search_docs",
  "Full-text search across all component documentation. Returns matching components with a snippet around the first hit.",
  { query: z.string().describe("Search text, e.g. 'focus trap' or 'aria-describedby'") },
  async ({ query }) => {
    const q = query.toLowerCase();
    const hits = [];
    for (const comp of listComponents()) {
      const md = componentMarkdown(comp.slug) ?? "";
      const idx = md.toLowerCase().indexOf(q);
      if (idx === -1) continue;
      hits.push({ ...comp, snippet: md.slice(Math.max(0, idx - 80), idx + 120).replace(/\s+/g, " ") });
    }
    return { content: [{ type: "text", text: hits.length ? JSON.stringify(hits, null, 2) : "No matches." }] };
  },
);

server.tool(
  "get_theming",
  "Astralis theming reference: the semantic token vocabulary (surface/label/stroke roles, per-palette roles), available colorScheme values, and how runtime brand theming works.",
  {},
  async () => {
    const semantic = readFileSync(join(TOKENS_DIR, "semantic.css"), "utf8");
    const tokens = [...new Set([...semantic.matchAll(/--astralis-color-([a-z-]+):/g)].map((m) => m[1]))];
    const text = [
      "# Astralis theming",
      "",
      "Components paint with SEMANTIC tokens, never raw colors. Utilities look like `astralis:bg-surface-subtle`, `astralis:text-label-muted`, `astralis:border-stroke-base`.",
      "",
      "colorScheme values (any component with the prop): brand, gray, red, orange, yellow, green, teal, blue, cyan, purple, pink.",
      "",
      "Runtime brand: `<AstralisProvider tokens={{ brandColor: '#8b5cf6' }}>` regenerates the whole brand palette and role tokens live. Dark mode: provider-managed `astralis-dark` class; `useTheme()` exposes theme/setTheme/resolvedTheme.",
      "",
      "## Semantic token names",
      tokens.join(", "),
    ].join("\n");
    return { content: [{ type: "text", text }] };
  },
);

const transport = new StdioServerTransport();
await server.connect(transport);
