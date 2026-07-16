import { existsSync } from "node:fs";
import { join } from "node:path";
import { spawnSync } from "node:child_process";
import readline from "node:readline/promises";
import { ok, warn, info, fail, bold, cyan, dim } from "../lib/ui.mjs";

/**
 * Scaffold a brand-new project and wire Astralis into it. We own NO project
 * templates: the official scaffolder (create-next-app / create-vite) runs
 * interactively with its own prompts — TS, ESLint, Tailwind stay the user's
 * call, exactly as if they'd run it directly — and our `init` runs on the
 * result. Any extra args are forwarded verbatim to the scaffolder, so
 * non-interactive use works too:
 *
 *   astralis create my-app --framework vite --template react
 */

/** The package manager that invoked us — `pnpm create astralis` should scaffold with pnpm. */
export function invokingPackageManager(userAgent = process.env.npm_config_user_agent ?? "") {
  const name = userAgent.split("/")[0];
  return ["pnpm", "yarn", "bun"].includes(name) ? name : "npm";
}

/** One shell command string (spawned with shell:true — pm binaries are .cmd shims on Windows). */
export function buildScaffoldCommand(framework, name, forwarded, pm) {
  // yarn classic's `create` chokes on @latest tags; everyone else wants them.
  const tag = pm === "yarn" ? "" : "@latest";
  const scaffolder = framework === "next" ? `next-app${tag}` : `vite${tag}`;
  // npm swallows flags meant for the scaffolder unless they sit behind `--`.
  const separator = pm === "npm" && forwarded.length > 0 ? ["--"] : [];
  return [pm, "create", scaffolder, name, ...separator, ...forwarded].filter(Boolean).join(" ");
}

async function promptFramework() {
  const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
  const answer = await rl.question(
    `${bold("Framework?")}  ${cyan("1")} Next.js   ${cyan("2")} Vite ${dim("(choose a React template when Vite asks)")}  `,
  );
  rl.close();
  const choice = answer.trim().toLowerCase();
  if (choice === "1" || choice === "next" || choice === "next.js" || choice === "nextjs") return "next";
  if (choice === "2" || choice === "vite") return "vite";
  return null;
}

export async function run(argv) {
  // Manual parse: --framework is ours, first bare word is the name,
  // EVERYTHING else is forwarded untouched to the scaffolder.
  let framework;
  let name;
  const forwarded = [];
  for (let i = 0; i < argv.length; i++) {
    const arg = argv[i];
    if (arg === "--framework") framework = argv[++i];
    else if (!name && !arg.startsWith("-")) name = arg;
    else forwarded.push(arg);
  }

  if (!name) fail('Usage: astralis create <project-name> [--framework next|vite] [scaffolder args…]');
  if (!/^[a-z0-9@][a-z0-9-_.]*$/i.test(name)) fail(`"${name}" isn't a safe project name.`);
  if (existsSync(join(process.cwd(), name))) fail(`./${name} already exists.`);

  framework ??= await promptFramework();
  if (framework !== "next" && framework !== "vite") fail('Pick a framework: "next" or "vite".');

  const pm = invokingPackageManager();
  const command = buildScaffoldCommand(framework, name, forwarded, pm);
  info(`${bold(command)} ${dim("(the scaffolder's own prompts — answer them as usual)")}`);

  const scaffold = spawnSync(command, { stdio: "inherit", shell: true });
  if (scaffold.status !== 0) fail("Scaffolding failed or was cancelled — nothing to wire up.");
  if (!existsSync(join(process.cwd(), name, "package.json"))) {
    fail(`Expected ./${name}/package.json after scaffolding — did the scaffolder use a different directory?`);
  }

  ok(`project created in ./${name}`);
  console.log();
  info("wiring Astralis into it…");
  process.chdir(name);
  const init = await import("./init.mjs");
  await init.run([]);

  console.log(`\n${bold("Next steps:")}\n  ${cyan(`cd ${name}`)}\n  ${cyan(`${pm} run dev`)}`);
}
