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

/*
 * One shared readline for the whole process, draining lines through a queue.
 * readline reads ahead, so with piped input it emits the next line's `line`
 * event in the gap between one prompt resolving and the next registering its
 * listener (e.g. select → confirm) — a per-question `rl.question` loses it. A
 * standing `line` listener queues those reads instead. Callers run
 * closePrompts() when done so the open stream stops keeping the process alive.
 */
let sharedRl = null;
let lineQueue = [];
let lineWaiter = null;

function ask(promptText) {
  if (!sharedRl) {
    sharedRl = readline.createInterface({ input: process.stdin, output: process.stdout });
    sharedRl.on("line", (line) => {
      if (lineWaiter) { const resolve = lineWaiter; lineWaiter = null; resolve(line); }
      else lineQueue.push(line);
    });
    // EOF (piped input exhausted): unblock a pending prompt with an empty answer.
    sharedRl.on("close", () => { if (lineWaiter) { const resolve = lineWaiter; lineWaiter = null; resolve(""); } });
  }
  process.stdout.write(promptText);
  if (lineQueue.length) return Promise.resolve(lineQueue.shift());
  return new Promise((resolve) => { lineWaiter = resolve; });
}

export function closePrompts() {
  sharedRl?.close();
  sharedRl = null;
  lineQueue = [];
  lineWaiter = null;
}

/** y/N prompt; default no. */
export async function confirm(question) {
  const answer = await ask(`${question} ${dim("(y/N)")} `);
  return /^y(es)?$/i.test(answer.trim());
}

/**
 * Numbered single-choice prompt. `options` is [{ value, label }].
 * Returns the chosen value, or null if the answer isn't a listed number.
 */
export async function select(question, options) {
  console.log(question);
  options.forEach((o, i) => console.log(`  ${cyan(String(i + 1))}  ${o.label}`));
  const answer = await ask(`${dim("Enter a number:")} `);
  return options[Number(answer.trim()) - 1]?.value ?? null;
}
