import { useState } from "react";
import { Drawer, Button, Text } from "astralis-ui";

export default function DrawerShowcase() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [drawerSide, setDrawerSide] = useState<"left" | "right" | "top" | "bottom">("right");
  const [drawerSize, setDrawerSize] = useState<"xs" | "sm" | "md" | "lg" | "xl" | "full">("md");

  const openDrawer = (side: typeof drawerSide, size: typeof drawerSize) => {
    setDrawerSide(side);
    setDrawerSize(size);
    setDrawerOpen(true);
  };

  return (
    <div className="flex flex-col w-full max-w-4xl mx-auto gap-8 p-6 bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800 shadow-md transition-colors duration-200">
      
      {/* Title & Description */}
      <div className="flex flex-col gap-2">
        <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50">Premium Drawer Showcase</h3>
        <p className="text-sm text-zinc-500 dark:text-zinc-400">
          Interactive sliding drawers showing four directions and multiple widths/heights. Leverages AAA keyboard containment focus trapping, escape-closing bindings, background window scroll locks, and slide-in keyframe entries.
        </p>
      </div>

      <div className="flex flex-col gap-6">
        
        {/* Directions Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          
          {/* Vertical Alignments */}
          <div className="flex flex-col gap-3">
            <span className="text-xs font-semibold text-zinc-700 dark:text-zinc-300 uppercase tracking-wider">
              Vertical Drawer Alignments
            </span>
            <div className="flex flex-wrap gap-3">
              <Button
                variant="outline"
                size="sm"
                onClick={() => openDrawer("right", "md")}
                className="hover:border-green-500"
              >
                ➡️ Slide Right (md)
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => openDrawer("left", "md")}
                className="hover:border-green-500"
              >
                ⬅️ Slide Left (md)
              </Button>
            </div>
          </div>

          {/* Horizontal Alignments */}
          <div className="flex flex-col gap-3">
            <span className="text-xs font-semibold text-zinc-700 dark:text-zinc-300 uppercase tracking-wider">
              Horizontal Drawer Alignments
            </span>
            <div className="flex flex-wrap gap-3">
              <Button
                variant="outline"
                size="sm"
                onClick={() => openDrawer("bottom", "sm")}
                className="hover:border-green-500"
              >
                ⬇️ Slide Bottom (sm)
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => openDrawer("top", "sm")}
                className="hover:border-green-500"
              >
                ⬆️ Slide Top (sm)
              </Button>
            </div>
          </div>

        </div>

        {/* Dynamic Size Combinations */}
        <div className="flex flex-col gap-3 border-t border-zinc-100 dark:border-zinc-800 pt-6">
          <span className="text-xs font-semibold text-zinc-700 dark:text-zinc-300 uppercase tracking-wider">
            Explore Custom Widths (Right Side)
          </span>
          <div className="flex flex-wrap gap-3">
            {(["xs", "sm", "lg", "xl", "full"] as const).map((sz) => (
              <Button
                key={sz}
                variant="outline"
                size="sm"
                onClick={() => openDrawer("right", sz)}
                className="capitalize hover:border-green-500"
              >
                Right Side: Size {sz}
              </Button>
            ))}
          </div>
        </div>

      </div>

      {/* Single Shared Drawer Instance */}
      <Drawer open={drawerOpen} onOpenChange={setDrawerOpen} side={drawerSide} size={drawerSize}>
        <Drawer.Overlay />
        <Drawer.Content>
          <Drawer.Header> Drawer View: {drawerSide.toUpperCase()} ({drawerSize}) </Drawer.Header>
          
          <div className="p-6 flex flex-col gap-4 overflow-y-auto flex-1">
            <Text element="p" className="text-sm text-zinc-600 dark:text-zinc-300">
              This panel slides smoothly into view from the {drawerSide} margin with dedicated keyframe calculations. Tab navigation is strictly localized within this panel, background scrolling is disabled, and focus returns seamlessly on unmount.
            </Text>
            
            <div className="bg-zinc-50 dark:bg-zinc-950 p-4 rounded-lg border border-zinc-200/50 dark:border-zinc-800/40">
              <span className="text-xs font-mono text-zinc-500 dark:text-zinc-400">
                &lt;Drawer side=&quot;{drawerSide}&quot; size=&quot;{drawerSize}&quot;&gt;
              </span>
            </div>
          </div>

          <Drawer.Footer>
            <div className="flex flex-col sm:flex-row gap-3 w-full">
              <Button variant="outline" onClick={() => setDrawerOpen(false)} className="w-full sm:w-auto">
                Cancel
              </Button>
              <Button variant="primary" onClick={() => setDrawerOpen(false)} className="w-full sm:w-auto sm:ml-auto">
                Proceed
              </Button>
            </div>
          </Drawer.Footer>
        </Drawer.Content>
      </Drawer>

    </div>
  );
}
