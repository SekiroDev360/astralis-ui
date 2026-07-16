import { test } from "node:test";
import assert from "node:assert/strict";
import { addImports, wrapJsx, addTagAttribute, insertAfterBodyTag, addStatementAfterImports } from "../src/lib/edits.mjs";

const LAYOUT = `import type { Metadata } from "next";
import "./globals.css";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
`;

test("addImports inserts missing lines after the last import", () => {
  const { source, changed } = addImports(LAYOUT, ['import "astralis-ui/styles.css";']);
  assert.equal(changed, true);
  assert.match(source, /globals\.css";\nimport "astralis-ui\/styles\.css";/);
});

test("addImports is idempotent", () => {
  const once = addImports(LAYOUT, ['import "astralis-ui/styles.css";']).source;
  const twice = addImports(once, ['import "astralis-ui/styles.css";']);
  assert.equal(twice.changed, false);
  assert.equal(twice.source, once);
});

test("addImports handles files with no imports", () => {
  const { source, changed } = addImports("export const x = 1;\n", ["import y from \"z\";"]);
  assert.equal(changed, true);
  assert.ok(source.startsWith("import y"));
});

test("wrapJsx wraps a single occurrence", () => {
  const { source, changed } = wrapJsx(LAYOUT, "{children}", "<P>", "</P>");
  assert.equal(changed, true);
  assert.ok(source.includes("<P>{children}</P>"));
});

test("wrapJsx declines on multiple occurrences", () => {
  const doubled = LAYOUT + "\n// {children}";
  const result = wrapJsx(doubled, "{children}", "<P>", "</P>");
  assert.equal(result.changed, false);
  assert.match(result.note, /2 times/);
});

test("wrapJsx declines when target is absent", () => {
  const result = wrapJsx("<div />", "{children}", "<P>", "</P>");
  assert.equal(result.changed, false);
  assert.ok(result.note);
});

test("addTagAttribute adds once and only once", () => {
  const first = addTagAttribute(LAYOUT, "html", "suppressHydrationWarning");
  assert.equal(first.changed, true);
  assert.ok(first.source.includes("<html suppressHydrationWarning lang="));
  const second = addTagAttribute(first.source, "html", "suppressHydrationWarning");
  assert.equal(second.changed, false);
});

test("insertAfterBodyTag inserts after the opening tag", () => {
  const { source, changed } = insertAfterBodyTag(LAYOUT, "<script />");
  assert.equal(changed, true);
  assert.ok(source.includes("<body><script />"));
});

test("addStatementAfterImports places statement after import block", () => {
  const { source, changed } = addStatementAfterImports(LAYOUT, "const themeInit = `x`;");
  assert.equal(changed, true);
  assert.match(source, /globals\.css";\n\nconst themeInit/);
});
