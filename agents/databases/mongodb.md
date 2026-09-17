# MongoDB Database Profile

> Company standard for MongoDB usage. Load when the project uses MongoDB.

## Connection & Configuration

- Use `MONGODB_URI=mongodb://user:pass@host:27017/dbname?authSource=admin` env var.
- Preferred driver: `mongodb` (Node.js) official driver; `pymongo` (Python).
- Use replica set URIs in production with `replicaSet=` and `ssl=true`.
- Connection pooling: set `maxPoolSize` between 20-50 per service.

## Schema Rules

- Collection names: `snake_case`, pluralized (e.g., `user_accounts`).
- Documents must include `_id` field; use `ObjectId` unless a natural key exists.
- Embed related data for 1:1 and 1:few relationships; reference for 1:many and many:many.
- Store dates as `ISODate` objects, not strings.
- Use JSON Schema validation on collections for required fields and types.
- Index names: `{field_1}` or `{field_1: 1}` pattern; compound indexes list fields in order.

## Migration Rules

- Version schema validation rules alongside application code changes.
- Never drop or rename collections in production without team approval.
- Use `mongosh` scripts for data migrations; test on staging first.
- Back up collections before destructive operations.
- Store migration state in a dedicated `_migrations` collection.

## Performance

- Create indexes to support query patterns; use `db.collection.explain()` to verify.
- Avoid unbounded `$where` queries and large `$regex` scans.
- Paginate with `skip/limit` for small datasets; cursor-based for large ones.
- Avoid N+1 by using `$lookup` aggregation or batched queries.

## Safety

- Production is read-only for AI agents unless explicitly approved.
- Never execute `dropDatabase`, `drop()`, or `deleteMany()` without confirmation.
- Use sessions with transactions for multi-document atomicity.
