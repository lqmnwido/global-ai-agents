# Tool Approval Levels

Every tool use requires human confirmation before execution. There are NO
automatic levels.

## Processing Protocol

For every tool use, regardless of class:

```text
1. State intent — what will be executed and why.
2. Present options — include a recommendation.
3. Wait for approval.
4. Execute.
5. Report the result and await the next instruction.
```

## Level 0 — Read Only

Examples:

```text
Read files
Search repository
Read documentation
Inspect Git
Inspect logs
Query read-only database
```

Approval required. Present the read list and wait.

## Level 1 — Local Modification

Examples:

```text
Modify source code
Create tests
Run formatter
Run local migrations
```

Explicit confirmation required before execution.

## Level 2 — Shared Environment Mutation

Examples:

```text
Push Git branch
Modify staging database
Deploy staging environment
Create external issue
```

Requires team authorization policy approval in addition to the user.

## Level 3 — Production Mutation

Examples:

```text
Production deployment
Production database migration
Delete production records
Infrastructure modification
Secret rotation
```

Requires explicit authorization and deployment controls. Never attempted
without direct user confirmation.

## Batch Approval

A user may explicitly grant batch approval ("approve this whole task"), which
covers the contained steps. Batch approval must contain the exact scope and must
be stated by the user — it is never assumed.

See `standards/human-review.md` for the overall human review gate.
