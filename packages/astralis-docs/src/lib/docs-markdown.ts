import { readFileSync, readdirSync, existsSync } from "node:fs";
import { join } from "node:path";
import { navigation } from "./navigation";

/**
 * Agent-consumable markdown for every docs page: the source MDX with the
 * metadata export stripped and each <ComponentPreview name="x" /> replaced by
 * the demo's actual source code (from the same on-disk registry the live
 * previews render from — so agents read exactly what users see).
 */

const DOCS_DIR = join(process.cwd(), "src", "app", "docs", "components");
const DEMOS_DIR = join(process.cwd(), "src", "components", "demos");

export interface DocEntry {
  slug: string;
  title: string;
  description: string;
  section: string;
}

/** Every published component page, from the same navigation the sidebar uses. */
export function listDocs(): DocEntry[] {
  const entries: DocEntry[] = [];
  for (const section of navigation) {
    for (const item of section.items) {
      const match = item.href.match(/^\/docs\/components\/([a-z0-9-]+)$/);
      if (!match || item.status === "soon") continue;
      const slug = match[1];
      const mdxPath = join(DOCS_DIR, slug, "page.mdx");
      if (!existsSync(mdxPath)) continue;
      const raw = readFileSync(mdxPath, "utf8");
      const description = raw.match(/description:\s*"([^"]+)"/)?.[1] ?? "";
      entries.push({ slug, title: item.title, description, section: section.title });
    }
  }
  return entries;
}

/** One page as plain markdown (returns null for unknown slugs). */
export function docAsMarkdown(slug: string): string | null {
  if (!/^[a-z0-9-]+$/.test(slug)) return null;
  const mdxPath = join(DOCS_DIR, slug, "page.mdx");
  if (!existsSync(mdxPath)) return null;

  let md = readFileSync(mdxPath, "utf8");

  // Strip the metadata export block (first `export const metadata = {...};`).
  md = md.replace(/^export const metadata = \{[\s\S]*?\};\s*/m, "");

  // Inline each preview's demo source as a fenced tsx block.
  md = md.replace(/<ComponentPreview\s+name="([a-z0-9-]+)"[^/]*\/>/g, (_, name: string) => {
    const demoPath = findDemoFile(name);
    if (!demoPath) return `*(interactive demo: ${name})*`;
    const source = readFileSync(demoPath, "utf8").trim();
    return "```tsx\n" + source + "\n```";
  });

  return md.trim() + "\n";
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
