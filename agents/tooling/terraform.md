# Terraform Profile

> Company standard for Terraform usage. Load when the project uses Terraform.

## Usage

- Store all `.tf` code in version control; use a single workspace per environment.
- Use remote state (S3/GCS/Azure Storage) with locking; never use local state for shared infra.
- Organize modules by concern: vpc, compute, database, iam, networking.
- Use `terraform plan` before every apply; review diffs before execution.
- Tag all resources with owner, environment, cost-center, and terraform-managed.
- Use variables and `terraform.tfvars`; avoid hardcoding in resource blocks.

## Security

- Follow least privilege for provider credentials; use scoped service principals.
- Never commit `terraform.tfvars`, state files, or credentials to the repository.
- Store sensitive variables in state are encrypted; use a secret vault for var values.
- Do not expose secrets through outputs; use `sensitive = true` in outputs.
- Minimize provider permissions to those required for the managed resources.

## Best Practices

- Pin provider and module versions; use a lock file for reproducible runs.
- Split large state into smaller per-service configs to reduce blast radius.
- Use `prevent_destroy` lifecycle on critical resources like databases.
- Run `terraform validate` and `terraform fmt -check` in CI.
- Regularly refresh state and review drift with `terraform plan`.

## Guardrails

- Production mutation (plan/apply/destroy) requires human approval.
- AI agents default to `terraform plan`, `terraform show`, `terraform state list`.
- Never run `terraform apply` or `terraform destroy` against production without approval.
- Never import or move state blocks without explicit review.
