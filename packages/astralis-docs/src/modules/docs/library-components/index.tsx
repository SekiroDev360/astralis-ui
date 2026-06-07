"use client";

import React from "react";
import Sidebar from "../components/sidebar";
import type { ComponentLink, ComponentSection } from "./types";
import ButtonDoc from "./components/buttons/button.mdx";

export const COMPONENT_SECTIONS: ComponentSection[] = [
  {
    title: "Buttons",
    links: [
      { name: "Button", url: "/documentation/components/button", slug: "button", content: <ButtonDoc /> },
      { name: "ThemeToggle", url: "/documentation/components/theme-toggle", slug: "theme-toggle", content: "" }
    ]
  },
  {
    title: "Icon",
    links: [
      { name: "Icon", url: "/documentation/components/icon", slug: "icon", content: "" }
    ]
  },
  {
    title: "Typography",
    links: [
      { name: "Text", url: "/documentation/components/text", slug: "text", content: "" },
      { name: "Blockquote", url: "/documentation/components/blockquote", slug: "blockquote", content: "" },
      { name: "Code", url: "/documentation/components/code", slug: "code", content: "" },
      { name: "Highlight", url: "/documentation/components/highlight", slug: "highlight", content: "" }
    ]
  },
  {
    title: "Layout",
    links: [
      { name: "Container", url: "/documentation/components/container", slug: "container", content: "" },
      { name: "Box", url: "/documentation/components/box", slug: "box", content: "" },
      { name: "Divider", url: "/documentation/components/divider", slug: "divider", content: "" },
      { name: "AspectRatio", url: "/documentation/components/aspect-ratio", slug: "aspect-ratio", content: "" },
      { name: "Grid", url: "/documentation/components/grid", slug: "grid", content: "" },
      { name: "Stack", url: "/documentation/components/stack", slug: "stack", content: "" }
    ]
  },
  {
    title: "Data Display",
    links: [
      { name: "Avatar", url: "/documentation/components/avatar", slug: "avatar", content: "" },
      { name: "Badge", url: "/documentation/components/badge", slug: "badge", content: "" },
      { name: "Calendar", url: "/documentation/components/calendar", slug: "calendar", content: "" },
      { name: "Card", url: "/documentation/components/card", slug: "card", content: "" },
      { name: "DataList", url: "/documentation/components/data-list", slug: "data-list", content: "" },
      { name: "Image", url: "/documentation/components/image", slug: "image", content: "" },
      { name: "Marquee", url: "/documentation/components/marquee", slug: "marquee", content: "" },
      { name: "QrCode", url: "/documentation/components/qr-code", slug: "qr-code", content: "" },
      { name: "Stat", url: "/documentation/components/stat", slug: "stat", content: "" },
      { name: "Table", url: "/documentation/components/table", slug: "table", content: "" },
      { name: "Tag", url: "/documentation/components/tag", slug: "tag", content: "" },
      { name: "Timeline", url: "/documentation/components/timeline", slug: "timeline", content: "" }
    ]
  },
  {
    title: "Data Entry",
    links: [
      { name: "Checkbox", url: "/documentation/components/checkbox", slug: "checkbox", content: "" },
      { name: "Radio", url: "/documentation/components/radio", slug: "radio", content: "" },
      { name: "Switch", url: "/documentation/components/switch", slug: "switch", content: "" },
      { name: "Input", url: "/documentation/components/input", slug: "input", content: "" },
      { name: "Select", url: "/documentation/components/select", slug: "select", content: "" },
      { name: "Slider", url: "/documentation/components/slider", slug: "slider", content: "" },
      { name: "PinInput", url: "/documentation/components/pin-input", slug: "pin-input", content: "" }
    ]
  },
  {
    title: "Disclosure",
    links: [
      { name: "Accordion", url: "/documentation/components/accordion", slug: "accordion", content: "" },
      { name: "Carousel", url: "/documentation/components/carousel", slug: "carousel", content: "" },
      { name: "Pagination", url: "/documentation/components/pagination", slug: "pagination", content: "" }
    ]
  },
  {
    title: "Navigation",
    links: [
      { name: "Tabs", url: "/documentation/components/tabs", slug: "tabs", content: "" },
      { name: "Steps", url: "/documentation/components/steps", slug: "steps", content: "" }
    ]
  },
  {
    title: "Overlay",
    links: [
      { name: "Tooltip", url: "/documentation/components/tooltip", slug: "tooltip", content: "" },
      { name: "Modal", url: "/documentation/components/modal", slug: "modal", content: "" },
      { name: "Drawer", url: "/documentation/components/drawer", slug: "drawer", content: "" },
      { name: "Popover", url: "/documentation/components/popover", slug: "popover", content: "" }
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

      <form action="">
        <button type="submit">

        </button>
      </form>
    </div>
  );
}
