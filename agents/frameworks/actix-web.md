# Rust · Actix-Web Profile

> Company standard for Actix-Web projects. Load this module when the project stack matches this framework.

## Stack

| Layer | Standard |
|---|---|
| Language | Rust (stable) |
| Framework | Actix-Web 4 |
| Frontend | Separate SPA or Askama/Handlebars templates |
| Database | PostgreSQL with SQLx or Diesel |
| Testing | Built-in `#[cfg(test)]` + actix-test / reqwest |

## Conventions

- Entry point in `src/main.rs` with `#[actix_web::main]`
- Handlers in `src/handlers/` or `src/routes/`
- Models in `src/models/`, database in `src/db/`
- Middleware as actix `Transform` implementations in `src/middleware/`
- Application data via `web::Data<T>` extractor with `Arc<>`
- Key files: `Cargo.toml`, `src/main.rs`, `.env`

## Patterns

- Handler functions with actix extractors (`web::Path`, `web::Query`, `web::Json`)
- `App::wrap()` and `App::wrap_json()` for middleware registration
- Resource-based routing with `.resource()` and `.route()`
- SQLx query macros for compile-time checked database queries
- Custom `ResponseError` implementations for domain error handling

## Rules

- Follow existing project pattern before framework convention
- Mimic the project's existing modules before introducing new patterns
- Never install framework scaffolding tools that restructure the repo without approval

## Testing

- `#[actix_rt::test]` or `#[tokio::test]` for async handler tests
- `actix_test::init_service` for test server setup
- reqwest or actix-test for HTTP-level assertions
- Run `cargo test` to execute full suite
