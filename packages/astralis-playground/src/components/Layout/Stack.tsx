import { Stack, HStack, VStack, Text } from "astralis-ui";

export default function StackShowcase() {
  return (
    <div className="flex flex-col w-full max-w-4xl mx-auto gap-8 p-6 bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800 shadow-md transition-colors duration-200">
      
      <div className="flex flex-col gap-2">
        <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50">Stack Showcase</h3>
        <p className="text-sm text-zinc-500 dark:text-zinc-400">
          Enables elegant flexbox arrangements. With the new <strong>Responsive Prop system</strong>, you can switch direction configurations and adjust gaps automatically across different viewport breakpoints.
        </p>
      </div>

      {/* Responsive Direction Switcher */}
      <div className="flex flex-col gap-4">
        <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-400 dark:text-zinc-500">
          Responsive Direction Switcher (Vertical on Mobile, Horizontal on Desktop)
        </h4>
        <p className="text-xs text-zinc-400 dark:text-zinc-500 mb-2">
          Resizing the window triggers the responsive layout change using: <code>direction={`{{ base: "col", md: "row" }}`}</code>
        </p>
        
        <Stack direction={{ base: "col", md: "row" }} gap={4} className="w-full">
          <div className="flex-1 p-4 bg-primary-50 dark:bg-primary-950/20 border border-primary-200 dark:border-primary-900/50 rounded-lg text-center">
            <Text weight="bold" size="sm" className="text-primary-700 dark:text-primary-400">Step 1</Text>
            <Text size="xs" className="text-zinc-500 dark:text-zinc-400 mt-1">Configure profile</Text>
          </div>
          <div className="flex-1 p-4 bg-primary-50 dark:bg-primary-950/20 border border-primary-200 dark:border-primary-900/50 rounded-lg text-center">
            <Text weight="bold" size="sm" className="text-primary-700 dark:text-primary-400">Step 2</Text>
            <Text size="xs" className="text-zinc-500 dark:text-zinc-400 mt-1">Upload files</Text>
          </div>
          <div className="flex-1 p-4 bg-primary-50 dark:bg-primary-950/20 border border-primary-200 dark:border-primary-900/50 rounded-lg text-center">
            <Text weight="bold" size="sm" className="text-primary-700 dark:text-primary-400">Step 3</Text>
            <Text size="xs" className="text-zinc-500 dark:text-zinc-400 mt-1">Deploy application</Text>
          </div>
        </Stack>
      </div>

      {/* Responsive Gap Scaling */}
      <div className="flex flex-col gap-4">
        <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-400 dark:text-zinc-500">
          Responsive Gap Scaling
        </h4>
        <p className="text-xs text-zinc-400 dark:text-zinc-500 mb-2">
          Gaps expand on larger displays: <code>gap={`{{ base: 2, md: 8 }}`}</code>
        </p>

        <Stack direction="row" gap={{ base: 2, md: 8 }} className="p-4 bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-lg justify-center">
          <div className="h-10 w-10 bg-zinc-300 dark:bg-zinc-800 rounded-md flex items-center justify-center font-bold text-zinc-800 dark:text-zinc-200">A</div>
          <div className="h-10 w-10 bg-zinc-300 dark:bg-zinc-800 rounded-md flex items-center justify-center font-bold text-zinc-800 dark:text-zinc-200">B</div>
          <div className="h-10 w-10 bg-zinc-300 dark:bg-zinc-800 rounded-md flex items-center justify-center font-bold text-zinc-800 dark:text-zinc-200">C</div>
          <div className="h-10 w-10 bg-zinc-300 dark:bg-zinc-800 rounded-md flex items-center justify-center font-bold text-zinc-800 dark:text-zinc-200">D</div>
        </Stack>
      </div>

      {/* HStack and VStack Helpers */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* HStack Showcase */}
        <div className="flex flex-col gap-4">
          <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-400 dark:text-zinc-500">
            HStack (Horizontal Stack)
          </h4>
          <HStack gap={3} align="center" className="p-4 bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-lg">
            <span className="h-2.5 w-2.5 rounded-full bg-green-500 animate-pulse" />
            <Text weight="semibold" size="sm" className="text-zinc-800 dark:text-zinc-200">System Online</Text>
            <span className="text-xs text-zinc-400 dark:text-zinc-500 ml-auto">Updated 2m ago</span>
          </HStack>
        </div>

        {/* VStack Showcase */}
        <div className="flex flex-col gap-4">
          <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-400 dark:text-zinc-500">
            VStack (Vertical Stack)
          </h4>
          <VStack gap={2} className="p-4 bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-lg">
            <Text weight="bold" size="sm" className="text-zinc-900 dark:text-zinc-50">API Authentication Token</Text>
            <Text size="xs" className="text-zinc-500 dark:text-zinc-400">
              Provide authorization credentials in header queries matching <code>Bearer xxxx</code> structures.
            </Text>
          </VStack>
        </div>

      </div>

    </div>
  );
}
