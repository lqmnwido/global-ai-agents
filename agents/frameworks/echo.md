# Go · Echo Profile

> Company standard for Echo projects. Load this module when the project stack matches this framework.

## Stack

| Layer | Standard |
|---|---|
| Language | Go 1.22+ |
| Framework | Echo v4 |
| Frontend | Separate SPA or Go HTML templates |
| Database | PostgreSQL with GORM or sqlx |
| Testing | Go testing package + testify |

## Conventions

- Project layout: `cmd/`, `internal/`, `pkg/`, `api/`, `configs/`
- Handlers in `internal/handlers/`
- Models in `internal/models/`, services in `internal/services/`
- Routes in `internal/routes/` with `echo.Group`
- Middleware in `internal/middleware/`
- Key files: `go.mod`, `go.sum`, `main.go`, `.env`

## Patterns

- Handler functions returning `error` with `echo.Context`
- Route groups for API versioning and shared middleware
- Custom middleware using `echo.MiddlewareFunc` signature
- Validator tags on request structs for binding validation
- Centralized HTTP error handling with `echo.HTTPError`

## Rules

- Follow existing project pattern before framework convention
- Mimic the project's existing modules before introducing new patterns
- Never install framework scaffolding tools that restructure the repo without approval

## Testing

- Go standard `testing` package with `*_test.go` files co-located
- testify assertions for concise test validation
- `echo.New().Test()` or `httptest` for handler testing
- Run `go test ./...` to execute full suite
