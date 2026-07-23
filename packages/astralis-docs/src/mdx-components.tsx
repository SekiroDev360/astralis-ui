import type { MDXComponents } from "mdx/types";
import type { ComponentPropsWithoutRef, ReactNode } from "react";
import React from "react";
import Link from "next/link";
import type { BundledLanguage } from "shiki";
// Flat parts, not the compound `Table.*`: this map is a Server Component, and a
// compound static accessed on a client-reference stub resolves to undefined
// across the RSC boundary. The individually-exported parts are their own
// references and render fine server-side.
import {
  Blockquote,
  Code,
  Separator,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "astralis-ui";
import { CodeBlock } from "@/modules/docs/code-block";
import { ComponentPreview } from "@/modules/docs/component-preview";
import { PropsTable } from "@/modules/docs/props-table";

type HeadingProps = ComponentPropsWithoutRef<"h2">;

/** Section heading with a hover anchor link (ids come from rehype-slug). */
function AnchorHeading(Tag: "h2" | "h3", baseClassName: string) {
  return function Heading({ id, children, ...props }: HeadingProps) {
    return (
      <Tag id={id} className={`group scroll-m-24 ${baseClassName}`} {...props}>
        {children}
        {id && (
          <a
            href={`#${id}`}
            aria-label="Link to this section"
            className="ml-2 text-accent-label opacity-0 transition-opacity group-hover:opacity-100"
          >
            #
          </a>
        )}
      </Tag>
    );
  };
}

/**
 * Fenced code blocks arrive as <pre><code className="language-x">…</code></pre>.
 * Re-render them through the Shiki CodeBlock instead.
 */
function Pre({ children }: { children?: ReactNode }) {
  const codeElement = React.Children.toArray(children).find(
    (child): child is React.ReactElement<{ className?: string; children?: ReactNode }> =>
      React.isValidElement(child),
  );

  const className = codeElement?.props.className ?? "";
  const lang = (className.replace("language-", "") || "tsx") as BundledLanguage;
  const code = codeElement?.props.children;

  if (typeof code !== "string") return <pre>{children}</pre>;

  return (
    <div className="my-6">
      <CodeBlock code={code} lang={lang} />
    </div>
  );
}

const components: MDXComponents = {
  h1: (props) => (
    <h1 className="font-display text-3xl font-semibold tracking-tight text-label" {...props} />
  ),
  h2: AnchorHeading("h2", "font-display mt-12 mb-4 border-t border-stroke-subtle pt-10 text-xl font-semibold tracking-tight text-label"),
  h3: AnchorHeading("h3", "font-display mt-8 mb-3 text-base font-semibold text-label"),
  p: (props) => (
    <p className="my-4 leading-7 text-label-muted [h1+&]:mt-3 [h1+&]:text-lg [h1+&]:text-label-muted" {...props} />
  ),
  a: ({ href = "", ...props }) => {
    const external = href.startsWith("http");
    const className =
      "font-medium text-accent-label underline decoration-accent-stroke underline-offset-4 transition-colors hover:decoration-accent-label";
    return external ? (
      <a href={href} className={className} target="_blank" rel="noreferrer" {...props} />
    ) : (
      <Link href={href} className={className} {...props} />
    );
  },
  ul: (props) => <ul className="my-4 list-disc space-y-2 pl-6 text-label-muted marker:text-label-subtle" {...props} />,
  ol: (props) => <ol className="my-4 list-decimal space-y-2 pl-6 text-label-muted marker:text-label-subtle" {...props} />,
  li: (props) => <li className="leading-7 [&>p]:my-0" {...props} />,
  strong: (props) => <strong className="font-semibold text-label" {...props} />,
  /*
   * Prose primitives that map 1:1 onto library components. The docs page for
   * each of these documents the very component now rendering it — Code,
   * Blockquote, Table and Separator all paint from the same tokens as the
   * examples beside them, which is the whole point of dogfooding.
   */
  code: (props) => <Code variant="outline" className="astralis:text-label-base" {...props} />,
  pre: Pre,
  blockquote: (props) => <Blockquote className="my-6" {...props} />,
  table: (props) => <Table variant="outline" className="docs-scroll my-6" {...props} />,
  thead: (props) => <TableHeader {...props} />,
  tbody: (props) => <TableBody {...props} />,
  tr: (props) => <TableRow {...props} />,
  th: (props) => <TableHead {...props} />,
  td: (props) => <TableCell className="leading-relaxed astralis:text-label-muted" {...props} />,
  hr: () => <Separator className="my-10" />,
  // Docs building blocks available in every MDX page without imports.
  ComponentPreview,
  PropsTable,
  CodeBlock,
};

export function useMDXComponents(): MDXComponents {
  return components;
}
