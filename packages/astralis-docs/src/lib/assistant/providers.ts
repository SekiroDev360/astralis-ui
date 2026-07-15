/**
 * Provider-agnostic model access for Tier 1. One function — streamModel —
 * returns the answer as a plain-text byte stream; which vendor serves it is
 * an env-var concern, not a code one:
 *
 *   ASSISTANT_PROVIDER  "gemini" (default — free tier) | "claude"
 *   ASSISTANT_MODEL     optional model override per provider
 *   GEMINI_API_KEY / ANTHROPIC_API_KEY
 *
 * Raw fetch + SSE parsing on purpose: no vendor SDKs in the docs bundle, and
 * both providers reduce to "POST, read SSE lines, pluck the text delta".
 */

export class ProviderNotConfiguredError extends Error {
  constructor(provider: string) {
    super(`Assistant provider "${provider}" has no API key configured`);
  }
}

export interface ModelRequest {
  system: string;
  user: string;
}

const MAX_OUTPUT_TOKENS = 1024;

export async function streamModel(request: ModelRequest): Promise<ReadableStream<Uint8Array>> {
  const provider = process.env.ASSISTANT_PROVIDER ?? "gemini";
  switch (provider) {
    case "gemini":
      return streamGemini(request);
    case "claude":
      return streamClaude(request);
    default:
      throw new Error(`Unknown ASSISTANT_PROVIDER "${provider}"`);
  }
}

async function streamGemini({ system, user }: ModelRequest): Promise<ReadableStream<Uint8Array>> {
  const key = process.env.GEMINI_API_KEY;
  if (!key) throw new ProviderNotConfiguredError("gemini");
  // Rolling alias — Google advances it to the current flash model, so new
  // model generations never require a code change (pin via ASSISTANT_MODEL).
  const model = process.env.ASSISTANT_MODEL ?? "gemini-flash-latest";

  const res = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/${model}:streamGenerateContent?alt=sse`,
    {
      method: "POST",
      headers: { "content-type": "application/json", "x-goog-api-key": key },
      body: JSON.stringify({
        system_instruction: { parts: [{ text: system }] },
        contents: [{ role: "user", parts: [{ text: user }] }],
        generationConfig: { maxOutputTokens: MAX_OUTPUT_TOKENS, temperature: 0.3 },
      }),
    },
  );
  await assertOk(res, "gemini");

  return sseTextStream(res.body!, (data) =>
    (data.candidates?.[0]?.content?.parts as Array<{ text?: string }> | undefined)
      ?.map((part) => part.text ?? "")
      .join(""),
  );
}

async function streamClaude({ system, user }: ModelRequest): Promise<ReadableStream<Uint8Array>> {
  const key = process.env.ANTHROPIC_API_KEY;
  if (!key) throw new ProviderNotConfiguredError("claude");
  const model = process.env.ASSISTANT_MODEL ?? "claude-haiku-4-5";

  const res = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: {
      "content-type": "application/json",
      "x-api-key": key,
      "anthropic-version": "2023-06-01",
    },
    body: JSON.stringify({
      model,
      max_tokens: MAX_OUTPUT_TOKENS,
      system,
      messages: [{ role: "user", content: user }],
      stream: true,
    }),
  });
  await assertOk(res, "claude");

  return sseTextStream(res.body!, (data) =>
    data.type === "content_block_delta" ? (data.delta?.text as string | undefined) : undefined,
  );
}

async function assertOk(res: Response, provider: string): Promise<void> {
  if (res.ok && res.body) return;
  const detail = (await res.text().catch(() => "")).slice(0, 300);
  throw new Error(`${provider} responded ${res.status}: ${detail}`);
}

/** SSE `data:` lines → the extractor's text, re-encoded as a plain byte stream. */
function sseTextStream(
  body: ReadableStream<Uint8Array>,
  extract: (data: any) => string | undefined,
): ReadableStream<Uint8Array> {
  const decoder = new TextDecoder();
  const encoder = new TextEncoder();
  let buffer = "";

  return body.pipeThrough(
    new TransformStream<Uint8Array, Uint8Array>({
      transform(chunk, controller) {
        buffer += decoder.decode(chunk, { stream: true });
        const lines = buffer.split("\n");
        buffer = lines.pop() ?? "";
        for (const line of lines) {
          if (!line.startsWith("data:")) continue;
          const payload = line.slice(5).trim();
          if (!payload || payload === "[DONE]") continue;
          try {
            const text = extract(JSON.parse(payload));
            if (text) controller.enqueue(encoder.encode(text));
          } catch {
            // Partial or non-JSON keep-alive line — skip.
          }
        }
      },
    }),
  );
}
