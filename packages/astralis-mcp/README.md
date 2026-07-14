# astralis-mcp

MCP server for [Astralis UI](https://astralis-zeta.vercel.app) — lets AI
coding agents (Claude Code, Cursor, …) look up the library's **current**
component APIs, full props tables, runnable demo source and theming guides
instead of guessing from training data.

Reads the docs site's machine-readable endpoints, so answers can never drift
from what the documentation actually says.

## Setup

**Claude Code:**

```bash
claude mcp add astralis -- npx -y astralis-mcp
```

**Any MCP client**, in its config:

```json
{
  "mcpServers": {
    "astralis": { "command": "npx", "args": ["-y", "astralis-mcp"] }
  }
}
```

No install step — `npx` fetches and runs it on demand.

## Tools

| Tool | What it returns |
| --- | --- |
| `list_components` | Every docs page — 62 components + 7 guides — with slug, description, category |
| `get_component` | One component's full docs: props table, keyboard map, a11y notes, demo source |
| `get_guide` | A guide page: `installation`, `quick-start`, `theming`, `colors`, `responsive`, `style-props`, `tokens` |
| `search_docs` | Full-text search across everything, with snippets |
| `get_theming` | The complete theming + design-token reference in one call |

## Options

| Env var | Default | Purpose |
| --- | --- | --- |
| `ASTRALIS_DOCS_URL` | `https://astralis-zeta.vercel.app` | Point at a local docs dev server (`http://localhost:3000`) when working on unpublished docs |

## License

MIT © Paul Andrew
