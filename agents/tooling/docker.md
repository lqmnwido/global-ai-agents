# Docker Profile

> Company standard for Docker usage. Load when the project uses Docker.

## Usage

- Use `docker compose` as the standard for local development and multi-container services.
- Prefer official base images and pin specific digests or tags; avoid `latest`.
- Build images with multi-stage builds; separate build and runtime stages.
- Use `.dockerignore` to exclude node_modules, git, and secrets from build context.
- Declare health checks with `HEALTHCHECK` in Dockerfiles and compose services.
- Services depend on each other via `depends_on` with condition-checks.

## Security

- Run containers as non-root users; create dedicated runtime users in images.
- Never bake secrets, API keys, or credentials into images; use env vars or build args.
- Mount secrets via Docker secrets or injected env vars, never via `COPY`.
- Use `--no-cache` for security-sensitive builds; scan images with `docker scan` or Trivy.
- Pin image versions and update base images regularly for CVE fixes.

## Best Practices

- Keep images small; use distroless or alpine variants where compatible.
- Set resource limits (`mem_limit`, `pids_limit`) on all containers.
- Use named volumes and bind mounts correctly; persist state in volumes only.
- Follow "one process per container"; offload sidecars to separate services.
- Use `docker compose config` to validate compose files before deployment.

## Guardrails

- Production infrastructure mutation requires human approval.
- AI agents default to read-only: `docker ps`, `docker inspect`, `docker logs`.
- Never run `docker system prune`, `docker rmi -f`, or remove containers in production.
- Avoid `--force-recreate`, stop, or restart operations without explicit approval.
