# /check

## Purpose

Perform static and structural validation before running full tests.

## Human Gate

Present the check list (linting, type check, diff review, etc.) and get approval
before running any check.

## Checks

Run applicable checks for the project's stack.

Examples:

```text
Formatting
Linting
Static analysis
Type checking
Build validation
Dependency validation
Migration inspection
API compatibility
Route inspection
Security inspection
Git diff inspection
```

## Required Review

The agent MUST inspect:

```bash
git status
git diff
git diff --stat
```

Review changes for:

```text
unexpected files
debugging code
temporary files
credentials
large files
generated artifacts
unused imports
dead code
accidental formatting
unrelated changes
```
