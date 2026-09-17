# Database Migration Operations

## Migration Safety Rules

* Never modify a migration already deployed to production.
* Create a new migration for schema changes.
* Review rollback behavior.
* Avoid destructive schema operations without approval.
* Test migration against representative data.

## Before Changing a Table

```text
Check row count
Check existing indexes
Check relationships
Check application dependencies
Check production data implications
```

## Destructive Operations

```text
destructive_operations: approval-required
production_access: read-only
```

Never silently delete data.

Use transactions for operations requiring atomicity.

Consider concurrency and locking behavior.

Consider query performance.
