"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ThemeToggle } from "astralis-ui";
import { Logo } from "./logo";

const links = [
  { title: "Docs", href: "/docs" },
  { title: "Components", href: "/docs/components/button" },
];

export function Header() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 border-b border-stroke-subtle bg-surface/75 backdrop-blur-xl">
      <div className="mx-auto flex h-14 max-w-screen-2xl items-center justify-between px-4 lg:px-8">
        <div className="flex items-center gap-8">
          <Logo />
          <nav className="hidden items-center gap-1 md:flex" aria-label="Main">
            {links.map((link) => {
              const active =
                link.href === "/docs"
                  ? pathname === "/docs" || (pathname.startsWith("/docs") && !pathname.startsWith("/docs/components"))
                  : pathname.startsWith("/docs/components");
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`rounded-lg px-3 py-1.5 text-sm transition-colors ${
                    active
                      ? "text-label"
                      : "text-label-muted hover:bg-surface-subtle hover:text-label"
                  }`}
                >
                  {link.title}
                </Link>
              );
            })}
          </nav>
        </div>

        <div className="flex items-center gap-2">
          <span className="hidden rounded-full border border-accent-stroke bg-accent-subtle px-2.5 py-1 text-[11px] font-medium text-accent-label sm:inline-block">
            v0.1 · in development
          </span>
          <span className="mx-1 hidden h-4 w-px bg-stroke-subtle sm:block" aria-hidden="true" />
          <ThemeToggle variant="text" colorScheme="gray" size="sm" aria-label="Toggle theme" />
        </div>
      </div>
    </header>
  );
}
