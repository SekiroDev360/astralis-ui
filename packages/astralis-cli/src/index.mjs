#!/usr/bin/env node
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { join, dirname } from "node:path";
import { bold, cyan, dim, fail } from "./lib/ui.mjs";

const COMMANDS = {
  create: () => import("./commands/create.mjs"),
  init: () => import("./commands/init.mjs"),
  theme: () => import("./commands/theme.mjs"),
  mcp: () => import("./commands/mcp.mjs"),
};

const HELP = `
${bold("astralis")} — setup and tooling for Astralis UI

${bold("Usage")}
  astralis <command> [options]

${bold("Commands")}
  ${cyan("create <name>")}   scaffold a new project (official create-next-app /
                  create-vite prompts) and wire Astralis into it
                    ${dim("--framework next|vite · extra args pass to the scaffolder")}
  ${cyan("init")}            wire astralis-ui into this project (Next.js or Vite)
                    ${dim("--dry-run   show the changes without writing")}
  ${cyan("theme <hex>")}     generate a static brand-theme stylesheet
                    ${dim('--out <file> (default astralis-theme.css) · --force')}
  ${cyan("mcp")}             connect AI coding agents to the Astralis docs server
                    ${dim("--write     add it to Claude Desktop's config")}

${bold("Docs")}  ${cyan("https://astralis-zeta.vercel.app/docs")}
`;

const [command, ...rest] = process.argv.slice(2);

if (!command || command === "--help" || command === "-h" || command === "help") {
  console.log(HELP);
} else if (command === "--version" || command === "-v") {
  const pkg = JSON.parse(readFileSync(join(dirname(fileURLToPath(import.meta.url)), "..", "package.json"), "utf8"));
  console.log(pkg.version);
} else if (COMMANDS[command]) {
  const { run } = await COMMANDS[command]();
  await run(rest);
} else {
  fail(`Unknown command "${command}" — run ${cyan("astralis --help")}.`);
}
