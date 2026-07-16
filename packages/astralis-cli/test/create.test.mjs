import { test } from "node:test";
import assert from "node:assert/strict";
import { invokingPackageManager, buildScaffoldCommand } from "../src/commands/create.mjs";

test("invoking package manager comes from the npm user agent", () => {
  assert.equal(invokingPackageManager("pnpm/10.28.0 npm/? node/v24"), "pnpm");
  assert.equal(invokingPackageManager("npm/11.0.0 node/v24"), "npm");
  assert.equal(invokingPackageManager("bun/1.2.0"), "bun");
  assert.equal(invokingPackageManager(""), "npm");
});

test("scaffold command targets the official creators with args forwarded", () => {
  assert.equal(
    buildScaffoldCommand("next", "my-app", [], "npm"),
    "npm create next-app@latest my-app",
  );
  assert.equal(
    buildScaffoldCommand("vite", "my-app", ["--template", "react-ts"], "pnpm"),
    "pnpm create vite@latest my-app --template react-ts",
  );
});

test("npm gets a -- separator before forwarded scaffolder flags", () => {
  assert.equal(
    buildScaffoldCommand("vite", "my-app", ["--template", "react"], "npm"),
    "npm create vite@latest my-app -- --template react",
  );
});

test("yarn gets no @latest tag", () => {
  assert.equal(buildScaffoldCommand("next", "app", [], "yarn"), "yarn create next-app app");
});
