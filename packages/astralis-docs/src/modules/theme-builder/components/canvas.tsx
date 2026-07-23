"use client";

import { useEffect, useRef, useState } from "react";
import { Minus, Plus } from "lucide-react";
import { Button, ButtonGroup, Icon, Tooltip } from "astralis-ui";
import { ARTBOARD_WIDTH, PreviewArtboard } from "./preview-artboard";

const MIN_ZOOM = 0.25;
const MAX_ZOOM = 1.5;
const ZOOM_STEP = 0.125;

/**
 * The middle zone: a scrollable, zoomable viewport around the artboard.
 * Native scroll (no drag-pan — pointer capture blocked clicks); zoom via the
 * −/%/+ controls, with the percentage doubling as fit-to-width.
 */
export function Canvas({ vars }: { vars: Record<string, string> }) {
  const viewportRef = useRef<HTMLDivElement>(null);
  const artboardRef = useRef<HTMLDivElement>(null);
  const [zoom, setZoom] = useState(0.7);
  const [artboardHeight, setArtboardHeight] = useState(2000);

  // Track the artboard's natural (unscaled) height so the scroll area and
  // centering are exact. Measure explicitly on mount — relying on the
  // observer's initial notification alone left the height at its placeholder.
  useEffect(() => {
    const node = artboardRef.current;
    if (!node) return;
    const measure = () => {
      if (node.offsetHeight > 0) setArtboardHeight(node.offsetHeight);
    };
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  // Fit-to-width once on mount.
  useEffect(() => {
    const viewport = viewportRef.current;
    if (!viewport) return;
    setZoom(Math.max(MIN_ZOOM, Math.min(1, (viewport.clientWidth - 32) / ARTBOARD_WIDTH)));
  }, []);

  const zoomTo = (next: number) => setZoom(Math.min(MAX_ZOOM, Math.max(MIN_ZOOM, next)));
  const fitWidth = () => {
    const viewport = viewportRef.current;
    if (viewport) zoomTo((viewport.clientWidth - 32) / ARTBOARD_WIDTH);
  };

  return (
    <div className="preview-grid relative min-h-0 overflow-hidden rounded-2xl border border-stroke-subtle max-lg:h-[70vh]">
      <div
        ref={viewportRef}
        className="absolute inset-0 overflow-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {/* "safe center": centers the page when it's smaller than the viewport,
            but never clips the top/left edge when it's larger (plain `center`
            makes the overflowed start unreachable in a scroll container). */}
        <div
          style={{
            display: "flex",
            justifyContent: "safe center",
            alignItems: "safe center",
            width: "max-content",
            minWidth: "100%",
            minHeight: "100%",
            padding: 16,
          }}
        >
          {/* overflow:hidden clips the artboard's UNSCALED layout box — the scaled
              visual fits this wrapper exactly, but the layout box still spans the
              full natural height and would otherwise inflate the scroll area,
              shoving the "centered" page around. */}
          <div style={{ width: ARTBOARD_WIDTH * zoom, height: artboardHeight * zoom, overflow: "hidden" }}>
            <div
              ref={artboardRef}
              style={{ width: ARTBOARD_WIDTH, transform: `scale(${zoom})`, transformOrigin: "0 0" }}
            >
              <PreviewArtboard vars={vars} />
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-3 right-3 rounded-xl border border-stroke-subtle bg-surface/90 p-1 shadow-sm backdrop-blur">
        <ButtonGroup size="sm" variant="text" colorScheme="gray" spacing="none">
          <Button
            aria-label="Zoom out"
            leftIcon={<Icon as={Minus} size="xs" />}
            onClick={() => zoomTo(zoom - ZOOM_STEP)}
          />
          <Tooltip>
            <Tooltip.Trigger>
              {/* The readout is also the fit-to-width control, so it is a real
                  Button like its two siblings rather than a styled div. */}
              <Button onClick={fitWidth} className="min-w-13 tabular-nums">
                {Math.round(zoom * 100)}%
              </Button>
            </Tooltip.Trigger>
            <Tooltip.Content>Fit width</Tooltip.Content>
          </Tooltip>
          <Button
            aria-label="Zoom in"
            leftIcon={<Icon as={Plus} size="xs" />}
            onClick={() => zoomTo(zoom + ZOOM_STEP)}
          />
        </ButtonGroup>
      </div>
    </div>
  );
}
