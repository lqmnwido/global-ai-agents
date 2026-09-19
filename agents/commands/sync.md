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

## Harness Refresh

Before syncing, check whether `.doc/agents.md` is stale:

- Compare the module list in `.doc/agents.md` against the global harness
  inventory and against any new reusable components added this cycle.
- If the harness changed, the stack changed, or a component was added, propose
  the manifest update and refresh `.doc/agents.md`.
- Reference module paths only; never paste global rule bodies into `.doc/agents.md`.
- Use relative module names so every harness resolves them against its own
  module directory.

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
