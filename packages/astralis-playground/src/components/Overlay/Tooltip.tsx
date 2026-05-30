import { Tooltip, Button } from "astralis-ui";

export default function TooltipShowcase() {
  return (
    <div className="flex flex-col w-full max-w-4xl mx-auto gap-8 p-6 bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800 shadow-md transition-colors duration-200">
      
      {/* Title & Description */}
      <div className="flex flex-col gap-2">
        <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50">Premium Tooltip Showcase</h3>
        <p className="text-sm text-zinc-500 dark:text-zinc-400">
          Lightweight, context-positioned hover details. Automatically links the trigger element via WAI-ARIA `aria-describedby` descriptors, locks keyboard escape events, and triggers a clean scale/fade keyframe entry.
        </p>
      </div>

      <div className="flex flex-col gap-6">
        
        {/* Alignments Panel */}
        <div className="flex flex-col gap-4">
          <span className="text-xs font-semibold text-zinc-700 dark:text-zinc-300 uppercase tracking-wider">
            Tooltip Placement Directions
          </span>
          <div className="border border-zinc-150 dark:border-zinc-800 rounded-xl p-8 bg-zinc-50/20 dark:bg-zinc-950/20 flex flex-wrap gap-6 items-center justify-center min-h-[10rem]">
            
            {/* Top */}
            <Tooltip label="Floating at the top" side="top" offset={8}>
              <Button variant="outline">Top Tooltip</Button>
            </Tooltip>

            {/* Bottom */}
            <Tooltip label="Floating at the bottom" side="bottom" offset={8}>
              <Button variant="outline">Bottom Tooltip</Button>
            </Tooltip>

            {/* Left */}
            <Tooltip label="Floating at the left margin" side="left" offset={8}>
              <Button variant="outline">Left Tooltip</Button>
            </Tooltip>

            {/* Right */}
            <Tooltip label="Floating at the right margin" side="right" offset={8}>
              <Button variant="outline">Right Tooltip</Button>
            </Tooltip>

          </div>
        </div>

        {/* Custom Delays */}
        <div className="flex flex-col gap-4 border-t border-zinc-100 dark:border-zinc-800 pt-6">
          <span className="text-xs font-semibold text-zinc-700 dark:text-zinc-300 uppercase tracking-wider">
            Custom Hover Easing & Delays
          </span>
          <div className="flex flex-wrap gap-4">
            
            <Tooltip label="Renders instantly without delays" delay={0}>
              <Button variant="outline" size="sm" className="hover:border-green-500">
                Instant (0ms Delay)
              </Button>
            </Tooltip>

            <Tooltip label="Renders after 1 second of hover" delay={1000}>
              <Button variant="outline" size="sm" className="hover:border-green-500">
                Slow (1000ms Delay)
              </Button>
            </Tooltip>

          </div>
        </div>

      </div>

    </div>
  );
}
