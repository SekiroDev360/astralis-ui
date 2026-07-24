import { parseArgs } from "node:util";
import { existsSync, readFileSync, writeFileSync, copyFileSync, mkdirSync } from "node:fs";
import { join, dirname } from "node:path";
import { homedir } from "node:os";
import { spawnSync } from "node:child_process";
import { ok, warn, info, fail, confirm, select, bold, cyan, dim } from "../lib/ui.mjs";

/**
 * Connect one AI coding agent to the astralis-mcp docs server. Pick a client
 * (prompted, or via --client); the CLI explains exactly what it will do for
 * that client, confirms, then does it — running the client's own `mcp add`
 * command, or writing its JSON config file (with a backup).
 */

/** Windows can't spawn npx directly from a JSON command — it needs the cmd shim. */
export function mcpServerEntry(platform = process.platform) {
  return platform === "win32"
    ? { command: "cmd", args: ["/c", "npx", "-y", "astralis-mcp"] }
    : { command: "npx", args: ["-y", "astralis-mcp"] };
}

export function claudeDesktopConfigPath(platform = process.platform, home = homedir()) {
  if (platform === "win32") return join(process.env.APPDATA ?? join(home, "AppData", "Roaming"), "Claude", "claude_desktop_config.json");
  if (platform === "darwin") return join(home, "Library", "Application Support", "Claude", "claude_desktop_config.json");
  return join(home, ".config", "Claude", "claude_desktop_config.json");
}

export function cursorConfigPath(home = homedir()) {
  return join(home, ".cursor", "mcp.json");
}

/** Antigravity shares one config across IDE and CLI — same path on every platform. */
export function antigravityConfigPath(home = homedir()) {
  return join(home, ".gemini", "config", "mcp_config.json");
}

/**
 * Every supported client, in menu order. Two kinds:
 *   "command" — the client owns its config; we run its `mcp add` for you.
 *   "file"    — we write an `mcpServers` entry into its JSON config (with backup).
 */
export const CLIENTS = {
  "claude-code": { label: "Claude Code", kind: "command", bin: "claude" },
  codex: { label: "Codex", kind: "command", bin: "codex" },
  cursor: { label: "Cursor", kind: "file", path: cursorConfigPath, reload: "Reload Cursor to pick it up." },
  "claude-desktop": { label: "Claude Desktop", kind: "file", path: claudeDesktopConfigPath, reload: "Restart Claude Desktop to pick it up." },
  antigravity: { label: "Antigravity", kind: "file", path: antigravityConfigPath, reload: "Reload Antigravity to pick it up." },
};

/** The `mcp add` argv both command-based clients happen to share. */
const ADD_ARGS = ["mcp", "add", "astralis", "--", "npx", "-y", "astralis-mcp"];

/**
 * Parse an existing config file's contents. An empty or whitespace-only file
 * (something else touched it into existence) counts as a fresh config, not an
 * error; genuinely malformed JSON throws for the caller to report.
 */
export function parseConfigFile(raw) {
  return raw.trim() === "" ? {} : JSON.parse(raw);
}

export async function run(argv) {
  const { values } = parseArgs({ args: argv, options: { client: { type: "string" } } });

  let key = values.client;
  if (key === undefined) {
    console.log(`${bold("Connect a client")} to the Astralis MCP docs server.\n`);
    key = await select(
      "Which client do you want to connect?",
      Object.entries(CLIENTS).map(([value, { label }]) => ({ value, label })),
    );
    if (key === null) {
      warn("No client selected — nothing to do.");
      return;
    }
  }

  const client = CLIENTS[key];
  if (!client) {
    fail(`Unknown --client "${key}" — expected one of: ${Object.keys(CLIENTS).join(", ")}.`);
  }

  console.log();
  if (client.kind === "command") await connectViaCommand(client);
  else await connectViaFile(client);
}

/** Run the client's own `mcp add` command, falling back to a copy-paste line. */
async function connectViaCommand(client) {
  const cmdline = `${client.bin} ${ADD_ARGS.join(" ")}`;
  info(`${bold(client.label)} manages MCP servers with its own CLI.`);
  console.log(`  I'll run:  ${cyan(cmdline)}`);
  console.log(dim(`  Needs the ${client.bin} CLI on your PATH.`));

  if (!(await confirm("Proceed?"))) {
    warn("Cancelled.");
    return;
  }

  const result = spawnSync(cmdline, { stdio: "inherit", shell: true });
  if (result.status === 0) {
    ok(`Connected ${client.label} to the Astralis docs server.`);
  } else {
    fail(`That didn't complete (is the ${cyan(client.bin)} CLI installed?). You can run it yourself:\n    ${cyan(cmdline)}`);
  }
}

/** Merge the astralis entry into the client's JSON config, backing up first. */
async function connectViaFile(client) {
  const entry = mcpServerEntry();
  const configPath = client.path();

  // Read the existing config first — nothing to describe or back up if the
  // server is already there.
  let config = {};
  if (existsSync(configPath)) {
    try {
      config = parseConfigFile(readFileSync(configPath, "utf8"));
    } catch {
      fail(`${configPath} exists but isn't valid JSON — fix or remove it first.`);
    }
  }

  if (config.mcpServers?.astralis) {
    ok(`${client.label} already has an "astralis" MCP server configured:`);
    console.log(dim(JSON.stringify(config.mcpServers.astralis, null, 2)));
    return;
  }

  info(`${bold(client.label)} reads MCP servers from a JSON config file.`);
  console.log(`  ${dim("file: ")} ${cyan(configPath)}`);
  console.log(`  ${dim("adds: ")} ${cyan(`"astralis": ${JSON.stringify(entry)}`)}`);
  if (existsSync(configPath)) console.log(dim("  Your current config will be backed up for ease of revision."));

  if (!(await confirm("Proceed?"))) {
    warn("Cancelled.");
    return;
  }

  if (existsSync(configPath)) copyFileSync(configPath, configPath + ".bak");
  else mkdirSync(dirname(configPath), { recursive: true });
  config.mcpServers = { ...config.mcpServers, astralis: entry };
  writeFileSync(configPath, JSON.stringify(config, null, 2) + "\n");
  ok(`written${existsSync(configPath + ".bak") ? dim(` (backup: ${configPath}.bak)`) : ""}`);
  info(client.reload);
}
