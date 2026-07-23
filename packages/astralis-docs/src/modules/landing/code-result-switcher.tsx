"use client";

import type { ReactNode } from "react";
import { Tabs, Text } from "astralis-ui";

interface Panel {
  title: string;
  blurb: string;
  code: ReactNode;
  preview: ReactNode;
}

export function CodeResultSwitcher({ panels }: { panels: Panel[] }) {
  return (
    <Tabs defaultValue={panels[0]?.title} variant="subtle" rounded className="astralis:gap-6">
      <Tabs.List aria-label="Examples" className="flex-wrap self-start">
        {panels.map((panel) => (
          <Tabs.Trigger key={panel.title} value={panel.title}>
            {panel.title}
          </Tabs.Trigger>
        ))}
      </Tabs.List>

      {/* One panel mounts at a time, so each owns its blurb and grid outright —
          no `contents` wrapper juggling `hidden` children to hold the layout. */}
      {panels.map((panel) => (
        <Tabs.Content key={panel.title} value={panel.title}>
          <Text size="sm" color="muted" className="mb-4">
            {panel.blurb}
          </Text>
          <div className="grid gap-4 lg:grid-cols-2">
            <div className="min-w-0 [&_figure]:h-full">{panel.code}</div>
            <div className="preview-grid flex min-h-56 items-center justify-center rounded-xl border border-stroke-subtle p-8">
              {panel.preview}
            </div>
          </div>
        </Tabs.Content>
      ))}
    </Tabs>
  );
}
