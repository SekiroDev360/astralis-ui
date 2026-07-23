/// <reference types="vitest/config" />
import { defineConfig, type PluginOption } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import dts from "vite-plugin-dts";

// https://vite.dev/config/
import path from "node:path";
import { fileURLToPath } from "node:url";
import { storybookTest } from "@storybook/addon-vitest/vitest-plugin";

/**
 * Modules that must ship WITHOUT the "use client" banner: the theme core is
 * dependency- and React-free so it can run in Node and in React Server
 * Components. Names are rollup chunk names — the path under src/, no extension.
 * scripts/check-server-safe.mjs asserts the built output still matches.
 */
const SERVER_SAFE = new Set(["theme/theme-math", "theme/token-spec", "theme/serialize"]);

const dirname =
  typeof __dirname !== "undefined"
    ? __dirname
    : path.dirname(fileURLToPath(import.meta.url));

// More info at: https://storybook.js.org/docs/next/writing-tests/integrations/vitest-addon
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    dts({
      tsconfigPath: "./tsconfig.build.json",
      rollupTypes: true,
    }),
  ],
  build: {
    emptyOutDir: false,
    lib: {
      entry: "./src/index.ts",
      formats: ["es"],
    },
    rollupOptions: {
      // Externalize every bare import (peers AND runtime deps) — a library
      // ships references, not copies; consumers resolve them from their own
      // node_modules, which keeps dist small and dedupes shared packages.
      external: (id) => !id.startsWith(".") && !path.isAbsolute(id),
      output: {
        // One output module per source module: bundlers tree-shake at file
        // granularity and RSC client boundaries stay per-module instead of
        // marking the whole library with one blanket directive.
        preserveModules: true,
        preserveModulesRoot: "src",
        entryFileNames: "[name].js",
        /*
         * The theme core is dependency- and React-free by design so it can run
         * in Node (astralis-cli, build scripts) and in React Server Components.
         * Stamping it "use client" makes it a client reference, and a Server
         * Component calling it gets nothing — which silently broke decoding a
         * shared theme during server render. Everything else is a component or
         * a hook and does need the directive.
         */
        banner: (chunk) => (SERVER_SAFE.has(chunk.name) ? "" : '"use client";\n'),
      },
    },
  },
  test: {
    projects: [
      {
        // Fast jsdom behavior tests — the default `pnpm test` target.
        extends: true,
        test: {
          name: "unit",
          environment: "jsdom",
          include: ["src/**/*.test.{ts,tsx}"],
          setupFiles: ["./vitest.setup.ts"],
        },
      },
      {
        extends: true,
        plugins: [
          // The plugin will run tests for the stories defined in your Storybook config
          // See options at: https://storybook.js.org/docs/next/writing-tests/integrations/vitest-addon#storybooktest
          storybookTest({
            configDir: path.join(dirname, ".storybook"),
          }) as unknown as PluginOption,
        ],
        test: {
          name: "storybook",
          browser: {
            enabled: true,
            headless: true,
            provider: "playwright",
            instances: [
              {
                browser: "chromium",
              },
            ],
          },
          setupFiles: [".storybook/vitest.setup.ts"],
        },
      },
    ],
  },
});
