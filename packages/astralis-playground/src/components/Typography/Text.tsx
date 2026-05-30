import { Text } from "astralis-ui";

export default function TextShowcase() {
  return (
    <div className="flex flex-col w-full max-w-4xl mx-auto gap-8 p-6 bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800 shadow-md transition-colors duration-200">
      
      {/* Description */}
      <div className="flex flex-col gap-2">
        <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50">Polymorphic Typography Showcase</h3>
        <p className="text-sm text-zinc-500 dark:text-zinc-400">
          Fluid typography primitive supporting strict HTML tags, standard sizing steps, weight multipliers, alignment overrides, and multi-line line clamping.
        </p>
      </div>

      <div className="flex flex-col gap-8">
        
        {/* HTML Semantics */}
        <div className="flex flex-col gap-4 border-b border-zinc-100 dark:border-zinc-800 pb-6">
          <span className="text-xs font-semibold text-zinc-700 dark:text-zinc-300 uppercase tracking-wider">
            1. Standard HTML Elements (Default Mapped Sizes)
          </span>
          <div className="flex flex-col gap-2">
            <Text element="h1">Heading Level 1 (h1)</Text>
            <Text element="h2">Heading Level 2 (h2)</Text>
            <Text element="h3">Heading Level 3 (h3)</Text>
            <Text element="h4">Heading Level 4 (h4)</Text>
            <Text element="h5">Heading Level 5 (h5)</Text>
            <Text element="h6">Heading Level 6 (h6)</Text>
            <Text element="p">Standard paragraph block (p) — this is the fallback element.</Text>
            <Text element="span">Inline span element (span).</Text>
          </div>
        </div>

        {/* Custom Sizing */}
        <div className="flex flex-col gap-4 border-b border-zinc-100 dark:border-zinc-800 pb-6">
          <span className="text-xs font-semibold text-zinc-700 dark:text-zinc-300 uppercase tracking-wider">
            2. Explicit Size Overrides
          </span>
          <div className="flex flex-col gap-2">
            <Text element="p" size="6xl" weight="bold">6xl size text</Text>
            <Text element="p" size="4xl" weight="bold">4xl size text</Text>
            <Text element="p" size="2xl" weight="semibold">2xl size text</Text>
            <Text element="p" size="lg" weight="medium">lg size text</Text>
            <Text element="p" size="md">md size text (default base)</Text>
            <Text element="p" size="sm" className="text-zinc-500 dark:text-zinc-400">sm size text</Text>
          </div>
        </div>

        {/* Weights & Alignments */}
        <div className="flex flex-col gap-6 border-b border-zinc-100 dark:border-zinc-800 pb-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Weights */}
            <div className="flex flex-col gap-3">
              <span className="text-xs font-semibold text-zinc-700 dark:text-zinc-300 uppercase tracking-wider">
                3. Font Weights
              </span>
              <div className="flex flex-col gap-1">
                <Text element="p" weight="thin">Thin Weight (100)</Text>
                <Text element="p" weight="light">Light Weight (300)</Text>
                <Text element="p" weight="normal">Normal Weight (400)</Text>
                <Text element="p" weight="medium">Medium Weight (500)</Text>
                <Text element="p" weight="semibold">Semibold Weight (600)</Text>
                <Text element="p" weight="bold">Bold Weight (700)</Text>
                <Text element="p" weight="black">Black Weight (900)</Text>
              </div>
            </div>

            {/* Alignments */}
            <div className="flex flex-col gap-3">
              <span className="text-xs font-semibold text-zinc-700 dark:text-zinc-300 uppercase tracking-wider">
                4. Text Alignment
              </span>
              <div className="flex flex-col gap-3 bg-zinc-50/50 dark:bg-zinc-950/20 p-4 rounded-lg border border-zinc-150 dark:border-zinc-800/80">
                <Text element="p" align="left">Left Aligned text block</Text>
                <Text element="p" align="center">Center Aligned text block</Text>
                <Text element="p" align="right">Right Aligned text block</Text>
              </div>
            </div>
          </div>
        </div>

        {/* Truncate & Clamping */}
        <div className="flex flex-col gap-4">
          <span className="text-xs font-semibold text-zinc-700 dark:text-zinc-300 uppercase tracking-wider">
            5. Single-Line Truncation & Multi-Line Clamping
          </span>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex flex-col gap-2">
              <span className="text-xs text-zinc-400">Single Line Truncation (truncate):</span>
              <div className="p-3 bg-zinc-50/50 dark:bg-zinc-950/20 border border-zinc-150 dark:border-zinc-800 rounded-lg max-w-sm">
                <Text element="p" truncate>
                  This is an extremely long string that will be cleanly truncated with an ellipsis when it hits the container border limit.
                </Text>
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <span className="text-xs text-zinc-400">Two Line Clamping (lineClamp=2):</span>
              <div className="p-3 bg-zinc-50/50 dark:bg-zinc-950/20 border border-zinc-150 dark:border-zinc-800 rounded-lg max-w-sm">
                <Text element="p" lineClamp={2}>
                  This paragraph is configured to clamp exactly after two lines. Any overflowing text beyond the second line will be neatly cut off and masked with a trailing ellipsis indicator, preserving layout grids.
                </Text>
              </div>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
}
