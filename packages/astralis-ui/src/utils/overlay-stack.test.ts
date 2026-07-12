import { describe, expect, it } from "vitest";
import {
  isTopOverlay,
  lockBodyScroll,
  popOverlay,
  pushOverlay,
  unlockBodyScroll,
} from "./overlay-stack";

/* The module holds shared state on purpose (that IS the feature), so each
   test fully unwinds what it pushes/locks. */

describe("overlay stack ordering", () => {
  it("only the most recently opened overlay is topmost", () => {
    const modal = pushOverlay();
    const drawer = pushOverlay();

    expect(isTopOverlay(drawer)).toBe(true);
    expect(isTopOverlay(modal)).toBe(false);

    popOverlay(drawer);
    popOverlay(modal);
  });

  it("closing the top layer promotes the one underneath (Escape peels one at a time)", () => {
    const modal = pushOverlay();
    const drawer = pushOverlay();

    popOverlay(drawer); // topmost handled Escape and closed
    expect(isTopOverlay(modal)).toBe(true);

    popOverlay(modal);
    expect(isTopOverlay(modal)).toBe(false);
  });

  it("tolerates out-of-order closing (lower overlay unmounts first)", () => {
    const lower = pushOverlay();
    const upper = pushOverlay();

    popOverlay(lower);
    expect(isTopOverlay(upper)).toBe(true);

    popOverlay(upper);
  });

  it("popping the same handle twice is harmless", () => {
    const a = pushOverlay();
    const b = pushOverlay();
    popOverlay(a);
    popOverlay(a);
    expect(isTopOverlay(b)).toBe(true);
    popOverlay(b);
  });
});

describe("refcounted body scroll lock", () => {
  it("locks on first overlay and restores the ORIGINAL overflow only after the last unlock", () => {
    document.body.style.overflow = "scroll"; // a page with its own styling

    lockBodyScroll(); // modal opens
    expect(document.body.style.overflow).toBe("hidden");

    lockBodyScroll(); // drawer opens on top
    unlockBodyScroll(); // drawer closes — modal still open

    // The P0 bug: this used to restore scroll under the still-open modal.
    expect(document.body.style.overflow).toBe("hidden");

    unlockBodyScroll(); // modal closes
    expect(document.body.style.overflow).toBe("scroll");

    document.body.style.overflow = "";
  });

  it("extra unlocks don't go negative or clobber a later lock", () => {
    document.body.style.overflow = "";

    unlockBodyScroll(); // stray call with nothing locked
    lockBodyScroll();
    expect(document.body.style.overflow).toBe("hidden");
    unlockBodyScroll();
    expect(document.body.style.overflow).toBe("");
  });
});
