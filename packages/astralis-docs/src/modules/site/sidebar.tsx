"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";
import { navigation } from "@/lib/navigation";

function Badge({ children }: { children: React.ReactNode }) {
  return (
    <span className="rounded border border-stroke-subtle bg-surface-subtle px-1 py-px text-[9px] font-medium uppercase tracking-wider text-label-subtle">
      {children}
    </span>
  );
}

export function Sidebar() {
  const pathname = usePathname();
  const activeLinkRef = useRef<HTMLAnchorElement>(null);

  // Keep the active link visible: when a page loads (or navigation happens via
  // search/TOC/links) with the active item outside the sidebar's viewport,
  // scroll the sidebar — and only the sidebar — so the item sits near the top.
  useEffect(() => {
    const link = activeLinkRef.current;
    if (!link) return;

    let container: HTMLElement | null = link.parentElement;
    while (container && container.scrollHeight <= container.clientHeight) {
      container = container.parentElement;
    }
    if (!container) return;

    const linkTop =
      link.getBoundingClientRect().top - container.getBoundingClientRect().top + container.scrollTop;
    const outOfView =
      linkTop < container.scrollTop + 40 ||
      linkTop > container.scrollTop + container.clientHeight - 56;

    // Headroom above the link so its group label stays readable.
    if (outOfView) container.scrollTo({ top: Math.max(0, linkTop - 88) });
  }, [pathname]);

  return (
    <nav className="flex flex-col gap-7 pb-12" aria-label="Docs">
      {navigation.map((group) => (
        <div key={group.title}>
          <p className="mb-2 px-2.5 text-[11px] font-semibold uppercase tracking-[0.12em] text-label-subtle">
            {group.title}
          </p>
          <ul className="flex flex-col gap-px">
            {group.items.map((item) => {
              if (item.status === "soon") {
                return (
                  <li key={item.href}>
                    <span className="flex cursor-default items-center justify-between rounded-lg px-2.5 py-1.5 text-sm text-label-subtle">
                      {item.title}
                      <Badge>soon</Badge>
                    </span>
                  </li>
                );
              }

              const active = pathname === item.href;
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    ref={active ? activeLinkRef : undefined}
                    aria-current={active ? "page" : undefined}
                    className={`flex items-center justify-between rounded-lg px-2.5 py-1.5 text-sm transition-colors ${
                      active
                        ? "bg-accent-subtle font-medium text-accent-label"
                        : "text-label-muted hover:bg-surface-subtle hover:text-label"
                    }`}
                  >
                    {item.title}
                    {item.status === "new" && (
                      <span className="rounded border border-accent-stroke bg-accent-subtle px-1 py-px text-[9px] font-medium uppercase tracking-wider text-accent-label">
                        new
                      </span>
                    )}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      ))}
    </nav>
  );
}
