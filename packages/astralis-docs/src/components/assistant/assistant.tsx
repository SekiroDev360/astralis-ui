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
  const logRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    logRef.current?.scrollTo({ top: logRef.current.scrollHeight });
  }, [messages]);

  const ask = (question: string) => {
    const q = question.trim();
    if (!q) return;
    setMessages((prev) => [...prev, { role: "user", text: q }, answer(q)]);
    setDraft("");
  };

  return (
    <Drawer placement="right" size="md">
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
          <div ref={logRef} className="flex h-full flex-col gap-3 overflow-y-auto docs-scroll">
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
                  className="mr-4 self-start rounded-2xl rounded-bl-md border border-stroke-subtle bg-surface-panel px-3.5 py-2.5"
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
            <Button type="submit" aria-label="Send" disabled={!draft.trim()}>
              <Icon as={SendHorizontal} size="sm" />
            </Button>
          </form>
        </Drawer.Footer>
      </Drawer.Content>
    </Drawer>
  );
}
