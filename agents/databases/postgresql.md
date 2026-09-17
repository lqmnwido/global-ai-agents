# PostgreSQL Database Profile

> Company standard for PostgreSQL usage. Load when the project uses PostgreSQL.

## Connection & Configuration

- Use `DATABASE_URL=postgresql://user:pass@host:5432/dbname?sslmode=require` env var.
- Preferred client: `pg` or `postgres.js` (Node.js); `psycopg2` or `asyncpg` (Python).
- Connection pooling via `pgbouncer` or application-level pool with max 20 connections.
- Always enable `sslmode` in non-local environments.

## Schema Rules

- Table and column names: `snake_case`; avoid quoting identifiers.
- Primary keys: always `id BIGINT GENERATED ALWAYS AS IDENTITY` or `SERIAL`.
- Use `NUMERIC` for precise decimals; `TIMESTAMPTZ` over `TIMESTAMP`.
- Create custom types via `CREATE TYPE` for enums; avoid free-text status columns.
- Index naming: `idx_{table}_{column}`; uniqueness: `uniq_{table}_{column}`.
- Foreign keys: `fk_{table}_{related}` with explicit `ON DELETE` and `ON UPDATE`.

## Migration Rules

- Use a migration tool (e.g., `migrate`, `alembic`, `knex`); no manual DDL.
- Never alter a migration already applied to production; create a new one instead.
- Include tested rollback for every migration.
- Avoid `DROP` operations without prior approval and a confirmed backup.

## Performance

- Use `EXPLAIN (ANALYZE, BUFFERS)` to diagnose slow queries.
- Add partial indexes and expression indexes where appropriate.
- Paginate large queries using cursor-based or keyset pagination.
- Avoid N+1; leverage `JOIN`, `LATERAL`, or `CTE` as needed.
- Use transactions to group related writes; keep them short.

## Safety

- Production is read-only for AI agents unless explicitly approved.
- Never delete or modify data silently; always confirm intent.
- Use advisory locks for coordination; avoid `SELECT ... FOR UPDATE` when possible.
