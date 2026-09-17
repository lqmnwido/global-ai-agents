# System Architecture

## Project Architecture

Projects SHOULD separate concerns clearly.

General architecture:

```text
Presentation
     │
Application
     │
Domain
     │
Infrastructure
     │
Database / External Systems
```

Not every framework requires physical folders matching these names.

Follow framework conventions.

## Framework Profiles

Framework-specific rules should extend the company standard.

Example:

```text
.ai/profiles/

laravel-vue.md
spring-vue.md
spring-react.md
fastapi-vue.md
node-react.md
```

Example profile:

```yaml
profile: laravel-vue

backend:
  language: PHP
  framework: Laravel

frontend:
  language: JavaScript
  framework: Vue

database:
  preferred: MySQL

backend_patterns:
  - FormRequest
  - API Resource
  - Service
  - Repository when justified

frontend_patterns:
  - Composition API
  - reusable components
  - composables
```

Do not force a Laravel architecture onto a Spring Boot project or vice versa.
