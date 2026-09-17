# Node · NestJS Profile

> Company standard for NestJS projects. Load this module when the project stack matches this framework.

## Stack

| Layer | Standard |
|---|---|
| Language | TypeScript 5.x |
| Framework | NestJS 10 |
| Frontend | Separate SPA or NestJS-rendered templates |
| Database | PostgreSQL with TypeORM or Prisma |
| Testing | Jest + Supertest |

## Conventions

- Module structure: `src/{module}/` with `module.controller.ts`, `module.service.ts`, `module.module.ts`
- DTOs in `src/{module}/dto/`, entities in `src/{module}/entities/`
- Guards in `src/guards/`, interceptors in `src/interceptors/`, pipes in `src/pipes/`
- Config via `@nestjs/config` with `.env` files
- Key files: `nest-cli.json`, `tsconfig.json`, `src/main.ts`, `src/app.module.ts`

## Patterns

- Decorator-driven architecture (`@Controller`, `@Injectable`, `@Module`)
- DTO validation with `class-validator` and `class-transformer`
- Global exception filters for uniform error responses
- Custom decorators for shared concerns (user extraction, roles)
- Microservice integration via `@nestjs/microservices` when needed

## Rules

- Follow existing project pattern before framework convention
- Mimic the project's existing modules before introducing new patterns
- Never install framework scaffolding tools that restructure the repo without approval

## Testing

- Jest with `*.spec.ts` files co-located next to source
- E2E tests in `test/` directory using `supertest`
- Run `npm run test`, `npm run test:e2e` for respective suites
