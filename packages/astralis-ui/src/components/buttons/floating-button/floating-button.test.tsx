import { beforeEach, describe, expect, it, vi } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import { FloatingButton } from "./floating-button";

/*
 * jsdom has no layout and no pointer capture, so both are stubbed: the wrapper
 * reports a 56x56 box at (900, 700) — a bottom-right corner in a 1000x800
 * viewport — and capture is tracked in a set so hasPointerCapture answers
 * truthfully. Everything under test (threshold, clamping, click suppression)
 * is arithmetic over those two, which is exactly what jsdom can host.
 */
const SIZE = 56;
let captured: Set<number>;

beforeEach(() => {
  captured = new Set();
  window.innerWidth = 1000;
  window.innerHeight = 800;

  vi.spyOn(HTMLElement.prototype, "getBoundingClientRect").mockImplementation(function (this: HTMLElement) {
    // Only the fixed wrapper is measured; give it a plausible resting box.
    const left = 900;
    const top = 700;
    return {
      x: left, y: top, left, top,
      width: SIZE, height: SIZE,
      right: left + SIZE, bottom: top + SIZE,
      toJSON: () => ({}),
    } as DOMRect;
  });

  HTMLElement.prototype.setPointerCapture = function (id: number) { captured.add(id); };
  HTMLElement.prototype.releasePointerCapture = function (id: number) { captured.delete(id); };
  HTMLElement.prototype.hasPointerCapture = function (id: number) { return captured.has(id); };
});

/** Drives a full press → move → release gesture. */
function drag(el: HTMLElement, from: [number, number], to: [number, number]) {
  fireEvent.pointerDown(el, { pointerId: 1, button: 0, clientX: from[0], clientY: from[1] });
  fireEvent.pointerMove(el, { pointerId: 1, clientX: to[0], clientY: to[1] });
  fireEvent.pointerUp(el, { pointerId: 1, clientX: to[0], clientY: to[1] });
}

const wrapperOf = (button: HTMLElement) => button.parentElement as HTMLElement;

describe("FloatingButton placement", () => {
  it("rests in a corner via classes, with no inline position", () => {
    render(<FloatingButton>Chat</FloatingButton>);
    const wrapper = wrapperOf(screen.getByRole("button"));
    expect(wrapper.className).toContain("bottom-6");
    expect(wrapper.className).toContain("right-6");
    expect(wrapper.style.left).toBe("");
  });

  it.each([
    ["bottom-left", ["bottom-6", "left-6"]],
    ["top-right", ["top-6", "right-6"]],
    ["top-left", ["top-6", "left-6"]],
    ["center-bottom", ["bottom-6", "left-1/2", "-translate-x-1/2"]],
    ["center-top", ["top-6", "left-1/2", "-translate-x-1/2"]],
  ] as const)("anchors to %s", (placement, expected) => {
    render(<FloatingButton placement={placement}>Chat</FloatingButton>);
    const className = wrapperOf(screen.getByRole("button")).className;
    for (const cls of expected) expect(className).toContain(cls);
  });

  it("drops the corner classes once dragged, so the inline position governs", () => {
    render(<FloatingButton>Chat</FloatingButton>);
    const button = screen.getByRole("button");
    drag(button, [920, 720], [400, 300]);
    const wrapper = wrapperOf(button);
    expect(wrapper.style.left).not.toBe("");
    expect(wrapper.className).not.toContain("bottom-6");
  });
});

