# Skills Architecture

## Purpose

Skills represent reusable engineering knowledge.

Skills SHOULD NOT directly provide unrestricted infrastructure access.

A Skill defines **how work should be performed**.

## Example Structure

```text
.ai/
├── skills/
│   ├── architecture/
│   │   ├── laravel.md
│   │   ├── vue.md
│   │   ├── spring-boot.md
│   │   └── fastapi.md
│   │
│   ├── backend/
│   │   ├── api-design.md
│   │   ├── database.md
│   │   ├── authentication.md
│   │   └── authorization.md
│   │
│   ├── frontend/
│   │   ├── component-design.md
│   │   ├── forms.md
│   │   ├── state-management.md
│   │   └── accessibility.md
│   │
│   ├── quality/
│   │   ├── testing.md
│   │   ├── debugging.md
│   │   ├── code-review.md
│   │   └── security-review.md
│   │
│   └── operations/
│       ├── git.md
│       ├── deployment.md
│       ├── nginx.md
│       └── database-migration.md
```

## Example Skill Definition

```text
Skill:
Laravel Migration Safety

Rules:
- Never modify a migration already deployed to production.
- Create a new migration for schema changes.
- Review rollback behavior.
- Avoid destructive schema operations without approval.
- Test migration against representative data.
```
