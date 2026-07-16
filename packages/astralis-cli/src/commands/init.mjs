import { parseArgs } from "node:util";
import { readFileSync, writeFileSync } from "node:fs";
import { spawnSync } from "node:child_process";
import { readPackageJson, detectPackageManager, detectFramework, findEntryFile } from "../lib/detect.mjs";
import { addImports, wrapJsx, addTagAttribute, insertAfterBodyTag, addStatementAfterImports } from "../lib/edits.mjs";
import { ok, warn, info, fail, bold, dim, cyan } from "../lib/ui.mjs";

const PROVIDER_IMPORT = 'import { AstralisProvider } from "astralis-ui";';
const STYLES_IMPORT = 'import "astralis-ui/styles.css";';

// Applies `.astralis-dark` before first paint so a stored/system dark
// preference never flashes light (same script the Astralis docs site uses).
const THEME_INIT_CONST =
  'const astralisThemeInit = `(function(){try{var t=localStorage.getItem("astralis-ui-theme");var d=t==="dark"||((!t||t==="system")&&window.matchMedia("(prefers-color-scheme: dark)").matches);if(d)document.documentElement.classList.add("astralis-dark");}catch(e){}})();`;';
const THEME_INIT_SCRIPT = '\n        <script dangerouslySetInnerHTML={{ __html: astralisThemeInit }} />';

const MANUAL_SNIPPET = `
  ${bold("Manual setup:")}
    1. ${PROVIDER_IMPORT}
    2. ${STYLES_IMPORT}   ${dim("(once, at your entry point)")}
    3. Wrap your app:  <AstralisProvider defaultTheme="system">…</AstralisProvider>
  Full guide: ${cyan("https://astralis-zeta.vercel.app/docs/installation")}`;

export async function run(argv) {
  const { values } = parseArgs({
    args: argv,
    options: { "dry-run": { type: "boolean", default: false } },
  });
  const dryRun = values["dry-run"];
  const cwd = process.cwd();

  const pkg = readPackageJson(cwd);
  if (!pkg) fail("No package.json here — run `astralis init` from your project root.");

  const framework = detectFramework(pkg);
  if (!framework) {
    warn("Couldn't detect Next.js or Vite in this project.");
    console.log(MANUAL_SNIPPET);
    return;
  }
  const pm = detectPackageManager(cwd);
  info(`${bold(framework === "next" ? "Next.js" : "Vite")} project, ${bold(pm)}${dryRun ? dim("  (dry run — nothing will be written)") : ""}`);

  // 1. Dependency
  const hasDep = Boolean(pkg.dependencies?.["astralis-ui"] ?? pkg.devDependencies?.["astralis-ui"]);
  if (hasDep) {
    ok("astralis-ui already in dependencies");
  } else if (dryRun) {
    info(`would run: ${pm} add astralis-ui`);
  } else {
    info(`installing astralis-ui with ${pm}…`);
    // One command string: pm binaries are .cmd shims on Windows (need a shell),
    // and shell+args-array triggers Node's unescaped-args deprecation.
    const result = spawnSync(`${pm} add astralis-ui`, { stdio: "inherit", shell: true });
    if (result.status !== 0) fail(`${pm} add astralis-ui failed — install it manually, then re-run init.`);
    ok("astralis-ui installed");
  }

  // 2. Entry file
  const entry = findEntryFile(cwd, framework);
  if (!entry) {
    warn(`Couldn't find your ${framework === "next" ? "root layout" : "src/main.tsx"} — wire the provider manually:`);
    console.log(MANUAL_SNIPPET);
    return;
  }

  let source = readFileSync(entry.path, "utf8");
  const original = source;
  const notes = [];
  const apply = (result, label) => {
    source = result.source;
    if (result.changed) ok(`${label} ${dim(`(${entry.relative})`)}`);
    else if (result.note) notes.push(`${label}: ${result.note}`);
    else ok(`${label} — already present`);
  };

  apply(addImports(source, [PROVIDER_IMPORT, STYLES_IMPORT]), "imports added");

  if (source.includes("<AstralisProvider")) {
    ok("AstralisProvider already wraps this file");
  } else if (framework === "next") {
    apply(
      wrapJsx(source, "{children}", '<AstralisProvider defaultTheme="system">', "</AstralisProvider>"),
      "provider wrapped around {children}",
    );
  } else {
    apply(
      wrapJsx(source, "<App />", '<AstralisProvider defaultTheme="system">', "</AstralisProvider>"),
      "provider wrapped around <App />",
    );
  }

  if (framework === "next") {
    apply(addStatementAfterImports(source, THEME_INIT_CONST), "anti-flash theme script const");
    apply(insertAfterBodyTag(source, THEME_INIT_SCRIPT), "theme script injected after <body>");
    apply(addTagAttribute(source, "html", "suppressHydrationWarning"), "suppressHydrationWarning on <html>");
  }

  // 3. Write
  if (source !== original) {
    if (dryRun) info(`would update ${entry.relative}`);
    else writeFileSync(entry.path, source);
  }

  for (const note of notes) warn(note);
  if (notes.length > 0) console.log(MANUAL_SNIPPET);

  console.log(`\n${bold("Done.")} Try it:\n  ${cyan('import { Button } from "astralis-ui";')}\n  ${cyan('<Button colorScheme="teal">Hello</Button>')}\nDocs: ${cyan("https://astralis-zeta.vercel.app/docs")}`);
}
