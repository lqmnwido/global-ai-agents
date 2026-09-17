# MariaDB Database Profile

> Company standard for MariaDB usage. Load when the project uses MariaDB.

## Connection & Configuration

- Use `DATABASE_URL=mysql://user:pass@host:3306/dbname` env var (MySQL-compatible wire protocol).
- Preferred client: `mariadb` (Node.js) or `mysql2`; `mariadbconnector` (Python).
- Enable connection pooling with `acquireTimeout` and `idleTimeout` configured.
- Always set `charset=utf8mb4` and explicit `collation` in connection options.

## Schema Rules

- Table and column names: `snake_case`, lowercase, no reserved word collisions.
- Primary keys: `id BIGINT UNSIGNED AUTO_INCREMENT`.
- Prefer `DECIMAL(p,s)` for financial data; avoid `FLOAT` and `DOUBLE`.
- Use `VARCHAR(n)` with defined length; prefer `InnoDB` engine for all tables.
- Index naming: `idx_{table}_{column}`; unique: `uniq_{table}_{column}`.
- Foreign keys: `fk_{table}_{related}` with `ON DELETE` and `ON UPDATE` specified.

## Migration Rules

- All schema changes go through versioned migration files.
- Never apply ad-hoc DDL directly to production.
- Do not modify migrations already deployed; create corrective migrations instead.
- Every migration must include a reversible rollback path.
- Avoid `DROP TABLE` or `DROP COLUMN` without explicit approval.

## Performance

- Paginate all list queries; never return unbounded result sets.
- Create indexes on foreign keys and frequently filtered columns.
- Use `EXPLAIN` to validate query execution plans.
- Avoid N+1 patterns; batch loads or use joins.
## Safety

- Production databases are read-only for AI agents unless explicitly approved.
- Never silently delete, truncate, or overwrite data.
- Use transactions with appropriate isolation level for concurrent operations.
