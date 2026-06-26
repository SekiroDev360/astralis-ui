# Known Issues & Tech Debt

A running list of small, non-blocking issues found while building Astralis UI.
Nothing here breaks normal usage — these are "if you do one unusual thing, it
won't work (yet)" footnotes. Revisit when you have time or when one bites.

_Last updated: 2026-06-26_

---

## 1. Responsive doesn't work on "multi-class" variant props

**What it is**
The library ships one pre-built CSS file. Consumers don't run Tailwind, so every
class a component might use must already exist in that file. A script
(`scripts/gen-responsive-safelist.mjs`) pre-generates the `sm/md/lg/xl` versions
of each class so responsive props like `size={{ base: "sm", md: "lg" }}` work.

**The catch**
That script only generates breakpoint versions for map values that are a **single
class**. When a value bundles **two classes**, it gets skipped — so the responsive
(`md:` / `lg:` …) version never gets built, and using that prop responsively
silently does nothing.

```ts
// ✅ ONE class  → responsive works
size: { sm: "astralis:text-xs" }

// ❌ TWO classes → responsive silently falls back to base
variant: { subtle: "astralis:bg-gray-subtle astralis:text-gray-label" }
```

**Where it shows up (these props degrade to base if used responsively):**
- `Code` → `variant`
- `Blockquote` → `variant`
- `CodeBlock` → `size` (and `variant`)
- `List` → `styleType`
- `Separator` → `orientation` (pre-existing, same cause)

**What still works perfectly:**
- All of the above used **normally** (not responsive)
- Single-class props responsively: `Code size`, `List spacing`
- **All Box props** responsively (p, m, w, bg, etc.)

**The fix (small, ~1 line):**
Update the regex in `scripts/gen-responsive-safelist.mjs` so it captures **every**
`astralis:` token in a file, not just lone single-class quoted values. That would
make responsive work universally and delete this whole limitation.
Left undone because it touches shared build tooling — wanted to confirm first.

**How to test it's fixed:** set e.g. `<Code variant={{ base: "subtle", md: "solid" }} />`
and confirm it actually changes at the `md` breakpoint.

---

## 2. `borderColor` override may not always win (tailwind-merge gap)

**What it is**
When two classes fight over the same CSS property, the `astralisMerge` helper
(`src/utils/astralis-merge.ts`) decides which wins. It's currently only taught to
resolve conflicts for the **semantic `stroke-*` border colors**, not for raw
palette/role border colors.

**The catch**
A `borderColor="brand-500"` (or other palette shade) might not reliably override a
component's default border color, because the merge helper doesn't know those two
are the same "group" to dedupe.

**The fix**
Extend the `astralisMerge` config to include palette/role border colors in the
border-color group. Do it when it actually causes a visible bug.

---

## 3. "Arbitrary-variant" classes must be safelisted by hand

**What it is**
Fancy classes like `[&>*:not(style)]:size-full` (used by `AspectRatio` to stretch
its child) are **not** picked up automatically by either Tailwind's scanner or the
safelist script.

**The catch**
If you write a component that uses an arbitrary-variant class, it won't appear in
the shipped CSS unless you add it manually.

**The fix / how to handle**
Add each one explicitly via `@source inline(...)` in `src/tailwind-entry.css`.
Already done for AspectRatio's child-fill classes — this note is just a reminder
for the next component that needs one.

> Note: arbitrary **values** like `list-[circle]` are fine — they ARE scanned
> automatically. Only arbitrary **variants** (the `[&>...]:` selectors) need this.

---

## 4. Storybook production build error (deferred, not fixed)

**What it is**
`storybook build` (the production build) errors because `@tailwindcss/vite`
re-compiles the CLI-generated `index.css`. Diagnosed as a build-tooling conflict,
not a styling/logic problem.

**Status**
Storybook **dev** (`pnpm dev`) works fine — this only affects the static
production build. Not yet investigated/chosen to fix.

---

## Legacy components still needing rework

These pre-date the current rework and have **existing TypeScript errors** (missing
exported types, props that don't exist on their types, etc.). They're expected to
fail typecheck until reworked — don't be alarmed when `tsc` reports them:

- `data-display/avatar`
- `data-display/badge`
- `data-display/stat`
- `data-display/table`
- `data-display/timeline`

(~52 total tsc errors as of 2026-06-26, all in these legacy folders — 0 in the
reworked layout/typography components.)
