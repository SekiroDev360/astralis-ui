#!/usr/bin/env node
/**
 * Astralis UI MCP server — gives AI coding agents current component APIs
 * instead of hallucinated ones.
 *
 * Data source: the deployed docs site's machine-readable endpoints
 * (/llms.txt, /docs/components/*.md, /docs/*.md) — the same single pipeline
 * that renders the human docs, so answers can never drift from the site.
 * Point ASTRALIS_DOCS_URL at a local dev server (http://localhost:3000)
 * when working on unpublished docs.
 *
 * Register in an MCP client:
 *   { "command": "npx", "args": ["-y", "astralis-mcp"] }
 */
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";

const SITE = (process.env.ASTRALIS_DOCS_URL ?? "https://astralis-zeta.vercel.app").replace(/\/$/, "");

/* ---------- data: fetched once per process, then cached ---------- */

const cache = new Map();

async function fetchText(path) {
  if (cache.has(path)) return cache.get(path);
  const res = await fetch(`${SITE}${path}`);
  if (!res.ok) throw new Error(`${res.status} for ${SITE}${path}`);
  const text = await res.text();
  cache.set(path, text);
  return text;
}

/** Parse llms.txt into [{slug, title, description, section, kind}]. */
async function listPages() {
  const index = await fetchText("/llms.txt");
  const pages = [];
  let section = "";
  for (const line of index.split("\n")) {
    const heading = line.match(/^## (.+)$/);
    if (heading) section = heading[1];
    const item = line.match(/^- \[([^\]]+)\]\(\S*\/docs\/(?:(components)\/)?([a-z0-9-]+)\.md\):\s*(.*)$/);
    if (!item) continue;
    pages.push({
      slug: item[3],
      title: item[1],
      description: item[4],
      section,
      kind: item[2] ? "component" : "guide",
    });
  }
  return pages;
}

async function pageMarkdown(slug, kind) {
  if (!/^[a-z0-9-]+$/.test(slug)) return null;
  try {
    return await fetchText(kind === "guide" ? `/docs/${slug}.md` : `/docs/components/${slug}.md`);
  } catch {
    return null;
  }
}

const asText = (text) => ({ content: [{ type: "text", text }] });
const asError = (text) => ({ content: [{ type: "text", text }], isError: true });
const offline = (err) =>
  asError(`Could not reach the Astralis docs at ${SITE} (${err.message}). Check your connection, or set ASTRALIS_DOCS_URL.`);

/* ---------- server ---------- */

const server = new McpServer({ name: "astralis-ui", version: "0.2.0" });

server.tool(
  "list_components",
  "List every Astralis UI docs page — all 62 components plus the guides (installation, theming, colors, responsive props, style props, design tokens) — with slug, one-line description, category, and kind (component | guide).",
  {},
  async () => {
    try {
      return asText(JSON.stringify(await listPages(), null, 2));
    } catch (err) {
      return offline(err);
    }
  },
);

server.tool(
  "get_component",
  "Full documentation for one component as markdown: usage, complete props table, keyboard/accessibility notes, and runnable demo source code. Use the slug from list_components.",
  { slug: z.string().describe("Component docs slug, e.g. 'button', 'number-input'") },
  async ({ slug }) => {
    try {
      const md = await pageMarkdown(slug, "component");
      return md
        ? asText(md)
        : asError(`Unknown component "${slug}". Call list_components for valid slugs.`);
    } catch (err) {
      return offline(err);
    }
  },
);

server.tool(
  "get_guide",
  "One of the Astralis guide pages as markdown: installation, quick-start, theming, colors, responsive, style-props, or tokens.",
  { slug: z.string().describe("Guide slug, e.g. 'installation', 'theming', 'tokens'") },
  async ({ slug }) => {
    try {
      const md = await pageMarkdown(slug, "guide");
      return md
        ? asText(md)
        : asError(`Unknown guide "${slug}". Valid: installation, quick-start, theming, colors, responsive, style-props, tokens.`);
    } catch (err) {
      return offline(err);
    }
  },
);

server.tool(
  "search_docs",
  "Full-text search across all Astralis documentation (guides + components). Returns matching pages with a snippet around the first hit.",
  { query: z.string().describe("Search text, e.g. 'focus trap' or 'aria-describedby'") },
  async ({ query }) => {
    try {
      const q = query.toLowerCase();
      const hits = [];
      for (const page of await listPages()) {
        const md = (await pageMarkdown(page.slug, page.kind)) ?? "";
        const idx = md.toLowerCase().indexOf(q);
        if (idx === -1) continue;
        hits.push({ ...page, snippet: md.slice(Math.max(0, idx - 80), idx + 120).replace(/\s+/g, " ") });
      }
      return asText(hits.length ? JSON.stringify(hits, null, 2) : "No matches.");
    } catch (err) {
      return offline(err);
    }
  },
);

server.tool(
  "get_theming",
  "The complete Astralis theming reference: the token system, dark mode, runtime brand color, colorScheme/accent channel, plus every design-token scale (spacing, sizing, type, radius, shadows, motion).",
  {},
  async () => {
    try {
      const [theming, tokens] = await Promise.all([
        pageMarkdown("theming", "guide"),
        pageMarkdown("tokens", "guide"),
      ]);
      return asText([theming ?? "", "\n---\n", tokens ?? ""].join("\n"));
    } catch (err) {
      return offline(err);
    }
  },
);

const transport = new StdioServerTransport();
await server.connect(transport);
