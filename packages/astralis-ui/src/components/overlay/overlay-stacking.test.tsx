import { describe, expect, it } from "vitest";
import { render, screen, waitFor, waitForElementToBeRemoved } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Modal } from "./modal";
import { Drawer } from "./drawer";
import { Button } from "../buttons/button/button";

/** A Modal with a Drawer that opens on top of it — the P0-5 scenario. */
function StackedOverlays() {
  return (
    <Modal>
      <Modal.Trigger>
        <Button>Open modal</Button>
      </Modal.Trigger>
      <Modal.Content>
        <Modal.Header>
          <Modal.Title>Layer one</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Drawer>
            <Drawer.Trigger>
              <Button>Open drawer</Button>
            </Drawer.Trigger>
            <Drawer.Content>
              <Drawer.Header>
                <Drawer.Title>Layer two</Drawer.Title>
              </Drawer.Header>
            </Drawer.Content>
          </Drawer>
        </Modal.Body>
      </Modal.Content>
    </Modal>
  );
}

const dialogs = () => screen.queryAllByRole("dialog");

async function openBoth(user: ReturnType<typeof userEvent.setup>) {
  await user.click(screen.getByRole("button", { name: "Open modal" }));
  await waitFor(() => expect(screen.getByText("Layer one")).toBeInTheDocument());
  await user.click(screen.getByRole("button", { name: "Open drawer" }));
  await waitFor(() => expect(screen.getByText("Layer two")).toBeInTheDocument());
  expect(dialogs()).toHaveLength(2);
}

describe("stacked overlays", () => {
  it("Escape peels one layer at a time, topmost first", async () => {
    const user = userEvent.setup();
    render(<StackedOverlays />);
    await openBoth(user);

    await user.keyboard("{Escape}");
    await waitForElementToBeRemoved(() => screen.queryByText("Layer two"));
    // The modal must survive the first Escape.
    expect(screen.getByText("Layer one")).toBeInTheDocument();

    await user.keyboard("{Escape}");
    await waitForElementToBeRemoved(() => screen.queryByText("Layer one"));
    expect(dialogs()).toHaveLength(0);
  });

  it("body scroll stays locked until the LAST overlay closes", async () => {
    const user = userEvent.setup();
    render(<StackedOverlays />);
    await openBoth(user);

    expect(document.body.style.overflow).toBe("hidden");

    await user.keyboard("{Escape}"); // drawer closes, modal still open
    await waitForElementToBeRemoved(() => screen.queryByText("Layer two"));
    expect(document.body.style.overflow).toBe("hidden"); // the P0 bug regression check

    await user.keyboard("{Escape}"); // modal closes
    await waitForElementToBeRemoved(() => screen.queryByText("Layer one"));
    await waitFor(() => expect(document.body.style.overflow).not.toBe("hidden"));
  });

  it("closeOnEsc={false} keeps a lone modal open on Escape", async () => {
    const user = userEvent.setup();
    render(
      <Modal closeOnEsc={false} defaultOpen>
        <Modal.Content>
          <Modal.Header>
            <Modal.Title>Stubborn</Modal.Title>
          </Modal.Header>
        </Modal.Content>
      </Modal>,
    );

    await waitFor(() => expect(screen.getByText("Stubborn")).toBeInTheDocument());
    await user.keyboard("{Escape}");
    expect(screen.getByText("Stubborn")).toBeInTheDocument();
  });
});
