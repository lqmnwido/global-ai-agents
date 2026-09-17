# PHP · Laravel Profile

> Company standard for Laravel projects. Load this module when the project stack matches this framework.

## Stack

| Layer | Standard |
|---|---|
| Language | PHP 8.2+ |
| Framework | Laravel 11 |
| Frontend | Blade / Livewire / Inertia.js (Vue or React) |
| Database | MySQL / PostgreSQL with Eloquent ORM |
| Testing | PHPUnit + Laravel Dusk for browser tests |

## Conventions

- Follow `app/Http/Controllers`, `app/Models`, `app/Services`, `app/Repositories` structure
- Controllers go in `app/Http/Controllers`; API controllers in `app/Http/Controllers/Api`
- Form validation via `FormRequest` classes in `app/Http/Requests`
- Eloquent models in `app/Models` with explicit `$fillable` and `$casts`
- Migrations in `database/migrations`, seeders in `database/seeders`
- Routes defined in `routes/web.php` and `routes/api.php`
- Key files: `artisan`, `composer.json`, `.env`, `config/app.php`

## Patterns

- FormRequest classes for validation and authorization
- Eloquent relationships with explicit types (hasOne, belongsTo, morphMany)
- API Resources and Transformers for JSON response shaping
- Service classes in `app/Services` for business logic
- Repository pattern only when data access logic is genuinely complex

## Rules

- Follow existing project pattern before framework convention
- Mimic the project's existing modules before introducing new patterns
- Never install framework scaffolding tools that restructure the repo without approval

## Testing

- PHPUnit with `tests/Feature` and `tests/Unit` directories
- Factory-based model generation in `database/factories`
- Run `php artisan test` to execute full suite
