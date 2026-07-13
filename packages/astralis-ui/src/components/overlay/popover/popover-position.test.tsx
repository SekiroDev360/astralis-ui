import { beforeEach, describe, expect, it, vi } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Popover } from "./";
import { Button } from "../../buttons/button/button";

/* jsdom has no layout, so getBoundingClientRect is stubbed: the trigger sits
   at (200, 300) sized 100x40; everything else (the panel) is 200x100 at 0,0. */
beforeEach(() => {
  vi.spyOn(HTMLElement.prototype, "getBoundingClientRect").mockImplementation(function (this: HTMLElement) {
    const isTrigger = this.tagName === "BUTTON";
    return {
      x: isTrigger ? 200 : 0, y: isTrigger ? 300 : 0,
      left: isTrigger ? 200 : 0, top: isTrigger ? 300 : 0,
      width: isTrigger ? 100 : 200, height: isTrigger ? 40 : 100,
      right: isTrigger ? 300 : 200, bottom: isTrigger ? 340 : 100,
      toJSON: () => ({}),
    } as DOMRect;
  });
});

describe("Popover anchor positioning", () => {
  it("positions the panel relative to the trigger on open (not at 0,0)", async () => {
    const user = userEvent.setup();
    render(
      <Popover side="bottom" align="center">
        <Popover.Trigger>
          <Button>Share</Button>
        </Popover.Trigger>
        <Popover.Content>
          <Popover.Title>Panel</Popover.Title>
        </Popover.Content>
      </Popover>,
    );

    await user.click(screen.getByRole("button", { name: "Share" }));
    const panel = await screen.findByRole("dialog");

    // side=bottom: y = trigger.bottom(340) + sideOffset(8) = 348
    // align=center: x = 200 + 100/2 - 200/2 = 150
    await waitFor(() => {
      expect(panel.style.top).toBe("348px");
      expect(panel.style.left).toBe("150px");
    });
  });
});
