import { Grid, Text } from "astralis-ui";

export default function GridShowcase() {
  return (
    <div className="flex flex-col w-full max-w-4xl mx-auto gap-8 p-6 bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800 shadow-md transition-colors duration-200">
      
      <div className="flex flex-col gap-2">
        <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50">Grid Showcase</h3>
        <p className="text-sm text-zinc-500 dark:text-zinc-400">
          Provides robust CSS Grid layouts. The new <strong>Responsive Grid system</strong> supports fluid column restructuring and dynamic column/row spanning configurations based on screen sizes.
        </p>
      </div>

      {/* Fluid Responsive Grid Columns */}
      <div className="flex flex-col gap-4">
        <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-400 dark:text-zinc-500">
          Fluid Columns Restructuring (1 Col Mobile, 2 Col Tablet, 4 Col Desktop)
        </h4>
        <p className="text-xs text-zinc-400 dark:text-zinc-500 mb-2">
          Responsive column mapping: <code>cols={`{{ base: 1, sm: 2, md: 4 }}`}</code>
        </p>

        <Grid cols={{ base: 1, sm: 2, md: 4 }} gap={4}>
          <div className="p-4 bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-lg text-center">
            <Text weight="bold" size="lg" className="text-primary-500">84%</Text>
            <Text size="xs" className="text-zinc-500 dark:text-zinc-400 font-semibold mt-1">CPU Load</Text>
          </div>
          <div className="p-4 bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-lg text-center">
            <Text weight="bold" size="lg" className="text-green-500">4.2 GB</Text>
            <Text size="xs" className="text-zinc-500 dark:text-zinc-400 font-semibold mt-1">RAM Used</Text>
          </div>
          <div className="p-4 bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-lg text-center">
            <Text weight="bold" size="lg" className="text-indigo-500">12 ms</Text>
            <Text size="xs" className="text-zinc-500 dark:text-zinc-400 font-semibold mt-1">Latency</Text>
          </div>
          <div className="p-4 bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-lg text-center">
            <Text weight="bold" size="lg" className="text-orange-500">99.9%</Text>
            <Text size="xs" className="text-zinc-500 dark:text-zinc-400 font-semibold mt-1">Uptime</Text>
          </div>
        </Grid>
      </div>

      {/* Dynamic Item Column Spanning */}
      <div className="flex flex-col gap-4">
        <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-400 dark:text-zinc-500">
          Responsive Column Spanning (Dashboard Layout Example)
        </h4>
        <p className="text-xs text-zinc-400 dark:text-zinc-500 mb-2">
          Grid components dynamically stretch via <code>colSpan={`{{ base: 1, md: 2 }}`}</code> or <code>colSpan={`{{ base: 1, md: 3 }}`}</code>.
        </p>

        <Grid cols={{ base: 1, md: 3 }} gap={4}>
          {/* Spans 2 columns on desktop, 1 on mobile */}
          <Grid.Item colSpan={{ base: 1, md: 2 }} className="p-5 bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-lg flex flex-col gap-2">
            <Text weight="bold" size="md" className="text-zinc-900 dark:text-zinc-50">Analytics Graph (Main Content Area)</Text>
            <div className="h-32 w-full bg-zinc-200 dark:bg-zinc-900 rounded-md border border-dashed border-zinc-300 dark:border-zinc-700 flex items-center justify-center">
              <Text size="xs" className="text-zinc-400 dark:text-zinc-500">[Live Data Charts Embed]</Text>
            </div>
          </Grid.Item>
          
          {/* Spans 1 column on all screens */}
          <Grid.Item colSpan={1} className="p-5 bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-lg flex flex-col gap-2">
            <Text weight="bold" size="md" className="text-zinc-900 dark:text-zinc-50">Notifications Panel</Text>
            <ul className="flex flex-col gap-2 text-xs text-zinc-500 dark:text-zinc-400">
              <li className="p-2 bg-white dark:bg-zinc-900 border border-zinc-150 dark:border-zinc-800/80 rounded-md flex justify-between">
                <span>Deployment successful</span>
                <span className="text-zinc-400">3m</span>
              </li>
              <li className="p-2 bg-white dark:bg-zinc-900 border border-zinc-150 dark:border-zinc-800/80 rounded-md flex justify-between">
                <span>Backup complete</span>
                <span className="text-zinc-400">10m</span>
              </li>
              <li className="p-2 bg-white dark:bg-zinc-900 border border-zinc-150 dark:border-zinc-800/80 rounded-md flex justify-between">
                <span>CPU peak warning</span>
                <span className="text-zinc-400">45m</span>
              </li>
            </ul>
          </Grid.Item>

          {/* Full-width block on desktop */}
          <Grid.Item colSpan={{ base: 1, md: 3 }} className="p-4 bg-zinc-100 dark:bg-zinc-950/40 border border-zinc-200 dark:border-zinc-800/50 rounded-lg flex items-center justify-between">
            <Text size="xs" weight="semibold" className="text-zinc-500 dark:text-zinc-400">
              Cluster Node status: Operational. Zero errors recorded.
            </Text>
            <span className="h-2 w-2 rounded-full bg-green-500" />
          </Grid.Item>
        </Grid>
      </div>

    </div>
  );
}
