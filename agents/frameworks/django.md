# Python · Django Profile

> Company standard for Django projects. Load this module when the project stack matches this framework.

## Stack

| Layer | Standard |
|---|---|
| Language | Python 3.12+ |
| Framework | Django 5.x |
| Frontend | Django Templates / HTMX / DRF for APIs |
| Database | PostgreSQL with Django ORM |
| Testing | Django TestCase + pytest-django |

## Conventions

- Apps in project root: each app has `models.py`, `views.py`, `urls.py`, `admin.py`
- Settings split into `settings/base.py`, `settings/local.py`, `settings/production.py`
- Templates in `templates/` directory, static files in `static/`
- Forms in `forms.py`, serializers in `serializers.py` (DRF)
- Management commands in `{app}/management/commands/`
- Key files: `manage.py`, `requirements.txt`, `pyproject.toml`, `.env`

## Patterns

- Class-based views (ListView, DetailView, CreateView) for standard CRUD
- Django REST Framework serializers for API request/response handling
- Signals (`post_save`, `pre_save`) for cross-app event-driven logic
- Custom middleware for request processing and response modification
- Class-based middleware preferred over function-based in Django 5+

## Rules

- Follow existing project pattern before framework convention
- Mimic the project's existing modules before introducing new patterns
- Never install framework scaffolding tools that restructure the repo without approval

## Testing

- pytest-django with `tests/` directories in each app
- `pytest.ini` or `pyproject.toml` for test configuration
- Run `pytest` from project root to execute full suite
