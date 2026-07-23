"use client";

import NextLink from "next/link";
import type { ReactNode } from "react";
import { Code, CodeBlockRoot, CodeBlockContent, CodeBlockCode, Link, List } from "astralis-ui";
import { useShikiHtml } from "@/lib/use-shiki";

/**
 * Renders the tiny markdown subset used by assistant answers: paragraphs,
 * ``` fences, - lists, `inline code`, **bold**, [links](). Deliberately not
 * a real markdown parser — answers are authored by us (tier0.ts) or, later,
 * generated under our own prompt, so the subset is a contract, not a guess.
 * Code renders through the library's Code/CodeBlock.
 */

/**
 * A fence rendered through the library CodeBlock, highlighted with the same
 * Shiki theme pair as the docs' server-side blocks (lazy, cached — see
 * use-shiki.ts). Unhighlighted for a beat on first load, then colors in.
 */
function FencedCode({ code, lang }: { code: string; lang: string }) {
  const html = useShikiHtml(code, lang);

  return (
    <CodeBlockRoot variant="solid" size="sm" className="my-2 rounded-lg border border-stroke-subtle">
      <CodeBlockContent className="shiki docs-scroll leading-relaxed">
        {html != null ? <CodeBlockCode highlightedHtml={html} /> : <CodeBlockCode>{code}</CodeBlockCode>}
      </CodeBlockContent>
    </CodeBlockRoot>
  );
}

function inline(text: string, keyPrefix: string): ReactNode[] {
  const parts: ReactNode[] = [];
  // Order matters: code spans first so their contents aren't re-parsed.
  const pattern = /(`[^`]+`)|(\*\*[^*]+\*\*)|(\[[^\]]+\]\([^)]+\))/g;
  let last = 0;
  let i = 0;
  for (const m of text.matchAll(pattern)) {
    if (m.index! > last) parts.push(text.slice(last, m.index));
    const token = m[0];
    const key = `${keyPrefix}-${i++}`;
    if (token.startsWith("`")) {
      parts.push(
        <Code key={key} size="sm">
          {token.slice(1, -1)}
        </Code>,
      );
    } else if (token.startsWith("**")) {
      parts.push(
        <strong key={key} className="font-semibold text-label">
          {token.slice(2, -2)}
        </strong>,
      );
    } else {
      const link = token.match(/\[([^\]]+)\]\(([^)]+)\)/)!;
      const [, label, href] = link;
      /*
       * Always a new tab — navigating in place would leave the chat behind.
       * An off-site href gets `external`, which adds rel="noopener noreferrer"
       * and the ↗ marker; an in-app one renders through Next's Link so the
       * route is still client-side.
       */
      const external = href.startsWith("http");
      parts.push(
        external ? (
          <Link key={key} href={href} variant="underline" external className="font-medium">
            {label}
          </Link>
        ) : (
          <Link
            key={key}
            as={NextLink}
            href={href}
            variant="underline"
            target="_blank"
            className="font-medium"
          >
            {label}
          </Link>
        ),
      );
    }
    last = m.index! + token.length;
  }
  if (last < text.length) parts.push(text.slice(last));
  return parts;
}

export function AssistantMarkdown({ children }: { children: string }) {
  const blocks: ReactNode[] = [];
  // Split out fenced code blocks first; everything between is prose.
  const segments = children.split(/```(\w*)\n([\s\S]*?)```/g);

  for (let i = 0; i < segments.length; i += 3) {
    const prose = segments[i];
    for (const [p, para] of prose.split(/\n{2,}/).entries()) {
      const trimmed = para.trim();
      if (!trimmed) continue;
      const lines = trimmed.split("\n");
      const isList = lines.every((l) => /^(-|\d+\.)\s/.test(l.trim()));
      if (isList) {
        blocks.push(
          <List key={`b${i}-p${p}`} spacing="1" className="my-2 marker:text-label-subtle">
            {lines.map((l, li) => (
              <List.Item key={li}>
                {inline(l.trim().replace(/^(-|\d+\.)\s/, ""), `b${i}-p${p}-l${li}`)}
              </List.Item>
            ))}
          </List>,
        );
      } else {
        blocks.push(
          <p key={`b${i}-p${p}`} className="my-2 leading-relaxed">
            {inline(trimmed.replace(/\n/g, " "), `b${i}-p${p}`)}
          </p>,
        );
      }
    }
    if (i + 2 < segments.length) {
      blocks.push(
        <FencedCode key={`code${i}`} lang={segments[i + 1] || "tsx"} code={segments[i + 2].trimEnd()} />,
      );
    }
  }

  return <div className="text-sm text-label-muted [&>*:first-child]:mt-0 [&>*:last-child]:mb-0">{blocks}</div>;
}
