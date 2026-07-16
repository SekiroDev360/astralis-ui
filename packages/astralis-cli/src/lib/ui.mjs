import readline from "node:readline/promises";

/**
 * Terminal output helpers — raw ANSI, no dependencies. Colors switch off for
 * non-TTY output (piped) and when NO_COLOR is set, per convention.
 */

const useColor = process.stdout.isTTY && !process.env.NO_COLOR;
const wrap = (open, close) => (text) => (useColor ? `\x1b[${open}m${text}\x1b[${close}m` : String(text));

export const bold = wrap(1, 22);
export const dim = wrap(2, 22);
export const red = wrap(31, 39);
export const green = wrap(32, 39);
export const yellow = wrap(33, 39);
export const cyan = wrap(36, 39);

export const ok = (message) => console.log(`${green("✓")} ${message}`);
export const warn = (message) => console.log(`${yellow("!")} ${message}`);
export const info = (message) => console.log(`${cyan("→")} ${message}`);

/** Print the error and exit non-zero — the CLI's only failure path. */
export function fail(message) {
  console.error(`${red("✗")} ${message}`);
  process.exit(1);
}

/** y/N prompt; default no. */
export async function confirm(question) {
  const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
  const answer = await rl.question(`${question} ${dim("(y/N)")} `);
  rl.close();
  return /^y(es)?$/i.test(answer.trim());
}
