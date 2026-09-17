# Svelte · Svelte Library Profile

> Company standard for Svelte (Vite) library projects. Load this module when the project stack matches this framework.

## Stack

| Layer | Standard |
|---|---|
| Language | TypeScript 5.x |
| Framework | Svelte 5 |
| Frontend | Svelte with Vite, Tailwind CSS |
| Database | N/A (frontend library) |
| Testing | Vitest + Testing Library Svelte, Playwright for E2E |

## Conventions

- Components in `src/lib/` as `.svelte` files with `<script>` blocks
- Utilities and stores in `src/lib/` with `.ts` extension
- Use runes mode (`$state`, `$derived`, `$effect`) for reactivity
- Exports defined in `package.json` `exports` field for library builds
- Key files: `svelte.config.js`, `vite.config.ts`, `tsconfig.json`, `package.json`

## Patterns

- Runes (`$state`, `$derived`, `$effect`) for all reactive declarations
- Snippets for reusable template fragments without component overhead
- `$props()` for typed component prop declarations
- Actions (`use:` directive) for DOM behavior attachment
- Transition directives for declarative enter/exit animations

## Rules

- Follow existing project pattern before framework convention
- Mimic the project's existing modules before introducing new patterns
- Never install framework scaffolding tools that restructure the repo without approval

## Testing

- Vitest with `*.test.ts` files co-located
- Testing Library Svelte for component tests
- Run `npm test` or `npx vitest` to execute suite
