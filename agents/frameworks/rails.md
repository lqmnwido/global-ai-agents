# Ruby · Rails Profile

> Company standard for Rails projects. Load this module when the project stack matches this framework.

## Stack

| Layer | Standard |
|---|---|
| Language | Ruby 3.2+ |
| Framework | Rails 7.x |
| Frontend | Hotwire (Turbo + Stimulus) / React via importmap or jsbundling |
| Database | PostgreSQL with Active Record |
| Testing | RSpec + FactoryBot, Capybara for E2E |

## Conventions

- MVC structure: `app/models/`, `app/controllers/`, `app/views/`
- Services in `app/services/`, form objects in `app/form_objects/`
- Serializers/Blueprints in `app/serializers/` or `app/blueprints/`
- Migrations in `db/migrate/`, seeds in `db/seeds.rb`
- Initializers in `config/initializers/`
- Key files: `Gemfile`, `Rakefile`, `config/routes.rb`, `bin/rails`

## Patterns

- Active Record callbacks sparingly; prefer service objects for complex flows
- concerns in `app/models/concerns/` and `app/controllers/concerns/`
- API mode with `ActiveModel::Serializer` or `Blueprinter` for JSON APIs
- Sidekiq or Active Job for background processing
- Policy objects (Pundit) for authorization logic

## Rules

- Follow existing project pattern before framework convention
- Mimic the project's existing modules before introducing new patterns
- Never install framework scaffolding tools that restructure the repo without approval

## Testing

- RSpec with `spec/` directory mirroring `app/` structure
- FactoryBot for test data in `spec/factories/`
- Run `bundle exec rspec` to execute full suite
