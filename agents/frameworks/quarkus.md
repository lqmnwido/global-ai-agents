# Java · Quarkus Profile

> Company standard for Quarkus projects. Load this module when the project stack matches this framework.

## Stack

| Layer | Standard |
|---|---|
| Language | Java 17+ / Kotlin |
| Framework | Quarkus 3.x |
| Frontend | Separate SPA or Qute templates |
| Database | PostgreSQL with Hibernate ORM / Panache |
| Testing | JUnit 5 + REST Assured, Quarkus Test |

## Conventions

- Package structure: `com.{org}.{project}.{layer}`
- REST resources in `src/main/java/.../resource/`
- Services in `src/main/java/.../service/`
- Entities extending PanacheEntity or using `@Entity`
- Configuration in `application.properties` or `application.yaml`
- Key files: `pom.xml` or `build.gradle`, `application.properties`, `Dockerfile.jvm`

## Patterns

- Panache entities for simplified JPA with active record or repository pattern
- RESTEasy Reactive for non-blocking REST endpoints
- CDI injection with `@Inject` for dependency wiring
- Reactive programming with Mutiny (`Uni`, `Multi`) for async I/O
- Dev services for automatic test infrastructure (DB, messaging)

## Rules

- Follow existing project pattern before framework convention
- Mimic the project's existing modules before introducing new patterns
- Never install framework scaffolding tools that restructure the repo without approval

## Testing

- JUnit 5 with `@QuarkusTest` for integration tests
- REST Assured for HTTP endpoint assertions
- Run `mvn test` or `./gradlew test` to execute suite
