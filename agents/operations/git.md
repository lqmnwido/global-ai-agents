# Git Workflow

## Standard Flow

Example:

```text
main / production
       │
       ├── staging
       │
       ├── development
       │
       ├── feature/*
       │
       ├── fix/*
       │
       ├── support/*
       │
       └── hotfix/*
```

Actual branch names MUST follow the repository's existing workflow.

## Commit Convention

Recommended:

```text
feat:
fix:
refactor:
perf:
test:
docs:
build:
ci:
chore:
security:
```

Example:

```text
feat(profile): add service history notes
```

## Before Committing

Verify:

```text
Tests passing
Build passing
No secrets
No temporary files
No debug statements
Documentation updated
Git diff reviewed
```
