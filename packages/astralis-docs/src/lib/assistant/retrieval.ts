import { listDocs, docAsMarkdown, introAsMarkdown } from "@/lib/docs-markdown";
import { tokenize } from "./match";

/**
 * Tier 1's grounding: lexical retrieval over the same machine-docs the .md
 * endpoints and MCP server serve. Server-only (reads MDX from disk). The
 * index is built lazily once per server instance — ~70 small documents, so
 * plain token sets beat dragging in an embedding stack.
 */

interface IndexedDoc {
  slug: string;
  title: string;
  /** Site-relative URL the model should link to. */
  url: string;
  /** Title + description + slug tokens — strong signal, weighted higher. */
  metaTokens: Set<string>;
  contentTokens: Set<string>;
  content: string;
}

let index: IndexedDoc[] | null = null;

function makeDoc(slug: string, title: string, meta: string, url: string, content: string): IndexedDoc {
  return {
    slug,
    title,
    url,
    metaTokens: new Set(tokenize(meta)),
    contentTokens: new Set(tokenize(content)),
    content,
  };
}

function buildIndex(): IndexedDoc[] {
  const docs: IndexedDoc[] = [
    // The introduction answers "what is Astralis" — outside listDocs' URL
    // scheme, so indexed explicitly.
    makeDoc(
      "introduction",
      "Introduction",
      "introduction what is astralis ui overview library",
      "/docs",
      introAsMarkdown(),
    ),
  ];
  for (const entry of listDocs()) {
    const content = docAsMarkdown(entry.slug);
    if (!content) continue;
    docs.push(
      makeDoc(
        entry.slug,
        entry.title,
        `${entry.title} ${entry.description} ${entry.slug}`,
        entry.kind === "component" ? `/docs/components/${entry.slug}` : `/docs/${entry.slug}`,
        content,
      ),
    );
  }
  return docs;
}

export interface RetrievedDoc {
  slug: string;
  title: string;
  url: string;
  content: string;
}

const MAX_DOC_CHARS = 6000;

/** The docs most lexically relevant to the question, best first. */
export function retrieveDocs(question: string, limit = 3): RetrievedDoc[] {
  index ??= buildIndex();
  const questionTokens = tokenize(question);
  if (questionTokens.length === 0) return [];

  const scored = index
    .map((doc) => {
      let score = 0;
      for (const token of questionTokens) {
        if (doc.metaTokens.has(token)) score += 3;
        else if (doc.contentTokens.has(token)) score += 1;
      }
      return { doc, score };
    })
    .filter((s) => s.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit);

  return scored.map(({ doc }) => ({
    slug: doc.slug,
    title: doc.title,
    url: doc.url,
    content: doc.content.length > MAX_DOC_CHARS ? doc.content.slice(0, MAX_DOC_CHARS) + "\n…(truncated)" : doc.content,
  }));
}
