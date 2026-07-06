"use client";

import { useState, type ReactNode } from "react";

interface PreviewTabsProps {
  preview: ReactNode;
  code: ReactNode;
  align?: "center" | "start";
}

const tabs = ["Preview", "Code"] as const;
type Tab = (typeof tabs)[number];

export function PreviewTabs({ preview, code, align = "center" }: PreviewTabsProps) {
  const [active, setActive] = useState<Tab>("Preview");

  return (
    <div className="my-6">
      <div role="tablist" aria-label="Demo view" className="mb-3 inline-flex gap-1 rounded-lg border border-stroke-subtle bg-surface-subtle p-1">
        {tabs.map((tab) => (
          <button
            key={tab}
            role="tab"
            type="button"
            aria-selected={active === tab}
            onClick={() => setActive(tab)}
            className={`cursor-pointer rounded-md px-3 py-1 text-[13px] transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-ring ${
              active === tab
                ? "bg-surface font-medium text-label shadow-sm"
                : "text-label-muted hover:text-label"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Both panels stay mounted so demo state survives tab switches. */}
      <div hidden={active !== "Preview"}>
        <div
          className={`preview-grid flex min-h-44 flex-wrap gap-4 rounded-xl border border-stroke-subtle p-8 sm:p-10 ${
            align === "center" ? "items-center justify-center" : "items-start justify-start"
          }`}
        >
          {preview}
        </div>
      </div>
      <div hidden={active !== "Code"}>{code}</div>
    </div>
  );
}
