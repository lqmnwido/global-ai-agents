# Security Review

## Security Requirements

Every change MUST consider:

```text
Authentication
Authorization
Input validation
Output escaping
SQL injection
XSS
CSRF
SSRF
File upload safety
Path traversal
Command injection
Mass assignment
Rate limiting
Sensitive data exposure
Logging of secrets
Broken access control
```

## Rules

* Never trust client-side validation alone.
* Authorization MUST be enforced server-side.
* Production credentials MUST never be embedded in code, documentation, or config committed to Git.
* Use environment variables or approved secret management.
