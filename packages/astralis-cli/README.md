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

Connects AI coding agents to the [astralis-mcp](https://www.npmjs.com/package/astralis-mcp)
docs server — prints ready-made configs for Claude Code, Cursor, and any MCP
client; `--write` adds it to Claude Desktop's config for you (with a backup).

```bash
npx astralis-cli connect-mcp          # print configs
npx astralis-cli connect-mcp --write  # configure Claude Desktop
```

## License

MIT
