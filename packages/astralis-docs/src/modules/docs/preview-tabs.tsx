"use client";

import type { ReactNode } from "react";
import { Tabs } from "astralis-ui";

interface PreviewTabsProps {
  preview: ReactNode;
  code: ReactNode;
  align?: "center" | "start";
}

export function PreviewTabs({ preview, code, align = "center" }: PreviewTabsProps) {
  return (
    /* keepMounted: both panels stay mounted (hidden) so demo state survives a
       tab switch — the reason this was hand-rolled before Tabs had the prop. */
    <Tabs
      defaultValue="preview"
      variant="segmented"
      size="sm"
      keepMounted
      /* Prefixed so astralisMerge drops the root's own gap-4. */
      className="my-6 astralis:gap-3"
    >
      {/* self-start: the list is a segmented pill, not a full-width bar. */}
      <Tabs.List aria-label="Demo view" className="self-start">
        <Tabs.Trigger value="preview">Preview</Tabs.Trigger>
        <Tabs.Trigger value="code">Code</Tabs.Trigger>
      </Tabs.List>

      <Tabs.Content value="preview">
        <div
          className={`preview-grid flex min-h-44 flex-wrap gap-4 rounded-xl border border-stroke-subtle p-8 sm:p-10 ${
            align === "center" ? "items-center justify-center" : "items-start justify-start"
          }`}
        >
          {preview}
        </div>
      </Tabs.Content>

      <Tabs.Content value="code">{code}</Tabs.Content>
    </Tabs>
  );
}
