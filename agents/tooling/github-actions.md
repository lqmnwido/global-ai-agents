# GitHub Actions Profile

> Company standard for GitHub Actions usage. Load when the project uses GitHub Actions.

## Usage

- Define workflows in `.github/workflows/` as YAML, one file per concern.
- Trigger jobs on specific events (`push`, `pull_request`, `workflow_dispatch`), not wildcards.
- Pin action versions to full commit SHAs or at minimum major versions.
- Use environment-based secrets and preview environments per branch.
- Run linting, unit tests, and type checks before deployment jobs.
- Use concurrency groups to prevent overlapping deployments per branch.

## Security

- Grant least privilege to permissions; scope tokens to `contents: read` by default.
- Never commit secrets; store in GitHub repository/environment secrets.
- Use `secrets.GITHUB_TOKEN` with minimal permissions; avoid personal access tokens.
- Restrict `pull_request_target` triggers and subexpression injection risks.
- Sanitize untrusted inputs; use `${{ }}` expressions carefully to avoid injection.
- Review and require approval for workflow changes on protected branches.

## Best Practices

- Cache dependencies (npm/pip/go) to speed up builds.
- Use reusable workflows and composite actions to avoid duplication.
- Set job-level timeouts to prevent runaway pipelines.
- Keep steps idempotent; fail fast with `set -euo pipefail` where appropriate.

## Guardrails

- Production deployments from workflows require branch protection and approvals.
- AI agents must not modify workflows on protected main branches without approval.
- Never run actions that deploy, publish, or mutate production resources directly.
- Review `workflow_dispatch` inputs for destructive parameters.
