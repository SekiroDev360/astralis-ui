import React from "react";
import Sidebar from "../components/sidebar";
import type { ComponentLink, ComponentSection } from "./types";

export const COMPONENT_SECTIONS: ComponentSection[] = [
  {
    title: 'Navigation',
    links: [
      { name: 'Tabs', url: '/documentation/components/tabs', slug: 'tabs', content: 'Tabs component content - Renders custom tabbed panels for navigating sections.' },
      { name: 'Steps', url: '/documentation/components/steps', slug: 'steps', content: 'Steps component content - Renders guided wizard progress lists.' }
    ]
  },
  {
    title: 'Buttons',
    links: [
      { name: 'Button', url: '/documentation/components/button', slug: 'button', content: 'Button component content - Premium interactive button element.' },
      { name: 'ThemeToggle', url: '/documentation/components/theme-toggle', slug: 'theme-toggle', content: 'ThemeToggle component content - Dynamic light/dark theme toggle controller.' }
    ]
  }
];

interface LibraryComponentsProps {
  slug?: string;
}

export default function LibraryComponents({ slug }: LibraryComponentsProps) {
  let activeLink: ComponentLink | undefined;
  
  if (slug) {
    for (const section of COMPONENT_SECTIONS) {
      const match = section.links.find((l) => l.slug === slug);
      if (match) {
        activeLink = match;
        break;
      }
    }
  }

  const currentContent = activeLink ? activeLink.content : "Select a component from the sidebar to view its documentation.";
  const currentTitle = activeLink ? activeLink.name : "Components Overview";

  return (
    <div className='p-10 pt-5 flex w-full gap-5'>
      {/* Reusable Sidebar Component */}
      <Sidebar sections={COMPONENT_SECTIONS} />

      {/* Main Content Area */}
      <div className="flex-1 p-6 dark:bg-white/5 border border-zinc-200 dark:border-zinc-800 rounded-xl shadow-xl min-h-[480px]">
        <h2 className="text-2xl font-bold mb-4">{currentTitle}</h2>
        <div className="text-zinc-600 dark:text-zinc-300">
          {currentContent}
        </div>
      </div>
    </div>
  );
}
