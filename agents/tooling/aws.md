# AWS Profile

> Company standard for AWS usage. Load when the project uses AWS.

## Usage

- Use the AWS CLI with named profiles per environment (`--profile dev|prod`).
- Prefer Infrastructure as Code (Terraform/CDK/CloudFormation) over console or manual CLI.
- Use AWS SSO or assumed roles instead of long-lived access keys.
- Tag all resources with `Environment`, `Owner`, `CostCenter`, and `Terraform` tags.
- Use region-appropriate S3 bucket naming and server-side encryption for all buckets.
- Centralize logging in CloudWatch or S3 with retention policies applied.

## Security

- Grant least privilege via IAM roles and policies; avoid wildcard `*` actions.
- Never commit AWS access keys or secret keys; use environment vars or secret manager.
- Enable MFA on all admin accounts; enforce password/rotation policies.
- Encrypt data at rest (KMS) and in transit (TLS/ACM) for all services.
- Use Security Groups to restrict ingress; enable VPC Flow Logs for auditing.
- Rotate credentials via IAM access key rotation policy.

## Best Practices

- Scope IAM policies to resource-level ARNs, not account-wide grants.
- Enable S3 versioning and lifecycle rules on business-critical buckets.
- Use managed services over self-managed where cost permits.
- Use cost explorer and budgets to monitor spend.

## Guardrails

- Production mutation (apply, delete resources, IAM changes) requires approval.
- AI agents default to read-only: `aws describe-*`, `aws list-*`, `aws s3 ls`.
- Never delete S3 objects, EC2 instances, or modify IAM policies in production.
- Never run `aws s3api delete-bucket`, `delete-stack`, or account-level commands without approval.
