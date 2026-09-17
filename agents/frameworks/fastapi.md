# Python · FastAPI Profile

> Company standard for FastAPI projects. Load this module when the project stack matches this framework.

## Stack

| Layer | Standard |
|---|---|
| Language | Python 3.12+ |
| Framework | FastAPI 0.111+ |
| Frontend | Separate SPA or Jinja2 templates |
| Database | PostgreSQL with SQLModel or SQLAlchemy |
| Testing | pytest + httpx async client |

## Conventions

- Application entry at `main.py` or `app/main.py`
- Routers in `app/routers/`, one per domain
- Pydantic schemas in `app/schemas/` for request/response validation
- Models in `app/models/` using SQLModel or SQLAlchemy
- Dependencies in `app/dependencies.py` for injection
- Key files: `pyproject.toml`, `requirements.txt`, `.env`, `alembic.ini`

## Patterns

- Dependency injection via `Depends()` for DB sessions, auth, permissions
- Pydantic models for automatic request validation and OpenAPI docs
- Background tasks via `BackgroundTask` for non-blocking operations
- Async endpoints with `async def` for I/O-bound routes
- Alembic for database migration management

## Rules

- Follow existing project pattern before framework convention
- Mimic the project's existing modules before introducing new patterns
- Never install framework scaffolding tools that restructure the repo without approval

## Testing

- pytest with `tests/` directory and `conftest.py`
- httpx `AsyncClient` for async endpoint testing
- Run `pytest` from project root to execute suite
