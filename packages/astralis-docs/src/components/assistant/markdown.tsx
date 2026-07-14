import Link from "next/link";
import type { ReactNode } from "react";

/**
 * Renders the tiny markdown subset used by assistant answers: paragraphs,
 * ``` fences, - lists, `inline code`, **bold**, [links](). Deliberately not
 * a real markdown parser — answers are authored by us (tier0.ts) or, later,
 * generated under our own prompt, so the subset is a contract, not a guess.
 * (The docs' Shiki CodeBlock is server-only; the chat renders client-side.)
 */

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
        <code key={key} className="rounded bg-surface-subtle border border-stroke-subtle px-1 py-px font-mono text-[12px]">
          {token.slice(1, -1)}
        </code>,
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
      parts.push(
        href.startsWith("http") ? (
          <a key={key} href={href} className={className} target="_blank" rel="noreferrer">
            {label}
          </a>
        ) : (
          <Link key={key} href={href} className={className}>
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
        <pre
          key={`code${i}`}
          className="docs-scroll my-2 overflow-x-auto rounded-lg border border-stroke-subtle bg-surface-subtle p-3 font-mono text-[12px] leading-relaxed"
        >
          <code>{segments[i + 2].trimEnd()}</code>
        </pre>,
      );
    }
  }

  return <div className="text-sm text-label-muted [&>*:first-child]:mt-0 [&>*:last-child]:mb-0">{blocks}</div>;
}
