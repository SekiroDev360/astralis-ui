import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { CodeBlock } from "./index";

const SAMPLE = `pnpm add astralis-ui`;

function renderBlock(codeProps: { highlightedHtml?: string; children?: string } = {}) {
  return render(
    <CodeBlock.Root code={SAMPLE}>
      <CodeBlock.Header>
        <CodeBlock.Title>bash</CodeBlock.Title>
        <CodeBlock.Control>
          <CodeBlock.CopyTrigger />
        </CodeBlock.Control>
      </CodeBlock.Header>
      <CodeBlock.Content>
        <CodeBlock.Code {...codeProps} />
      </CodeBlock.Content>
    </CodeBlock.Root>,
  );
}

describe("CodeBlock", () => {
  it("renders Root's code through context when Code has no children", () => {
    renderBlock();
    expect(screen.getByText(SAMPLE)).toBeInTheDocument();
  });

  it("prefers Code children over context code", () => {
    renderBlock({ children: "explicit child" });
    expect(screen.getByText("explicit child")).toBeInTheDocument();
    expect(screen.queryByText(SAMPLE)).not.toBeInTheDocument();
  });

  it("renders highlightedHtml raw, bypassing children and context", () => {
    const { container } = renderBlock({
      highlightedHtml: `<span data-token>highlighted</span>`,
      children: "ignored",
    });
    expect(container.querySelector("[data-token]")).toHaveTextContent("highlighted");
    expect(screen.queryByText("ignored")).not.toBeInTheDocument();
  });

  // userEvent.setup() installs a working clipboard stub in jsdom — assert through it.
  it("CopyTrigger copies Root's code and flips to the copied state", async () => {
    const user = userEvent.setup();

    renderBlock();
    const trigger = screen.getByRole("button", { name: "Copy code" });
    await user.click(trigger);

    expect(await navigator.clipboard.readText()).toBe(SAMPLE);
    expect(screen.getByRole("button", { name: "Copied" })).toHaveAttribute("data-copied");
  });

  it("CopyTrigger's own code prop overrides the context code", async () => {
    const user = userEvent.setup();

    render(
      <CodeBlock.Root code={SAMPLE}>
        <CodeBlock.CopyTrigger code="override" />
      </CodeBlock.Root>,
    );
    await user.click(screen.getByRole("button", { name: "Copy code" }));

    expect(await navigator.clipboard.readText()).toBe("override");
  });
});
