import type { MDXComponents } from "mdx/types";
import type { ComponentPropsWithoutRef, ReactNode } from "react";
import React from "react";
import Link from "next/link";
import type { BundledLanguage } from "shiki";
import { CodeBlock } from "@/components/docs/code-block";
import { ComponentPreview } from "@/components/docs/component-preview";
import { PropsTable } from "@/components/docs/props-table";

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
  code: (props) => (
    <code
      className="rounded-md border border-stroke-subtle bg-surface-subtle px-1.5 py-0.5 font-mono text-[13px] text-label"
      {...props}
    />
  ),
  pre: Pre,
  blockquote: (props) => (
    <blockquote className="my-6 border-l-2 border-accent-stroke pl-4 text-label-muted italic" {...props} />
  ),
  table: (props) => (
    <div className="docs-scroll my-6 overflow-x-auto rounded-xl border border-stroke-subtle">
      <table className="w-full border-collapse text-left text-sm" {...props} />
    </div>
  ),
  th: (props) => (
    <th className="border-b border-stroke-subtle bg-surface-subtle px-4 py-2.5 font-medium text-label" {...props} />
  ),
  td: (props) => (
    <td className="border-b border-stroke-subtle px-4 py-3 leading-relaxed text-label-muted [tr:last-child_&]:border-b-0" {...props} />
  ),
  hr: () => <hr className="my-10 border-stroke-subtle" />,
  // Docs building blocks available in every MDX page without imports.
  ComponentPreview,
  PropsTable,
  CodeBlock,
};

export function useMDXComponents(): MDXComponents {
  return components;
}
