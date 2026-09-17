# React · Next.js Profile

> Company standard for Next.js projects. Load this module when the project stack matches this framework.

## Stack

| Layer | Standard |
|---|---|
| Language | TypeScript 5.x |
| Framework | Next.js 14+ (App Router) |
| Frontend | React 18, Tailwind CSS, shadcn/ui or Radix |
| Database | PostgreSQL via Prisma or Drizzle ORM |
| Testing | Vitest + React Testing Library, Playwright for E2E |

## Conventions

- App Router structure: `src/app/` with `layout.tsx`, `page.tsx`, `loading.tsx`
- API routes in `src/app/api/` or Route Handlers
- Components in `src/components/`, shared UI in `src/components/ui/`
- Lib utilities in `src/lib/`, hooks in `src/hooks/`
- Server Components by default; add `'use client'` only when needed
- Key files: `next.config.js`, `tsconfig.json`, `tailwind.config.ts`, `package.json`

## Patterns

- Server Components for data fetching, Client Components for interactivity
- Server Actions for mutations without API routes
- Metadata API for SEO (`generateMetadata`, `metadata` export)
- Parallel routes and intercepting routes for complex layouts
- ISR/SSG via `revalidate` and `generateStaticParams`

## Rules

- Follow existing project pattern before framework convention
- Mimic the project's existing modules before introducing new patterns
- Never install framework scaffolding tools that restructure the repo without approval

## Testing

- Vitest with `__tests__/` or `*.test.tsx` co-located files
- Playwright E2E tests in `e2e/` or `tests/` directory
- Run `npm run test` for unit, `npm run test:e2e` for E2E
