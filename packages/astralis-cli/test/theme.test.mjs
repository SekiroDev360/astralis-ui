import { test } from "node:test";
import assert from "node:assert/strict";
import { themeCss } from "../src/commands/theme.mjs";
import { mcpServerEntry, claudeDesktopConfigPath } from "../src/commands/mcp.mjs";

// Importing themeCss also proves the "astralis-ui/color-math" subpath export
// resolves in plain Node — the whole reason the module was extracted.

test("themeCss emits shades + roles for both themes", () => {
  const css = themeCss("#8b5cf6");
  assert.ok(css.includes(":root {"));
  assert.ok(css.includes(".astralis-dark {"));
  assert.ok(css.includes("--astralis-color-brand-500: #8b5cf6;"));
  assert.ok(css.includes("--astralis-color-brand-solid: #8b5cf6;"));
  assert.ok(css.includes("--astralis-color-accent-ring: #8b5cf6;"));
  // Light and dark must disagree on at least the subtle role.
  const [lightBlock, darkBlock] = css.split(".astralis-dark");
  const subtle = (block) => block.match(/--astralis-color-brand-subtle: (#[0-9a-f]{6});/)?.[1];
  assert.notEqual(subtle(lightBlock), subtle(darkBlock));
});

test("mcp config entry uses the cmd shim only on Windows", () => {
  assert.deepEqual(mcpServerEntry("win32").command, "cmd");
  assert.deepEqual(mcpServerEntry("darwin"), { command: "npx", args: ["-y", "astralis-mcp"] });
});

test("claude desktop config path is platform-shaped", () => {
  assert.match(claudeDesktopConfigPath("darwin", "/Users/x"), /Application Support/);
  assert.match(claudeDesktopConfigPath("linux", "/home/x"), /\.config/);
});
