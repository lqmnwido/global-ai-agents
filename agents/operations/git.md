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

## What to Commit vs Ignore

Commit shared project configuration. Ignore ephemeral, generated, or
machine-local output.

```text
COMMIT (shared project config):
  .doc/agents.md        # project-harness manifest (shared with the team)
  .doc/config.yaml      # project harness config
  .doc/slopignore       # anti-slop lint config
  AGENTS.md             # project agent entry point

IGNORE (ephemeral / generated):
  node_modules/
  vendor/
  dist/  build/  out/
  .playwright-mcp/     # Playwright MCP session logs and page snapshots
  test-results/
  playwright-report/
  coverage/
  *.log
  .env
```

- Do NOT gitignore `.doc/` wholesale. It is shared configuration, not
  machine-local state; ignoring it makes the manifest drift and lose the token
  savings it exists for.
- `.playwright-mcp/` is tool output that regenerates on every browser run; it
  MUST be ignored and never committed.
- Commit project config files deliberately; ignore everything the build or the
  test tooling regenerates.
