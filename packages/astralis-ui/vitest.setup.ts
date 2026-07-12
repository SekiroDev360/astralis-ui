import "@testing-library/jest-dom/vitest";
import { cleanup } from "@testing-library/react";
import { afterEach, vi } from "vitest";

afterEach(() => {
  cleanup();
});

/* jsdom gaps the components rely on. */

// matchMedia — used by the theme provider and usePrefersReducedMotion.
Object.defineProperty(window, "matchMedia", {
  writable: true,
  value: vi.fn().mockImplementation((query: string) => ({
    matches: false,
    media: query,
    onchange: null,
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    addListener: vi.fn(),
    removeListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
});

// scrollIntoView — used by roving focus / option lists; jsdom doesn't implement it.
Element.prototype.scrollIntoView = vi.fn();

// offsetParent — jsdom always returns null, which makes useRovingFocus's
// visibility filter treat every item as hidden. Approximate the browser:
// an element in the tree has its parent as offsetParent.
Object.defineProperty(HTMLElement.prototype, "offsetParent", {
  get() {
    return (this as HTMLElement).parentElement;
  },
});

// ResizeObserver — used by anchor positioning.
class ResizeObserverStub {
  observe() {}
  unobserve() {}
  disconnect() {}
}
globalThis.ResizeObserver ??= ResizeObserverStub as unknown as typeof ResizeObserver;
