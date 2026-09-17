# Rust · Axum Profile

> Company standard for Axum projects. Load this module when the project stack matches this framework.

## Stack

| Layer | Standard |
|---|---|
| Language | Rust (stable) |
| Framework | Axum 0.7+ |
| Frontend | Separate SPA or Askama/MiniJinja templates |
| Database | PostgreSQL with SQLx or Diesel |
| Testing | Built-in `#[cfg(test)]` + `axum::test` / reqwest |

## Conventions

- Entry point in `src/main.rs` or `src/lib.rs` with `#[tokio::main]`
- Routes in `src/routes/` with handler functions
- Models in `src/models/`, database queries in `src/db/` or `src/queries/`
- Middleware as tower layers in `src/middleware/`
- Shared state via `State<T>` extractor with `Arc<>` for thread safety
- Key files: `Cargo.toml`, `src/main.rs`, `src/lib.rs`, `.env`

## Patterns

- Extractor-based parameter binding (`Path`, `Query`, `Json`, `State`)
- Tower middleware layers for auth, logging, timeout
- `axum::Router` composition with `.nest()` and `.route()`
- SQLx compile-time checked queries for type-safe database access
- Response types using `IntoResponse` trait implementations

## Rules

- Follow existing project pattern before framework convention
- Mimic the project's existing modules before introducing new patterns
- Never install framework scaffolding tools that restructure the repo without approval

## Testing

- `#[tokio::test]` async tests with `axum::test` helpers
- reqwest or `axum::body::to_bytes` for response assertions
- SQLx test utilities with `sqlx::test` for database tests
- Run `cargo test` to execute full suite
