# Database Rules

Database changes require special care.

## Rules

* Use migrations.
* Maintain indexes.
* Use foreign keys where appropriate.
* Avoid N+1 queries.
* Review large table changes.
* Avoid destructive migrations without rollback planning.
* Never silently delete data.
* Use transactions for operations requiring atomicity.
* Consider concurrency.
* Consider locking behavior.
* Consider query performance.

## Before Changing a Table

```text
Check row count
Check existing indexes
Check relationships
Check application dependencies
Check production data implications
```
