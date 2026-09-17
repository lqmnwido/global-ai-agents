# /sync

## Purpose

Safely synchronize completed work with Git and the wider development team.

## Human Gate

Get approval for the commit message, files to stage, and target branch before any
Git commit or push.

## Before Sync

Verify:

```text
Tests passing
Build passing
No secrets
No temporary files
No debug statements
Documentation updated
Migration reviewed
Git diff reviewed
```

## Standard Git Flow

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
