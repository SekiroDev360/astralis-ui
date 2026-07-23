"use client";

import { useEffect, useMemo, useRef, useState, useSyncExternalStore } from "react";
import { Sparkles, SendHorizontal } from "lucide-react";
import {
  Button,
  Drawer,
  FloatingButton,
  Icon,
  Input,
  Tag,
  Text,
  type FloatingButtonPosition,
} from "astralis-ui";
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
  "I couldn't get you a proper answer for that one right now. ";

/* ------------------------------------------------------------------ */
/* Launcher position                                                   */
/* ------------------------------------------------------------------ */

const POSITION_KEY = "astralis-assistant-position";

const subscribeToPosition = (onChange: () => void) => {
  window.addEventListener("storage", onChange);
  return () => window.removeEventListener("storage", onChange);
};

const readPosition = () => {
  try {
    return window.localStorage.getItem(POSITION_KEY);
  } catch {
    return null; // private browsing
  }
};

/**
 * Where the launcher was last dragged to, or null for its resting corner.
 *
 * useSyncExternalStore rather than an effect: the server has no localStorage,
 * and this is the hook that reconciles that without a hydration mismatch or a
 * setState cascade.
 */
function useStoredPosition(): FloatingButtonPosition | null {
  const raw = useSyncExternalStore(subscribeToPosition, readPosition, () => null);
  return useMemo(() => {
    if (!raw) return null;
    try {
      const parsed = JSON.parse(raw);
      return typeof parsed?.x === "number" && typeof parsed?.y === "number"
        ? { x: parsed.x, y: parsed.y }
        : null;
    } catch {
      return null;
    }
  }, [raw]);
}

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

/** The graceful fallback when Tier 1 is unreachable, unconfigured, or rate limited. */
function missAnswer(question: string): ChatMessage {
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
  // Tier 0 hits animate via `pending`; Tier 1 questions stream via `live`.
  const [pending, setPending] = useState<ChatMessage | null>(null);
  const [live, setLive] = useState<string | null>(null);
  const [thinking, setThinking] = useState(false);
  const [revealed, setRevealed] = useState("");
  const logRef = useRef<HTMLDivElement>(null);

  /*
   * Launcher position. `storedPosition` is where it was left last visit;
   * `position` is this session's drag, and wins once there is one — so the
   * button restores without an effect and still moves freely.
   */
  const storedPosition = useStoredPosition();
  const [position, setPosition] = useState<FloatingButtonPosition | null>(null);

  /*
   * The launcher stays invisible until after hydration. localStorage is
   * unreadable on the server, so the first paint always rests at `placement`
   * (center-bottom); only once `storedPosition` resolves on the client does a
   * saved drag apply. Painting that transition is the flash — center-bottom,
   * then a jump to the remembered spot. Holding opacity until we're past
   * hydration lets it fade in once, already at its final position.
   */
  const [hydrated, setHydrated] = useState(false);
  useEffect(() => setHydrated(true), []);

  // Controlled so the launcher can hide while the chat is open — a FAB peeking
  // out from behind the drawer is just noise once you're already in it.
  const [open, setOpen] = useState(false);

  const persistPosition = (next: FloatingButtonPosition) => {
    try {
      window.localStorage.setItem(POSITION_KEY, JSON.stringify(next));
    } catch {
      // Private browsing — the position just won't survive a reload.
    }
  };

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

  // Tier 1: stream the model's answer straight into the reply bubble.
  useEffect(() => {
    if (!live) return;
    let cancelled = false;
    const controller = new AbortController();
    setThinking(true);
    setRevealed("");

    (async () => {
      try {
        const res = await fetch("/api/assistant", {
          method: "POST",
          headers: { "content-type": "application/json" },
          body: JSON.stringify({ question: live }),
          signal: controller.signal,
        });
        if (!res.ok || !res.body) throw new Error(String(res.status));

        const reader = res.body.getReader();
        const decoder = new TextDecoder();
        let text = "";
        while (true) {
          const { done, value } = await reader.read();
          if (done || cancelled) break;
          text += decoder.decode(value, { stream: true });
          setThinking(false);
          setRevealed(text);
        }
        if (cancelled) return;
        setMessages((prev) => [...prev, { role: "assistant", text }]);
        setLive(null);
      } catch {
        if (cancelled) return;
        // Unconfigured (503), rate limited (429), or down → page suggestions.
        setLive(null);
        setPending(missAnswer(live));
      }
    })();

    return () => {
      cancelled = true;
      controller.abort();
    };
  }, [live]);

  const ask = (question: string) => {
    const q = question.trim();
    if (!q || pending || live) return;
    setMessages((prev) => [...prev, { role: "user", text: q }]);
    const hit = matchTier0(q);
    if (hit) {
      setPending({ role: "assistant", text: hit.entry.answer });
    } else {
      setLive(q);
    }
    setDraft("");
  };

  return (
    <Drawer placement="right" size="lg" open={open} onOpenChange={setOpen}>
      <Drawer.Trigger>
        {/* Draggable: the launcher sits over page content, and on a short page
            it can cover the very thing you came to read. */}
        <FloatingButton
          aria-label="Open the Astralis Assistant"
          size="md"
          placement="center-bottom"
          position={position ?? storedPosition}
          onPositionChange={setPosition}
          onPositionCommit={persistPosition}
          leftIcon={<Icon as={Sparkles} size="sm" />}
          /* Invisible until hydration resolves the stored position (otherwise
             the SSR paint rests at center-bottom and visibly jumps to a saved
             drag spot), and again while the drawer is open — the chat is on
             screen, so its launcher is redundant. Fades either way. */
          wrapperClassName={
            hydrated && !open
              ? "astralis:transition-opacity astralis:duration-fast astralis:opacity-100"
              : "astralis:transition-opacity astralis:duration-fast astralis:opacity-0 astralis:pointer-events-none"
          }
        >
          Ask
        </FloatingButton>
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
                        <Link key={s.href} href={s.href} target="_blank">
                          <Tag variant="surface" colorScheme="brand" size="sm" className="astralis:rounded-full">
                            {s.title}
                          </Tag>
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ),
            )}

            {(pending || live) && (
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
            <Button type="submit" aria-label="Send" disabled={!draft.trim() || pending !== null || live !== null}>
              <Icon as={SendHorizontal} size="sm" />
            </Button>
          </form>
        </Drawer.Footer>
      </Drawer.Content>
    </Drawer>
  );
}
