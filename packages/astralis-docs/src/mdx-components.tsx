import type { MDXComponents } from "mdx/types";

// This file is required to use MDX in Next.js App Router
export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    // Allows customizing built-in markdown elements, e.g. custom headings, code blocks, links, etc.
    ...components,
  };
}
