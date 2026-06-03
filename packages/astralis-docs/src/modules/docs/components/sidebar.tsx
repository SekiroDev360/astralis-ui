"use client";

import { Icon } from "astralis-ui";
import Link from "next/link";
import { usePathname } from "next/navigation";

export interface SidebarLink {
  name: string;
  url: string;
}

export interface SidebarSection {
  title: string;
  links: SidebarLink[];
}

interface SidebarProps {
  sections: SidebarSection[];
}

export default function Sidebar({ sections }: SidebarProps) {
  const pathname = usePathname();

  return (
    <div className="w-[25%] dark:bg-white/5 shadow-xl h-[480px] rounded-xl flex flex-col overflow-y-auto">
      {sections.map((section) => (
        <div key={section.title} className="relative pl-10 pr-5 pt-4 pb-2 last:pb-4">
          <h4 className="mb-3 font-semibold text-zinc-900 dark:text-zinc-50">{section.title}</h4>
          
          <div className="flex flex-col gap-2 text-sm">
            {section.links.map((link) => {
              const isActive = pathname === link.url;

              return (
                <Link
                  key={link.name}
                  href={link.url}
                  className={`${
                    isActive
                      ? "bg-purple-900/20 text-purple-500 font-semibold"
                      : "hover:bg-purple-900/20 hover:text-purple-500 hover:font-semibold text-zinc-500 dark:text-zinc-400"
                  } rounded-lg py-1.5 px-3 flex items-center justify-between duration-100 ease-in`}
                >
                  {link.name}
                  {isActive && <Icon name="ChevronRight" size={18} />}
                </Link>
              );
            })}
          </div>

          {/* Reusable vertical line design from original sidebar */}
          <div className="absolute top-0 left-4 pt-[22px] h-full flex flex-col items-center justify-center">
            <Icon name="Star" size={10} />
            <div className="w-[1px] h-[100%] bg-zinc-200 dark:bg-zinc-700" />
          </div>
        </div>
      ))}
    </div>
  );
}
