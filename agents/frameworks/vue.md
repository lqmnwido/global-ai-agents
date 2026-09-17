# Vue · Vue Library Profile

> Company standard for Vue (Vite) library projects. Load this module when the project stack matches this framework.

## Stack

| Layer | Standard |
|---|---|
| Language | TypeScript 5.x |
| Framework | Vue 3 (Composition API) |
| Frontend | Vue with Vite, Tailwind CSS |
| Database | N/A (frontend library) |
| Testing | Vitest + Vue Test Utils, Playwright for E2E |

## Conventions

- Entry point at `src/main.ts` with `createApp(App)`
- Components in `src/components/` using `<script setup>` syntax
- Composables in `src/composables/`, utilities in `src/utils/`
- Store modules in `src/stores/` (Pinia preferred)
- Type definitions in `src/types/`
- Key files: `vite.config.ts`, `tsconfig.json`, `tailwind.config.ts`, `package.json`

## Patterns

- `<script setup>` for concise single-file components
- Composables for extractable reactive logic
- Pinia stores for shared state management
- Provide/inject for deep component dependency without prop drilling
- Teleport and Suspense for advanced rendering patterns

## Rules

- Follow existing project pattern before framework convention
- Mimic the project's existing modules before introducing new patterns
- Never install framework scaffolding tools that restructure the repo without approval

## Testing

- Vitest with `*.spec.ts` or `*.test.ts` files co-located
- Vue Test Utils for component mounting and interaction
- Run `npm test` or `npx vitest` to execute suite
