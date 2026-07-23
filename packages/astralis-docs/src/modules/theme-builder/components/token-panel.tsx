"use client";

import { useState } from "react";
import { Button, Code, CodeBlock, Text } from "astralis-ui";
import { isDefaultState, type BuilderState } from "@/lib/theme-builder";
import { useShikiHtml } from "@/lib/use-shiki";

type Tab = "css" | "json";

/**
 * The right rail: empty at the defaults; once anything changes, the two
 * artifacts a consumer can actually use — a stylesheet for build-time theming,
 * or the seed object for <AstralisProvider tokens={…}> at runtime.
 */
export function TokenPanel({ state, css, json }: { state: BuilderState; css: string; json: string }) {
  const [tab, setTab] = useState<Tab>("css");
  const untouched = isDefaultState(state);

  const source = tab === "css" ? css : json;
  const html = useShikiHtml(source, tab === "css" ? "css" : "json");

  const [copied, setCopied] = useState(false);
  const share = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    } catch {
      // Clipboard blocked — the URL is in the address bar either way.
    }
  };

  if (untouched) {
    return (
      <aside className="flex min-h-0 flex-col gap-2 max-lg:h-[70vh]">
        <div className="flex h-full min-h-0 flex-col items-center justify-center gap-2 rounded-xl border border-dashed border-stroke-subtle p-6 text-center">
          <Text size="sm" weight="medium">
            Everything is at the library defaults
          </Text>
          <Text size="xs" color="subtle">
            Change any token on the left and your custom tokens appear here, ready to copy.
          </Text>
        </div>
      </aside>
    );
  }

  return (
    <aside className="flex min-h-0 flex-col gap-2 max-lg:h-[70vh]">
      <div className="flex items-center justify-between gap-2">
        <div className="flex gap-1">
          {(["css", "json"] as const).map((value) => (
            <Button
              key={value}
              size="xs"
              variant={tab === value ? "subtle" : "text"}
              colorScheme={tab === value ? "brand" : "gray"}
              onClick={() => setTab(value)}
            >
              {value === "css" ? "Stylesheet" : "Provider props"}
            </Button>
          ))}
        </div>
        <Button size="xs" variant="outline" colorScheme="gray" onClick={share}>
          {copied ? "Link copied" : "Share"}
        </Button>
      </div>

      <CodeBlock.Root
        variant="solid"
        size="sm"
        code={source}
        className="flex! h-full min-h-0 flex-col"
        /* Remount on tab change so the copy control never holds the other tab's text. */
        key={tab}
      >
        <CodeBlock.Header>
          <CodeBlock.Title>{tab === "css" ? "astralis-theme.css" : "tokens"}</CodeBlock.Title>
          <CodeBlock.Control>
            <CodeBlock.CopyTrigger />
          </CodeBlock.Control>
        </CodeBlock.Header>
        <CodeBlock.Content className="shiki docs-scroll min-h-0 flex-1 overflow-y-auto">
          {html != null ? <CodeBlock.Code highlightedHtml={html} /> : <CodeBlock.Code />}
        </CodeBlock.Content>
      </CodeBlock.Root>

      <Text size="xs" color="subtle">
        {tab === "css" ? (
          <>
            Import after <Code>astralis-ui/styles.css</Code>. Or generate it from the terminal:{" "}
            <Code>npx astralis-cli theme</Code>
          </>
        ) : (
          <>
            Pass to <Code>{"<AstralisProvider tokens={…}>"}</Code> — same math as the stylesheet.
          </>
        )}
      </Text>
    </aside>
  );
}
