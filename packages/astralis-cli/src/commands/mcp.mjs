import { parseArgs } from "node:util";
import { existsSync, readFileSync, writeFileSync, copyFileSync, mkdirSync } from "node:fs";
import { join, dirname } from "node:path";
import { homedir } from "node:os";
import { ok, warn, info, fail, confirm, bold, cyan, dim } from "../lib/ui.mjs";

/**
 * Connect AI coding agents to the astralis-mcp docs server. Prints the config
 * for every client; --write merges it into Claude Desktop's config file
 * (the only client without a CLI or UI for adding servers by hand).
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

export async function run(argv) {
  const { values } = parseArgs({
    args: argv,
    options: { write: { type: "boolean", default: false } },
  });

  const entry = mcpServerEntry();
  const snippet = JSON.stringify({ mcpServers: { astralis: entry } }, null, 2);

  if (!values.write) {
    console.log(`${bold("Astralis MCP server")} — live component docs for AI coding agents.\n`);
    console.log(`${bold("Claude Code")}\n  ${cyan("claude mcp add astralis -- npx -y astralis-mcp")}\n`);
    console.log(`${bold("Cursor")} ${dim("(~/.cursor/mcp.json)")} ${bold("/ any MCP client")}\n${snippet.split("\n").map((l) => "  " + l).join("\n")}\n`);
    console.log(`${bold("Claude Desktop")}\n  ${cyan("astralis mcp --write")}  ${dim(`(edits ${claudeDesktopConfigPath()})`)}`);
    return;
  }

  const configPath = claudeDesktopConfigPath();
  let config = {};
  if (existsSync(configPath)) {
    try {
      config = JSON.parse(readFileSync(configPath, "utf8"));
    } catch {
      fail(`${configPath} exists but isn't valid JSON — fix or remove it first.`);
    }
  }

  if (config.mcpServers?.astralis) {
    ok("Claude Desktop already has an \"astralis\" MCP server configured:");
    console.log(dim(JSON.stringify(config.mcpServers.astralis, null, 2)));
    return;
  }

  info(`This will add the "astralis" server to ${cyan(configPath)}`);
  if (!(await confirm("Write it?"))) {
    warn("Nothing written.");
    return;
  }

  if (existsSync(configPath)) copyFileSync(configPath, configPath + ".bak");
  else mkdirSync(dirname(configPath), { recursive: true });
  config.mcpServers = { ...config.mcpServers, astralis: entry };
  writeFileSync(configPath, JSON.stringify(config, null, 2) + "\n");
  ok(`written${existsSync(configPath + ".bak") ? dim(` (backup: ${configPath}.bak)`) : ""}`);
  info("Restart Claude Desktop to pick it up.");
}
