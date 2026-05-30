import { Blockquote, Text } from "astralis-ui";

export default function BlockquoteShowcase() {
  const colorSchemes = ["gray", "primary", "success", "warning", "danger", "info"] as const;

  return (
    <div className="flex flex-col w-full max-w-4xl mx-auto gap-8 p-6 bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800 shadow-md transition-colors duration-200">
      
      {/* Description */}
      <div className="flex flex-col gap-2">
        <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50">Premium Blockquote Layout Showcase</h3>
        <p className="text-sm text-zinc-500 dark:text-zinc-400">
          Rich structural citations supporting multi-level blockquote blocks, color borders, semantic fills, and alignment controls.
        </p>
      </div>

      <div className="flex flex-col gap-8">
        
        {/* Subtle Colors */}
        <div className="flex flex-col gap-4 border-b border-zinc-100 dark:border-zinc-800 pb-6">
          <span className="text-xs font-semibold text-zinc-700 dark:text-zinc-300 uppercase tracking-wider">
            1. Subtle Left-Border Fills
          </span>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Blockquote variant="subtle" colorScheme="primary">
              <Blockquote.Content>
                The primary branding blockquote adapts automatically to our color generator offsets, using custom tints in both modes.
              </Blockquote.Content>
              <Blockquote.Caption>— Design Philosophy, Section A</Blockquote.Caption>
            </Blockquote>

            <Blockquote variant="subtle" colorScheme="success">
              <Blockquote.Content>
                Everything is green and successful. Custom border highlights track brand guidelines precisely.
              </Blockquote.Content>
              <Blockquote.Caption>— Operational Status</Blockquote.Caption>
            </Blockquote>

            <Blockquote variant="subtle" colorScheme="warning">
              <Blockquote.Content>
                Warnings should highlight potential compatibility issues with dynamic frameworks immediately.
              </Blockquote.Content>
              <Blockquote.Caption>— Migration Notes</Blockquote.Caption>
            </Blockquote>

            <Blockquote variant="subtle" colorScheme="danger">
              <Blockquote.Content>
                Danger blockquotes flag high-risk actions that could result in structural database modifications.
              </Blockquote.Content>
              <Blockquote.Caption>— Security Boundary</Blockquote.Caption>
            </Blockquote>
          </div>
        </div>

        {/* Solid & Plain */}
        <div className="flex flex-col gap-6 border-b border-zinc-100 dark:border-zinc-800 pb-6">
          <div className="flex flex-col gap-3">
            <span className="text-xs font-semibold text-zinc-700 dark:text-zinc-300 uppercase tracking-wider">
              2. Solid Citation Cards & Plain Citations
            </span>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Blockquote variant="solid" colorScheme="primary" justify="center">
                <Blockquote.Icon />
                <Blockquote.Content className="font-semibold text-lg italic">
                  An elegant design is not one that has nothing more to add, but one that has nothing more to take away.
                </Blockquote.Content>
                <Blockquote.Caption className="text-primary-100">Antoine de Saint-Exupéry</Blockquote.Caption>
              </Blockquote>

              <Blockquote variant="plain" colorScheme="info">
                <Blockquote.Content className="text-base font-medium">
                  Plain blockquotes display quote contents without background container cards or visual borders, offering a clean typography option.
                </Blockquote.Content>
                <Blockquote.Caption>— Minimalist Standard</Blockquote.Caption>
              </Blockquote>
            </div>
          </div>
        </div>

        {/* Alignments */}
        <div className="flex flex-col gap-4">
          <span className="text-xs font-semibold text-zinc-700 dark:text-zinc-300 uppercase tracking-wider">
            3. Alignment / Justification Steps
          </span>
          <div className="flex flex-col gap-6 bg-zinc-50/50 dark:bg-zinc-950/20 p-5 rounded-xl border border-zinc-150 dark:border-zinc-800/80">
            <Blockquote variant="subtle" colorScheme="gray" justify="start">
              <Blockquote.Content>Start justified quote layout (Default left-aligned text).</Blockquote.Content>
              <Blockquote.Caption>— Left Alignment</Blockquote.Caption>
            </Blockquote>

            <Blockquote variant="subtle" colorScheme="gray" justify="center">
              <Blockquote.Content>Center justified quote layout (Centered text nodes).</Blockquote.Content>
              <Blockquote.Caption>— Center Alignment</Blockquote.Caption>
            </Blockquote>

            <Blockquote variant="subtle" colorScheme="gray" justify="end">
              <Blockquote.Content>End justified quote layout (Right-aligned text).</Blockquote.Content>
              <Blockquote.Caption>— Right Alignment</Blockquote.Caption>
            </Blockquote>
          </div>
        </div>

      </div>

    </div>
  );
}
