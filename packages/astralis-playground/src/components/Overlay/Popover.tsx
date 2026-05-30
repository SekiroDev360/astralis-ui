import { Popover, Button, Text } from "astralis-ui";

export default function PopoverShowcase() {
  return (
    <div className="flex flex-col w-full max-w-4xl mx-auto gap-8 p-6 bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800 shadow-md transition-colors duration-200">
      
      {/* Title & Description */}
      <div className="flex flex-col gap-2">
        <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50">Premium Popover Showcase</h3>
        <p className="text-sm text-zinc-500 dark:text-zinc-400">
          Advanced context-aligned popover dialogs showing both click-toggled and hover-activated triggers. Features WAI-ARIA dialog linkages, escape closures, pointer outside click managers, and responsive placement nodes.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        
        {/* Click Trigger Showcase */}
        <div className="flex flex-col gap-4">
          <span className="text-sm font-semibold text-zinc-700 dark:text-zinc-300 uppercase tracking-wider">
            Click-Activated Popovers
          </span>
          <div className="border border-zinc-150 dark:border-zinc-800 rounded-xl p-6 bg-zinc-50/20 dark:bg-zinc-950/20 flex flex-wrap gap-4 items-center justify-center min-h-[12rem]">
            
            {/* Standard Popover */}
            <Popover trigger="click">
              <Popover.Trigger>
                <Button variant="primary">Click Me</Button>
              </Popover.Trigger>
              <Popover.Content side="bottom" offset={10}>
                <div className="flex flex-col gap-2">
                  <span className="text-sm font-semibold text-zinc-950 dark:text-zinc-50">Profile Settings</span>
                  <p className="text-xs text-zinc-500 dark:text-zinc-400">
                    Quickly configure user preferences and interface parameters.
                  </p>
                </div>
              </Popover.Content>
            </Popover>

            {/* Left Popover */}
            <Popover trigger="click">
              <Popover.Trigger>
                <Button variant="outline">Slide Left</Button>
              </Popover.Trigger>
              <Popover.Content side="left" offset={12} className="w-64">
                <div className="flex flex-col gap-2">
                  <span className="text-sm font-semibold text-zinc-950 dark:text-zinc-50">System Logs</span>
                  <Text element="p" className="text-xs text-zinc-500 dark:text-zinc-400">
                    System status reports indicate high operational performance.
                  </Text>
                </div>
              </Popover.Content>
            </Popover>

          </div>
        </div>

        {/* Hover Trigger Showcase */}
        <div className="flex flex-col gap-4">
          <span className="text-sm font-semibold text-zinc-700 dark:text-zinc-300 uppercase tracking-wider">
            Hover-Activated (Delayed) Popovers
          </span>
          <div className="border border-zinc-150 dark:border-zinc-800 rounded-xl p-6 bg-zinc-50/20 dark:bg-zinc-950/20 flex flex-wrap gap-4 items-center justify-center min-h-[12rem]">
            
            {/* Hover Right */}
            <Popover trigger="hover">
              <Popover.Trigger>
                <Button variant="outline">Hover Right</Button>
              </Popover.Trigger>
              <Popover.Content side="right" offset={12} className="w-56">
                <div className="flex flex-col gap-1.5">
                  <span className="text-xs font-bold text-green-600 dark:text-green-400 uppercase tracking-wide">
                    Live Status
                  </span>
                  <span className="text-sm font-semibold text-zinc-950 dark:text-zinc-50">API Gateway</span>
                  <p className="text-xs text-zinc-500 dark:text-zinc-400">
                    Connected to emerald-node. Green custom theme active.
                  </p>
                </div>
              </Popover.Content>
            </Popover>

            {/* Hover Top */}
            <Popover trigger="hover">
              <Popover.Trigger>
                <Button variant="outline">Hover Top</Button>
              </Popover.Trigger>
              <Popover.Content side="top" offset={12}>
                <div className="flex flex-col gap-1">
                  <span className="text-sm font-semibold text-zinc-950 dark:text-zinc-50">Tooltip Style Popover</span>
                  <p className="text-xs text-zinc-500">Stays open as long as the mouse hovers over it.</p>
                </div>
              </Popover.Content>
            </Popover>

          </div>
        </div>

      </div>

    </div>
  );
}
