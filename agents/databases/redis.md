# Redis Database Profile

> Company standard for Redis usage. Load when the project uses Redis.

## Connection & Configuration

- Use `REDIS_URL=redis://:password@host:6379/0` env var with TLS in production.
- Preferred client: `ioredis` (Node.js) or `redis-py` (Python).
- Use separate database numbers per service (0-15); document the assignment.
- Configure `maxRetriesPerRequest` and `enableReadyCheck` for resilience.

## Schema Rules

- Key naming: `{service}:{type}:{identifier}` (e.g., `auth:session:abc123`).
- Use `KEYS` pattern: `{namespace}:{entity}:{id}` with consistent separators.
- Set explicit `TTL` on all cached keys; no permanent keys in shared databases.
- Prefer hashes for structured data over multiple string keys.
- Use Redis sets or sorted sets for unique collections and leaderboards.
- Avoid storing large objects; cap values at 100 KB.

## Migration Rules

- Redis has no formal schema migrations; manage key patterns via application code.
- When changing key formats, deploy a compatibility layer for phased rollout.
- Document all key namespaces and TTL conventions in a shared registry.
- Flush or prune keys using `SCAN`, never `KEYS` in production.
## Performance

- Use pipelining and multi/exec for batch operations.
- Avoid `KEYS *`; use `SCAN` with a count hint for iteration.
- Use Lua scripts for atomic multi-step operations.
- Monitor memory usage; set `maxmemory-policy` appropriately.
- Avoid N+1 round-trips; batch with `MGET`/`MSET` or pipelines.

## Safety

- Production is read-only for AI agents unless explicitly approved.
- Never execute `FLUSHALL` or `FLUSHDB` without explicit confirmation.
- Use ACLs and require authentication for all connections.
