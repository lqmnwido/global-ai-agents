# Go · Fiber Profile

> Company standard for Fiber projects. Load this module when the project stack matches this framework.

## Stack

| Layer | Standard |
|---|---|
| Language | Go 1.22+ |
| Framework | Fiber v2 (Express-inspired) |
| Frontend | Separate SPA or Go HTML templates |
| Database | PostgreSQL with GORM or sqlx |
| Testing | Go testing package + testify |

## Conventions

- Project layout: `cmd/`, `internal/`, `pkg/`, `api/`, `configs/`
- Handlers in `internal/handlers/` accepting `*fiber.Ctx`
- Models in `internal/models/`, services in `internal/services/`
- Routes grouped via `app.Group` or `fiber.Router`
- Middleware in `internal/middleware/`
- Key files: `go.mod`, `go.sum`, `main.go`, `.env`

## Patterns

- Fast handler functions returning `error` with `*fiber.Ctx`
- Route groups with shared prefix and middleware
- Custom middleware as `fiber.Handler` functions
- Struct-based request binding with `c.BodyParser(&req)`
- Centralized error responses via a shared utility function

## Rules

- Follow existing project pattern before framework convention
- Mimic the project's existing modules before introducing new patterns
- Never install framework scaffolding tools that restructure the repo without approval

## Testing

- Go standard `testing` package with `*_test.go` co-located
- testify assertions for concise validation
- `app.Test()` method for fiber handler testing
- Run `go test ./...` to execute full suite
