import { docAsMarkdown, listDocs } from "@/lib/docs-markdown";

export const dynamic = "force-static";

/** llms-full.txt — every component page as one markdown corpus. */
export function GET() {
  const parts: string[] = [
    "# Astralis UI — full component documentation",
    "",
    "React 19 component library on semantic design tokens. Precompiled prefixed CSS; consumers never run Tailwind.",
    "",
  ];

  for (const doc of listDocs()) {
    const md = docAsMarkdown(doc.slug);
    if (!md) continue;
    parts.push("---", "", `<!-- ${doc.section} / ${doc.title} — /docs/components/${doc.slug} -->`, "", md);
  }

  return new Response(parts.join("\n"), {
    headers: { "content-type": "text/plain; charset=utf-8" },
  });
}
