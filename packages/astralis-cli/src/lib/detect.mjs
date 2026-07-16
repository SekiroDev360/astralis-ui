import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

/** Project inspection — all pure lookups against a directory, no writes. */

export function readPackageJson(cwd) {
  const path = join(cwd, "package.json");
  if (!existsSync(path)) return null;
  try {
    return JSON.parse(readFileSync(path, "utf8"));
  } catch {
    return null;
  }
}

/** Lockfile tells the truth about which package manager a project uses. */
export function detectPackageManager(cwd) {
  if (existsSync(join(cwd, "pnpm-lock.yaml"))) return "pnpm";
  if (existsSync(join(cwd, "yarn.lock"))) return "yarn";
  if (existsSync(join(cwd, "bun.lockb")) || existsSync(join(cwd, "bun.lock"))) return "bun";
  return "npm";
}

export function detectFramework(pkg) {
  const deps = { ...pkg?.dependencies, ...pkg?.devDependencies };
  if (deps.next) return "next";
  if (deps.vite && (deps.react || deps["@vitejs/plugin-react"])) return "vite";
  return null;
}

const ENTRY_CANDIDATES = {
  next: ["app/layout.tsx", "app/layout.jsx", "src/app/layout.tsx", "src/app/layout.jsx"],
  vite: ["src/main.tsx", "src/main.jsx"],
};

/** The file init should wire the provider into, or null if none found. */
export function findEntryFile(cwd, framework) {
  for (const candidate of ENTRY_CANDIDATES[framework] ?? []) {
    const path = join(cwd, candidate);
    if (existsSync(path)) return { path, relative: candidate };
  }
  return null;
}
