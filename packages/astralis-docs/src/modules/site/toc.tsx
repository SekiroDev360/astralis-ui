"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

interface TocEntry {
  id: string;
  text: string;
  level: 2 | 3;
}

/**
 * Builds its outline from the rendered article's h2/h3 headings (ids come
 * from rehype-slug) and scroll-spies them with an IntersectionObserver.
 */
export function Toc() {
  const pathname = usePathname();
  const [entries, setEntries] = useState<TocEntry[]>([]);
  const [activeId, setActiveId] = useState<string>("");

  useEffect(() => {
    const headings = Array.from(
      document.querySelectorAll<HTMLHeadingElement>("article h2[id], article h3[id]"),
    );

    setEntries(
      headings.map((h) => ({
        id: h.id,
        text: h.textContent ?? "",
        level: h.tagName === "H2" ? 2 : 3,
      })),
    );

    const observer = new IntersectionObserver(
      (observed) => {
        // The topmost heading inside the activation band wins.
        const visible = observed
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActiveId(visible[0].target.id);
      },
      { rootMargin: "-88px 0px -70% 0px" },
    );

    headings.forEach((h) => observer.observe(h));
    return () => observer.disconnect();
  }, [pathname]);

  if (entries.length === 0) return null;

  return (
    <nav aria-label="On this page" className="text-sm">
      <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.12em] text-label-subtle">
        On this page
      </p>
      <ul className="flex flex-col border-l border-stroke-subtle">
        {entries.map((entry) => {
          const active = entry.id === activeId;
          return (
            <li key={entry.id}>
              <a
                href={`#${entry.id}`}
                className={`-ml-px block border-l py-1 pr-2 transition-colors ${
                  entry.level === 3 ? "pl-7" : "pl-4"
                } ${
                  active
                    ? "border-accent font-medium text-accent-label"
                    : "border-transparent text-label-muted hover:text-label"
                }`}
              >
                {entry.text}
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
