# React · React Library Profile

> Company standard for React (Vite/CRA) library projects. Load this module when the project stack matches this framework.

## Stack

| Layer | Standard |
|---|---|
| Language | TypeScript 5.x |
| Framework | React 18 |
| Frontend | React with Vite, Tailwind CSS |
| Database | N/A (frontend library) |
| Testing | Vitest + React Testing Library, Playwright for E2E |

## Conventions

- Entry point at `src/App.tsx` or `src/main.tsx`
- Components in `src/components/` with co-located styles or Tailwind classes
- Hooks in `src/hooks/`, utilities in `src/utils/`, types in `src/types/`
- Context providers in `src/context/` or `src/providers/`
- Use function components with hooks exclusively (no class components)
- Key files: `vite.config.ts`, `tsconfig.json`, `tailwind.config.ts`, `package.json`

## Patterns

- Custom hooks for reusable stateful logic
- Context + useReducer for lightweight global state
- Compound components pattern for complex UI widgets
- Render props or HOCs only when hooks are insufficient
- Lazy loading with `React.lazy` and `Suspense` for code splitting

## Rules

- Follow existing project pattern before framework convention
- Mimic the project's existing modules before introducing new patterns
- Never install framework scaffolding tools that restructure the repo without approval

## Testing

- Vitest with `*.test.tsx` files co-located next to components
- React Testing Library for DOM-based component tests
- Run `npm test` or `npx vitest` to execute suite
