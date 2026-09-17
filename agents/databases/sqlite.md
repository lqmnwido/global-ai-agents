# SQLite Database Profile

> Company standard for SQLite usage. Load when the project uses SQLite.

## Connection & Configuration

- Use `DATABASE_URL=file:./data/app.db?mode=rwc` or `SQLITE_PATH` env var.
- Preferred client: `better-sqlite3` (Node.js) or `sqlite3`/`aiosqlite` (Python).
- Enable WAL journal mode for concurrent read performance.
- Set `busy_timeout=5000` and `foreign_keys=ON` on every connection.

## Schema Rules

- Table and column names: `snake_case`, no reserved word conflicts.
- Primary keys: `id INTEGER PRIMARY KEY` (auto-increments by default in SQLite).
- Prefer `TEXT` for dates (ISO 8601 strings) and `REAL` for decimals.
- Use `CHECK` constraints for enums and validation; SQLite enforces them.
- Index naming: `idx_{table}_{column}`; keep indexes minimal.
- Foreign keys require `PRAGMA foreign_keys = ON` per connection.

## Migration Rules

- Use a migration tool (`knex`, `migrate`, `prisma`); never alter `.db` files manually.
- Never modify a migration already in version control and deployed.
- Include rollback scripts for every schema change.
- Avoid `DROP TABLE` without confirmation; prefer `ALTER TABLE` additions.
- Back up the database file before applying migrations in production.

## Performance

- Paginate all list queries; avoid `SELECT *` in production code.
- Add indexes on columns used in `WHERE`, `JOIN`, and `ORDER BY`.
- Avoid N+1 queries; batch with `IN (...)` clauses where possible.
- Keep transactions short; SQLite locks the entire database during writes.

## Safety

- Production is read-only for AI agents unless explicitly approved.
- Never silently delete data or run `DELETE` without a `WHERE` clause.
- Use transactions for multi-statement writes to ensure atomicity.
