"use client";

import Link from "next/link";
import { useEffect, useState, type ReactNode } from "react";
import { Code, CodeBlockRoot, CodeBlockContent, CodeBlockCode } from "astralis-ui";

/**
 * Renders the tiny markdown subset used by assistant answers: paragraphs,
 * ``` fences, - lists, `inline code`, **bold**, [links](). Deliberately not
 * a real markdown parser — answers are authored by us (tier0.ts) or, later,
 * generated under our own prompt, so the subset is a contract, not a guess.
 * Code renders through the library's Code/CodeBlock.
 */

const highlightCache = new Map<string, string>();

/**
 * A fence rendered through the library CodeBlock, highlighted with the same
 * Shiki theme pair as the docs' server-side blocks. The chat is client-side,
 * so Shiki loads lazily in its own chunk the first time a fence renders; the
 * code shows unhighlighted for that beat, then colors in.
 */
function FencedCode({ code, lang }: { code: string; lang: string }) {
  const key = `${lang}\n${code}`;
  const [html, setHtml] = useState<string | null>(() => highlightCache.get(key) ?? null);

  useEffect(() => {
    if (highlightCache.has(key)) {
      setHtml(highlightCache.get(key)!);
      return;
    }
    let cancelled = false;
    import("shiki")
      .then(async ({ codeToHtml }) => {
        const full = await codeToHtml(code, {
          lang,
          themes: { light: "github-light-default", dark: "github-dark-default" },
          defaultColor: "light",
        });
        // Strip Shiki's own <pre><code> shell — CodeBlock.Content/Code own the structure.
        const inner = full.replace(/^<pre[^>]*>\s*<code[^>]*>/, "").replace(/<\/code>\s*<\/pre>\s*$/, "");
        highlightCache.set(key, inner);
        if (!cancelled) setHtml(inner);
      })
      .catch(() => {}); // unknown lang / load failure → stay unhighlighted
    return () => {
      cancelled = true;
    };
  }, [key, code, lang]);

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
      const className = "font-medium text-accent-label underline underline-offset-2";
      // Always a new tab — navigating in place would leave the chat behind.
      parts.push(
        href.startsWith("http") ? (
          <a key={key} href={href} className={className} target="_blank" rel="noreferrer">
            {label}
          </a>
        ) : (
          <Link key={key} href={href} className={className} target="_blank">
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
          <ul key={`b${i}-p${p}`} className="my-2 flex list-disc flex-col gap-1 pl-4 marker:text-label-subtle">
            {lines.map((l, li) => (
              <li key={li}>{inline(l.trim().replace(/^(-|\d+\.)\s/, ""), `b${i}-p${p}-l${li}`)}</li>
            ))}
          </ul>,
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
