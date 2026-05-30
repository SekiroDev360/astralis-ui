import { Container, Text } from "astralis-ui";

export default function ContainerShowcase() {
  return (
    <div className="flex flex-col w-full max-w-4xl mx-auto gap-8 p-6 bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800 shadow-md transition-colors duration-200">
      
      <div className="flex flex-col gap-2">
        <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50">Container Showcase</h3>
        <p className="text-sm text-zinc-500 dark:text-zinc-400">
          Provides viewport width capping. The new <strong>Responsive Container sizing</strong> supports layout shifts (e.g. stretching full-width on mobile screen sizes but centering elegantly with a max-width on desktops).
        </p>
      </div>

      {/* Sizing Benchmarks */}
      <div className="flex flex-col gap-4">
        <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-400 dark:text-zinc-500">
          Responsive Max-Width capping
        </h4>
        <p className="text-xs text-zinc-400 dark:text-zinc-500 mb-2">
          Stretches full-width on mobile viewports but caps to large on desktop screens: <code>size={`{{ base: "full", lg: "xl" }}`}</code>
        </p>
        
        <div className="p-4 bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-lg">
          <Container size={{ base: "full", lg: "xl" }} centered={true} className="p-4 bg-primary-50 dark:bg-primary-950/20 border border-primary-200 dark:border-primary-900/50 rounded-md text-center">
            <Text weight="bold" size="sm" className="text-primary-700 dark:text-primary-400">Centered Responsive Container Block</Text>
            <Text size="xs" className="text-zinc-500 dark:text-zinc-400 mt-1">
              This panel auto-adjusts size and padding across viewports.
            </Text>
          </Container>
        </div>
      </div>

      {/* Basic Size Benchmarks Grid */}
      <div className="flex flex-col gap-4">
        <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-400 dark:text-zinc-500">
          Container Size Benchmarks
        </h4>
        <div className="flex flex-col gap-3">
          
          {/* Size SM */}
          <div className="flex flex-col gap-1.5">
            <span className="text-[10px] font-bold text-zinc-400 dark:text-zinc-500 uppercase tracking-wider">Size: sm (max-w-640px)</span>
            <Container size="sm" centered={false} className="p-3 bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-md">
              <Text size="xs" className="text-zinc-500 dark:text-zinc-400">Small container for form panels, prompts, or mini-widgets.</Text>
            </Container>
          </div>

          {/* Size MD */}
          <div className="flex flex-col gap-1.5">
            <span className="text-[10px] font-bold text-zinc-400 dark:text-zinc-500 uppercase tracking-wider">Size: md (max-w-768px)</span>
            <Container size="md" centered={false} className="p-3 bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-md">
              <Text size="xs" className="text-zinc-500 dark:text-zinc-400">Medium container layout perfect for standard blog post content width.</Text>
            </Container>
          </div>

          {/* Size LG */}
          <div className="flex flex-col gap-1.5">
            <span className="text-[10px] font-bold text-zinc-400 dark:text-zinc-500 uppercase tracking-wider">Size: lg (max-w-1024px)</span>
            <Container size="lg" centered={false} className="p-3 bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-md">
              <Text size="xs" className="text-zinc-500 dark:text-zinc-400">Large container layout perfect for hero sections or landing content screens.</Text>
            </Container>
          </div>

        </div>
      </div>

    </div>
  );
}
