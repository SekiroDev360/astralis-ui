"use client";

import { useEffect, useState } from "react";

/**
 * Client-side Shiki highlighting with the docs' dual-theme pair. Shiki loads
 * lazily in its own chunk the first time any consumer needs it; results are
 * cached per (lang, code). Returns the INNER html (Shiki's <pre><code> shell
 * stripped) ready for CodeBlock.Code's highlightedHtml — or null while
 * loading / for never-seen code, so callers fall back to plain text of the
 * CURRENT code instead of flashing a stale highlight.
 *
 * Used by the assistant's chat fences and the theme builder's token panel.
 */

const cache = new Map<string, string>();
const MAX_CACHE = 300; // slider drags generate many one-off variants

export function useShikiHtml(code: string, lang: string): string | null {
  const key = `${lang}\n${code}`;
  // State exists only to re-render when an inflight highlight lands; the
  // cache is the source of truth so a key change never shows stale html.
  const [, bump] = useState(0);

  useEffect(() => {
    if (cache.has(key)) return;
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
        if (cache.size >= MAX_CACHE) cache.clear();
        cache.set(key, inner);
        if (!cancelled) bump((n) => n + 1);
      })
      .catch(() => {}); // unknown lang / load failure → stay unhighlighted
    return () => {
      cancelled = true;
    };
  }, [key, code, lang]);

  return cache.get(key) ?? null;
}
