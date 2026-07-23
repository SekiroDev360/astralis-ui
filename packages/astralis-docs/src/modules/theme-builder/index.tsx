"use client";

import { useMemo, useState } from "react";
import { useTheme } from "astralis-ui";
import { DEFAULT_STATE, cssExport, previewVars, type ThemeState } from "@/lib/theme-builder";
import { ControlRail } from "./components/control-rail";
import { Canvas } from "./components/canvas";
import { TokenPanel } from "./components/token-panel";

/**
 * The theme builder, full-page: token controls in a sectioned left rail,
 * a zoomable scroll-canvas in the middle rendering a component overview from
 * every category, and the one artifact that matters on the right — the
 * generated token stylesheet, ready to copy. The page itself never scrolls;
 * each zone scrolls internally. State lives here; each zone is its own
 * component under ./components.
 */
export function ThemeBuilder() {
  const [state, setState] = useState<ThemeState>(DEFAULT_STATE);
  const [hexDraft, setHexDraft] = useState("");
  const { resolvedTheme } = useTheme();

  const set = <K extends keyof ThemeState>(key: K, value: ThemeState[K]) =>
    setState((prev) => ({ ...prev, [key]: value }));

  const setBrand = (hex: string | null) => {
    set("brandColor", hex);
    setHexDraft(hex ?? "");
  };

  const reset = () => {
    setState(DEFAULT_STATE);
    setHexDraft("");
  };

  const vars = useMemo(() => previewVars(state, resolvedTheme), [state, resolvedTheme]);
  const css = useMemo(() => cssExport(state), [state]);

  return (
    // grid-rows-[minmax(0,1fr)] pins the single row to the container height —
    // without it the row grows with the rail's content and its scroll never engages.
    <div className="grid min-h-0 flex-1 gap-4 lg:h-full lg:grid-cols-[280px_minmax(0,1fr)_320px] lg:grid-rows-[minmax(0,1fr)] xl:grid-cols-[280px_minmax(0,1fr)_340px]">
      <ControlRail
        state={state}
        hexDraft={hexDraft}
        setHexDraft={setHexDraft}
        set={set}
        setBrand={setBrand}
        reset={reset}
      />
      <Canvas vars={vars} />
      <TokenPanel state={state} css={css} />
    </div>
  );
}
