import { codeToHtml } from "shiki";
import type { BundledLanguage } from "shiki";
import { CopyButton } from "./copy-button";

interface CodeBlockProps {
  code: string;
  lang?: BundledLanguage;
  /** Optional filename rendered in a header strip above the code. */
  filename?: string;
}

/**
 * Server-rendered Shiki code block. Highlights with a light + dark theme pair;
 * `.astralis-dark` swaps token colors via the --shiki-dark variables (see
 * globals.css). Backgrounds come from our own tokens, not the Shiki theme.
 */
export async function CodeBlock({ code, lang = "tsx", filename }: CodeBlockProps) {
  const trimmed = code.trim();
  const html = await codeToHtml(trimmed, {
    lang,
    themes: {
      light: "github-light-default",
      dark: "github-dark-default",
    },
    defaultColor: "light",
  });

  return (
    <figure className="group relative my-0 overflow-hidden rounded-xl border border-stroke-subtle bg-surface-subtle dark:bg-panel">
      {filename && (
        <figcaption className="flex items-center gap-2 border-b border-stroke-subtle px-4 py-2.5 font-mono text-xs text-label-muted">
          {filename}
        </figcaption>
      )}
      <div className="absolute right-2.5 top-2.5 z-10 opacity-0 transition-opacity group-hover:opacity-100 group-focus-within:opacity-100">
        <CopyButton text={trimmed} />
      </div>
      <div
        className="docs-scroll overflow-x-auto p-4 font-mono text-[13px] leading-relaxed [&_pre]:outline-none"
        dangerouslySetInnerHTML={{ __html: html }}
      />
    </figure>
  );
}
