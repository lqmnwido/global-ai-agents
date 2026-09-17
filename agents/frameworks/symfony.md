# PHP · Symfony Profile

> Company standard for Symfony projects. Load this module when the project stack matches this framework.

## Stack

| Layer | Standard |
|---|---|
| Language | PHP 8.2+ |
| Framework | Symfony 7 |
| Frontend | Twig / Symfony UX / Stimulus |
| Database | Doctrine ORM with MySQL or PostgreSQL |
| Testing | PHPUnit + Symfony Panther for E2E |

## Conventions

- Bundle-based structure under `src/` or `src/BundleName/`
- Controllers in `src/Controller/`, services defined in `config/services.yaml`
- Doctrine entities in `src/Entity/`, repositories in `src/Repository/`
- Form types in `src/Form/`, event subscribers in `src/EventSubscriber/`
- Routes via annotations/attributes or `config/routes.yaml`
- Key files: `composer.json`, `symfony.lock`, `config/packages/`, `.env`

## Patterns

- FormType classes for form building and validation
- Doctrine repositories with custom query builders
- Event subscribers/listeners for decoupled logic
- Symfony Messenger for async message handling
- Serializer groups for API response control

## Rules

- Follow existing project pattern before framework convention
- Mimic the project's existing modules before introducing new patterns
- Never install framework scaffolding tools that restructure the repo without approval

## Testing

- PHPUnit with `tests/` directory mirroring `src/` structure
- Functional tests using Symfony's `WebTestCase`
- Run `php bin/phpunit` to execute tests
