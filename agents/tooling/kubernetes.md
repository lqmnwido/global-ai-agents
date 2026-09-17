# Kubernetes Profile

> Company standard for Kubernetes usage. Load when the project uses Kubernetes.

## Usage

- Manage all resources as YAML manifests committed to Git; apply via `kubectl apply -f`.
- Use namespaces to isolate environments: `dev`, `staging`, `prod`.
- Define Deployments/StatefulSets with `requests` and `limits` for every container.
- Use services and Ingress for networking; prefer external access via Ingress only.
- Use ConfigMaps for configuration; Secrets for credentials, mounted as env or files.
- Declare `livenessProbe`, `readinessProbe`, and `startupProbe` on all workloads.

## Security

- Enforce least privilege with RBAC roles and service accounts per namespace.
- Never store secrets in ConfigMaps, images, or plain YAML in Git; use Secret objects.
- Enable encryption at rest and TLS for all ingress traffic.
- Use NetworkPolicies to restrict pod-to-pod and egress traffic.
- Run workloads with `securityContext` (non-root, read-only root filesystem, drop caps).

## Best Practices

- Use resource quotas and limit ranges per namespace.
- Set sensible pod disruption budgets (PDBs) for stateful workloads.
- Prefer `helm` charts for packaged apps; render with `helm template` in CI.
- Keep images pinned by digest; enable image pull policies.
- Use horizontal pod autoscaling based on CPU/memory metrics.

## Guardrails

- Production mutation (apply, delete, rollout) requires human approval.
- AI agents default to read-only: `kubectl get`, `kubectl describe`, `kubectl logs`.
- Never run `kubectl delete`, `rollout restart`, `scale`, or `apply` in production without approval.
- Never exec into production pods or expose debug ports without approval.
