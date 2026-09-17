# Refactoring — Safe Changes

## Purpose

Refactoring changes structure without changing behavior. If behavior changes, it
is not a refactor — it is a feature or a bug fix and must be treated as one.

## Rule Zero

Refactoring MUST be behavior-preserving. Prove it.

## Preconditions

Before refactoring:

```text
[ ] Scope approved (see standards/human-review.md)
[ ] Tests exist for the affected behavior, or characterization tests are added first
[ ] The current behavior is understood, not assumed
[ ] The refactor is separable from pending feature work
```

## Characterization Tests First

If tests do not cover the code, write tests that capture current behavior
before touching anything. Pass them. Then refactor. Pass them again unchanged.

## Small Steps

```text
One concern per step
Run tests after every step
Commit-able at each step
No drive-by rewrites of unrelated code
No formatting churn mixed with logic changes
```

## Preserve

- Public API signatures and contracts
- Database schema and query semantics
- Error types and messages observed by callers
- Authorization and validation behavior
- Logging/observability contracts others depend on

## Do Not

```text
- Rename public symbols as part of an unrelated task
- Change behavior "while you're in there"
- Introduce a new abstraction for a single call site
- Rewrite working code to match personal preference
- Mix refactor and feature changes in one commit
```

## Refactor Output

```yaml
refactor:
  goal:
  behavior_preserved_by:  # tests / characterization
  steps: []
  public_api_changes: none
  files:
    changed: []
  tests:
    before: pass
    after: pass
  risks: []
```

See also: `quality/testing.md`, `standards/definition-of-done.md`.
