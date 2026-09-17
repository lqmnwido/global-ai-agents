# Java · Spring Boot Profile

> Company standard for Spring Boot projects. Load this module when the project stack matches this framework.

## Stack

| Layer | Standard |
|---|---|
| Language | Java 21+ |
| Framework | Spring Boot 3.x |
| Frontend | Thymeleaf / separate SPA (React/Vue) |
| Database | PostgreSQL with Spring Data JPA |
| Testing | JUnit 5 + Mockito, Spring Boot Test |

## Conventions

- Package structure: `com.{org}.{project}.{layer}` (controller, service, repository, model)
- Controllers in `src/main/java/.../controller/`
- Services in `src/main/java/.../service/` (interface + impl)
- Repositories in `src/main/java/.../repository/` extending JpaRepository
- DTOs in `src/main/java/.../dto/`, entities in `src/main/java/.../model/`
- Key files: `pom.xml` or `build.gradle`, `application.yml`, `src/main/java/...Application.java`

## Patterns

- Service layer with interface/implementation separation
- `@RestController` with `@RequestMapping` for REST APIs
- `@Service`, `@Repository`, `@Component` stereotype annotations
- `@Valid` with Bean Validation for request DTO validation
- `@Transactional` on service methods for transaction management

## Rules

- Follow existing project pattern before framework convention
- Mimic the project's existing modules before introducing new patterns
- Never install framework scaffolding tools that restructure the repo without approval

## Testing

- JUnit 5 with `@SpringBootTest` for integration tests
- `@WebMvcTest` for controller-level tests, `@DataJpaTest` for repository tests
- Run `mvn test` or `./gradlew test` to execute suite
