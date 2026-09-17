# Backend Standard

For backend systems, preferred separation is:

```text
HTTP / Controller
       │
Request Validation
       │
Application Service
       │
Domain Logic
       │
Repository / Data Access
       │
Database
```

Controllers SHOULD remain thin.

Controllers SHOULD NOT contain:

```text
Large business workflows
Complex database queries
Reusable domain calculations
Infrastructure implementation
Large transformations
```
