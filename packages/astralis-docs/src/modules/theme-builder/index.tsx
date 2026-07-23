"use client";

import { useCallback, useEffect, useMemo, useState, useSyncExternalStore } from "react";
import { useTheme } from "astralis-ui";
import { isEmptySeed, parseThemeSeed, type ThemeSeed } from "astralis-ui/serialize";
import {
  DEFAULT_STATE,
  STORAGE_KEY,
  URL_PARAM,
  cssExport,
  encodeSeed,
  isDefaultState,
  jsonExport,
  previewVars,
  type BuilderState,
} from "@/lib/theme-builder";
import { ControlRail } from "./components/control-rail";
import { Canvas } from "./components/canvas";
import { TokenPanel } from "./components/token-panel";

const subscribeToStorage = (onChange: () => void) => {
  // Cross-tab edits only; same-tab writes come from our own state.
  window.addEventListener("storage", onChange);
  return () => window.removeEventListener("storage", onChange);
};

const readStorage = () => {
  try {
    return window.localStorage.getItem(STORAGE_KEY);
  } catch {
    return null; // private browsing
  }
};

/**
 * The last locally saved seed, or null.
 *
 * useSyncExternalStore rather than an effect: localStorage is an external
 * store, the server has no snapshot for it, and this is exactly the hook that
 * reconciles those two facts without a setState-in-effect cascade.
 */
function useStoredSeed(): ThemeSeed | null {
  const raw = useSyncExternalStore(subscribeToStorage, readStorage, () => null);
  return useMemo(() => (raw ? parseThemeSeed(raw) : null), [raw]);
}

/**
 * The theme builder, full-page: token controls in a sectioned left rail, a
 * zoomable scroll-canvas rendering a component overview from every category,
 * and the artifacts on the right — stylesheet or provider props, ready to copy.
 *
 * A shared `?t=` seed is decoded on the server (see page.tsx) and wins over the
 * last local session, so a link someone sends always shows what they meant.
 */
export function ThemeBuilder({ initialSeed }: { initialSeed: ThemeSeed }) {
  const stored = useStoredSeed();
  const shared = !isEmptySeed(initialSeed);
  const seed = shared ? initialSeed : (stored ?? {});

  /*
   * `key` remounts the editor once, when the stored seed resolves after
   * hydration — the only way useState's initial value can pick it up. Without
   * a shared link and without storage the key never changes, so this is inert
   * in the common case.
   */
  return <BuilderEditor key={shared || stored ? "restored" : "fresh"} initialSeed={seed} />;
}

function BuilderEditor({ initialSeed }: { initialSeed: ThemeSeed }) {
  const [state, setState] = useState<BuilderState>(
    isEmptySeed(initialSeed) ? DEFAULT_STATE : { seed: initialSeed, previewFonts: {} },
  );
  // Bumped on reset so each colour row remounts and clears its local hex draft.
  const [resetNonce, setResetNonce] = useState(0);
  const { resolvedTheme } = useTheme();

  /*
   * Persist and mirror into the URL, on a short debounce.
   *
   * The delay is not cosmetic. Next patches history.replaceState to sync its
   * Router synchronously, so calling it inside React's commit updates the
   * Router mid-commit — "Cannot update a component while rendering a different
   * component". A timeout moves the write past the commit entirely.
   *
   * It also spares a slider drag one history write and one storage write per
   * tick; only the value the user settles on is recorded.
   */
  useEffect(() => {
    const timer = window.setTimeout(() => {
      const empty = isDefaultState(state);
      try {
        if (empty) window.localStorage.removeItem(STORAGE_KEY);
        else window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state.seed));
      } catch {
        // Private browsing — sharing via URL still works.
      }
      const params = new URLSearchParams(window.location.search);
      if (empty) params.delete(URL_PARAM);
      else params.set(URL_PARAM, encodeSeed(state.seed));
      const query = params.toString();
      window.history.replaceState(null, "", query ? `?${query}` : window.location.pathname);
    }, 250);
    return () => window.clearTimeout(timer);
  }, [state]);

  const update = useCallback(
    (updater: (prev: BuilderState) => BuilderState) => setState(updater),
    [],
  );

  const setSeed = useCallback(
    <K extends keyof ThemeSeed>(key: K, value: ThemeSeed[K]) =>
      update((prev) => {
        const next = { ...prev.seed };
        // `undefined` means "back to the library default", so drop the key —
        // an explicit undefined would survive into the JSON export.
        if (value === undefined) delete next[key];
        else next[key] = value;
        return { ...prev, seed: next };
      }),
    [update],
  );

  const reset = useCallback(() => {
    update(() => DEFAULT_STATE);
    setResetNonce((n) => n + 1);
  }, [update]);

  const vars = useMemo(() => previewVars(state, resolvedTheme), [state, resolvedTheme]);
  const css = useMemo(() => cssExport(state), [state]);
  const json = useMemo(() => jsonExport(state), [state]);

  return (
    // grid-rows-[minmax(0,1fr)] pins the single row to the container height —
    // without it the row grows with the rail's content and its scroll never engages.
    <div className="grid min-h-0 flex-1 gap-4 lg:h-full lg:grid-cols-[280px_minmax(0,1fr)_320px] lg:grid-rows-[minmax(0,1fr)] xl:grid-cols-[280px_minmax(0,1fr)_340px]">
      <ControlRail
        state={state}
        setState={update}
        setSeed={setSeed}
        resetNonce={resetNonce}
        reset={reset}
      />
      <Canvas vars={vars} />
      <TokenPanel state={state} css={css} json={json} />
    </div>
  );
}
