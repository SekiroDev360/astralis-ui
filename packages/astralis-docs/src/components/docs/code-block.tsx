import { codeToHtml } from "shiki";
import type { BundledLanguage } from "shiki";
import {
  CodeBlockRoot,
  CodeBlockHeader,
  CodeBlockTitle,
  CodeBlockContent,
  CodeBlockCode,
  CodeBlockCopyTrigger,
} from "astralis-ui";

interface CodeBlockProps {
  code: string;
  lang?: BundledLanguage;
  /** Optional filename rendered in a header strip above the code. */
  filename?: string;
}

/**
 * Server-rendered Shiki code block, built on the library's own CodeBlock
 * compound — every block on the site dogfoods the real component. Highlights
 * with a light + dark theme pair; `.astralis-dark` swaps token colors via the
 * --shiki-dark variables (see globals.css). Shiki's outer `<pre><code>` shell
 * is stripped so `CodeBlock.Content`/`Code` own the structure; backgrounds
 * come from our own tokens, not the Shiki theme.
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
  const inner = html.replace(/^<pre[^>]*>\s*<code[^>]*>/, "").replace(/<\/code>\s*<\/pre>\s*$/, "");

  return (
    <CodeBlockRoot
      variant="solid"
      code={trimmed}
      className="group relative my-0 rounded-xl border border-stroke-subtle bg-surface-subtle dark:bg-panel"
    >
      {filename && (
        <CodeBlockHeader className="border-stroke-subtle py-2.5 font-normal text-label-muted">
          <CodeBlockTitle>{filename}</CodeBlockTitle>
        </CodeBlockHeader>
      )}
      <div className="absolute right-2.5 top-2.5 z-10 opacity-0 transition-opacity group-hover:opacity-100 group-focus-within:opacity-100">
        <CodeBlockCopyTrigger className="border border-stroke-subtle bg-surface text-label-muted hover:text-label" />
      </div>
      <CodeBlockContent className="shiki docs-scroll p-4 text-[13px] leading-relaxed">
        <CodeBlockCode highlightedHtml={inner} />
      </CodeBlockContent>
    </CodeBlockRoot>
  );
}
