import { listDocs, type DocEntry } from "@/lib/docs-markdown";

export const dynamic = "force-static";

/** Absolute URLs — agents often read this file's content detached from its origin. */
const SITE = "https://astralis-zeta.vercel.app";

const mdUrl = (doc: DocEntry) =>
  doc.kind === "guide" ? `${SITE}/docs/${doc.slug}.md` : `${SITE}/docs/components/${doc.slug}.md`;

/**
 * llms.txt — the AI-agent index (llmstxt.org). Points coding agents at the
 * per-page .md endpoints so they read current APIs instead of hallucinating.
 */
export function GET() {
  const docs = listDocs();
  const sections = new Map<string, typeof docs>();
  for (const doc of docs) {
    if (!sections.has(doc.section)) sections.set(doc.section, []);
    sections.get(doc.section)!.push(doc);
  }

  const lines: string[] = [
    "# Astralis UI",
    "",
    "> A React 19 component library on semantic design tokens: precompiled prefixed CSS (no build tooling required in the consuming app), runtime brand theming, responsive style props, compound components, and an accent-channel colorScheme system.",
    "",
    "Install: `pnpm add astralis-ui` — import `astralis-ui/styles.css` once and wrap the app in `<AstralisProvider>`.",
    "",
    "Every page below is available as plain markdown at the listed .md URL (full demo source and props tables included).",
    "",
  ];

  for (const [section, items] of sections) {
    lines.push(`## ${section}`, "");
    for (const item of items) {
      lines.push(`- [${item.title}](${mdUrl(item)}): ${item.description}`);
    }
    lines.push("");
  }

  lines.push(
    "## Full corpus",
    "",
    `- [llms-full.txt](${SITE}/llms-full.txt): every guide and component page inlined in one file`,
    "",
  );

  return new Response(lines.join("\n"), {
    headers: { "content-type": "text/plain; charset=utf-8" },
  });
}
