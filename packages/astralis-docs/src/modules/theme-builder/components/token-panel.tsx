"use client";

import { useState } from "react";
import { Button, Code, CodeBlock, Tabs, Text } from "astralis-ui";
import { isDefaultState, type BuilderState } from "@/lib/theme-builder";
import { useShikiHtml } from "@/lib/use-shiki";

/**
 * The two artifacts a consumer can actually use: a stylesheet for build-time
 * theming, or the seed object for `<AstralisProvider tokens={…}>` at runtime.
 */
const EXPORTS = [
  { value: "css", label: "Stylesheet", filename: "astralis-theme.css", lang: "css" },
  { value: "json", label: "Provider props", filename: "tokens", lang: "json" },
] as const;

type ExportTab = (typeof EXPORTS)[number];

/**
 * One export panel. Split out so `useShikiHtml` runs for the visible tab only —
 * Tabs unmounts the inactive panel, which also replaces the manual `key` remount
 * that used to stop the copy control holding the other tab's text.
 */
function ExportView({ tab, source }: { tab: ExportTab; source: string }) {
  const html = useShikiHtml(source, tab.lang);

  return (
    <>
      <CodeBlock.Root variant="solid" size="sm" code={source} className="flex! h-full min-h-0 flex-col">
        <CodeBlock.Header>
          <CodeBlock.Title>{tab.filename}</CodeBlock.Title>
          <CodeBlock.Control>
            <CodeBlock.CopyTrigger />
          </CodeBlock.Control>
        </CodeBlock.Header>
        <CodeBlock.Content className="shiki docs-scroll min-h-0 flex-1 overflow-y-auto">
          {html != null ? <CodeBlock.Code highlightedHtml={html} /> : <CodeBlock.Code />}
        </CodeBlock.Content>
      </CodeBlock.Root>

      <Text size="xs" color="subtle">
        {tab.value === "css" ? (
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
    </>
  );
}

/** The right rail: empty at the defaults, then the copyable output. */
export function TokenPanel({ state, css, json }: { state: BuilderState; css: string; json: string }) {
  const [tab, setTab] = useState<ExportTab["value"]>("css");
  const untouched = isDefaultState(state);

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
        <div className="flex h-full min-h-0 flex-col items-center justify-center gap-2 rounded-xl border border-dashed border-stroke p-6 text-center">
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
    <aside className="flex min-h-0 flex-col max-lg:h-[70vh]">
      <Tabs
        value={tab}
        onValueChange={(value) => setTab(value as ExportTab["value"])}
        variant="segmented"
        size="sm"
        /* Prefixed so astralisMerge recognises the conflict and drops the
           root's own gap-4 — an unprefixed gap-2 would just race it. */
        className="min-h-0 flex-1 astralis:gap-2"
      >
        <div className="flex items-center justify-between gap-2">
          <Tabs.List aria-label="Export format">
            {EXPORTS.map((item) => (
              <Tabs.Trigger key={item.value} value={item.value}>
                {item.label}
              </Tabs.Trigger>
            ))}
          </Tabs.List>
          <Button size="xs" variant="outline" colorScheme="gray" onClick={share}>
            {copied ? "Link copied" : "Share"}
          </Button>
        </div>

        {EXPORTS.map((item) => (
          <Tabs.Content key={item.value} value={item.value} className="flex min-h-0 flex-col gap-2">
            <ExportView tab={item} source={item.value === "css" ? css : json} />
          </Tabs.Content>
        ))}
      </Tabs>
    </aside>
  );
}
