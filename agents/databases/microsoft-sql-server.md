# Microsoft SQL Server Database Profile

> Company standard for SQL Server usage. Load when the project uses MS SQL Server.

## Connection & Configuration

- Use `DATABASE_URL=Server=host;Database=db;User Id=user;Password=pass;Encrypt=true` env var.
- Preferred client: `mssql` (Node.js) or `pyodbc`/`pymssql` (Python).
- Always enable `Encrypt=True` and `TrustServerCertificate=False` in production.
- Use connection pooling with `pool.max` set to 10-20 per application instance.

## Schema Rules

- Table and column names: `PascalCase` or `snake_case` per project convention; be consistent.
- Primary keys: `Id INT IDENTITY(1,1)` or `BIGINT` for high-volume tables.
- Prefer `DECIMAL(19,4)` for money; avoid `MONEY` type for new schemas.
- Default schema: `dbo`; explicitly qualify schema in migrations.
- Index naming: `IX_{Table}_{Column}`; unique: `UQ_{Table}_{Column}`; FK: `FK_{Table}_{Ref}`.

## Migration Rules

- Use EF Core migrations, Flyway, or DbUp for all DDL changes.
- Never modify deployed migrations; add new ones to fix issues.
- Include rollback logic or compensating scripts for every migration.
- Avoid `DROP TABLE`, `DROP COLUMN`, or data truncation without approval.
- Test migrations against a copy of production schema before deploying.

## Performance

- Always paginate queries; use `OFFSET/FETCH NEXT` or keyset pagination.
- Add covering indexes for frequently executed queries.
- Use `SET STATISTICS IO ON` to diagnose I/O-heavy queries.
- Avoid N+1; use `JOIN` or `CROSS APPLY` where suitable.
- Wrap related writes in `BEGIN TRANSACTION` / `COMMIT` blocks.

## Safety

- Production is read-only for AI agents unless explicitly approved.
- Never silently delete or modify production data.
- Use `TRY/CATCH` blocks in scripts for error handling.
