"use client";

import { useState, type ReactNode } from "react";

interface Panel {
  title: string;
  blurb: string;
  code: ReactNode;
  preview: ReactNode;
}

export function CodeResultSwitcher({ panels }: { panels: Panel[] }) {
  const [active, setActive] = useState(0);
  const current = panels[active];

  return (
    <div>
      <div role="tablist" aria-label="Examples" className="mb-6 flex flex-wrap gap-2">
        {panels.map((panel, index) => (
          <button
            key={panel.title}
            role="tab"
            type="button"
            aria-selected={index === active}
            onClick={() => setActive(index)}
            className={`cursor-pointer rounded-full border px-4 py-1.5 text-sm transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-ring ${
              index === active
                ? "border-accent-stroke bg-accent-subtle font-medium text-accent-label"
                : "border-stroke-subtle text-label-muted hover:border-stroke-muted hover:text-label"
            }`}
          >
            {panel.title}
          </button>
        ))}
      </div>

      <p className="mb-4 text-sm text-label-muted">{current.blurb}</p>

      <div className="grid gap-4 lg:grid-cols-2">
        {panels.map((panel, index) => (
          <div key={panel.title} hidden={index !== active} className="contents">
            <div hidden={index !== active} className="min-w-0 [&_figure]:h-full">
              {panel.code}
            </div>
            <div
              hidden={index !== active}
              className="preview-grid flex min-h-56 items-center justify-center rounded-xl border border-stroke-subtle p-8"
            >
              {panel.preview}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
