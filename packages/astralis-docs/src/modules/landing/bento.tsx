// Flat parts, not `Card.*` / `DataList.*`: this is a Server Component, and
// compound statics are undefined across the RSC boundary (they live on a
// client-reference stub). The individual exports are their own references.
import {
  CardRoot,
  CardHeader,
  CardTitle,
  CardDescription,
  CardBody,
  DataList,
  DataListItem,
  DataListLabel,
  DataListValue,
} from "astralis-ui";
import { CodeBlock } from "@/modules/docs/code-block";
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
    /*
     * Not `hoverable`: that prop means "this card is clickable" and brings
     * cursor-pointer + active:scale-95 with it. These cells lift on hover as
     * decoration only, so the lift stays a class and the semantics stay honest.
     */
    <CardRoot
      variant="outline"
      size="lg"
      className={`flex flex-col hover:-translate-y-1 hover:border-stroke-muted hover:shadow-lg astralis:rounded-3xl astralis:bg-surface-panel ${className}`}
    >
      <CardHeader>
        {/* Prefixed only where it overrides a class the component sets
            (Title's text-base); `mt-1` is additive, so plain is fine. */}
        <CardTitle className="astralis:text-sm">{title}</CardTitle>
        <CardDescription className="mt-1">{body}</CardDescription>
      </CardHeader>
      {children && <CardBody className="flex min-h-0 flex-1 items-center">{children}</CardBody>}
    </CardRoot>
  );
}

export function Bento() {
  // Live marketing grid: each cell is a real component painting from tokens.
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
          body="Precompiled CSS. No plugins, no config — your bundler just serves a stylesheet."
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
          {/* Label/value pairs — DataList is exactly this, and it renders the
              proper <dl>/<dt>/<dd> the hand-rolled <ul> never did. */}
          <DataList size="sm" className="w-full font-mono">
            {tokenRows.map((row) => (
              <DataListItem
                key={row.token}
                /* Additive — Item sets only flex/gap, so no prefix needed. */
                className="items-center justify-between border-b border-stroke-subtle pb-2 last:border-b-0 last:pb-0"
              >
                {/* Prefixed: overrides the horizontal Label's fixed w-40, which
                    would crop these long token names. */}
                <DataListLabel className="truncate astralis:w-auto astralis:flex-1">
                  {row.token}
                </DataListLabel>
                <DataListValue className="flex items-center gap-1.5 astralis:flex-none">
                  <span
                    className="size-3.5 rounded-full border border-stroke-subtle"
                    style={{ backgroundColor: row.light }}
                  />
                  <span
                    className="size-3.5 rounded-full border border-stroke-subtle"
                    style={{ backgroundColor: row.dark }}
                  />
                </DataListValue>
              </DataListItem>
            ))}
          </DataList>
        </Cell>
      </div>
    </section>
  );
}