describe("FloatingButton dragging", () => {
  it("moves by the pointer delta, preserving the grab point", () => {
    const onPositionChange = vi.fn();
    render(<FloatingButton onPositionChange={onPositionChange}>Chat</FloatingButton>);
    // Grab 20px into the button, drop the pointer at (400, 300).
    drag(screen.getByRole("button"), [920, 720], [400, 300]);
    // offset = 920-900 = 20, 720-700 = 20  ->  position = 400-20, 300-20
    expect(onPositionChange).toHaveBeenLastCalledWith({ x: 380, y: 280 });
  });

  it("ignores travel below the threshold, so a shaky tap is still a click", () => {
    const onPositionChange = vi.fn();
    const onClick = vi.fn();
    render(
      <FloatingButton dragThreshold={4} onPositionChange={onPositionChange} onClick={onClick}>
        Chat
      </FloatingButton>,
    );
    const button = screen.getByRole("button");
    drag(button, [920, 720], [922, 721]); // ~2.2px
    fireEvent.click(button);

    expect(onPositionChange).not.toHaveBeenCalled();
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it("swallows the click the browser fires after a real drag", () => {
    const onClick = vi.fn();
    render(<FloatingButton onClick={onClick}>Chat</FloatingButton>);
    const button = screen.getByRole("button");
    drag(button, [920, 720], [400, 300]);
    fireEvent.click(button);

    expect(onClick).not.toHaveBeenCalled();
  });

  it("clicks normally again on the press after a drag", () => {
    const onClick = vi.fn();
    render(<FloatingButton onClick={onClick}>Chat</FloatingButton>);
    const button = screen.getByRole("button");
    drag(button, [920, 720], [400, 300]);
    fireEvent.click(button); // swallowed
    fireEvent.click(button); // a fresh press
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it("does not swallow a later click when the drag produced no trailing click", () => {
    /*
     * Releasing outside the button (or a cancelled gesture) means the browser
     * never fires the click the suppression was armed for. Left armed, it ate
     * the next genuine press — caught in a real browser, where the trailing
     * click genuinely does not arrive.
     */
    const onClick = vi.fn();
    render(<FloatingButton onClick={onClick}>Chat</FloatingButton>);
    const button = screen.getByRole("button");

    drag(button, [920, 720], [400, 300]); // no click follows
    // A fresh tap: press, release, click — all with no movement.
    fireEvent.pointerDown(button, { pointerId: 2, button: 0, clientX: 420, clientY: 320 });
    fireEvent.pointerUp(button, { pointerId: 2, clientX: 420, clientY: 320 });
    fireEvent.click(button);

    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it("reports the settled position once, not per frame", () => {
    const onPositionCommit = vi.fn();
    render(<FloatingButton onPositionCommit={onPositionCommit}>Chat</FloatingButton>);
    const button = screen.getByRole("button");
    fireEvent.pointerDown(button, { pointerId: 1, button: 0, clientX: 920, clientY: 720 });
    fireEvent.pointerMove(button, { pointerId: 1, clientX: 500, clientY: 400 });
    fireEvent.pointerMove(button, { pointerId: 1, clientX: 400, clientY: 300 });
    expect(onPositionCommit).not.toHaveBeenCalled();
    fireEvent.pointerUp(button, { pointerId: 1, clientX: 400, clientY: 300 });
    expect(onPositionCommit).toHaveBeenCalledTimes(1);
  });

  it("stays inside the viewport, allowing for its own size", () => {
    const onPositionChange = vi.fn();
    render(
      <FloatingButton edgePadding={8} onPositionChange={onPositionChange}>
        Chat
      </FloatingButton>,
    );
    const button = screen.getByRole("button");

    drag(button, [920, 720], [-500, -500]); // far past the top-left
    expect(onPositionChange).toHaveBeenLastCalledWith({ x: 8, y: 8 });

    drag(button, [920, 720], [5000, 5000]); // far past the bottom-right
    expect(onPositionChange).toHaveBeenLastCalledWith({
      x: 1000 - SIZE - 8,
      y: 800 - SIZE - 8,
    });
  });

  it("does not drag when draggable is false", () => {
    const onPositionChange = vi.fn();
    const onClick = vi.fn();
    render(
      <FloatingButton draggable={false} onPositionChange={onPositionChange} onClick={onClick}>
        Chat
      </FloatingButton>,
    );
    const button = screen.getByRole("button");
    drag(button, [920, 720], [400, 300]);
    fireEvent.click(button);

    expect(onPositionChange).not.toHaveBeenCalled();
    expect(onClick).toHaveBeenCalledTimes(1); // and the click still lands
  });

  it("leaves right-click alone so the context menu still opens", () => {
    const onPositionChange = vi.fn();
    render(<FloatingButton onPositionChange={onPositionChange}>Chat</FloatingButton>);
    const button = screen.getByRole("button");
    fireEvent.pointerDown(button, { pointerId: 1, button: 2, clientX: 920, clientY: 720 });
    fireEvent.pointerMove(button, { pointerId: 1, clientX: 400, clientY: 300 });
    expect(onPositionChange).not.toHaveBeenCalled();
  });
});

describe("FloatingButton keyboard", () => {
  it("nudges with arrow keys, accumulating, and finely with Shift", () => {
    const onPositionChange = vi.fn();
    render(<FloatingButton onPositionChange={onPositionChange}>Chat</FloatingButton>);
    const button = screen.getByRole("button");

    // First press has no position yet, so it starts from the measured corner.
    fireEvent.keyDown(button, { key: "ArrowLeft" });
    expect(onPositionChange).toHaveBeenLastCalledWith({ x: 892, y: 700 });

    // Subsequent presses continue from where the last one left off.
    fireEvent.keyDown(button, { key: "ArrowLeft" });
    expect(onPositionChange).toHaveBeenLastCalledWith({ x: 884, y: 700 });

    fireEvent.keyDown(button, { key: "ArrowUp", shiftKey: true });
    expect(onPositionChange).toHaveBeenLastCalledWith({ x: 884, y: 699 });
  });

  it("ignores arrow keys when not draggable, leaving scroll alone", () => {
    const onPositionChange = vi.fn();
    render(
      <FloatingButton draggable={false} onPositionChange={onPositionChange}>
        Chat
      </FloatingButton>,
    );
    fireEvent.keyDown(screen.getByRole("button"), { key: "ArrowLeft" });
    expect(onPositionChange).not.toHaveBeenCalled();
  });

  it("still forwards other keys to a caller's handler", () => {
    const onKeyDown = vi.fn();
    render(<FloatingButton onKeyDown={onKeyDown}>Chat</FloatingButton>);
    fireEvent.keyDown(screen.getByRole("button"), { key: "Enter" });
    expect(onKeyDown).toHaveBeenCalledTimes(1);
  });
});

describe("FloatingButton controlled position", () => {
  it("renders the position it is given and does not self-update", () => {
    const onPositionChange = vi.fn();
    const { rerender } = render(
      <FloatingButton position={{ x: 100, y: 120 }} onPositionChange={onPositionChange}>
        Chat
      </FloatingButton>,
    );
    const button = screen.getByRole("button");
    expect(wrapperOf(button).style.left).toBe("100px");

    drag(button, [920, 720], [400, 300]);
    // The owner is told, but the rendered position only moves when they re-render.
    expect(onPositionChange).toHaveBeenCalled();
    expect(wrapperOf(button).style.left).toBe("100px");

    rerender(
      <FloatingButton position={{ x: 380, y: 280 }} onPositionChange={onPositionChange}>
        Chat
      </FloatingButton>,
    );
    expect(wrapperOf(screen.getByRole("button")).style.left).toBe("380px");
  });
});
