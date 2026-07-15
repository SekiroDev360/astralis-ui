import { readFileSync, readdirSync, existsSync } from "node:fs";
import { join } from "node:path";
import { navigation } from "./navigation";
import type { PropRow } from "@/components/docs/props-table";

/**
 * Agent-consumable markdown for every docs page: the source MDX with imports
 * and the metadata export stripped, each <ComponentPreview name="x" />
 * replaced by the demo's actual source, and each <PropsTable rows={x} />
 * rendered as a real markdown table from the same data file the live table
 * uses — so agents read exactly what users see, props included.
 *
 * Consumed by the .md route handlers, llms.txt / llms-full.txt, and (via
 * those endpoints) the astralis-mcp server's live mode.
 */

const APP_DOCS = join(process.cwd(), "src", "app", "docs");
const COMPONENTS_DIR = join(APP_DOCS, "components");
const DEMOS_DIR = join(process.cwd(), "src", "components", "demos");
const SRC_DIR = join(process.cwd(), "src");

export interface DocEntry {
  slug: string;
  title: string;
  description: string;
  section: string;
  /** Guides live at /docs/<slug>; components at /docs/components/<slug>. */
  kind: "component" | "guide";
}

/** Every published page — guides and components — from the sidebar's navigation. */
export function listDocs(): DocEntry[] {
  const entries: DocEntry[] = [];
  for (const section of navigation) {
    for (const item of section.items) {
      if (item.status === "soon") continue;
      const component = item.href.match(/^\/docs\/components\/([a-z0-9-]+)$/);
      const guide = item.href.match(/^\/docs\/([a-z0-9-]+)$/);
      const kind: DocEntry["kind"] | null = component ? "component" : guide ? "guide" : null;
      if (!kind) continue; // e.g. the /docs introduction page
      const slug = (component ?? guide)![1];
      const mdxPath = mdxPathFor(slug, kind);
      if (!mdxPath) continue;
      const raw = readFileSync(mdxPath, "utf8");
      const description = raw.match(/description:\s*"([^"]+)"/)?.[1] ?? "";
      entries.push({ slug, title: item.title, description, section: section.title, kind });
    }
  }
  return entries;
}

/** One page as plain markdown (returns null for unknown slugs). */
export function docAsMarkdown(slug: string): string | null {
  if (!/^[a-z0-9-]+$/.test(slug)) return null;
  const mdxPath = mdxPathFor(slug, "component") ?? mdxPathFor(slug, "guide");
  if (!mdxPath) return null;
  return mdxToMarkdown(mdxPath);
}

/**
 * The /docs introduction page. Its href fits neither URL scheme, so it lives
 * outside listDocs — but it's the page that answers "what is Astralis", so
 * the assistant's retrieval indexes it explicitly.
 */
export function introAsMarkdown(): string {
  return mdxToMarkdown(join(APP_DOCS, "page.mdx"));
}

function mdxToMarkdown(mdxPath: string): string {
  let md = readFileSync(mdxPath, "utf8");

  // Map imported identifiers to their module paths BEFORE stripping imports,
  // so <PropsTable rows={buttonProps}/> can find its data file.
  const importPaths = new Map<string, string>();
  for (const m of md.matchAll(/^import\s+\{([^}]+)\}\s+from\s+"([^"]+)";?\s*$/gm)) {
    for (const name of m[1].split(",")) importPaths.set(name.trim(), m[2]);
  }

  // Strip the metadata export and every top-level import line.
  md = md.replace(/^export const metadata = \{[\s\S]*?\};\s*/m, "");
  md = md.replace(/^import\s.*$\n?/gm, "");

  // Inline each preview's demo source as a fenced tsx block.
  md = md.replace(/<ComponentPreview\s+name="([a-z0-9-]+)"[^/]*\/>/g, (_, name: string) => {
    const demoPath = findDemoFile(name);
    if (!demoPath) return `*(interactive demo: ${name})*`;
    const source = readFileSync(demoPath, "utf8").trim();
    return "```tsx\n" + source + "\n```";
  });

  // Render each props table from its data module as a markdown table.
  md = md.replace(/<PropsTable\s+rows=\{([A-Za-z0-9_]+)\}\s*\/>/g, (tag, ident: string) => {
    const rows = loadPropRows(importPaths.get(ident));
    return rows ? propsTableMarkdown(rows) : tag;
  });

  return md.trim() + "\n";
}

function mdxPathFor(slug: string, kind: DocEntry["kind"]): string | null {
  // Guides must not shadow the components/ directory itself.
  if (kind === "guide" && slug === "components") return null;
  const path =
    kind === "component"
      ? join(COMPONENTS_DIR, slug, "page.mdx")
      : join(APP_DOCS, slug, "page.mdx");
  return existsSync(path) ? path : null;
}

/**
 * Load a `*-props.ts` data module by evaluating its array literal. These
 * files are our own build-time constants (plain object/string literals, no
 * logic), so a Function-constructor eval is safe and spares us a TS parser.
 */
function loadPropRows(importPath: string | undefined): PropRow[] | null {
  if (!importPath?.startsWith("@/")) return null;
  const file = join(SRC_DIR, importPath.slice(2) + ".ts");
  if (!existsSync(file)) return null;
  const literal = readFileSync(file, "utf8").match(/=\s*(\[[\s\S]*\])\s*;/)?.[1];
  if (!literal) return null;
  try {
    const rows = new Function(`return ${literal};`)() as PropRow[];
    return Array.isArray(rows) ? rows : null;
  } catch {
    return null;
  }
}

function propsTableMarkdown(rows: PropRow[]): string {
  const cell = (value: string) => value.replace(/\|/g, "\\|").replace(/\s*\n\s*/g, " ");
  return [
    "| Prop | Type | Default | Description |",
    "| --- | --- | --- | --- |",
    ...rows.map(
      (row) =>
        `| \`${cell(row.prop)}\` | ${cell(row.type)} | ${row.default ? `\`${cell(row.default)}\`` : "—"} | ${cell(row.description)} |`,
    ),
  ].join("\n");
}

function findDemoFile(name: string): string | null {
  // Demo files live at demos/<component>/<name>.tsx; derive the folder from
  // the name's prefix by scanning (names are globally unique in the registry).
  for (const dir of readdirSync(DEMOS_DIR, { withFileTypes: true })) {
    if (!dir.isDirectory()) continue;
    const candidate = join(DEMOS_DIR, dir.name, `${name}.tsx`);
    if (existsSync(candidate)) return candidate;
  }
  return null;
}
