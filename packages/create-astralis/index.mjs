#!/usr/bin/env node
// `npm create astralis my-app` ⇢ `astralis create my-app`.
// This package is only the conventional doorway; the logic lives in astralis-cli.
process.argv.splice(2, 0, "create");
await import("astralis-cli/cli");
