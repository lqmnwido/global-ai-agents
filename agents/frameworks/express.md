# Node · Express Profile

> Company standard for Express projects. Load this module when the project stack matches this framework.

## Stack

| Layer | Standard |
|---|---|
| Language | TypeScript 5.x |
| Framework | Express 4.x |
| Frontend | Separate SPA (React/Vue/Angular) or EJS templates |
| Database | PostgreSQL / MongoDB via Mongoose or Prisma |
| Testing | Jest + Supertest for HTTP assertions |

## Conventions

- Entry point at `src/index.ts` or `server.ts`
- Routes in `src/routes/` or `src/api/` with Express Router
- Middleware in `src/middleware/` for auth, validation, error handling
- Controllers in `src/controllers/`, services in `src/services/`
- Config via environment variables loaded with `dotenv`
- Key files: `package.json`, `tsconfig.json`, `.env`, `.eslintrc`

## Patterns

- Router-level middleware for route grouping
- Centralized error handler middleware as last app middleware
- Async wrapper pattern to avoid repetitive try/catch in route handlers
- Request validation with `zod` or `joi` at middleware layer
- Dependency injection via constructor injection in service classes

## Rules

- Follow existing project pattern before framework convention
- Mimic the project's existing modules before introducing new patterns
- Never install framework scaffolding tools that restructure the repo without approval

## Testing

- Jest with `__tests__/` directories co-located with source
- Supertest for integration tests against Express app
- Run `npm test` or `npx jest` to execute suite
