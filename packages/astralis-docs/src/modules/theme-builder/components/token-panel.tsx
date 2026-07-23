"use client";

import { Code, CodeBlock, Text } from "astralis-ui";
import { isDefaultState, type ThemeState } from "@/lib/theme-builder";
import { useShikiHtml } from "@/lib/use-shiki";

/** The right rail: empty at the defaults; the generated stylesheet once anything changes. */
export function TokenPanel({ state, css }: { state: ThemeState; css: string }) {
  const html = useShikiHtml(css, "css");
  const untouched = isDefaultState(state);

  return (
    <aside className="flex min-h-0 flex-col gap-2 max-lg:h-[70vh]">
      {untouched ? (
        <div className="flex h-full min-h-0 flex-col items-center justify-center gap-2 rounded-xl border border-dashed border-stroke-subtle p-6 text-center">
          <Text size="sm" weight="medium">
            Everything is at the library defaults
          </Text>
          <Text size="xs" color="subtle">
            Change any token on the left and your <Code>astralis-theme.css</Code> appears here,
            ready to copy.
          </Text>
        </div>
      ) : (
        <>
          <CodeBlock.Root variant="solid" size="sm" code={css} className="flex! h-full min-h-0 flex-col">
            <CodeBlock.Header>
              <CodeBlock.Title>astralis-theme.css</CodeBlock.Title>
              <CodeBlock.Control>
                <CodeBlock.CopyTrigger />
              </CodeBlock.Control>
            </CodeBlock.Header>
            <CodeBlock.Content className="shiki docs-scroll min-h-0 flex-1 overflow-y-auto">
              {html != null ? <CodeBlock.Code highlightedHtml={html} /> : <CodeBlock.Code />}
            </CodeBlock.Content>
          </CodeBlock.Root>
          <Text size="xs" color="subtle">
            Import after <Code>astralis-ui/styles.css</Code>.
            {state.brandColor && (
              <>
                {" "}
                Color-only alternative: <Code>npx astralis-cli theme &quot;{state.brandColor}&quot;</Code>
              </>
            )}
          </Text>
        </>
      )}
    </aside>
  );
}
