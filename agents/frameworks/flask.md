# Python · Flask Profile

> Company standard for Flask projects. Load this module when the project stack matches this framework.

## Stack

| Layer | Standard |
|---|---|
| Language | Python 3.12+ |
| Framework | Flask 3.x |
| Frontend | Jinja2 templates or separate SPA |
| Database | PostgreSQL with SQLAlchemy or Flask-SQLAlchemy |
| Testing | pytest |

## Conventions

- Application factory pattern in `app/__init__.py` with `create_app()`
- Blueprints for route grouping in `app/{blueprint}/`
- Models in `app/models.py` or per-blueprint `models.py`
- Config classes in `app/config.py` or `config.py`
- Extensions initialized in `app/extensions.py`
- Key files: `pyproject.toml`, `requirements.txt`, `.env`, `wsgi.py`

## Patterns

- Application factory for testable and configurable app creation
- Blueprints for modular route organization
- Flask-RESTful or marshmallow for API serialization
- Before/after request hooks for cross-cutting concerns
- Custom CLI commands via `@app.cli.command`

## Rules

- Follow existing project pattern before framework convention
- Mimic the project's existing modules before introducing new patterns
- Never install framework scaffolding tools that restructure the repo without approval

## Testing

- pytest with `tests/` directory and `conftest.py` for fixtures
- Test client via `app.test_client()` for route testing
- Run `pytest` from project root to execute suite
