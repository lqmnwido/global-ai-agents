# Elasticsearch Database Profile

> Company standard for Elasticsearch usage. Load when the project uses Elasticsearch.

## Connection & Configuration

- Use `ELASTICSEARCH_URL=https://host:9243` env var with API key or basic auth.
- Preferred client: `@elastic/elasticsearch` (Node.js) or `elasticsearch-py` (Python).
- Always use TLS and authentication in non-local environments.
- Configure `requestTimeout` (30s default) and `maxRetries` for reliability.

## Schema Rules

- Index names: `{service}-{entity}-{version}` (e.g., `orders-product-v2`).
- Use explicit mappings; never rely on dynamic mapping in production.
- Prefer `keyword` type for exact matches; `text` only for full-text search fields.
- Date fields: use `date` type with `format: strict_date_optional_time||epoch_millis`.
- Nested relationships: use `nested` type when inner object queries are needed.
- Alias old indices to new ones during reindexing for zero-downtime migrations.

## Migration Rules

- Manage index templates and mappings via version-controlled scripts.
- Never modify mappings on an existing index; create a new index and reindex.
- Use `_aliases` to swap traffic between old and new indices.
- Test mappings against representative data before deploying to production.

## Performance

- Paginate with `search_after` or `scroll` for large result sets; avoid deep `from`.
- Use `_source` filtering to return only needed fields.
- Avoid expensive aggregations on high-cardinality fields without sampling.
- Use index lifecycle management (ILM) for time-based indices.

## Safety

- Production is read-only for AI agents unless explicitly approved.
- Never execute `DELETE BY QUERY` without a confirmed filter and backup.
- Use index-level permissions; restrict `delete_index` and `update_mappings`.
- Monitor cluster health (`_cluster/health`); pause writes on `RED` status.
