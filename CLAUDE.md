# CLAUDE.md (Astralis UI Monorepo)

## Architecture & Workspaces
- This is a monorepo managed via `pnpm` workspaces.
- `packages/astralis-ui`: Core UI component library. Focuses on architectural scalability and developer experience. Use React, TypeScript, and Tailwind CSS.
- `packages/astralis-playground`: Local testing/development sandbox for components.
- `packages/astralis-docs`: The documentation site.

## Code Conventions & Constraints
- Focus strictly on fullness and volume for styling structures where applicable; ensure clean, reusable component patterns.
- Keep components modular and highly scannable; avoid massive monolithic files.
- Ensure strict TypeScript typing—no implicit `any`.
- We are building off tailwind, but this is for internal library use, since we aren't using a css engine, so we make sure we have explicit tokens and variables definitions overriding any tailwind stuff that my show in the DOM. 
- Use compound component strucutre when necessary and divide to sub components. 
- Always follow the standard through out all components, variable namings, styling, types naming and definitons, reusable logic, no repition. 

## Key Commands
- Install dependencies: `pnpm install`
- Run playground: `pnpm dev:ui`
- Run library: `pnpm dev`
- Run docs site: `pnpm dev:docs`
- Build entire workspace: `pnpm build`
- Build UI package only: `pnpm build:ui`
