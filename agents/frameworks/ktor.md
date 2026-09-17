# Kotlin · Ktor Profile

> Company standard for Ktor projects. Load this module when the project stack matches this framework.

## Stack

| Layer | Standard |
|---|---|
| Language | Kotlin 1.9+ |
| Framework | Ktor 2.x |
| Frontend | Separate SPA or Ktor HTML DSL |
| Database | PostgreSQL with Exposed or Ktorm |
| Testing | Kotlin test + Ktor test harness |

## Conventions

- Entry point in `src/main/kotlin/.../Application.kt`
- Routes in `src/main/kotlin/.../routes/` with `Route` extensions
- Models in `src/main/kotlin/.../models/`
- Services in `src/main/kotlin/.../services/`
- Plugins (features) registered in `Application.module()`
- Key files: `build.gradle.kts`, `application.conf`, `Application.kt`

## Patterns

- Ktor plugins (formerly features) for modular capability registration
- Content negotiation with `@Serializable` Kotlinx Serialization models
- Coroutine-based async handlers with `suspend` functions
- Authentication plugins for JWT, OAuth, or session-based auth
- Exposed DSL or DAO for database access with transaction support

## Rules

- Follow existing project pattern before framework convention
- Mimic the project's existing modules before introducing new patterns
- Never install framework scaffolding tools that restructure the repo without approval

## Testing

- Kotlin test with `src/test/kotlin/` mirroring main source
- `withTestApplication` or `createTestEnvironment` for route testing
- Run `./gradlew test` to execute full suite
