import { useState } from "react";
import { Highlight } from "astralis-ui";

export default function HighlightShowcase() {
  const [query, setQuery] = useState("astralis");
  const paragraphs = [
    "Astralis UI is a highly optimized, polymorphic react design system built specifically for absolute tree-shaking efficacy, fast DOM rendering cycles, and exceptional styling fidelity.",
    "This interactive playground allows developers to type keywords and experience real-time case-insensitive text splitting. Notice how Astralis matches substrings dynamically, highlighting exact keyword hits.",
    "With our recent visual correction, the highlight mark element now inherits vibrant warning colors that support dark mode perfectly. Try typing words like 'system', 'playground', or 'vibrant' to test!"
  ];

  return (
    <div className="flex flex-col w-full max-w-4xl mx-auto gap-8 p-6 bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800 shadow-md transition-colors duration-200">
      
      {/* Description */}
      <div className="flex flex-col gap-2">
        <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50">Interactive Substring Highlight Showcase</h3>
        <p className="text-sm text-zinc-500 dark:text-zinc-400">
          Advanced case-insensitive search highlights. Features regex-safe boundaries and responsive, dark-mode friendly styling classes.
        </p>
      </div>

      <div className="flex flex-col gap-6">
        
        {/* Real-time Query Input */}
        <div className="flex flex-col gap-2">
          <label htmlFor="highlight-search" className="text-xs font-semibold text-zinc-700 dark:text-zinc-300 uppercase tracking-wider">
            Type keyword search queries
          </label>
          <input
            id="highlight-search"
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search keywords (e.g., astralis, system, text)..."
            className="w-full px-4 py-2 text-sm bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-50 border border-zinc-200 dark:border-zinc-800 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500/50"
          />
        </div>

        {/* Live Highlight Content */}
        <div className="flex flex-col gap-4 border-t border-zinc-100 dark:border-zinc-800 pt-6">
          <span className="text-xs font-semibold text-zinc-700 dark:text-zinc-300 uppercase tracking-wider">
            Live Highlight Splitting
          </span>
          <div className="flex flex-col gap-4 bg-zinc-50/30 dark:bg-zinc-950/20 p-5 rounded-xl border border-zinc-150 dark:border-zinc-800/80">
            {paragraphs.map((para, i) => (
              <p key={i} className="text-sm leading-relaxed text-zinc-600 dark:text-zinc-300">
                <Highlight query={query}>{para}</Highlight>
              </p>
            ))}
          </div>
        </div>

      </div>

    </div>
  );
}
