"use client";

import { useEffect, useRef, useState } from "react";
import { Sparkles, SendHorizontal } from "lucide-react";
import { Button, Drawer, Icon, Input, Text } from "astralis-ui";
import Link from "next/link";
import { matchTier0, suggestPages, type PageSuggestion } from "@/lib/assistant/match";
import { AssistantMarkdown } from "./markdown";

/**
 * The Astralis Assistant — Phase A: a chat surface answering from the
 * curated Tier 0 bank, entirely in the browser (no API, no cost). Misses
 * fall back to docs-page suggestions; Phase B routes them to a model.
 * Built from our own components on purpose — the assistant is a demo too.
 */

interface ChatMessage {
  role: "user" | "assistant";
  text: string;
  suggestions?: PageSuggestion[];
}

const STARTERS = [
  "How do I install Astralis?",
  "Change the brand color",
  "Will it conflict with my styles?",
  "Show a toast notification",
];

const MISS_TEXT =
  "I don't have a ready answer for that one yet — smarter answers are on the way. ";

/**
 * Chunks an answer for the typewriter reveal: prose streams a few characters
 * per tick, fenced code blocks land whole — a half-open fence would flash as
 * broken markdown mid-stream.
 */
function planReveal(text: string): string[] {
  const chunks: string[] = [];
  for (const segment of text.split(/(```\w*\n[\s\S]*?```)/g)) {
    if (!segment) continue;
    if (segment.startsWith("```")) {
      chunks.push(segment);
    } else {
      for (let i = 0; i < segment.length; i += 3) chunks.push(segment.slice(i, i + 3));
    }
  }
  return chunks;
}

function TypingDots() {
  return (
    <span className="flex items-center gap-1 py-1" aria-label="Assistant is typing">
      {[0, 1, 2].map((d) => (
        <span
          key={d}
          className="size-1.5 animate-bounce rounded-full bg-label-subtle"
          style={{ animationDelay: `${d * 150}ms` }}
        />
      ))}
    </span>
  );
}

function answer(question: string): ChatMessage {
  const hit = matchTier0(question);
  if (hit) return { role: "assistant", text: hit.entry.answer };
  const suggestions = suggestPages(question);
  return {
    role: "assistant",
    text:
      MISS_TEXT +
      (suggestions.length
        ? "These pages look relevant:"
        : "Browsing the [component docs](/docs) is your best bet."),
    suggestions,
  };
}

export function Assistant() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [draft, setDraft] = useState("");
  // The in-flight reply: dots while "thinking", then a typewriter reveal.
  const [pending, setPending] = useState<ChatMessage | null>(null);
  const [thinking, setThinking] = useState(false);
  const [revealed, setRevealed] = useState("");
  const logRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Drawer.Body is the scroll container now; the log div just holds the messages.
    const scroller = logRef.current?.parentElement;
    scroller?.scrollTo({ top: scroller.scrollHeight });
  }, [messages, thinking, revealed]);

  useEffect(() => {
    if (!pending) return;
    setThinking(true);
    setRevealed("");
    const chunks = planReveal(pending.text);
    let index = 0;
    let interval: ReturnType<typeof setInterval> | undefined;
    const delay = setTimeout(() => {
      setThinking(false);
      interval = setInterval(() => {
        index += 1;
        setRevealed(chunks.slice(0, index).join(""));
        if (index >= chunks.length) {
          clearInterval(interval);
          setMessages((prev) => [...prev, pending]);
          setPending(null);
        }
      }, 24);
    }, 650);
    return () => {
      clearTimeout(delay);
      clearInterval(interval);
    };
  }, [pending]);

  const ask = (question: string) => {
    const q = question.trim();
    if (!q || pending) return;
    setMessages((prev) => [...prev, { role: "user", text: q }]);
    setPending(answer(q));
    setDraft("");
  };

  return (
    <Drawer placement="right" size="lg">
      <Drawer.Trigger>
        <Button
          aria-label="Open the Astralis Assistant"
          rounded="full"
          size="lg"
          className="fixed! right-5 bottom-5 z-40 shadow-lg"
          leftIcon={<Icon as={Sparkles} size="sm" />}
        >
          Ask
        </Button>
      </Drawer.Trigger>

      <Drawer.Content>
        <Drawer.Header>
          <Drawer.Title>Astralis Assistant</Drawer.Title>
          <Drawer.CloseButton />
        </Drawer.Header>

        <Drawer.Body>
          <div ref={logRef} className="flex flex-col gap-3">
            {messages.length === 0 && (
              <div className="flex flex-col gap-2">
                <Text size="sm" color="muted">
                  Try one of these:
                </Text>
                {STARTERS.map((s) => (
                  <Button
                    key={s}
                    variant="outline"
                    colorScheme="gray"
                    size="sm"
                    className="justify-start!"
                    onClick={() => ask(s)}
                  >
                    {s}
                  </Button>
                ))}
              </div>
            )}

            {messages.map((m, i) =>
              m.role === "user" ? (
                <div
                  key={i}
                  className="ml-8 self-end rounded-2xl rounded-br-md bg-accent-subtle px-3.5 py-2 text-sm text-accent-label"
                >
                  {m.text}
                </div>
              ) : (
                <div
                  key={i}
                  className="mr-4 min-w-0 max-w-[calc(100%-1rem)] self-start rounded-2xl rounded-bl-md border border-stroke-subtle bg-surface-panel px-3.5 py-2.5"
                >
                  <AssistantMarkdown>{m.text}</AssistantMarkdown>
                  {m.suggestions && m.suggestions.length > 0 && (
                    <div className="mt-2 flex flex-wrap gap-1.5">
                      {m.suggestions.map((s) => (
                        <Link
                          key={s.href}
                          href={s.href}
                          className="rounded-full border border-accent-stroke bg-accent-subtle px-2.5 py-1 text-xs font-medium text-accent-label"
                        >
                          {s.title}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ),
            )}

            {pending && (
              <div className="mr-4 min-w-0 max-w-[calc(100%-1rem)] self-start rounded-2xl rounded-bl-md border border-stroke-subtle bg-surface-panel px-3.5 py-2.5">
                {thinking ? <TypingDots /> : <AssistantMarkdown>{revealed}</AssistantMarkdown>}
              </div>
            )}
          </div>
        </Drawer.Body>

        <Drawer.Footer>
          <form
            className="flex w-full items-center gap-2"
            onSubmit={(e) => {
              e.preventDefault();
              ask(draft);
            }}
          >
            <Input
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
              placeholder="Ask about Astralis…"
              aria-label="Ask the assistant a question"
            />
            <Button type="submit" aria-label="Send" disabled={!draft.trim() || pending !== null}>
              <Icon as={SendHorizontal} size="sm" />
            </Button>
          </form>
        </Drawer.Footer>
      </Drawer.Content>
    </Drawer>
  );
}
