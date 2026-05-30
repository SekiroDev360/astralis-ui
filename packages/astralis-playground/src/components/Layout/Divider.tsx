import { Divider, HStack, Text } from "astralis-ui";

export default function DividerShowcase() {
  return (
    <div className="flex flex-col w-full max-w-4xl mx-auto gap-8 p-6 bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800 shadow-md transition-colors duration-200">
      
      <div className="flex flex-col gap-2">
        <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50">Divider Showcase</h3>
        <p className="text-sm text-zinc-500 dark:text-zinc-400">
          Provides semantic separation lines. Supports custom line borders, horizontal labeled separators, and vertical structural dividing panels.
        </p>
      </div>

      {/* Border Styles */}
      <div className="flex flex-col gap-4">
        <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-400 dark:text-zinc-500">
          Visual Border Styles
        </h4>
        <div className="flex flex-col gap-6 p-4 bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-lg">
          
          <div className="flex flex-col gap-1.5">
            <span className="text-[10px] font-bold text-zinc-400 dark:text-zinc-500 uppercase tracking-wider">Solid (Default)</span>
            <Divider variant="solid" />
          </div>

          <div className="flex flex-col gap-1.5">
            <span className="text-[10px] font-bold text-zinc-400 dark:text-zinc-500 uppercase tracking-wider">Dashed</span>
            <Divider variant="dashed" />
          </div>

          <div className="flex flex-col gap-1.5">
            <span className="text-[10px] font-bold text-zinc-400 dark:text-zinc-500 uppercase tracking-wider">Dotted</span>
            <Divider variant="dotted" />
          </div>

        </div>
      </div>

      {/* Horizontal Dividers with Labels */}
      <div className="flex flex-col gap-4">
        <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-400 dark:text-zinc-500">
          Labeled separators (Horizontal)
        </h4>
        <div className="flex flex-col gap-6 p-6 bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-lg">
          
          <Divider label="OR" variant="solid" />
          
          <Divider label="AUTHENTICATION REQUIRED" variant="dashed" />
          
          <Divider label="END OF SESSION" variant="dotted" />

        </div>
      </div>

      {/* Vertical Dividers */}
      <div className="flex flex-col gap-4">
        <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-400 dark:text-zinc-500">
          Vertical separating blocks
        </h4>
        
        <div className="p-6 bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-lg flex justify-center">
          <HStack gap={4} align="center" className="h-6">
            <Text size="sm" weight="semibold" className="text-zinc-700 dark:text-zinc-300">Dashboard</Text>
            <Divider orientation="vertical" />
            <Text size="sm" className="text-zinc-500 dark:text-zinc-400">Settings</Text>
            <Divider orientation="vertical" variant="dashed" />
            <Text size="sm" className="text-zinc-500 dark:text-zinc-400">System Logs</Text>
            <Divider orientation="vertical" variant="dotted" />
            <Text size="sm" className="text-zinc-400 dark:text-zinc-500">Logs Archive</Text>
          </HStack>
        </div>
      </div>

    </div>
  );
}
