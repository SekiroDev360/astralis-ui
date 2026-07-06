import { CodeBlock } from "@/components/docs/code-block";
import { BentoInteractive, BentoResponsiveCell, BentoSchemeCell } from "./bento-cells";
import { Reveal } from "./reveal";

const tokenRows = [
  { token: "--astralis-color-surface-base", light: "#ffffff", dark: "#000000" },
  { token: "--astralis-color-label-base", light: "#09090b", dark: "#fafafa" },
  { token: "--astralis-color-accent-solid", light: "#8b5cf6", dark: "#8b5cf6" },
  { token: "--astralis-color-stroke-subtle", light: "#f4f4f5", dark: "#18181b" },
];

function Cell({
  title,
  body,
  className = "",
  children,
}: {
  title: string;
  body: string;
  className?: string;
  children?: React.ReactNode;
}) {
  return (
    <div
      className={`flex flex-col gap-4 overflow-hidden rounded-3xl border border-stroke-subtle bg-panel p-7 transition-all duration-300 hover:-translate-y-1 hover:border-stroke-muted hover:shadow-lg ${className}`}
    >
      <div>
        <h3 className="text-sm font-semibold text-label">{title}</h3>
        <p className="mt-1 text-sm leading-relaxed text-label-muted">{body}</p>
      </div>
      {children && <div className="flex min-h-0 flex-1 items-center">{children}</div>}
    </div>
  );
}

export function Bento() {
  return (
    <section className="mx-auto max-w-screen-xl px-6 py-28 lg:px-12 lg:py-36">
      <Reveal>
        <h2 className="font-display text-balance text-4xl font-semibold tracking-tight text-label">
          Built on tokens, not guesses
        </h2>
        <p className="mt-4 max-w-xl text-lg text-label-muted">
          Every cell below is live — the same components and tokens you'd ship.
        </p>
      </Reveal>

      <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        <Cell
          title="Dark mode built in"
          body="Semantic tokens flip with one class on the root. Flip it now:"
          className="lg:col-span-1"
        >
          <BentoInteractive />
        </Cell>

        <Cell
          title="Eleven color schemes"
          body="One accent channel recolors any component — no per-hue CSS."
          className="lg:col-span-2"
        >
          <BentoSchemeCell />
        </Cell>

        <Cell
          title="Zero build step"
          body="Precompiled CSS. Your bundler never learns what Tailwind is."
        >
          <div className="w-full font-mono text-[13px]">
            <CodeBlock code={`pnpm add astralis-ui`} lang="bash" />
          </div>
        </Cell>

        <Cell
          title="Responsive props"
          body="Breakpoint maps on every style prop — resize the window."
          className="lg:col-span-2"
        >
          <BentoResponsiveCell />
        </Cell>

        <Cell
          title="Design tokens end to end"
          body="Named roles resolve per theme; components never see a hex."
          className="lg:col-span-2"
        >
          <ul className="w-full space-y-2 font-mono text-[11px] text-label-muted">
            {tokenRows.map((row) => (
              <li key={row.token} className="flex items-center justify-between gap-3 border-b border-stroke-subtle pb-2 last:border-b-0 last:pb-0">
                <span className="truncate">{row.token}</span>
                <span className="flex shrink-0 items-center gap-1.5">
                  <span className="size-3.5 rounded-full border border-stroke-subtle" style={{ backgroundColor: row.light }} />
                  <span className="size-3.5 rounded-full border border-stroke-subtle" style={{ backgroundColor: row.dark }} />
                </span>
              </li>
            ))}
          </ul>
        </Cell>
      </div>
    </section>
  );
}
