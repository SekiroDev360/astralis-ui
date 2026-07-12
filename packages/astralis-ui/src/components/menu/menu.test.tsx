import { describe, expect, it, vi } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Menu } from "./";
import { Button } from "../buttons/button/button";

function TestMenu({ onEdit = () => {}, onDelete = () => {} }) {
  return (
    <Menu>
      <Menu.Trigger>
        <Button>Actions</Button>
      </Menu.Trigger>
      <Menu.Content>
        <Menu.Item onSelect={onEdit}>Edit</Menu.Item>
        <Menu.Item disabled>Configure</Menu.Item>
        <Menu.Item onSelect={onDelete}>Delete</Menu.Item>
      </Menu.Content>
    </Menu>
  );
}

const trigger = () => screen.getByRole("button", { name: "Actions" });
const menu = () => screen.getByRole("menu");
const items = () => screen.getAllByRole("menuitem");

describe("Menu open/close", () => {
  it("opens on click with ARIA wiring on the trigger", async () => {
    const user = userEvent.setup();
    render(<TestMenu />);

    expect(trigger()).toHaveAttribute("aria-haspopup", "menu");
    expect(screen.queryByRole("menu")).not.toBeInTheDocument();

    await user.click(trigger());
    await waitFor(() => expect(menu()).toBeInTheDocument());
    expect(trigger()).toHaveAttribute("aria-expanded", "true");
  });

  it("ArrowDown on the trigger opens and focuses the first item", async () => {
    const user = userEvent.setup();
    render(<TestMenu />);

    trigger().focus();
    await user.keyboard("{ArrowDown}");
    await waitFor(() => expect(menu()).toBeInTheDocument());
    await waitFor(() => expect(items()[0]).toHaveFocus());
  });

  it("Escape closes and returns focus to the trigger", async () => {
    const user = userEvent.setup();
    render(<TestMenu />);

    await user.click(trigger());
    await waitFor(() => expect(menu()).toBeInTheDocument());

    await user.keyboard("{Escape}");
    await waitFor(() => expect(screen.queryByRole("menu")).not.toBeInTheDocument());
    expect(trigger()).toHaveFocus();
  });
});

describe("Menu roving focus", () => {
  it("arrows move focus, skipping disabled items and wrapping", async () => {
    const user = userEvent.setup();
    render(<TestMenu />);

    trigger().focus();
    await user.keyboard("{ArrowDown}");
    await waitFor(() => expect(items()[0]).toHaveFocus()); // Edit

    await user.keyboard("{ArrowDown}");
    expect(items()[2]).toHaveFocus(); // Delete — Configure (disabled) skipped

    await user.keyboard("{ArrowDown}");
    expect(items()[0]).toHaveFocus(); // wrapped back to Edit

    await user.keyboard("{ArrowUp}");
    expect(items()[2]).toHaveFocus(); // wraps the other way too
  });

  it("Home/End jump to first/last enabled item", async () => {
    const user = userEvent.setup();
    render(<TestMenu />);

    trigger().focus();
    await user.keyboard("{ArrowDown}");
    await waitFor(() => expect(items()[0]).toHaveFocus());

    await user.keyboard("{End}");
    expect(items()[2]).toHaveFocus();
    await user.keyboard("{Home}");
    expect(items()[0]).toHaveFocus();
  });

  it("typeahead jumps to the item starting with the typed characters", async () => {
    const user = userEvent.setup();
    render(<TestMenu />);

    trigger().focus();
    await user.keyboard("{ArrowDown}");
    await waitFor(() => expect(items()[0]).toHaveFocus());

    await user.keyboard("d");
    expect(items()[2]).toHaveFocus(); // "Delete"
  });
});

describe("Menu selection", () => {
  it("Enter activates the focused item, calls onSelect, closes, restores focus", async () => {
    const user = userEvent.setup();
    const onEdit = vi.fn();
    render(<TestMenu onEdit={onEdit} />);

    trigger().focus();
    await user.keyboard("{ArrowDown}");
    await waitFor(() => expect(items()[0]).toHaveFocus());

    await user.keyboard("{Enter}");
    expect(onEdit).toHaveBeenCalledTimes(1);
    await waitFor(() => expect(screen.queryByRole("menu")).not.toBeInTheDocument());
    expect(trigger()).toHaveFocus();
  });

  it("disabled items are aria-disabled and don't activate", async () => {
    const user = userEvent.setup();
    render(<TestMenu />);

    await user.click(trigger());
    await waitFor(() => expect(menu()).toBeInTheDocument());
    const configure = screen.getByRole("menuitem", { name: "Configure" });
    expect(configure).toHaveAttribute("aria-disabled", "true");
  });
});
