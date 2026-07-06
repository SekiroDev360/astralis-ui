"use client";

import { useState } from "react";
import { Check, Copy } from "lucide-react";

export function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 1600);
  };

  return (
    <button
      type="button"
      onClick={copy}
      aria-label={copied ? "Copied" : "Copy code"}
      className="flex size-7 cursor-pointer items-center justify-center rounded-md border border-stroke-subtle bg-surface text-label-muted transition-colors hover:text-label focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-ring"
    >
      {copied ? <Check size={13} className="text-accent-label" /> : <Copy size={13} />}
    </button>
  );
}
