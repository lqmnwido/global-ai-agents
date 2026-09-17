# Vue · Nuxt Profile

> Company standard for Nuxt projects. Load this module when the project stack matches this framework.

## Stack

| Layer | Standard |
|---|---|
| Language | TypeScript 5.x |
| Framework | Nuxt 3 |
| Frontend | Vue 3 (Composition API), Tailwind CSS |
| Database | PostgreSQL via Prisma or Drizzle ORM |
| Testing | Vitest + Vue Test Utils, Playwright for E2E |

## Conventions

- File-based routing in `pages/` directory
- Layouts in `layouts/`, components in `components/`, composables in `composables/`
- Server routes in `server/api/`, server middleware in `server/middleware/`
- Plugins in `plugins/`, middleware in `middleware/` (route middleware)
- Auto-imports enabled for Vue APIs and composables
- Key files: `nuxt.config.ts`, `tsconfig.json`, `app.vue`, `package.json`

## Patterns

- Auto-imported composables for shared stateful logic
- `useFetch` / `useAsyncData` for SSR-safe data fetching
- Server API routes for backend logic without separate server
- Middleware for route guards and authentication
- `definePageMeta` for per-page layout and middleware binding

## Rules

- Follow existing project pattern before framework convention
- Mimic the project's existing modules before introducing new patterns
- Never install framework scaffolding tools that restructure the repo without approval

## Testing

- Vitest with `*.spec.ts` or `*.test.ts` co-located files
- Vue Test Utils for component testing
- Playwright E2E tests in `tests/` directory
- Run `npm run test` for unit, `npm run test:e2e` for E2E
