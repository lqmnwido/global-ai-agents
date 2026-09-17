# Database Implementation

## Patterns

Recommended database implementation patterns:

```text
Use migrations for all schema changes
Maintain indexes on commonly queried columns
Use foreign keys where appropriate
Use transactions for atomic operations
Use query caching where appropriate
Use pagination for large result sets
Avoid N+1 queries
Use eager loading where appropriate
```

## Query Considerations

Before writing a query:

```text
Check if a similar query already exists
Check existing indexes
Check relationships
Consider batch operations
Consider page size limits
Consider timeouts
```

## Migration Safety

```text
Inspiration
Never modify a migration already deployed to production
Create a new migration for schema changes
Review rollback behavior
Avoid destructive operations without approval
Test migrations against representative data
```
