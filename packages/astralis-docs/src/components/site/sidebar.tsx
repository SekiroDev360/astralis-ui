"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
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
