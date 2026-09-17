# /develop

## Purpose

Implement the approved architecture.

## Human Gate

Implement only the approved plan, in approved stages. Do not continue to the
next stage without reporting and awaiting approval.

## Rules

During implementation:

* Follow existing project conventions.
* Avoid unrelated refactoring.
* Keep changes minimal and focused.
* Do not rename unrelated files.
* Do not change public APIs unnecessarily.
* Do not add dependencies unnecessarily.
* Do not expose secrets.
* Do not remove existing validations.
* Preserve authorization checks.
* Add defensive error handling where appropriate.

## Development Sequence

Preferred order:

```text
Database
   ↓
Domain / Model
   ↓
Repository / Data Layer
   ↓
Service / Application Layer
   ↓
Controller / API
   ↓
Frontend State
   ↓
Frontend Components
   ↓
UI
   ↓
Tests
```

Not every project requires every layer.

Do not create empty architectural layers simply to satisfy this diagram.

When implementation completes, do NOT report the task as done. Continue to
`/check`, then `/test`. `/test` includes asking for development blackbox tests
and starting the dev server (`npm run dev` / `npm run serve` / equivalent —
see `commands/test.md`). "Done" only per `standards/definition-of-done.md`.
