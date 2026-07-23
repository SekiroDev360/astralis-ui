import fs from "fs";
import path from "path";
import { demos } from "@/modules/demos";
import { CodeBlock } from "@/modules/docs/code-block";
import { CodeResultSwitcher } from "./code-result-switcher";
import { Reveal } from "./reveal";

const examples = [
  { key: "field-error", title: "Forms", blurb: "One invalid flag restyles the field and swaps the message." },
  { key: "button-loading", title: "Async actions", blurb: "Loading states without layout shift." },
  { key: "grid-responsive", title: "Responsive", blurb: "Breakpoint maps instead of media queries." },
] as const;

/* The code shown is the exact demo source rendered next to it — read from disk. */
export function CodeResult() {
  const panels = examples.map(({ key, title, blurb }) => {
    const demo = demos[key];
    const source = fs.readFileSync(
      path.join(process.cwd(), "src", "modules", "demos", demo.file),
      "utf8",
    );
    const Demo = demo.component;
    return {
      title,
      blurb,
      code: <CodeBlock code={source} lang="tsx" />,
      preview: <Demo />,
    };
  });

  return (
    <section className="mx-auto max-w-screen-xl px-6 py-28 lg:px-12 lg:py-36">
      <Reveal>
        <h2 className="font-display text-balance text-4xl font-semibold tracking-tight text-label">
          The code is the demo
        </h2>
        <p className="mt-4 max-w-xl text-lg text-label-muted">
          Each snippet is the literal source of the preview beside it — the same
          guarantee every docs page makes.
        </p>
      </Reveal>
      <Reveal delay={0.1}>
        <div className="mt-12">
          <CodeResultSwitcher panels={panels} />
        </div>
      </Reveal>
    </section>
  );
}
