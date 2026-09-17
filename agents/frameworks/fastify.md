# Node · Fastify Profile

> Company standard for Fastify projects. Load this module when the project stack matches this framework.

## Stack

| Layer | Standard |
|---|---|
| Language | TypeScript 5.x |
| Framework | Fastify 4.x |
| Frontend | Separate SPA or @fastify/view with templates |
| Database | PostgreSQL / MongoDB via Prisma or native drivers |
| Testing | Node test runner or Vitest + light-my-request |

## Conventions

- Entry point at `src/index.ts` or `src/server.ts`
- Plugins registered via `fastify-plugin` in `src/plugins/`
- Routes in `src/routes/` with schema-based validation
- Hooks (`onRequest`, `onSend`) in dedicated plugin files
- Config via `@fastify/env` or `@fastify/config`
- Key files: `package.json`, `tsconfig.json`, `.env`, `fastify.config.ts`

## Patterns

- Encapsulated plugins for modular route grouping
- JSON Schema for request/response validation at route level
- `@fastify/swagger` for auto-generated API docs
- Custom serializers (`fastify.setSerializerCompiler`) for response shaping
- Dependency injection via Fastify's `decorate` and `decorateReply`

## Rules

- Follow existing project pattern before framework convention
- Mimic the project's existing modules before introducing new patterns
- Never install framework scaffolding tools that restructure the repo without approval

## Testing

- Vitest or Node test runner with `src/**/*.test.ts` co-location
- `light-my-request` for injection testing without network
- Run `npm test` to execute full suite
