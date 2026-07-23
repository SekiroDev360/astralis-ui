import { test } from "node:test";
import assert from "node:assert/strict";
import { themeCss, validateSeed, isEmptySeed } from "astralis-ui/serialize";
import { mcpServerEntry, claudeDesktopConfigPath } from "../src/commands/mcp.mjs";

/*
 * These imports are half the point of the test: they prove the library's
 * Node-facing subpaths resolve in plain Node, with no bundler and no React.
 * `themeCss` used to live in the CLI; it moved into the library so the CLI and
 * <AstralisProvider> cannot drift.
 */

test("themeCss emits shades + roles for both themes", () => {
  const css = themeCss({ brandColor: "#8b5cf6" });
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

test("a status colour seeds its own palette, never the hue it aliases", () => {
  const css = themeCss({ warningColor: "#eab308" });
  assert.ok(css.includes("--astralis-color-warning-500: #eab308;"));
  // The orange hue must survive untouched, or colorScheme="orange" is a lie.
  assert.ok(!css.includes("--astralis-color-orange-500:"));
});

test("validateSeed rejects bad input the CLI would otherwise write to disk", () => {
  assert.equal(validateSeed({ brandColor: "#8b5cf6" }).length, 0);
  assert.equal(validateSeed({ brandColor: "nope" }).length, 1);
  assert.equal(validateSeed({ radiusScale: -1 }).length, 1);
  assert.equal(validateSeed({ motionScale: 0 }).length, 0); // 0 = motion off
});

test("isEmptySeed distinguishes 'nothing set' from 'set to the default'", () => {
  assert.equal(isEmptySeed({}), true);
  assert.equal(isEmptySeed({ spacingScale: 1 }), true);
  assert.equal(isEmptySeed({ brandColor: "#8b5cf6" }), false);
});

test("the deprecated color-math subpath still resolves to the renamed module", async () => {
  // color-math.ts became theme-math.ts once it grew past colour; the old
  // specifier shipped in 0.1.3 and must keep working.
  const [renamed, alias] = await Promise.all([
    import("astralis-ui/theme-math"),
    import("astralis-ui/color-math"),
  ]);
  assert.equal(typeof renamed.generateThemeTokens, "function");
  assert.equal(alias.generateThemeTokens, renamed.generateThemeTokens);
});

test("mcp config entry uses the cmd shim only on Windows", () => {
  assert.deepEqual(mcpServerEntry("win32").command, "cmd");
  assert.deepEqual(mcpServerEntry("darwin"), { command: "npx", args: ["-y", "astralis-mcp"] });
});

test("claude desktop config path is platform-shaped", () => {
  assert.match(claudeDesktopConfigPath("darwin", "/Users/x"), /Application Support/);
  assert.match(claudeDesktopConfigPath("linux", "/home/x"), /\.config/);
});
