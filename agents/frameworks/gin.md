# Go · Gin Profile

> Company standard for Gin projects. Load this module when the project stack matches this framework.

## Stack

| Layer | Standard |
|---|---|
| Language | Go 1.22+ |
| Framework | Gin v1.9+ |
| Frontend | Separate SPA or Go HTML templates |
| Database | PostgreSQL with GORM or sqlx |
| Testing | Go testing package + testify |

## Conventions

- Project layout: `cmd/`, `internal/`, `pkg/`, `api/`, `configs/`
- Handlers in `internal/handlers/` or `internal/api/`
- Models in `internal/models/`, services in `internal/services/`
- Routes registered in `internal/routes/` or `main.go`
- Middleware in `internal/middleware/`
- Key files: `go.mod`, `go.sum`, `main.go`, `.env`

## Patterns

- Handler functions wrapping business logic with `gin.Context`
- Route groups for versioning (`/api/v1/`, `/api/v2/`)
- Custom middleware for auth, logging, CORS, rate limiting
- GORM model hooks (`BeforeCreate`, `AfterFind`) for lifecycle events
- Structured error responses via a shared response helper

## Rules

- Follow existing project pattern before framework convention
- Mimic the project's existing modules before introducing new patterns
- Never install framework scaffolding tools that restructure the repo without approval

## Testing

- Go standard `testing` package with `*_test.go` files co-located
- testify assertions and suite-based test organization
- `httptest.NewRecorder` for handler-level HTTP testing
- Run `go test ./...` to execute full suite
