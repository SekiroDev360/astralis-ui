import { Avatar, Icon } from "astralis-ui";

export default function AvatarShowcase() {
  const sizes = ["xs", "sm", "md", "lg", "xl", "2xl"] as const;
  const shapes = ["rounded", "square"] as const;

  return (
    <div className="flex flex-col w-full max-w-4xl mx-auto gap-8 p-6 bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800 shadow-md transition-colors duration-200">
      
      {/* Description */}
      <div className="flex flex-col gap-2">
        <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50">Premium Avatar Composition Showcase</h3>
        <p className="text-sm text-zinc-500 dark:text-zinc-400">
          Polymorphic avatar elements supporting initials extraction, auto-indexing color palettes, circle/square shapes, nested indicators, and grouped stacks.
        </p>
      </div>

      <div className="flex flex-col gap-8">
        
        {/* Composition Nesting Section */}
        <div className="flex flex-col gap-4 border-b border-zinc-100 dark:border-zinc-800 pb-6">
          <span className="text-xs font-semibold text-zinc-700 dark:text-zinc-300 uppercase tracking-wider">
            1. Plug-and-Play Status Badges (Nesting Composition)
          </span>
          <div className="flex flex-wrap gap-6 items-center">
            {/* Image with Nested Online Badge */}
            <Avatar src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80" name="Sophia Loren">
              <Avatar.Badge status="online" />
            </Avatar>

            {/* Initials with Nested Away Badge */}
            <Avatar name="Sarah Jenkins">
              <Avatar.Badge status="away" />
            </Avatar>

            {/* Icon with Nested Busy Badge */}
            <Avatar icon={<Icon name="User" size="xs" />} color="purple">
              <Avatar.Badge status="busy" />
            </Avatar>

            {/* Default SVG with Nested Offline Badge */}
            <Avatar>
              <Avatar.Badge status="offline" />
            </Avatar>
          </div>
        </div>

        {/* Sizes Section */}
        <div className="flex flex-col gap-4 border-b border-zinc-100 dark:border-zinc-800 pb-6">
          <span className="text-xs font-semibold text-zinc-700 dark:text-zinc-300 uppercase tracking-wider">
            2. Dynamic Sizing Steps (Nested Badge Scale Matching)
          </span>
          <div className="flex flex-wrap gap-6 items-end">
            {sizes.map((sz) => (
              <div key={sz} className="flex flex-col items-center gap-2">
                <Avatar size={sz} name="Sophia Loren" src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80">
                  <Avatar.Badge status="online" />
                </Avatar>
                <span className="text-xs font-mono text-zinc-400 capitalize">{sz}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Shapes & Colors Section */}
        <div className="flex flex-col gap-4 border-b border-zinc-100 dark:border-zinc-800 pb-6">
          <span className="text-xs font-semibold text-zinc-700 dark:text-zinc-300 uppercase tracking-wider">
            3. Shape Variants & Auto-Color Indexing
          </span>
          <div className="flex flex-col gap-4">
            {shapes.map((sh) => (
              <div key={sh} className="flex flex-wrap gap-4 items-center">
                <span className="text-xs text-zinc-400 w-16 capitalize">{sh}:</span>
                <Avatar shape={sh} name="Alfred Pennyworth" />
                <Avatar shape={sh} name="Bruce Wayne" />
                <Avatar shape={sh} name="Clark Kent" />
                <Avatar shape={sh} name="Diana Prince" />
                <Avatar shape={sh} name="Hal Jordan" />
              </div>
            ))}
          </div>
        </div>

        {/* Avatar Stacks Section */}
        <div className="flex flex-col gap-4">
          <span className="text-xs font-semibold text-zinc-700 dark:text-zinc-300 uppercase tracking-wider">
            4. Stacked Groups (Spacing & Stacking Orders)
          </span>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex flex-col gap-2">
              <span className="text-xs text-zinc-400">Right Stacking (Spacing -8px, Max 4):</span>
              <div className="p-4 bg-zinc-50/50 dark:bg-zinc-950/20 border border-zinc-150 dark:border-zinc-800 rounded-lg">
                <Avatar.Group max={4} spacing={-10} stacking="end">
                  <Avatar name="Sarah Jenkins" />
                  <Avatar name="Clark Kent" />
                  <Avatar name="Bruce Wayne" />
                  <Avatar name="Diana Prince" />
                  <Avatar name="Hal Jordan" />
                </Avatar.Group>
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <span className="text-xs text-zinc-400">Left Stacking (Spacing -12px, Max 3):</span>
              <div className="p-4 bg-zinc-50/50 dark:bg-zinc-950/20 border border-zinc-150 dark:border-zinc-800 rounded-lg">
                <Avatar.Group max={3} spacing={-14} stacking="start">
                  <Avatar name="Sarah Jenkins" />
                  <Avatar name="Clark Kent" />
                  <Avatar name="Bruce Wayne" />
                  <Avatar name="Diana Prince" />
                </Avatar.Group>
              </div>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
}
