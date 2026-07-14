import { docAsMarkdown, listDocs } from "@/lib/docs-markdown";

export const dynamic = "force-static";

/** llms-full.txt — every guide and component page as one markdown corpus. */
export function GET() {
  const parts: string[] = [
    "# Astralis UI — full documentation",
    "",
    "React 19 component library on semantic design tokens. Precompiled prefixed CSS; consumers never run Tailwind.",
    "",
  ];

  for (const doc of listDocs()) {
    const md = docAsMarkdown(doc.slug);
    if (!md) continue;
    const path = doc.kind === "guide" ? `/docs/${doc.slug}` : `/docs/components/${doc.slug}`;
    parts.push("---", "", `<!-- ${doc.section} / ${doc.title} — ${path} -->`, "", md);
  }

  return new Response(parts.join("\n"), {
    headers: { "content-type": "text/plain; charset=utf-8" },
  });
}
