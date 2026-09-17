# Svelte · SvelteKit Profile

> Company standard for SvelteKit projects. Load this module when the project stack matches this framework.

## Stack

| Layer | Standard |
|---|---|
| Language | TypeScript 5.x |
| Framework | SvelteKit 2 |
| Frontend | Svelte 5, Tailwind CSS |
| Database | PostgreSQL via Prisma or Drizzle ORM |
| Testing | Vitest + Testing Library, Playwright for E2E |

## Conventions

- File-based routing in `src/routes/` with `+page.svelte`, `+layout.svelte`, `+page.server.ts`
- Server load functions in `+page.server.ts` and `+layout.server.ts`
- Actions defined via `export const actions` in `+page.server.ts`
- Components in `src/lib/components/`, utilities in `src/lib/`
- Server-only code in `src/lib/server/`
- Key files: `svelte.config.js`, `vite.config.ts`, `tsconfig.json`, `package.json`

## Patterns

- `$state`, `$derived`, `$effect` runes for reactive state (Svelte 5)
- Form actions for server-side form handling without API endpoints
- Load functions for data fetching with automatic reactivity
- `+error.svelte` pages for route-level error handling
- Adapter-based deployment (adapter-auto, adapter-node, adapter-vercel)

## Rules

- Follow existing project pattern before framework convention
- Mimic the project's existing modules before introducing new patterns
- Never install framework scaffolding tools that restructure the repo without approval

## Testing

- Vitest with `*.test.ts` or `*.spec.ts` files in `src/`
- Playwright E2E tests in `tests/` directory
- Run `npm run test` for unit, `npm run test:e2e` for E2E
