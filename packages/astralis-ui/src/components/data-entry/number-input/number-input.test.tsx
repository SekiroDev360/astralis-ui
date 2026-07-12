import { describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { NumberInput } from "./number-input";

const spin = () => screen.getByRole("spinbutton") as HTMLInputElement;
const steppers = () => document.querySelectorAll<HTMLButtonElement>("button[tabindex='-1']");

describe("NumberInput commit model", () => {
  it("commits the typed value on Enter, not per keystroke", async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(<NumberInput onChange={onChange} />);

    await user.type(spin(), "42");
    expect(onChange).not.toHaveBeenCalled(); // typing is free-form

    await user.keyboard("{Enter}");
    expect(onChange).toHaveBeenCalledTimes(1);
    expect(onChange).toHaveBeenCalledWith(42);
  });

  it("commits on blur, clamping to min/max", async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(<NumberInput min={0} max={10} onChange={onChange} />);

    await user.type(spin(), "999");
    await user.tab(); // blur
    expect(onChange).toHaveBeenCalledWith(10);
    expect(spin().value).toBe("10");
  });

  it("rounds to precision on commit", async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(<NumberInput precision={2} onChange={onChange} />);

    await user.type(spin(), "3.14159{Enter}");
    expect(onChange).toHaveBeenCalledWith(3.14);
    expect(spin().value).toBe("3.14");
  });

  it("commits null when cleared, and garbage parses to null", async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(<NumberInput defaultValue={5} onChange={onChange} />);

    await user.clear(spin());
    await user.keyboard("{Enter}");
    expect(onChange).toHaveBeenLastCalledWith(null);

    await user.type(spin(), "abc{Enter}");
    expect(onChange).toHaveBeenLastCalledWith(null);
  });
});

describe("NumberInput keyboard (spinbutton)", () => {
  it("ArrowUp/ArrowDown nudge by step, clamped", async () => {
    const user = userEvent.setup();
    render(<NumberInput defaultValue={9} max={10} step={2} />);

    spin().focus();
    await user.keyboard("{ArrowUp}");
    expect(spin().value).toBe("10"); // 9+2 clamped to max

    await user.keyboard("{ArrowDown}{ArrowDown}");
    expect(spin().value).toBe("6");
  });

  it("Home/End jump to min/max", async () => {
    const user = userEvent.setup();
    render(<NumberInput defaultValue={5} min={1} max={10} />);

    spin().focus();
    await user.keyboard("{Home}");
    expect(spin().value).toBe("1");
    await user.keyboard("{End}");
    expect(spin().value).toBe("10");
  });

  it("exposes aria-valuemin/max/now", async () => {
    render(<NumberInput defaultValue={5} min={1} max={10} />);
    expect(spin()).toHaveAttribute("aria-valuemin", "1");
    expect(spin()).toHaveAttribute("aria-valuemax", "10");
    expect(spin()).toHaveAttribute("aria-valuenow", "5");
  });
});

describe("NumberInput steppers", () => {
  it("three rapid clicks equal three steps (the committedRef batching fix)", async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(<NumberInput defaultValue={0} onChange={onChange} />);

    const [up] = steppers();
    await user.tripleClick(up); // three clicks, potentially one React batch
    expect(spin().value).toBe("3");
    expect(onChange).toHaveBeenLastCalledWith(3);
  });

  it("steppers are excluded from the tab order and disabled when readOnly", () => {
    render(<NumberInput readOnly />);
    const [up, down] = steppers();
    expect(up).toBeDisabled();
    expect(down).toBeDisabled();
  });
});
