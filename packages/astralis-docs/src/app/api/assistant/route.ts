import { retrieveDocs } from "@/lib/assistant/retrieval";
import { streamModel, ProviderNotConfiguredError } from "@/lib/assistant/providers";

/**
 * Tier 1 of the Astralis Assistant: questions the curated Tier 0 bank can't
 * answer stream through a model, grounded in retrieved docs excerpts.
 * Guards, in order: question length cap, per-IP rate limit, scoped system
 * prompt, capped output tokens. Every question is logged as a JSON line —
 * that log is the promotion loop's input (frequent questions get hand-written
 * Tier 0 answers).
 */

export const runtime = "nodejs";

const MAX_QUESTION_CHARS = 500;
const RATE_LIMIT = 10; // questions…
const RATE_WINDOW_MS = 10 * 60 * 1000; // …per ten minutes per IP

// Per-instance is fine: serverless instances are short-lived, and this guard
// is against casual abuse, not determined attackers.
const hits = new Map<string, number[]>();

function rateLimited(ip: string): boolean {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < RATE_WINDOW_MS);
  if (recent.length >= RATE_LIMIT) {
    hits.set(ip, recent);
    return true;
  }
  recent.push(now);
  hits.set(ip, recent);
  return false;
}

const SYSTEM_PROMPT = `You are the Astralis Assistant on the Astralis UI documentation site. Astralis UI is a React 19 component library built on semantic design tokens, with precompiled prefixed CSS, runtime brand theming, and a colorScheme accent channel.

Answer ONLY questions about Astralis UI, using the documentation excerpts provided with each question. Rules:
- If the excerpts don't contain the answer, say so plainly and link the closest docs page — never invent props, components, or behavior.
- If the question is not about Astralis UI, decline in one friendly sentence.
- Be concise: a short paragraph or two, ~150 words max, plus code when useful.
- Format code examples across multiple lines the way a consumer would write them — never cram JSX onto one line.
- Use only this markdown subset: paragraphs, - lists, **bold**, \`inline code\`, \`\`\` fenced code with a language tag, and [links](...) using site-relative paths like /docs/theming.`;

export async function POST(req: Request): Promise<Response> {
  let question: unknown;
  try {
    ({ question } = await req.json());
  } catch {
    return Response.json({ error: "Invalid JSON body" }, { status: 400 });
  }
  if (typeof question !== "string" || !question.trim()) {
    return Response.json({ error: "Missing question" }, { status: 400 });
  }
  const q = question.trim();
  if (q.length > MAX_QUESTION_CHARS) {
    return Response.json({ error: `Question too long (max ${MAX_QUESTION_CHARS} chars)` }, { status: 413 });
  }

  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "local";
  if (rateLimited(ip)) {
    return Response.json({ error: "Rate limit reached — try again in a few minutes" }, { status: 429 });
  }

  const docs = retrieveDocs(q);

  // The promotion loop's raw material: read these from the deploy logs.
  console.log(
    JSON.stringify({
      type: "assistant_question",
      question: q,
      docs: docs.map((d) => d.slug),
      at: new Date().toISOString(),
    }),
  );

  const context = docs.length
    ? docs.map((d) => `### ${d.title} (${d.url})\n\n${d.content}`).join("\n\n---\n\n")
    : "(no matching documentation found)";

  try {
    const stream = await streamModel({
      system: SYSTEM_PROMPT,
      user: `Documentation excerpts:\n\n${context}\n\n---\n\nQuestion: ${q}`,
    });
    return new Response(stream, {
      headers: { "content-type": "text/plain; charset=utf-8", "cache-control": "no-store" },
    });
  } catch (error) {
    if (error instanceof ProviderNotConfiguredError) {
      return Response.json({ error: "Assistant is not configured" }, { status: 503 });
    }
    console.error("assistant_error", error);
    return Response.json({ error: "Assistant is unavailable right now" }, { status: 502 });
  }
}
