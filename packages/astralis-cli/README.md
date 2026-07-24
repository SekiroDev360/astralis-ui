# astralis-cli

Setup and tooling CLI for [Astralis UI](https://astralis-zeta.vercel.app).

```bash
npx astralis-cli <command>
# or: npm i -g astralis-cli && astralis <command>
```

## Commands

### `astralis create <name>`

Scaffolds a brand-new project and wires Astralis into it. The official
scaffolder runs with its own prompts — TypeScript, ESLint, and friends stay
your call — then `init` runs on the result. Extra args pass straight through
to the scaffolder.

```bash
npm create astralis my-app                             # interactive
npx astralis-cli create my-app --framework vite --template react-ts
```

### `astralis init`

Wires Astralis UI into a Next.js or Vite project: installs the package,
adds the stylesheet import, wraps your app in `AstralisProvider`, and (Next)
injects the anti-flash dark-mode script. Idempotent — safe to run twice.

```bash
npx astralis-cli init            # do it
npx astralis-cli init --dry-run  # show what would change
```

### `astralis theme <hex>`

Generates a static stylesheet with the full OKLCH-derived brand ramp and role
tokens for light and dark — the build-time alternative to
`<AstralisProvider tokens={{ brandColor }}>`, computed with the exact same
color math.

```bash
npx astralis-cli theme "#8b5cf6" --out astralis-theme.css
```

Import it **after** `astralis-ui/styles.css`.

### `astralis connect-mcp`

Connects a single client to the [astralis-mcp](https://www.npmjs.com/package/astralis-mcp)
docs server. It prompts for the client (Claude Code, Codex, Cursor, Claude
Desktop, or Antigravity), tells you exactly what it's about to do, asks you to
confirm, then does it — running the client's own `mcp add` command, or writing
its JSON config (with a backup). Pass `--client` to skip the prompt.

```bash
npx astralis-cli connect-mcp                      # prompt for a client, then configure it
npx astralis-cli connect-mcp --client antigravity # go straight to Antigravity
npx astralis-cli connect-mcp --client codex       # go straight to Codex
```

Claude Code and Codex are configured by running their own `mcp add` command;
Cursor, Claude Desktop, and Antigravity by writing their config files.

## License

MIT
