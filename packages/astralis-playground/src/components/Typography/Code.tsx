import { Code } from "astralis-ui";

export default function CodeShowcase() {
  const colorSchemes = ["gray", "primary", "success", "warning", "danger", "info"] as const;

  return (
    <div className="flex flex-col w-full max-w-4xl mx-auto gap-8 p-6 bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800 shadow-md transition-colors duration-200">
      
      {/* Description */}
      <div className="flex flex-col gap-2">
        <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50">Inline Code Primitive Showcase</h3>
        <p className="text-sm text-zinc-500 dark:text-zinc-400">
          Versatile inline formatting tags supporting multiple visual formats, size steps, and adaptive color palettes fully integrated with dark mode tokens.
        </p>
      </div>

      <div className="flex flex-col gap-6">
        
        {/* Subtle Section */}
        <div className="flex flex-col gap-3">
          <span className="text-xs font-semibold text-zinc-700 dark:text-zinc-300 uppercase tracking-wider">
            1. Subtle Color Schemes
          </span>
          <div className="flex flex-wrap gap-3 items-center">
            {colorSchemes.map((scheme) => (
              <Code key={scheme} variant="subtle" colorScheme={scheme}>
                npm install {scheme}-package
              </Code>
            ))}
          </div>
        </div>

        {/* Solid Section */}
        <div className="flex flex-col gap-3 border-t border-zinc-100 dark:border-zinc-800 pt-6">
          <span className="text-xs font-semibold text-zinc-700 dark:text-zinc-300 uppercase tracking-wider">
            2. Solid High-Contrast Color Schemes
          </span>
          <div className="flex flex-wrap gap-3 items-center">
            {colorSchemes.map((scheme) => (
              <Code key={scheme} variant="solid" colorScheme={scheme}>
                sudo systemctl start {scheme}
              </Code>
            ))}
          </div>
        </div>

        {/* Outline Section */}
        <div className="flex flex-col gap-3 border-t border-zinc-100 dark:border-zinc-800 pt-6">
          <span className="text-xs font-semibold text-zinc-700 dark:text-zinc-300 uppercase tracking-wider">
            3. Outline Bordered Variants
          </span>
          <div className="flex flex-wrap gap-3 items-center">
            {colorSchemes.map((scheme) => (
              <Code key={scheme} variant="outline" colorScheme={scheme}>
                git config --global user.{scheme}
              </Code>
            ))}
          </div>
        </div>

        {/* Surface Section */}
        <div className="flex flex-col gap-3 border-t border-zinc-100 dark:border-zinc-800 pt-6">
          <span className="text-xs font-semibold text-zinc-700 dark:text-zinc-300 uppercase tracking-wider">
            4. Surface Card Variants
          </span>
          <div className="flex flex-wrap gap-3 items-center">
            {colorSchemes.map((scheme) => (
              <Code key={scheme} variant="surface" colorScheme={scheme}>
                const {scheme} = require(&apos;{scheme}&apos;);
              </Code>
            ))}
          </div>
        </div>

        {/* Sizes Section */}
        <div className="flex flex-col gap-3 border-t border-zinc-100 dark:border-zinc-800 pt-6">
          <span className="text-xs font-semibold text-zinc-700 dark:text-zinc-300 uppercase tracking-wider">
            5. Sizing Steps
          </span>
          <div className="flex flex-wrap gap-4 items-baseline">
            <div className="flex items-center gap-2">
              <span className="text-xs text-zinc-400">sm:</span>
              <Code size="sm" variant="subtle" colorScheme="primary">const a = 1;</Code>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs text-zinc-400">md:</span>
              <Code size="md" variant="subtle" colorScheme="primary">const b = 2;</Code>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs text-zinc-400">lg:</span>
              <Code size="lg" variant="subtle" colorScheme="primary">const c = 3;</Code>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
}
