# Azure Profile

> Company standard for Azure usage. Load when the project uses Azure.

## Usage

- Use the Azure CLI with named contexts per subscription/environment.
- Prefer Infrastructure as Code (Bicep/Terraform/ARM) over the portal or manual CLI.
- Authenticate via Azure AD managed identities or service principals; avoid long-lived keys.
- Tag all resources with `Environment`, `Owner`, `CostCenter`, and `ManagedBy`.
- Use Azure Key Vault for secrets, certificates, and connection strings.
- Centralize diagnostics logs to Log Analytics workspaces with retention policies.

## Security

- Grant least privilege via Azure RBAC roles scoped to resource groups or resources.
- Never commit credentials; use Key Vault references and managed identities.
- Use Azure Defender/Defender for Cloud to monitor posture and vulnerabilities.
- Enable network security groups, private endpoints, and VNet integration.
- Enable Microsoft Entra ID MFA for all privileged accounts.
- Restrict public IP exposure; block default open ports.

## Best Practices

- Use resource groups per environment with clear naming conventions.
- Enable audit logging and activity log export for all subscriptions.
- Set budgets and alerts on resource group subscription spend.
- Prefer serverless/managed platforms over VMs where latency permits.

## Guardrails

- Production mutation (create, delete, IAM/role changes) requires human approval.
- AI agents default to read-only: `az resource list`, `az group list`, `az storage show`.
- Never delete resource groups, key vaults, or modify RBAC in production.
- Never run `az group delete`, `az keyvault secret delete`, or subscription-level commands without approval.
