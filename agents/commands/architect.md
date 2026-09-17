# /architect

## Purpose

Design the implementation before writing code.

Architecture MUST respect existing project conventions.

Do not redesign the entire system to implement a small change.

## Human Gate

Present design options (economy / recommended / full) with a recommendation and
wait for approval. Render the options as a numbered menu (see
`standards/human-review.md` → Decision Format) and ask for a single-digit reply.
No code may be written before a design option is approved.

```text
Options:
1  Economy       → minimal implementation
2  Recommended   → approved defaults / my recommendation
3  Full          → everything possible

Reply with 1, 2, or 3.
```

## Architecture Decision Priority

Use this priority:

```text
1. Existing project pattern
2. Company standard
3. Framework convention
4. Industry best practice
5. New custom architecture
```

Custom architecture should be the final option.

## Architecture Output

```yaml
architecture:
  problem:

  proposed_solution:

  affected_layers:
    - presentation
    - application
    - domain
    - infrastructure
    - database

  new_files: []

  modified_files: []

  reused_components: []

  api_changes: []

  database_changes: []

  security_considerations: []

  testing_strategy: []

  rollback_strategy:
```
