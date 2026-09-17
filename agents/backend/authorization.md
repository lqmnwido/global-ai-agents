# Authorization

## Requirements

Authorization MUST be enforced server-side, never client-side only.

Authorization considerations:

```text
Role-based access control
Permission-based access control
Policy enforcement
Ownership checks
Route protection
Controller middleware
Service-level checks
Resource-scoped access
Broken access control prevention
```

Every endpoint that returns sensitive data MUST verify the caller is authorized.

Never rely solely on frontend route guards for security.
