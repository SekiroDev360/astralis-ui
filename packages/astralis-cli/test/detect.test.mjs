import { test } from "node:test";
import assert from "node:assert/strict";
import { mkdtempSync, writeFileSync, mkdirSync, rmSync } from "node:fs";
import { join } from "node:path";
import { tmpdir } from "node:os";
import { detectPackageManager, detectFramework, findEntryFile, readPackageJson } from "../src/lib/detect.mjs";

function tempProject(files) {
  const dir = mkdtempSync(join(tmpdir(), "astralis-cli-test-"));
  for (const [path, content] of Object.entries(files)) {
    mkdirSync(join(dir, path, ".."), { recursive: true });
    writeFileSync(join(dir, path), content);
  }
  return dir;
}

test("detects pnpm from lockfile, npm as fallback", () => {
  const pnpm = tempProject({ "pnpm-lock.yaml": "" });
  const bare = tempProject({});
  assert.equal(detectPackageManager(pnpm), "pnpm");
  assert.equal(detectPackageManager(bare), "npm");
  rmSync(pnpm, { recursive: true, force: true });
  rmSync(bare, { recursive: true, force: true });
});

test("detects next over vite; null when neither", () => {
  assert.equal(detectFramework({ dependencies: { next: "16.0.0", react: "19" } }), "next");
  assert.equal(detectFramework({ dependencies: { react: "19" }, devDependencies: { vite: "7" } }), "vite");
  assert.equal(detectFramework({ dependencies: { svelte: "5" } }), null);
});

test("finds the Next layout in src/app too", () => {
  const dir = tempProject({ "src/app/layout.tsx": "export default function L(){}" });
  const entry = findEntryFile(dir, "next");
  assert.equal(entry.relative, "src/app/layout.tsx");
  rmSync(dir, { recursive: true, force: true });
});

test("readPackageJson returns null on missing or invalid file", () => {
  const invalid = tempProject({ "package.json": "{not json" });
  assert.equal(readPackageJson(invalid), null);
  assert.equal(readPackageJson(join(invalid, "nope")), null);
  rmSync(invalid, { recursive: true, force: true });
});
