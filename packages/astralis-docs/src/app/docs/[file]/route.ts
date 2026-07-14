import { docAsMarkdown, listDocs } from "@/lib/docs-markdown";

/**
 * Markdown twin of every guide page: /docs/theming.md, /docs/tokens.md, …
 * (static folders win routing, so this dynamic segment only ever sees
 * requests that didn't match a real page — i.e. the .md variants).
 * Component pages have their own twin under /docs/components/[file].
 */
export function generateStaticParams() {
  return listDocs()
    .filter((doc) => doc.kind === "guide")
    .map((doc) => ({ file: `${doc.slug}.md` }));
}

export const dynamic = "force-static";

const GUIDE_SLUGS = new Set(
  listDocs()
    .filter((doc) => doc.kind === "guide")
    .map((doc) => doc.slug),
);

export async function GET(_req: Request, ctx: { params: Promise<{ file: string }> }) {
  const { file } = await ctx.params;
  if (!file.endsWith(".md")) return new Response("Not found", { status: 404 });
  const slug = file.slice(0, -3);
  if (!GUIDE_SLUGS.has(slug)) return new Response("Not found", { status: 404 });
  const md = docAsMarkdown(slug);
  if (!md) return new Response("Not found", { status: 404 });
  return new Response(md, { headers: { "content-type": "text/markdown; charset=utf-8" } });
}
