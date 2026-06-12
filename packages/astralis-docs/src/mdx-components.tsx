import type { MDXComponents } from "mdx/types";
import React from "react";
import { codeToHtml } from "shiki";

// A custom Pre component that highlights the code using Shiki
async function HighlightedPre({ children, ...props }: any) {
  // Extract code element
  const codeElement = React.Children.toArray(children).find(
    (child) => React.isValidElement(child) && child.type === "code"
  );

  if (codeElement && React.isValidElement(codeElement)) {
    const { className, children: codeText } = codeElement.props as any;
    const lang = className?.replace("language-", "") || "tsx";
    const codeString = typeof codeText === "string" ? codeText : "";

    try {
      const html = await codeToHtml(codeString.trim(), {
        lang,
        theme: "github-dark",
      });
      return (
        <div 
          className="my-4 overflow-x-auto rounded-xl border border-zinc-200 dark:border-zinc-800 text-sm [&>pre]:p-4 [&>pre]:outline-none"
          dangerouslySetInnerHTML={{ __html: html }}
        />
      );
    } catch (e) {
      console.error("Failed to highlight code with shiki:", e);
    }
  }

  return <pre {...props}>{children}</pre>;
}

// This file is required to use MDX in Next.js App Router
export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    ...components,
    pre: HighlightedPre as any,
  };
}

