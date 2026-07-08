import { docAsMarkdown, listDocs } from "@/lib/docs-markdown";

/**
 * Markdown twin of every component page: /docs/components/button.md
 * (static folders win routing, so this dynamic segment only ever sees
 * requests that didn't match a real page — i.e. the .md variants).
 */
export function generateStaticParams() {
  return listDocs().map((doc) => ({ file: `${doc.slug}.md` }));
}

export const dynamic = "force-static";

export async function GET(_req: Request, ctx: { params: Promise<{ file: string }> }) {
  const { file } = await ctx.params;
  if (!file.endsWith(".md")) return new Response("Not found", { status: 404 });
  const md = docAsMarkdown(file.slice(0, -3));
  if (!md) return new Response("Not found", { status: 404 });
  return new Response(md, { headers: { "content-type": "text/markdown; charset=utf-8" } });
}
