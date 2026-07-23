import { parseArgs } from "node:util";
import { existsSync, writeFileSync } from "node:fs";
import { themeCss, validateSeed, isEmptySeed } from "astralis-ui/serialize";
import { ok, fail, cyan, dim } from "../lib/ui.mjs";

/**
 * Renders a theme seed as a stylesheet — the static equivalent of
 * <AstralisProvider tokens={seed}>, for people who prefer build-time theming
 * over the runtime provider.
 *
 * Both the colour maths and the serialization come from the library and are
 * never duplicated here, so `astralis theme` and the provider cannot drift.
 */

/** Flag -> seed field. */
const STRING_FLAGS = {
  brand: "brandColor",
  gray: "grayColor",
  error: "errorColor",
  warning: "warningColor",
  success: "successColor",
  info: "infoColor",
  "font-heading": "fontHeading",
  "font-body": "fontBody",
  "font-mono": "fontMono",
};

const NUMBER_FLAGS = {
  radius: "radiusScale",
  spacing: "spacingScale",
  "font-scale": "fontSizeScale",
  motion: "motionScale",
};

const USAGE = `Usage: astralis theme [options]

  Colours
    --brand <hex>          brand hue, e.g. "#8b5cf6"
    --gray <hex>           neutral hue — drives every surface, label and border,
                           and tints white/black so the page follows the neutral

  Status  (each seeds its own palette; the red/orange/green/blue hues and
           their colorScheme values are never altered)
    --error <hex>          defaults to red
    --warning <hex>        defaults to orange
    --success <hex>        defaults to green
    --info <hex>           defaults to blue

  Typefaces
    --font-heading <stack>
    --font-body <stack>
    --font-mono <stack>

  Scales (1 = library default; 0 is allowed)
    --radius <n>           border-radius multiplier
    --spacing <n>          spacing multiplier — the density dial
    --font-scale <n>       font-size multiplier
    --motion <n>           duration multiplier (0 disables transitions)

  Output
    --out <file>           default: astralis-theme.css
    --force                overwrite an existing file

  A bare hex is shorthand for --brand:   astralis theme "#8b5cf6"`;

export async function run(argv) {
  let parsed;
  try {
    parsed = parseArgs({
      args: argv,
      options: {
        ...Object.fromEntries(
          [...Object.keys(STRING_FLAGS), ...Object.keys(NUMBER_FLAGS)].map((f) => [f, { type: "string" }]),
        ),
        out: { type: "string", default: "astralis-theme.css" },
        force: { type: "boolean", default: false },
        help: { type: "boolean", default: false },
      },
      allowPositionals: true,
    });
  } catch (error) {
    fail(`${error.message}\n\n${USAGE}`);
  }

  const { values, positionals } = parsed;
  if (values.help) {
    console.log(USAGE);
    return;
  }

  const seed = {};
  for (const [flag, field] of Object.entries(STRING_FLAGS)) {
    if (values[flag] !== undefined) seed[field] = values[flag];
  }
  for (const [flag, field] of Object.entries(NUMBER_FLAGS)) {
    if (values[flag] === undefined) continue;
    const n = Number(values[flag]);
    if (!Number.isFinite(n)) fail(`--${flag} expects a number, got "${values[flag]}".`);
    seed[field] = n;
  }

  // Back-compat: `astralis theme "#8b5cf6"` still means --brand.
  if (positionals[0]) {
    if (seed.brandColor) fail("Pass the brand colour as a positional OR as --brand, not both.");
    seed.brandColor = positionals[0].toLowerCase();
  }

  if (isEmptySeed(seed)) fail(`Nothing to generate — no theme options given.\n\n${USAGE}`);

  const issues = validateSeed(seed);
  if (issues.length) {
    fail(`Invalid theme options:\n${issues.map((i) => `    ${i.field}: ${i.message}`).join("\n")}`);
  }

  if (existsSync(values.out) && !values.force) {
    fail(`${values.out} already exists — pass --force to overwrite.`);
  }

  writeFileSync(values.out, themeCss(seed));
  ok(`wrote ${cyan(values.out)}`);

  const usesFont = seed.fontHeading || seed.fontBody || seed.fontMono;
  console.log(
    `\nImport it after the library stylesheet:\n` +
      `  ${cyan('import "astralis-ui/styles.css";')}\n` +
      `  ${cyan(`import "./${values.out}";`)}\n` +
      (usesFont ? `${dim("Custom fonts must be loaded by your app (next/font or a <link>).")}\n` : "") +
      `${dim("Runtime alternative: <AstralisProvider tokens={…}> — same math.")}`,
  );
}
