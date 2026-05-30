import { useState } from "react";
import { Modal, Button, Text } from "astralis-ui";

export default function ModalShowcase() {
  const [sizeModalOpen, setSizeModalOpen] = useState(false);
  const [modalSize, setModalSize] = useState<"xs" | "sm" | "md" | "lg" | "xl" | "full">("md");

  const [placementModalOpen, setPlacementModalOpen] = useState(false);
  const [modalPlacement, setModalPlacement] = useState<"top" | "center" | "bottom">("center");

  const openSizeModal = (sz: typeof modalSize) => {
    setModalSize(sz);
    setSizeModalOpen(true);
  };

  const openPlacementModal = (pl: typeof modalPlacement) => {
    setModalPlacement(pl);
    setPlacementModalOpen(true);
  };

  return (
    <div className="flex flex-col w-full max-w-4xl mx-auto gap-8 p-6 bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800 shadow-md transition-colors duration-200">
      
      {/* Title & Description */}
      <div className="flex flex-col gap-2">
        <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50">Premium Modal Showcase</h3>
        <p className="text-sm text-zinc-500 dark:text-zinc-400">
          Interactive showcase mapping different sizing formats and placement nodes. Features strict focus-trapping boundaries, escape key listeners, background document scroll lockers, and scale-in keyframe entry transitions.
        </p>
      </div>

      <div className="flex flex-col gap-6">
        
        {/* Sizing Section */}
        <div className="flex flex-col gap-3">
          <span className="text-xs font-semibold text-zinc-700 dark:text-zinc-300 uppercase tracking-wider">
            Explore Modal Sizes
          </span>
          <div className="flex flex-wrap gap-3">
            {(["xs", "sm", "md", "lg", "xl", "full"] as const).map((sz) => (
              <Button
                key={sz}
                variant="outline"
                size="sm"
                onClick={() => openSizeModal(sz)}
                className="capitalize hover:border-green-500 dark:hover:border-green-500/50"
              >
                Size {sz}
              </Button>
            ))}
          </div>
        </div>

        {/* Placement Section */}
        <div className="flex flex-col gap-3 border-t border-zinc-100 dark:border-zinc-800 pt-6">
          <span className="text-xs font-semibold text-zinc-700 dark:text-zinc-300 uppercase tracking-wider">
            Explore Placements
          </span>
          <div className="flex flex-wrap gap-3">
            {(["top", "center", "bottom"] as const).map((pl) => (
              <Button
                key={pl}
                variant="outline"
                size="sm"
                onClick={() => openPlacementModal(pl)}
                className="capitalize hover:border-green-500 dark:hover:border-green-500/50"
              >
                {pl} Placement
              </Button>
            ))}
          </div>
        </div>

      </div>

      {/* 1️⃣ Size Modal Instance */}
      <Modal open={sizeModalOpen} onOpenChange={setSizeModalOpen} size={modalSize}>
        <Modal.Overlay />
        <Modal.Content>
          <Modal.Header> Sizing Showcase: {modalSize.toUpperCase()} </Modal.Header>
          <div className="p-6 flex flex-col gap-4 overflow-y-auto">
            <Text element="p" className="text-sm text-zinc-600 dark:text-zinc-300">
              This modal dynamically resizes based on the size prop provided. It isolates keyboard tab cycles cleanly, locks document scrolling, and will restore focus immediately upon closing.
            </Text>
            <div className="bg-zinc-50 dark:bg-zinc-950 p-4 rounded-lg border border-zinc-200/50 dark:border-zinc-800/40">
              <span className="text-xs font-mono text-zinc-500 dark:text-zinc-400">
                &lt;Modal size=&quot;{modalSize}&quot;&gt;
              </span>
            </div>
          </div>
          <Modal.Footer>
            <div className="flex justify-end gap-3 w-full">
              <Button variant="ghost" onClick={() => setSizeModalOpen(false)}>
                Cancel
              </Button>
              <Button variant="primary" onClick={() => setSizeModalOpen(false)}>
                Confirm Action
              </Button>
            </div>
          </Modal.Footer>
        </Modal.Content>
      </Modal>

      {/* 2️⃣ Placement Modal Instance */}
      <Modal open={placementModalOpen} onOpenChange={setPlacementModalOpen} placement={modalPlacement}>
        <Modal.Overlay />
        <Modal.Content>
          <Modal.Header> Placement Showcase: {modalPlacement.toUpperCase()} </Modal.Header>
          <div className="p-6 flex flex-col gap-4 overflow-y-auto">
            <Text element="p" className="text-sm text-zinc-600 dark:text-zinc-300">
              This dialog floats in from the configured placement node, aligning to {modalPlacement} seamlessly with premium cubic-bezier easing.
            </Text>
            <div className="bg-zinc-50 dark:bg-zinc-950 p-4 rounded-lg border border-zinc-200/50 dark:border-zinc-800/40">
              <span className="text-xs font-mono text-zinc-500 dark:text-zinc-400">
                &lt;Modal placement=&quot;{modalPlacement}&quot;&gt;
              </span>
            </div>
          </div>
          <Modal.Footer>
            <div className="flex justify-end gap-3 w-full">
              <Button variant="ghost" onClick={() => setPlacementModalOpen(false)}>
                Discard
              </Button>
              <Button variant="primary" onClick={() => setPlacementModalOpen(false)}>
                Accept
              </Button>
            </div>
          </Modal.Footer>
        </Modal.Content>
      </Modal>

    </div>
  );
}
