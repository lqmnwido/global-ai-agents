# MySQL Database Profile

> Company standard for MySQL usage. Load when the project uses MySQL.

## Connection & Configuration

- Use `DATABASE_URL=mysql://user:pass@host:3306/dbname` env var convention.
- Preferred client: `mysql2` (Node.js) or official connector per language.
- Connection pooling required; set `connectionLimit` between 10-20 per service.
- Always specify `charset=utf8mb4` and `timezone=+00:00` in connection options.

## Schema Rules

- Table and column names: `snake_case`, lowercase, max 64 characters.
- Primary keys: always `id BIGINT UNSIGNED AUTO_INCREMENT`.
- Prefer `DECIMAL` over `FLOAT`/`DOUBLE` for monetary values.
- Use `VARCHAR(n)` with explicit length; avoid `TEXT` unless necessary.
- Index naming: `idx_{table}_{column}`, unique indexes: `uniq_{table}_{column}`.
- Foreign keys: `fk_{table}_{related_table}` with `ON DELETE` and `ON UPDATE` clauses.

## Migration Rules

- Use migrations for all DDL changes; never run ad-hoc `ALTER TABLE` in production.
- Never modify a migration that has already been deployed to a production environment.
- Every migration must have a tested rollback path.
- Avoid `DROP TABLE` or `DROP COLUMN` without explicit team approval.

## Performance

- Always paginate large result sets; never `SELECT *` in application queries.
- Add indexes on columns used in `WHERE`, `JOIN`, and `ORDER BY` clauses.
- Use `EXPLAIN` to verify query plans before deploying slow-query candidates.
- Avoid N+1 queries; use `JOIN` or batch loading where possible.
- Wrap related writes in transactions for atomicity.

## Safety

- Production databases are read-only for AI agents unless explicitly approved.
- Never silently delete or truncate data; require confirmation and backup.
- Use transactions with appropriate isolation level for multi-step operations.
